import { memo } from 'react'
import { useReveal } from '@/hooks/useReveal'

function CTASection() {
  const ref = useReveal(0.15)

  return (
    <section
      className="cta-section"
      id="contact"
      style={{
        background: '#1C1814',
        padding: 'clamp(5rem, 14vw, 12rem) clamp(1.5rem, 8vw, 10rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(179, 150, 86, 0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top decorative line */}
      <div style={{ height: '1px', width: '60px', background: '#B39656', opacity: 0.6, marginBottom: '3rem' }} />

      <div
        ref={ref}
        className="reveal"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B39656',
            margin: 0,
          }}
        >
          Begin Your Journey
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
            lineHeight: 1.0,
            color: '#FAF8F4',
            margin: 0,
            letterSpacing: '-0.01em',
            maxWidth: '800px',
          }}
        >
          Find a piece that becomes{' '}
          <em style={{ fontStyle: 'italic', color: '#B39656' }}>part of your story</em>.
        </h2>

        {/* Gold line */}
        <div style={{ height: '1px', width: '60px', background: '#B39656', opacity: 0.5 }} />

        {/* Buttons */}
        <div className="cta-buttons" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="#"
            className="cta-btn-primary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1C1814',
              background: '#B39656',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#CDB87A'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#B39656'
            }}
          >
            Explore Collection
          </a>
          <a
            href="#"
            className="cta-btn-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FAF8F4',
              background: 'transparent',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              border: '1px solid rgba(250, 248, 244, 0.25)',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(179, 150, 86, 0.7)'
              el.style.color = '#B39656'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(250, 248, 244, 0.25)'
              el.style.color = '#FAF8F4'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div style={{ height: '1px', width: '60px', background: '#B39656', opacity: 0.6, marginTop: '3rem', zIndex: 1 }} />

      <style>{`
        @media (max-width: 480px) {
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-btn-primary,
          .cta-btn-secondary {
            width: 100%;
            text-align: center;
            padding: 0.9rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(CTASection)