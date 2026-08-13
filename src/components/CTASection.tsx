import { memo } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import jewelryImage from '@/imports/products/jewelry-hands.jpg'

function CTASection() {
  const contactRef = useReveal(0.15)

  return (
    <section
      className="cta-section"
      id="contact"
      style={{
        background: '#1C1814',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 8vw, 10rem)',
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
      <div style={{ height: '1px', width: '60px', background: '#B39656', opacity: 0.6, marginBottom: 'clamp(2rem, 4vw, 3rem)' }} />

      {/* ---------------- Contact Details Block ---------------- */}
      <div
        ref={contactRef}
        className="reveal cta-contact-block"
        style={{
          width: '100%',
          maxWidth: '1180px',
          zIndex: 1,
          display: 'flex',
          alignItems: 'stretch',
          background: '#241E18',
          border: '1px solid rgba(179, 150, 86, 0.25)',
        }}
      >
        {/* Left: photo */}
        <div
          className="cta-contact-photo"
          style={{
            flex: '0 0 38%',
            minHeight: '420px',
            position: 'relative',
            backgroundImage: `url(${jewelryImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(28,24,20,0.15) 0%, rgba(28,24,20,0.55) 100%)',
            }}
          />
        </div>

        {/* Right: details */}
        <div
          className="cta-contact-details"
          style={{
            flex: '1 1 62%',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 200,
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              color: '#FAF8F4',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            Let's Find Your{' '}
            <em style={{ fontStyle: 'italic', color: '#B39656' }}>Perfect Piece</em>
          </h3>

          <div
            className="cta-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            {/* Contact info list */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <Mail size={16} color="#B39656" strokeWidth={1.5} />
                <a
                  href="kanchanjewellersbyadgi@gmail.com"
                  style={{ fontFamily: 'var(--font-secondary)', fontSize: '16px', color: '#FAF8F4', textDecoration: 'none', letterSpacing: '0.02em' }}
                >
                  kanchanjewellersbyadgi@gmail.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <Phone size={16} color="#B39656" strokeWidth={1.5} />
                <a
                  href="tel:+918105104135"
                  style={{ fontFamily: 'var(--font-secondary)', fontSize: '16px', color: '#FAF8F4', textDecoration: 'none', letterSpacing: '0.02em' }}
                >
                  +91 8105104135
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <MapPin size={20} color="#B39656" strokeWidth={1.5} style={{ marginTop: '1px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-secondary)', fontSize: '16px', color: '#FAF8F4', letterSpacing: '0.02em' }}>
                  Subhash Circle, Near, Byadgi road, opposite Manjula Jewellers, Byadagi, Karnataka 581106
                </span>
              </li>
            </ul>

            {/* Divider */}
            <div style={{ background: 'rgba(179, 150, 86, 0.25)', width: '1px' }} />

            {/* Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B39656',
                  margin: 0,
                }}
              >
                Follow Along
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href="https://www.instagram.com/kanchan.bymanjulajewellers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(250, 248, 244, 0.25)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(179, 150, 86, 0.7)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(250, 248, 244, 0.25)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/kanchanjewellerss/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(250, 248, 244, 0.25)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(179, 150, 86, 0.7)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(250, 248, 244, 0.25)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FAF8F4">
                    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.36c-.26-.03-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.75V10.5H8v3h2.65V21h2.85z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/918105104135"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(250, 248, 244, 0.25)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(179, 150, 86, 0.7)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(250, 248, 244, 0.25)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FAF8F4">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11a16.5 16.5 0 0 1-1.63-.6c-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.56-1.17-2.98s.73-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.89 1.05.93 1.94 1.22 2.22 1.36.29.14.46.12.63-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.7-.17 1.38z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .cta-contact-block {
            flex-direction: column;
          }

          .cta-contact-photo {
            flex-basis: auto !important;
            min-height: 240px !important;
          }

          .cta-contact-grid {
            grid-template-columns: 1fr !important;
          }

          .cta-contact-grid > div[style*="width: 1px"] {
            display: none;
          }

          .cta-contact-details li {
            align-items: flex-start !important;
          }

          .cta-contact-details a {
            word-break: break-word !important;
            overflow-wrap: anywhere !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(CTASection)