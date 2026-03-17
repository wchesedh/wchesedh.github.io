import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          background:
            'radial-gradient(circle at 30% 20%, rgba(59,130,246,1) 0%, rgba(34,211,238,1) 45%, rgba(2,132,199,1) 100%)',
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.92)',
            boxShadow: '0 10px 30px rgba(2, 6, 23, 0.22)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: -0.5,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
              background:
                'linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(8,145,178,1) 100%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            WJ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

