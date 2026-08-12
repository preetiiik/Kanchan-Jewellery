import { useReveal } from '@/hooks/useReveal'


'use client';
import React, { memo, useRef, useEffect, useState } from 'react';
// next/image removed — using plain img tag


/* ─── product images ─────────────────────────────────────────────────────── */
import necklaceImg from '@/imports/products/brand-story/brand-story-necklaces.jpg'
import earringsImg from '@/imports/products/brand-story/brand-story-earrings.jpg'
import ringsImg from '@/imports/products/brand-story/brand-story-rings.jpg'
import banglesImg from '@/imports/products/brand-story/brand-story-bangles.jpg'
import braceletsImg from '@/imports/products/brand-story/brand-story-bracelets.jpg'
import pendantsImg from '@/imports/products/brand-story/brand-story-pendants.jpg'

/* ─── types ──────────────────────────────────────────────────────────────── */
interface Product {
  image: string
  label: string
}

interface ReelPanel extends Product {
  slot: number
}

interface Pillar {
  label: string
  text: string
}

/* ─── data ───────────────────────────────────────────────────────────────── */
const products: Product[] = [
  { image: necklaceImg, label: 'Necklaces' },
  { image: earringsImg, label: 'Earrings' },
  { image: ringsImg, label: 'Rings' },
  { image: banglesImg, label: 'Bangles' },
  { image: braceletsImg, label: 'Bracelets' },
  { image: pendantsImg, label: 'Pendants' },
]

const pillars: Pillar[] = [
  {
    label: 'Craftsmanship',
    text: 'Every piece is shaped by hand, with techniques passed through generations of artisans.',
  },
  {
    label: 'Design',
    text: 'Contemporary silhouettes rooted in classical Indian forms and proportion.',
  },
  {
    label: 'Integrity',
    text: 'Only ethically sourced gemstones and responsibly refined metals.',
  },
]

/* ─── reel config ────────────────────────────────────────────────────────── */
// One slot per product — packing more than this onto the same orbit crowds
// the front arc with several full-size panels at once and they clip each
// other, since only one can occupy the closest position at a time.
const REEL_SLOTS = products.length
const REEL_DURATION_S = 32 // slow, cinematic pace

const reelPanels: ReelPanel[] = Array.from({ length: REEL_SLOTS }, (_, i) => ({
  ...products[i % products.length],
  slot: i,
}))

