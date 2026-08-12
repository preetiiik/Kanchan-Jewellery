import { memo, useState } from 'react'
import PrivacyPolicy from './PrivacyPolicy'

const navLinks = [
  {
    group: 'Navigate',
    items: [
      { label: 'Collections', href: '#collections' },
      { label: 'About', href: '#brandintro' },
      { label: 'Craftsmanship', href: '#craftsmanship' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    group: 'Collections',
    items: [
      { label: 'Necklaces', href: '#collections' },
      { label: 'Earrings', href: '#collections' },
      { label: 'Bangles', href: '#collections' },
      { label: 'New Arrivals', href: '#collections' },
    ],
  },
  {
    group: 'More',
    items: [
      { label: 'Care Guide', href: '#care-guide' },
      { label: 'Custom Orders', href: '#contact' },
      { label: 'Gift Cards', href: '#contact' },
      { label: 'Store Visit', href: '#contact' },
    ],
  },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/kanchan.bymanjulajewellers/' },
  { label: 'WhatsApp', href: 'https://wa.me/919999999999' },
]

function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <footer
      style={{
        background: '#0F0D0B',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem) 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.5rem',
      }}
    >
      {/* Top: brand + nav */}
      <div
        className="footer-top-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
          flexWrap: 'wrap',
        }}
      >
        {/* Brand */}
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: '#B39656',
                margin: '0 0 4px 0',
                letterSpacing: '0.08em',
              }}
            >
              KÄNCHAN
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(250, 248, 244, 0.35)',
                margin: 0,
              }}
            >
              By Manjula Jewellers
            </p>
          </div>

          <div style={{ height: '1px', width: '40px', background: 'rgba(179, 150, 86, 0.4)' }} />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250, 248, 244, 0.4)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Jewels Crafted
            <br />
            For Generations
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'rgba(250, 248, 244, 0.28)',
              margin: 0,
              maxWidth: '240px',
              fontWeight: 300,
            }}
          >
            Necklaces · Earrings · Bangles
          </p>
        </div>

        {/* Nav columns */}
        {navLinks.map((group) => (
          <div key={group.group} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B39656',
                margin: '0 0 0.5rem 0',
              }}
            >
              {group.group}
            </p>
            {group.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: 'rgba(250, 248, 244, 0.45)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(250, 248, 244, 0.85)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(250, 248, 244, 0.45)')}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(179, 150, 86, 0.15)' }} />

      {/* Bottom */}
      <div
        className="footer-bottom-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'rgba(250, 248, 244, 0.25)',
              margin: 0,
              letterSpacing: '0.06em',
            }}
          >
            © {new Date().getFullYear()} Kanchan Jewellery. All rights reserved.
          </p>
          <span style={{ color: 'rgba(250, 248, 244, 0.15)', fontSize: '16px' }}>|</span>
          <button
            onClick={() => setPrivacyOpen(true)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.06em',
              color: 'rgba(250, 248, 244, 0.25)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#B39656')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(250, 248, 244, 0.25)')}
          >
            Privacy Policy
          </button>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(250, 248, 244, 0.25)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#B39656')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(250, 248, 244, 0.25)')}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand {
            grid-column: 1 / -1 !important;
          }
        }

        @media (max-width: 480px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      {privacyOpen && <PrivacyPolicy onClose={() => setPrivacyOpen(false)} />}
    </footer>
  )
}

export default memo(Footer)