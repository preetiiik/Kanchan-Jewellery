import { memo } from 'react'
import { useReveal } from '@/hooks/useReveal'

import necklaceImg from '@/imports/products/cat-necklace.jpg'
import earringsImg from '@/imports/products/cat-earrings.jpg'
import banglesImg from '@/imports/products/cat-bangles.jpg'

const categories = [
  {
    name: 'Necklaces',
    label: 'The Heritage',
    img: necklaceImg,
    alt: 'Ornate gold temple-style necklace on display',
  },
  {
    name: 'Earrings',
    label: 'The Statement',
    img: earringsImg,
    alt: 'Pair of gold jhumka earrings on display',
  },
  {
    name: 'Bangles',
    label: 'The Classic',
    img: banglesImg,
    alt: 'Close up of hand-engraved gold bangle',
  },
]

function Categories({
  onImageHover,
  onImageLeave,
}: {
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const ref = useReveal()

  return (
    <section
      id="collections"
      className="categories-section"
      style={{
        background: '#FAF8F4',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        paddingBottom: 0,
      }}
    >
      {/* Section header */}
      <div
        ref={ref}
        className="reveal"
        style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B39656',
            marginBottom: '1.5rem',
          }}
        >
          Collections
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#1C1814',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Three Crafts. One Legacy.
        </h2>
      </div>

      {/* Category grid */}
      <div
        className="categories-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1rem, 2.5vw, 2rem)',
        }}
      >
        {categories.map((cat, i) => (
          <CategoryCard key={cat.name} cat={cat} index={i} onImageHover={onImageHover} onImageLeave={onImageLeave} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .cat-label-row h3 {
            font-size: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  )
}

function CategoryCard({
  cat,
  index,
  onImageHover,
  onImageLeave,
}: {
  cat: (typeof categories)[number]
  index: number
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const ref = useReveal(0.1)

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        transitionDelay: `${index * 0.12}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Image */}
      <div
        className="img-zoom"
        onMouseEnter={onImageHover}
        onMouseLeave={onImageLeave}
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '3/4',
          borderRadius: '2px',
          backgroundColor: '#E5D5C0',
        }}
      >
        <img
          src={cat.img}
          alt={cat.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28, 24, 20, 0.55) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
          className="cat-overlay"
        />
        <style>{`
          .img-zoom:hover .cat-overlay { opacity: 1 !important; }
        `}</style>
      </div>

      {/* Label */}
      <div className="cat-label-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B39656',
              margin: '0 0 4px 0',
            }}
          >
            {cat.label}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-secondary)',
              fontWeight: 300,
              fontSize: '18px',
              color: '#1C1814',
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            {cat.name}
          </h3>
        </div>
        <a
          href="#CollectionShowcase"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#9A8C7E',
            textDecoration: 'none',
            borderBottom: '1px solid #DDD0C0',
            paddingBottom: '2px',
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.color = '#B39656'
            el.style.borderColor = '#B39656'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.color = '#9A8C7E'
            el.style.borderColor = '#DDD0C0'
          }}
        >
          View All
        </a>
      </div>
    </div>
  )
}

export default memo(Categories)