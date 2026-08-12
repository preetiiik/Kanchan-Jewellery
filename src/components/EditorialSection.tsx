import { useReveal } from '@/hooks/useReveal'
import { memo, useEffect, useRef, useState } from 'react'
import editorial1 from '@/imports/products/coll-necklace-1.jpg'
import editorial2 from '@/imports/products/coll-necklace-2.jpg'
import editorial3 from '@/imports/products/coll-necklace-3.jpg'
import editorial4 from '@/imports/products/coll-earrings-1.jpg'
import editorial5 from '@/imports/products/coll-bangles-1.jpg'

const wedgeImages = [
  { src: editorial1, alt: 'Gold choker-style necklace on red velvet display', category: 'necklace' as const },
  { src: editorial4, alt: 'Gold jhumka earrings close up', category: 'earrings' as const },
  { src: editorial2, alt: 'Gold crescent pendant necklace on display stand', category: 'necklace' as const },
  { src: editorial5, alt: 'Gold temple-work bangles stacked', category: 'bangles' as const },
  { src: editorial3, alt: 'Gold beaded necklace close up on red velvet', category: 'necklace' as const },
]

// Left-panel copy per product category — swaps in as the matching
// wedge becomes active on the right.
const categoryContent = {
  necklace: {
    number: '01',
    label: 'Kanchan Collection · 2025',
    titleTop: 'Timeless',
    titleEm: 'Forms',
    description:
      'A curated selection of gold temple-work necklaces — each one an exploration of intricate detail, rich texture, and traditional form. Jewellery as heirloom.',
    linkLabel: 'Explore The Necklace Edit',
  },
  earrings: {
    number: '02',
    label: 'Kanchan Collection · 2025',
    titleTop: 'Ornate',
    titleEm: 'Drops',
    description:
      'Gold jhumka earrings shaped with intricate filigree and traditional temple motifs — statement pieces that catch the light with every turn.',
    linkLabel: 'Explore The Earring Edit',
  },
  bangles: {
    number: '03',
    label: 'Kanchan Collection · 2025',
    titleTop: 'Stacked',
    titleEm: 'Legacy',
    description:
      'Gold temple-work bangles made to be layered and stacked — each band carrying the weight of tradition and the shine of fine craftsmanship.',
    linkLabel: 'Explore The Bangle Edit',
  },
} as const

type Category = keyof typeof categoryContent

// Semicircle "fan" of disc-arc photo segments, radiating from a pivot
// on the left edge — each segment is a ring slice (annulus arc) that
// crops one product photo, upright, never tapering to a point.
const R_OUTER = 480
const R_INNER = 190
const CX = 0
const CY = R_OUTER
const VIEW_HEIGHT = R_OUTER * 2
const WEDGE_COUNT = wedgeImages.length
const SWEEP = 180 / WEDGE_COUNT
const CYCLE_MS = 2400

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

function wedgePath(startAngle: number, endAngle: number) {
  const outerStart = polar(startAngle, R_OUTER)
  const outerEnd = polar(endAngle, R_OUTER)
  const innerStart = polar(startAngle, R_INNER)
  const innerEnd = polar(endAngle, R_INNER)
  return `M ${innerStart.x} ${innerStart.y} L ${outerStart.x} ${outerStart.y} A ${R_OUTER} ${R_OUTER} 0 0 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${R_INNER} ${R_INNER} 0 0 0 ${innerStart.x} ${innerStart.y} Z`
}

// Bounding box of one segment, so its photo scales to fill just that
// segment instead of the whole circle (which zoomed every photo in to
// a tiny sliver of itself).
function wedgeBBox(startAngle: number, endAngle: number) {
  const points = [
    polar(startAngle, R_INNER),
    polar(endAngle, R_INNER),
    polar(startAngle, R_OUTER),
    polar(endAngle, R_OUTER),
    polar((startAngle + endAngle) / 2, R_OUTER),
  ]
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
}

