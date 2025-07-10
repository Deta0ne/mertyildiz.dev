import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  try {
    if (!secret) {
      return NextResponse.json(
        { success: false, message: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    const signature = req.headers.get(SIGNATURE_HEADER_NAME) as string
    const body = await req.text()

    if (!signature) {
      return NextResponse.json(
        { success: false, message: 'No signature header found' },
        { status: 401 }
      )
    }

    if (!isValidSignature(body, signature, secret)) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      )
    }

    const jsonBody = JSON.parse(body)
    const { _type, slug, _id } = jsonBody

    switch (_type) {
      case 'profile':
        revalidatePath('/')
        break

      case 'timeline':
        revalidatePath('/')
        break

      case 'techStack':
        revalidatePath('/stack')
        break

      default:
        revalidatePath('/')
        break
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
      type: _type,
      slug: slug?.current || null,
      id: _id
    })

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Webhook processing failed', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 