# Next.js Contentful Webhook Revalidation Sistemi - Adım Adım Kılavuz

Bu kılavuz, Contentful CMS ile Next.js arasında webhook tabanlı cache revalidation sisteminin nasıl kurulduğunu adım adım açıklar.

## 🎯 **1. ADIM: Next.js API Route Oluşturma**

### Webhook Endpoint'i Hazırlama
```js
// src/app/api/revalidate/route.js
import { revalidatePath } from 'next/cache'
import { CONTENT_TYPES } from '@/lib/constants'

export const dynamic = 'auto' // ISR için gerekli

const secret = `${process.env.NEXT_REVALIDATE_SECRET}`

export async function POST(request) {
  // Contentful'dan gelen payload'ı parse et
  const payload = await request.json()
  
  // Security header kontrolü
  const requestHeaders = new Headers(request.headers)
  const revalidateSecret = requestHeaders.get('x-revalidate-secret')
  
  if (revalidateSecret !== secret) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Invalid secret'
    }, { status: 401 })
  }
  
  // Content type'a göre revalidation logic'i
  // ... (devamı aşağıda)
}
```

## 🏗️ **2. ADIM: Content Type Mapping**

### Sabitler Tanımlama
```js
// src/lib/constants.js
export const CONTENT_TYPES = {
  PAGE: 'page',        // Ana sayfalar (/stack, /about vs.)
  POST: 'post',        // Blog yazıları (/writing/slug)
  LOGBOOK: 'logbook'   // Journey entries (/journey)
}
```

### Revalidation Logic'i
```js
const { contentTypeId, slug } = payload

switch (contentTypeId) {
  case CONTENT_TYPES.PAGE:
    if (slug) {
      revalidatePath(`/${slug}`)  // Tek sayfa revalidate
    } else {
      return Response.json({
        revalidated: false,
        message: 'Missing page slug to revalidate'
      }, { status: 400 })
    }
    break
    
  case CONTENT_TYPES.POST:
    if (slug) {
      revalidatePath(`/writing/${slug}`)  // Yazı sayfası
      revalidatePath('/writing')          // Ana writing sayfası
    } else {
      return Response.json({
        revalidated: false, 
        message: 'Missing writing slug to revalidate'
      }, { status: 400 })
    }
    break
    
  case CONTENT_TYPES.LOGBOOK:
    revalidatePath('/journey')  // Journey sayfası
    break
    
  default:
    return Response.json({
      revalidated: false,
      message: 'Invalid content type'
    }, { status: 400 })
}

return Response.json({ revalidated: true, now: Date.now() })
```

## 🔐 **3. ADIM: Environment Variables Kurulumu**

### .env.local Dosyası
```bash
# Webhook güvenlik anahtarı
NEXT_REVALIDATE_SECRET=super_secret_webhook_key_123

# Contentful credentials
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=preview_secret
```

### Vercel Environment Variables
```bash
# Production'da Vercel dashboard'tan ayarla:
NEXT_REVALIDATE_SECRET=super_secret_webhook_key_123
```

## 📡 **4. ADIM: Contentful Webhook Konfigürasyonu**

### Contentful Admin Panel'de:

1. **Settings > Webhooks** sekmesine git
2. **Add webhook** butonuna tıkla
3. Webhook detaylarını doldur:

```
Name: Next.js Revalidation Webhook
URL: https://yourdomain.com/api/revalidate
Method: POST

Headers:
- x-revalidate-secret: super_secret_webhook_key_123
- Content-Type: application/json

Triggers:
☑️ Entry.publish
☑️ Entry.unpublish  
☑️ Entry.archive
☑️ Entry.unarchive
☑️ Entry.delete

Content types:
☑️ Page
☑️ Post  
☑️ Logbook
```

### Custom Payload Template
```json
{
  "contentTypeId": "{{ entry.sys.contentType.sys.id }}",
  "slug": "{{ entry.fields.slug.en-US }}"
}
```

## 🎪 **5. ADIM: Static Generation Setup**

### Page Static Generation
```js
// src/app/[slug]/page.js
export async function generateStaticParams() {
  const allPages = await getAllPageSlugs()
  
  return allPages
    .filter((page) => !page.hasCustomPage)
    .map((page) => ({
      slug: page.slug
    }))
}
```

### Writing Static Generation
```js
// src/app/writing/[slug]/page.js
export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs()
  return allPosts.map((post) => ({ slug: post.slug }))
}
```

## 💾 **6. ADIM: Cache Strategy Implementation**

