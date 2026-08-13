'use client'

import { memo, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useReveal } from '@/hooks/useReveal'

// 👉 Drop your 3 product videos here with these exact filenames
//    (same folder as your existing hero image import).
import heroVideo1 from '@/imports/products/hero-video-1.mp4'
import heroVideo2 from '@/imports/products/hero-video-2.MP4'
import heroVideo3 from '@/imports/products/hero-video-3.MP4'

const HERO_VIDEOS = [heroVideo1, heroVideo2, heroVideo3]
const SLIDE_DURATION_MS = 6000 // how long each video shows before crossfading

function Hero({
  onImageHover,
  onImageLeave,
}: {
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const ref = useReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_VIDEOS.length)
    }, SLIDE_DURATION_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleExploreClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('collections')
    if (!target) return
    const navbarHeight = 92 // matches Navbar header height
    const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        paddingTop: '72px',
        display: 'grid',
        alignItems: 'stretch',
        minHeight: 'clamp(560px, 92vh, 980px)',
        overflow: 'hidden',
        backgroundColor: '#1C1814', // fallback while video loads
      }}
      onMouseEnter={onImageHover}
      onMouseLeave={onImageLeave}
    >
      {/* Background — cross-fading product videos */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {HERO_VIDEOS.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '35% center',
              opacity: i === activeIndex ? 1 : 0,
              transition: 'opacity 1.4s ease',
            }}
          />
        ))}

        {/* Scrim for text legibility — stronger on the right, fades out to the left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(270deg, rgba(20,17,14,0.82) 0%, rgba(20,17,14,0.55) 42%, rgba(20,17,14,0.15) 70%, rgba(20,17,14,0.05) 100%)',
          }}
        />
      </div>

      {/* Foreground — copy */}
      <div
        ref={ref}
        className="hero-copy"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
          padding: 'clamp(2.5rem, 6vw, 6rem)',
          maxWidth: '640px',
          marginLeft: 'auto',
          alignSelf: 'center',
          textAlign: 'right',
        }}
      >
        <p
          className="hero-in"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C9AD70',
            margin: 0,
            animationDelay: '0.05s',
          }}
        >
          Kanchan Jewellery
        </p>

        <h1
          className="hero-in"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
            lineHeight: 1.02,
            color: '#FAF8F4',
            margin: 0,
            letterSpacing: '-0.01em',
            maxWidth: '620px',
            animationDelay: '0.18s',
          }}
        >
          Jewels Crafted <em style={{ fontStyle: 'italic', color: '#C9AD70' }}>For Generations</em>
        </h1>

        <p
          className="hero-in"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 1.4vw, 15px)',
            lineHeight: 1.85,
            color: '#E4DCD2',
            maxWidth: '470px',
            margin: 0,
            fontWeight: 300,
            animationDelay: '0.32s',
          }}
        >
          Handcrafted gold necklaces, earrings and bangles, rooted in traditional
          temple artistry and made to be passed down.
        </p>

        <div
          className="hero-in hero-cta-row"
          style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', flexWrap: 'wrap', animationDelay: '0.46s', justifyContent: 'flex-end' }}
        >
          <a
            href="#collections"
            onClick={handleExploreClick}
            className="hero-cta"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1C1814',
              background: '#FAF8F4',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#C9AD70'
              el.style.color = '#1C1814'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#FAF8F4'
              el.style.color = '#1C1814'
            }}
          >
            Explore Collections
          </a>
        </div>

        {/* Video progress dots */}
        <div className="hero-dots" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
          {HERO_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show product video ${i + 1}`}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '3px',
                border: 'none',
                background: i === activeIndex ? '#C9AD70' : 'rgba(250,248,244,0.4)',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-in {
          opacity: 0;
          animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (max-width: 767px) {
          .hero-video {
            object-position: center !important;
          }

          .hero-copy {
            margin-left: 0 !important;
            max-width: 100% !important;
            text-align: left !important;
            padding: 1.75rem 1.5rem 2.5rem !important;
            align-items: flex-start !important;
          }

          .hero-cta-row,
          .hero-dots {
            justify-content: flex-start !important;
          }

          .hero-cta {
            width: 100%;
            text-align: center;
            padding: 0.9rem 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .hero-copy {
            padding: 1.5rem 1.25rem 2rem !important;
            gap: 1.25rem !important;
          }

          .hero-section {
            min-height: clamp(480px, 88vh, 720px) !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(Hero)