/* ─── component ──────────────────────────────────────────────────────────── */
function BrandStory() {
  const leftRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [revealed, setRevealed] = useState(false)

  /* reveal animation for left column */
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      style={{
        background: '#FAF8F4',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
        overflowX: 'clip',
        overflowY: 'visible',
        position: 'relative',
      }}
      className="brand-story-section"
      id="craftsmanship"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          LEFT — CINEMATIC FILM-REEL SHOWCASE
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={wrapperRef}
        className="film-reel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          height: 'clamp(520px, 52vw, 760px)',
          minHeight: '520px',
          overflow: 'hidden',
        }}
      >
        {/* Decorative label — top left */}
        <div
          style={{
            position: 'absolute',
            top: '7%',
            left: '8%',
            zIndex: 10,
            textAlign: 'left',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#B39656',
            }}
          >
            The Kanchan Collection
          </p>
          <div
            style={{
              width: '45px',
              height: '1px',
              background: '#B39656',
              marginTop: '14px',
              marginRight: 'auto',
              opacity: 0.6,
            }}
          />
        </div>

        {/* ── REEL HOUSING — large dark circle, crops left edge ── */}
        <div
          className="reel-housing"
          style={{
            position: 'absolute',
            width: 'clamp(580px, 62vw, 900px)',
            height: 'clamp(580px, 62vw, 900px)',
            borderRadius: '50%',
            left: 'clamp(-340px, -20vw, -160px)',
            top: '50%',
            transform: 'translateY(-50%)',
            background:
              'radial-gradient(circle at 64% 50%, #272118 0%, #1A1610 48%, #0D0B08 100%)',
            boxShadow:
              'inset 0 0 0 1px rgba(179,150,86,0.25), 0 40px 80px rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
        >
          {/* Outer decorative ring */}
          <div
            style={{
              position: 'absolute',
              inset: '5%',
              borderRadius: '50%',
              border: '1px solid rgba(179,150,86,0.14)',
              pointerEvents: 'none',
            }}
          />

          {/* Inner decorative ring */}
          <div
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              border: '1px solid rgba(179,150,86,0.08)',
              pointerEvents: 'none',
            }}
          />

          {/* ── FILM TRACK — panels orbit along elliptical arc ── */}
          <div
            className="film-track"
            style={{ position: 'absolute', inset: 0 }}
          >
            {reelPanels.map((panel, index) => {
              const delay = -((REEL_DURATION_S / REEL_SLOTS) * index)
              return (
                <div
                  key={panel.slot}
                  className={`film-panel${isHovered ? ' reel-paused' : ''}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 'clamp(160px, 16vw, 230px)',
                    height: 'clamp(160px, 16vw, 230px)',
                    animationName: 'filmArcMove',
                    animationDuration: `${REEL_DURATION_S}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDelay: `${delay}s`,
                    animationPlayState: isHovered ? 'paused' : 'running',
                  }}
                >
                  <div className="film-panel-inner">
                    <img
                      src={typeof panel.image === 'string' ? panel.image : (panel.image as any).src}
                      alt={`Kanchan Jewellery ${panel.label}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centre ornament */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: '1px solid rgba(179,150,86,0.5)',
              background: 'rgba(13,11,8,0.6)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '1px solid rgba(179,150,86,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontStyle: 'italic',
                  color: '#B39656',
                  lineHeight: 1,
                }}
              >
                K
              </span>
            </div>
          </div>

          {/* Radial vignette overlay — softens panel edges near housing rim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 50% 50%, transparent 38%, rgba(13,11,8,0.55) 68%, rgba(13,11,8,0.92) 88%)',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          />
        </div>

        {/* Side vertical label */}
        <div
          className="reel-side-label"
          style={{
            position: 'absolute',
            left: '3%',
            bottom: '12%',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#B39656',
            opacity: 0.75,
            zIndex: 10,
          }}
        >
          Timeless Indian Craft
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          RIGHT — EDITORIAL STORY
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="brand-story-copy"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          position: 'relative',
          zIndex: 5,
          minWidth: 0,
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateX(0)' : 'translateX(32px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B39656',
            margin: 0,
          }}
        >
          Our Philosophy
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.95,
            color: '#1C1814',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Crafted With
          <br />
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 200,
              color: '#B39656',
            }}
          >
            Intention
          </em>
        </h2>

        {/* gold divider */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, #B39656, transparent)',
            opacity: 0.7,
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.85,
            color: '#6E6058',
            margin: 0,
            fontWeight: 300,
            maxWidth: '430px',
          }}
        >
          At Kanchan Jewellery, each creation begins as an idea — a form, a
          feeling, a memory waiting to be given shape. We believe jewellery is
          not merely worn; it is carried through life&apos;s most significant
          moments.
        </p>

        {/* Three pillars */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginTop: '0.5rem',
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                paddingLeft: '1.25rem',
                borderLeft: '1px solid rgba(179, 150, 86, 0.4)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B39656',
                  margin: '0 0 5px 0',
                }}
              >
                {pillar.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: '#9A8C7E',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STYLES + KEYFRAMES
      ═══════════════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── CSS custom properties for the arc geometry ── */
        .film-track {
          --arc-rx: 195px;   /* horizontal radius of the elliptical orbit */
          --arc-ry: 260px;   /* vertical radius */
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /*
          filmArcMove: panels travel a full 360° around an elliptical path.
          The housing is on the LEFT side of the layout, so the visible arc
          is the RIGHT edge of the circle — panels appear and are largest at
          translateX(+arc-rx), and hidden/behind at translateX(-arc-rx).
        */
        @keyframes filmArcMove {
          /* θ = 270° — top of ellipse */
          0% {
            transform:
              translate(-50%, -50%)
              translateX(0px)
              translateY(calc(var(--arc-ry) * -1))
              translateZ(-90px)
              rotateX(0deg)
              rotateY(-18deg)
              rotate(-6deg)
              scale(0.72);
            opacity: 0.3;
            filter: brightness(0.5) saturate(0.7);
          }

          /* θ ≈ 315° — upper-right quadrant */
          12.5% {
            transform:
              translate(-50%, -50%)
              translateX(calc(var(--arc-rx) * 0.71))
              translateY(calc(var(--arc-ry) * -0.71))
              translateZ(-30px)
              rotateX(0deg)
              rotateY(-10deg)
              rotate(-4deg)
              scale(0.86);
            opacity: 0.75;
            filter: brightness(0.72) saturate(0.88);
          }

          /* θ = 0° — rightmost (front/closest) */
          25% {
            transform:
              translate(-50%, -50%)
              translateX(var(--arc-rx))
              translateY(0px)
              translateZ(100px)
              rotateX(0deg)
              rotateY(0deg)
              rotate(0deg)
              scale(1.18);
            opacity: 1;
            filter: brightness(1.06) saturate(1);
          }

          /* θ ≈ 45° — lower-right quadrant */
          37.5% {
            transform:
              translate(-50%, -50%)
              translateX(calc(var(--arc-rx) * 0.71))
              translateY(calc(var(--arc-ry) * 0.71))
              translateZ(-30px)
              rotateX(0deg)
              rotateY(10deg)
              rotate(4deg)
              scale(0.86);
            opacity: 0.75;
            filter: brightness(0.72) saturate(0.88);
          }

          /* θ = 90° — bottom of ellipse */
          50% {
            transform:
              translate(-50%, -50%)
              translateX(0px)
              translateY(var(--arc-ry))
              translateZ(-90px)
              rotateX(0deg)
              rotateY(18deg)
              rotate(6deg)
              scale(0.72);
            opacity: 0.3;
            filter: brightness(0.5) saturate(0.7);
          }

          /* θ ≈ 135° — lower-left (behind housing, invisible) */
          62.5% {
            transform:
              translate(-50%, -50%)
              translateX(calc(var(--arc-rx) * -0.71))
              translateY(calc(var(--arc-ry) * 0.71))
              translateZ(-180px)
              rotateX(0deg)
              rotateY(22deg)
              rotate(8deg)
              scale(0.55);
            opacity: 0;
            filter: brightness(0.3) saturate(0.5);
          }

          /* θ = 180° — leftmost (fully behind housing) */
          75% {
            transform:
              translate(-50%, -50%)
              translateX(calc(var(--arc-rx) * -1))
              translateY(0px)
              translateZ(-220px)
              rotateX(0deg)
              rotateY(28deg)
              rotate(0deg)
              scale(0.48);
            opacity: 0;
            filter: brightness(0.25) saturate(0.4);
          }

          /* θ ≈ 225° — upper-left (still behind housing) */
          87.5% {
            transform:
              translate(-50%, -50%)
              translateX(calc(var(--arc-rx) * -0.71))
              translateY(calc(var(--arc-ry) * -0.71))
              translateZ(-180px)
              rotateX(0deg)
              rotateY(22deg)
              rotate(-8deg)
              scale(0.55);
            opacity: 0;
            filter: brightness(0.3) saturate(0.5);
          }

          /* θ = 270° — back to top (loop) */
          100% {
            transform:
              translate(-50%, -50%)
              translateX(0px)
              translateY(calc(var(--arc-ry) * -1))
              translateZ(-90px)
              rotateX(0deg)
              rotateY(-18deg)
              rotate(-6deg)
              scale(0.72);
            opacity: 0.3;
            filter: brightness(0.5) saturate(0.7);
          }
        }

        /* ── Panel inner frame ── */
        .film-panel {
          cursor: default;
        }

        .film-panel-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: #13100C;
          border: 1.5px solid rgba(179,150,86,0.35);
          box-shadow:
            0 18px 44px rgba(0,0,0,0.5),
            0 4px 12px rgba(0,0,0,0.35);
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        .film-panel-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.97) contrast(1.04);
          transition: filter 0.55s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* ── Hover: individual panel ── */
        .film-panel:hover .film-panel-inner {
          transform: scale(1.07);
          border-color: rgba(179,150,86,0.75);
          box-shadow:
            0 26px 56px rgba(0,0,0,0.6),
            0 0 24px rgba(179,150,86,0.2);
        }

        .film-panel:hover .film-panel-inner img {
          filter: brightness(1.05) contrast(1.02);
        }

        /* ── Hover: whole reel slows (handled via React state → animationPlayState) ── */
        .reel-paused {
          animation-play-state: paused !important;
        }

        /* ── Tablet ── */
        @media (max-width: 1100px) {
          .film-reel-wrapper {
            height: 580px !important;
            min-height: 580px !important;
          }

          .film-track {
            --arc-rx: 155px;
            --arc-ry: 214px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .brand-story-section {
            grid-template-columns: 1fr !important;
            padding: clamp(3.5rem, 12vw, 5rem) 1.5rem !important;
          }

          .film-reel-wrapper {
            height: 460px !important;
            min-height: 460px !important;
            margin-top: 0;
            margin-bottom: 2rem;
          }

          .reel-housing {
            width: 520px !important;
            height: 520px !important;
            left: -260px !important;
          }

          .film-track {
            --arc-rx: 120px;
            --arc-ry: 170px;
          }

          .reel-side-label {
            display: none;
          }

          .brand-story-copy {
            text-align: left;
          }
        }

        /* ── Small phones ── */
        @media (max-width: 420px) {
          .film-reel-wrapper {
            height: 380px !important;
            min-height: 380px !important;
          }

          .reel-housing {
            width: 420px !important;
            height: 420px !important;
            left: -220px !important;
          }

          .film-track {
            --arc-rx: 95px;
            --arc-ry: 140px;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .film-panel {
            animation: none !important;
            opacity: 1 !important;
            transform: translate(-50%, -50%) scale(1) !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(BrandStory)