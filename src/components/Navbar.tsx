import { useState, useEffect } from 'react'
import kanchanLogoWhite from '@/imports/kanchan-logo-white.png'
import kanchanLogo from '@/imports/kanchan-logo.png'

const navLinks = ['Collections', 'About', 'Craftsmanship', 'Contact']

const navHrefs: Record<string, string> = {
  Collections: '#collections',
  About: '#about',
  Craftsmanship: '#craftsmanship',
  Contact: '#contact',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the transparent hero header, dark text disappears into the photo —
  // switch to cream text + a soft shadow for contrast; once scrolled onto
  // the solid cream background, go back to dark text with no shadow.
  const textColor = scrolled ? '#1C1814' : '#FAF8F4'
  const textShadow = scrolled ? 'none' : '0 1px 6px rgba(0,0,0,0.45)'

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'clamp(96px, 9vw, 116px)',
          transition: 'background 0.5s ease, box-shadow 0.5s ease',
          background: scrolled ? 'rgba(250, 248, 244, 0.96)' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(179, 150, 86, 0.18)' : 'none',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        {/* Left nav */}
        <nav
          style={{ display: 'flex', gap: '2.5rem', flex: 1 }}
          className="navbar-desktop-nav"
        >
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: textColor,
                textShadow,
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.3s ease, color 0.5s ease, text-shadow 0.5s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Center logo */}
        <div className="navbar-logo" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img
            src={scrolled ? kanchanLogo : kanchanLogoWhite}
            alt="Kanchan Jewellery — Jewels Crafted for Generations"
            style={{
              height: scrolled ? '95px' : '116px',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: scrolled ? 'multiply' : 'normal',
              filter: scrolled
                ? 'none'
                : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              transition: 'height 0.5s ease, filter 0.5s ease',
            }}
          />
        </div>

        {/* Right nav */}
        <nav
          style={{ display: 'flex', gap: '2.5rem', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          className="navbar-desktop-nav"
        >
          {navLinks.slice(2).map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: textColor,
                textShadow,
                textDecoration: 'none',
                opacity: 0.85,
                transition: 'opacity 0.3s ease, color 0.5s ease, text-shadow 0.5s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            >
              {link}
            </a>
          ))}
          {/* <button
            aria-label="Search"
            style={{ background: 'none', border: 'none', padding: '4px', opacity: 0.75, transition: 'opacity 0.3s ease' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" style={{ filter: textShadow === 'none' ? 'none' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))', transition: 'stroke 0.5s ease' }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button> */}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', padding: '8px' }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line
              x1="0" y1={menuOpen ? '8' : '1'} x2="22" y2={menuOpen ? '8' : '1'}
              stroke={menuOpen ? '#1C1814' : textColor} strokeWidth="1.2"
              style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', transformOrigin: '11px 8px', transition: 'transform 0.3s ease, stroke 0.5s ease' }}
            />
            <line
              x1="0" y1="8" x2="22" y2="8"
              stroke={menuOpen ? '#1C1814' : textColor} strokeWidth="1.2"
              style={{ opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s ease, stroke 0.5s ease' }}
            />
            <line
              x1="0" y1={menuOpen ? '8' : '15'} x2="22" y2={menuOpen ? '8' : '15'}
              stroke={menuOpen ? '#1C1814' : textColor} strokeWidth="1.2"
              style={{ transform: menuOpen ? 'rotate(-45deg)' : 'none', transformOrigin: '11px 8px', transition: 'transform 0.3s ease, stroke 0.5s ease' }}
            />
          </svg>
        </button>
      </header>

      {/* Mobile menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#FAF8F4',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={navHrefs[link]}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 300,
              color: '#1C1814',
              textDecoration: 'none',
              letterSpacing: '0.08em',
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Smooth-scroll to sections and keep the fixed header from covering them */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        section[id] {
          scroll-margin-top: 116px;
        }

        /* Header layout: desktop shows both nav columns + centered logo.
           Mobile shows only the centered logo + hamburger. */
        .navbar-hamburger {
          display: none;
        }

        @media (max-width: 767px) {
          .site-header {
            justify-content: space-between !important;
          }
          .navbar-desktop-nav {
            display: none !important;
          }
          .navbar-logo {
            flex: none !important;
            width: auto;
            justify-content: flex-start !important;
          }
          .navbar-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}