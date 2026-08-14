import { memo } from 'react'
import { useReveal } from '@/hooks/useReveal'
import necklace1 from '@/imports/products/feat-necklace-1.jpg'
import earring1 from '@/imports/products/feat-earring-1.jpg'
import bangle1 from '@/imports/products/coll-bangles-1.jpg'
import necklace2 from '@/imports/products/feat-necklace-2.jpg'
import bridalSet from '@/imports/products/feat-bridal-set.jpg'
import earring2 from '@/imports/products/feat-earring-2.jpg'

const products = [
  {
    id: '01',
    name: 'Temple Necklace',
    category: 'Gold · Necklace',
    img: necklace1,
    alt: 'Ornate gold temple necklace with figurine motifs on red velvet display',
    size: 'large',
  },
  {
    id: '02',
    name: 'Drop Jhumka',
    category: 'Gold · Earring',
    img: earring1,
    alt: 'Single ornate gold drop earring on display stand',
    size: 'small',
  },
  {
    id: '03',
    name: 'Engraved Bangle Set',
    category: 'Gold · Bangle',
    img: bangle1,
    alt: 'Model wearing a stack of engraved gold bangles',
    size: 'large',
  },
  {
    id: '04',
    name: 'Medallion Necklace',
    category: 'Gold · Necklace',
    img: necklace2,
    alt: 'Gold necklace with central medallion pendant on display',
    size: 'small',
  },
  {
    id: '05',
    name: 'Bridal Set',
    category: 'Gold · Full Set',
    img: bridalSet,
    alt: 'Model wearing a complete Kanchan bridal jewellery set',
    size: 'large',
  },
  {
    id: '06',
    name: 'Jhumka Pair',
    category: 'Gold · Earring',
    img: earring2,
    alt: 'Pair of gold jhumka earrings on display stand',
    size: 'small',
  },
]

function FeaturedProducts({
  onImageHover,
  onImageLeave,
}: {
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const headerRef = useReveal()

  return (
    <section
      style={{
        background: '#FAF8F4',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="reveal"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B39656',
              marginBottom: '1rem',
            }}
          >
            Featured Pieces
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#1C1814',
              margin: 0,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Made To Be
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 200 }}>Remembered</em>
          </h2>
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
            paddingBottom: '3px',
            transition: 'color 0.3s ease, border-color 0.3s ease',
            whiteSpace: 'nowrap',
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
          View All Pieces
        </a>
      </div>

      {/* Editorial grid: 3 large + 3 small, alternating */}
      <div
        className="featured-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        {/* Row 1: large, small, large */}
        <ProductCard product={products[0]} tall={true} delay={0} onImageHover={onImageHover} onImageLeave={onImageLeave} />
        <ProductCard product={products[1]} tall={false} delay={0.1} onImageHover={onImageHover} onImageLeave={onImageLeave} />
        <ProductCard product={products[2]} tall={true} delay={0.2} onImageHover={onImageHover} onImageLeave={onImageLeave} />

        {/* Row 2: small, large, small */}
        <ProductCard product={products[3]} tall={false} delay={0.15} onImageHover={onImageHover} onImageLeave={onImageLeave} />
        <ProductCard product={products[4]} tall={true} delay={0.25} onImageHover={onImageHover} onImageLeave={onImageLeave} />
        <ProductCard product={products[5]} tall={false} delay={0.2} onImageHover={onImageHover} onImageLeave={onImageLeave} />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .featured-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProductCard({
  product,
  tall,
  delay,
  onImageHover,
  onImageLeave,
}: {
  product: (typeof products)[number]
  tall: boolean
  delay: number
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const ref = useReveal(0.08)

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}s`, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
    >
      <div
        className="img-zoom"
        onMouseEnter={onImageHover}
        onMouseLeave={onImageLeave}
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: tall ? '4/5' : '1/1',
          backgroundColor: '#E5D5C0',
          borderRadius: '1px',
        }}
      >
        <img
          src={product.img}
          alt={product.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Number overlay */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            letterSpacing: '0.12em',
            color: 'rgba(250, 248, 244, 0.7)',
          }}
        >
          {product.id}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B39656',
              margin: '0 0 3px 0',
            }}
          >
            {product.category}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '18px',
              fontWeight: 500,
              color: '#1C1814',
              margin: 0,
            }}
          >
            {product.name}
          </p>
        </div>
        <a
          href="#CollectionShowcase"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#9A8C7E',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#B39656')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#9A8C7E')}
        >
          View
        </a>
      </div>
    </div>
  )
}

export default memo(FeaturedProducts)