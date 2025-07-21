import { ImageResponse } from 'next/og';

export const size = {
    width: 32,
    height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 18,
                    background: 'linear-gradient(135deg, #69451f 0%, #8b6914 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    borderRadius: '8px',
                    letterSpacing: '0.5px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                }}
            >
                MY
            </div>
        ),
        {
            ...size,
        },
    );
}

export function generateStaticParams() {
    return [{ size: '32' }];
}