### Contentful Data Fetching
```js
// src/lib/contentful.js
import { cache } from 'react'

const fetchGraphQL = cache(async (query, preview = isDevelopment) => {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    cache: 'force-cache',  // Agresif cache
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query })
  })
  
  return res.json()
})

export const getAllPosts = cache(async (preview = isDevelopment) => {
  const entries = await fetchGraphQL(`
    query {
      postCollection(preview: ${preview}) {
        items {
          title
          slug
          date
          sys { firstPublishedAt publishedAt }
        }
      }
    }
  `, preview)
  
  return entries?.data?.postCollection?.items ?? []
})
```

## 🔄 **7. ADIM: Data Preloading**

### Layout Level Preloading
```js
// src/app/layout.js
import { preloadGetAllPosts } from '@/lib/contentful'

export default async function RootLayout({ children }) {
  const { isEnabled } = await draftMode()
  preloadGetAllPosts(isEnabled)  // Cache warming
  
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Preload Function
```js
// src/lib/contentful.js
export const preloadGetAllPosts = (preview = isDevelopment) => {
  void getAllPosts(preview)  // Fire-and-forget preload
}
```

## 🧪 **8. ADIM: Testing ve Debug**

### Local Test
```bash
# Webhook endpoint'ini test et
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: super_secret_webhook_key_123" \
  -d '{"contentTypeId": "post", "slug": "test-post"}'
```

### Contentful Webhook Logs
- Contentful webhook settings'te **Recent deliveries** kontrolü
- Success/Fail durumları ve response'ları görüntüle

### Next.js Logging
```js
// next.config.mjs
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development'
    }
  }
}
```

## 🚀 **9. ADIM: Production Deployment**

### Vercel Deployment
```bash
# Environment variables'ları Vercel'e ekle
vercel env add NEXT_REVALIDATE_SECRET production
vercel env add CONTENTFUL_SPACE_ID production
# ... diğer env vars

# Deploy
vercel --prod
```

### Domain Update
Contentful webhook URL'ini production domain'e güncelle:
```
https://yourdomain.com/api/revalidate
```

## 📊 **10. ADIM: Monitoring ve Analytics**

### Error Handling
```js
// Webhook endpoint'inde try-catch
try {
  revalidatePath(`/writing/${slug}`)
  return Response.json({ revalidated: true, now: Date.now() })
} catch (error) {
  console.error('Revalidation failed:', error)
  return Response.json({ 
    revalidated: false, 
    error: error.message 
  }, { status: 500 })
}
```

### Success Logging
```js
console.log(`✅ Revalidated: ${contentTypeId}/${slug} at ${new Date().toISOString()}`)
```

## 🎉 **Final Flow**

1. **Editor** Contentful'da yazı günceller
2. **Contentful** webhook tetikler → `/api/revalidate`
3. **Next.js** payload'ı parse eder, secret doğrular
4. **revalidatePath()** ile cache invalidate eder
5. **User** siteyi ziyaret eder → fresh content!

## 🔧 **Ek Optimizasyonlar**

### Selective Revalidation
```js
// Sadece değişen content type'ları revalidate et
if (payload.contentTypeId === 'post') {
  revalidatePath(`/writing/${payload.slug}`)
  revalidatePath('/writing')
  revalidatePath('/sitemap.xml')  // Sitemap'i de güncelle
}
```

### Batch Revalidation
```js
// Birden fazla path'i aynı anda revalidate et
const pathsToRevalidate = [
  `/writing/${slug}`,
  '/writing',
  '/sitemap.xml',
  '/' // Ana sayfa cache'i de temizle
]

pathsToRevalidate.forEach(path => revalidatePath(path))
```

### Rate Limiting
```js
// Çok sık webhook çağrılarını engellemek için
import rateLimit from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 dakika
  uniqueTokenPerInterval: 500,
})

export async function POST(request) {
  try {
    await limiter.check(10, 'WEBHOOK_RATE_LIMIT') // Dakikada max 10 çağrı
  } catch {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }
  
  // ... webhook logic
}
```

## 📈 **Performance Benefits**

Bu sistem sayesinde:

- ⚡ **10-100x faster** loading times (static generation)
- 🔄 **Real-time updates** (webhook revalidation)
- 💾 **Optimal cache usage** (force-cache + selective invalidation)
- 🛡️ **Secure** (secret token authentication)
- 📊 **Scalable** (CDN cache + ISR)

Bu sistem **static site avantajları** + **dynamic content** update'lerinin mükemmel kombinasyonunu sağlıyor! 🚀 