function EditorialSection() {
  const leftRef = useReveal(0.1)
  const rightRef = useReveal(0.1)
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // The left panel shows copy for the active wedge's category, crossfading
  // whenever that category actually changes (not on every wedge, since
  // several wedges share a category).
  const activeCategory: Category = wedgeImages[active].category
  const [displayCategory, setDisplayCategory] = useState<Category>(activeCategory)
  const [contentFading, setContentFading] = useState(false)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (activeCategory === displayCategory) return
    setContentFading(true)
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    fadeTimeoutRef.current = setTimeout(() => {
      setDisplayCategory(activeCategory)
      setContentFading(false)
    }, 200)
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const content = categoryContent[displayCategory]

  // Auto-cycles the colour reveal through each wedge in turn — on touch
  // devices there's no hover to trigger it otherwise. Hovering/tapping a
  // wedge jumps straight to it and the cycle resumes counting from there.
  function startCycle() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % WEDGE_COUNT)
    }, CYCLE_MS)
  }

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion) startCycle()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      style={{
        background: '#0F0D0B',
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(600px, 90vh, 900px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 6vw, 6rem)',
        alignItems: 'center',
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(179, 150, 86, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Thin horizontal lines */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(2.5rem, 5vw, 4rem)',
          left: 'clamp(1.5rem, 6vw, 6rem)',
          right: 'clamp(1.5rem, 6vw, 6rem)',
          height: '1px',
          background: 'rgba(179, 150, 86, 0.25)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 5vw, 4rem)',
          left: 'clamp(1.5rem, 6vw, 6rem)',
          right: 'clamp(1.5rem, 6vw, 6rem)',
          height: '1px',
          background: 'rgba(179, 150, 86, 0.25)',
        }}
      />

      {/* Left — editorial typography */}
      <div
        ref={leftRef}
        className="reveal-left"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          zIndex: 1,
        }}
      >
        {/* Large number */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 14vw, 13rem)',
            fontWeight: 200,
            lineHeight: 0.85,
            color: 'rgba(179, 150, 86, 0.18)',
            margin: 0,
            letterSpacing: '-0.03em',
            userSelect: 'none',
            opacity: contentFading ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {content.number}
        </p>

        <div
          style={{
            borderLeft: '1px solid rgba(179, 150, 86, 0.35)',
            paddingLeft: '1.5rem',
            opacity: contentFading ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B39656',
              marginBottom: '1.25rem',
            }}
          >
            {content.label}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 0.95,
              color: '#FAF8F4',
              margin: '0 0 1.5rem 0',
              letterSpacing: '-0.01em',
            }}
          >
            {content.titleTop}
            <br />
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 200,
                color: '#B39656',
              }}
            >
              {content.titleEm}
            </em>
          </h2>

          {/* Thin gold line */}
          <div
            style={{
              height: '1px',
              width: '60px',
              background: '#B39656',
              marginBottom: '1.5rem',
              opacity: 0.7,
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              lineHeight: 1.9,
              color: 'rgba(250, 248, 244, 0.45)',
              maxWidth: '300px',
              fontWeight: 300,
              margin: '0 0 2rem 0',
              letterSpacing: '0.02em',
            }}
          >
            {content.description}
          </p>

          <a
            href="#CollectionShowcase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B39656',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(179, 150, 86, 0.4)',
              paddingBottom: '4px',
              transition: 'gap 0.3s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.gap = '1.5rem')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.gap = '1rem')
            }
          >
            {content.linkLabel}
            <svg width="18" height="8" viewBox="0 0 20 8" fill="none">
              <line
                x1="0"
                y1="4"
                x2="16"
                y2="4"
                stroke="#B39656"
                strokeWidth="1"
              />
              <polyline
                points="13,1 16,4 13,7"
                fill="none"
                stroke="#B39656"
                strokeWidth="1"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Right — semicircle fan of photo wedges */}
      <div
        ref={rightRef}
        className="reveal-right"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          aspectRatio: `${R_OUTER} / ${VIEW_HEIGHT}`,
          zIndex: 1,
          justifySelf: 'end',
        }}
      >
        <svg
          viewBox={`0 0 ${R_OUTER} ${VIEW_HEIGHT}`}
          width="100%"
          height="100%"
          style={{ display: 'block', overflow: 'hidden' }}
        >
          <defs>
            {wedgeImages.map((_, i) => (
              <clipPath key={i} id={`wedge-clip-${i}`}>
                <path d={wedgePath(-90 + i * SWEEP, -90 + (i + 1) * SWEEP)} />
              </clipPath>
            ))}
          </defs>

          {wedgeImages.map((img, i) => {
            const bbox = wedgeBBox(-90 + i * SWEEP, -90 + (i + 1) * SWEEP)
            return (
              <g
                key={i}
                onPointerEnter={() => {
                  setActive(i)
                  startCycle()
                }}
                style={{ cursor: 'none' }}
              >
                <image
                  href={img.src}
                  aria-label={img.alt}
                  x={bbox.x}
                  y={bbox.y}
                  width={bbox.width}
                  height={bbox.height}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#wedge-clip-${i})`}
                  style={{
                    filter: active === i ? 'grayscale(0.3) contrast(1.05)' : 'grayscale(1) contrast(1.05)',
                    transition: 'filter 0.4s ease',
                  }}
                />
                <path
                  d={wedgePath(-90 + i * SWEEP, -90 + (i + 1) * SWEEP)}
                  fill="none"
                  stroke="#B39656"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Mobile stack */}
      <style>{`
        @media (max-width: 767px) {
          section[style*="0F0D0B"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(EditorialSection)