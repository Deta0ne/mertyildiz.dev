import { ImageResponse } from 'next/og';

export const size = {
    width: 180,
    height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 72,
                    background: 'linear-gradient(135deg, #65451f 0%, #8b6914 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    borderRadius: '36px',
                    letterSpacing: '2px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
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
