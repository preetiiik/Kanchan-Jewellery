import { memo, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

// Necklaces (12 images)
import necklace1 from '@/imports/products/coll-necklace-1.jpg'
import necklace2 from '@/imports/products/coll-necklace-2.jpg'
import necklace3 from '@/imports/products/coll-necklace-3.jpg'
import necklace4 from '@/imports/products/coll-necklace-4.jpg'
import necklace5 from '@/imports/products/coll-necklace-5.jpg'
import necklace6 from '@/imports/products/coll-necklace-6.jpg'
import necklace7 from '@/imports/products/coll-necklace-7.jpg'
import necklace8 from '@/imports/products/coll-necklace-8.jpg'
import necklace9 from '@/imports/products/coll-necklace-9 .jpg'
import necklace10 from '@/imports/products/coll-necklace-10 .jpg'
import necklace11 from '@/imports/products/coll-necklace-11 .jpg'
import necklace12 from '@/imports/products/coll-necklace-12.jpg'

// Earrings (4 images)
import earrings1 from '@/imports/products/coll-earrings-1.jpg'
import earrings2 from '@/imports/products/coll-earrings-2.jpg'
import earrings3 from '@/imports/products/coll-earrings-3.jpg'
import earrings4 from '@/imports/products/coll-earrings-4 .jpg'

// Bangles (4 images)
import bangles1 from '@/imports/products/coll-bangles-1.jpg'
import bangles2 from '@/imports/products/coll-bangles-2.jpg'
import bangles3 from '@/imports/products/coll-bangles-3.jpg'
import bangles4 from '@/imports/products/coll-bangles-4.jpg'

const tabs = ['Necklaces', 'Earrings', 'Bangles'] as const
type Tab = (typeof tabs)[number]

const tabData: Record<Tab, { img: string; alt: string; label: string; sub: string }[]> = {
  Necklaces: [
    { img: necklace1, alt: 'Necklace 1', label: 'Necklace 1', sub: 'Necklace Collection' },
    { img: necklace2, alt: 'Necklace 2', label: 'Necklace 2', sub: 'Necklace Collection' },
    { img: necklace3, alt: 'Necklace 3', label: 'Necklace 3', sub: 'Necklace Collection' },
    { img: necklace4, alt: 'Necklace 4', label: 'Necklace 4', sub: 'Necklace Collection' },
    { img: necklace5, alt: 'Necklace 5', label: 'Necklace 5', sub: 'Necklace Collection' },
    { img: necklace6, alt: 'Necklace 6', label: 'Necklace 6', sub: 'Necklace Collection' },
    { img: necklace7, alt: 'Necklace 7', label: 'Necklace 7', sub: 'Necklace Collection' },
    { img: necklace8, alt: 'Necklace 8', label: 'Necklace 8', sub: 'Necklace Collection' },
    { img: necklace9, alt: 'Necklace 9', label: 'Necklace 9', sub: 'Necklace Collection' },
    { img: necklace10, alt: 'Necklace 10', label: 'Necklace 10', sub: 'Necklace Collection' },
    { img: necklace11, alt: 'Necklace 11', label: 'Necklace 11', sub: 'Necklace Collection' },
    { img: necklace12, alt: 'Necklace 12', label: 'Necklace 12', sub: 'Necklace Collection' },
  ],

  Earrings: [
    { img: earrings1, alt: 'Earrings 1', label: 'Earrings 1', sub: 'Earring Collection' },
    { img: earrings2, alt: 'Earrings 2', label: 'Earrings 2', sub: 'Earring Collection' },
    { img: earrings3, alt: 'Earrings 3', label: 'Earrings 3', sub: 'Earring Collection' },
    { img: earrings4, alt: 'Earrings 4', label: 'Earrings 4', sub: 'Earring Collection' },
  ],

  Bangles: [
    { img: bangles1, alt: 'Bangles 1', label: 'Bangles 1', sub: 'Bangle Collection' },
    { img: bangles2, alt: 'Bangles 2', label: 'Bangles 2', sub: 'Bangle Collection' },
    { img: bangles3, alt: 'Bangles 3', label: 'Bangles 3', sub: 'Bangle Collection' },
    { img: bangles4, alt: 'Bangles 4', label: 'Bangles 4', sub: 'Bangle Collection' },
  ],
}

function CollectionShowcase({
  onImageHover,
  onImageLeave,
}: {
  onImageHover: () => void
  onImageLeave: () => void
}) {
  const [activeTab, setActiveTab] = useState<Tab>('Necklaces')
  const [fading, setFading] = useState(false)
  const headerRef = useReveal()

  const handleTab = (tab: Tab) => {
    if (tab === activeTab) return
    setFading(true)
    setTimeout(() => {
      setActiveTab(tab)
      setFading(false)
    }, 280)
  }

  const items = tabData[activeTab]
  const rightImages = items.slice(1, 7)
  const remainingImages = items.slice(7)
  const rows = Math.ceil(rightImages.length / 2)

  return (
    <section
      className="showcase-section"
      // id="collections"
      id="CollectionShowcase"
      style={{
        background: '#F0E8DC',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      {/* Header + tabs */}
      <div
        ref={headerRef}
        className="reveal"
        style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        <div
          className="showcase-header-row"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2.5rem',
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
              Collection Showcase
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: '#1C1814',
                margin: 0,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              Curated With
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 200 }}>Intention</em>
            </h2>
          </div>

          {/* Tabs */}
          <div className="showcase-tabs" style={{ display: 'flex', gap: 0, borderBottom: '1px solid #DDD0C0' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
                className="showcase-tab-btn"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: activeTab === tab ? '#1C1814' : '#9A8C7E',
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  borderBottom:
                    activeTab === tab
                      ? '1px solid #1C1814'
                      : '1px solid transparent',
                  marginBottom: '-1px',
                  cursor: 'none',
                  transition: 'color 0.3s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lead image + up to six images on the right */}
      <div
        className="showcase-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: `repeat(${rows}, auto)`,
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.28s ease',
        }}
      >
        {/* Large image */}
        <div
          className="img-zoom showcase-large-img"
          onMouseEnter={onImageHover}
          onMouseLeave={onImageLeave}
          style={{
            gridRow: `1 / ${rows + 1}`,
            overflow: 'hidden',
            backgroundColor: '#E5D5C0',
            borderRadius: '1px',
          }}
        >
          <img
            src={items[0].img}
            alt={items[0].alt}
            loading="lazy"
            className="showcase-large-img-el"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              // minHeight: rows > 2 ? '720px' : '400px',
            }}
          />
        </div>

        {/* Right-side images */}
        {rightImages.map((item, i) => {
          const isOddFinalImage = rightImages.length % 2 === 1 && i === rightImages.length - 1

          return (
            <div
              key={i}
              className="img-zoom"
              onMouseEnter={onImageHover}
              onMouseLeave={onImageLeave}
              style={{
                overflow: 'hidden',
                backgroundColor: '#E5D5C0',
                borderRadius: '1px',
                gridColumn: isOddFinalImage ? 'span 2' : undefined,
                aspectRatio: isOddFinalImage ? undefined : '4 / 3',
              }}
            >
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            </div>
          )
        })}
      </div>

      {/* Any additional images continue below the lead image. */}
      {remainingImages.length > 0 && (
        <div
          className="showcase-remaining-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.28s ease',
          }}
        >
          {remainingImages.map((item, i) => (
            <div
              key={i}
              className="img-zoom"
              onMouseEnter={onImageHover}
              onMouseLeave={onImageLeave}
              style={{
                overflow: 'hidden',
                backgroundColor: '#E5D5C0',
                borderRadius: '1px',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .showcase-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .showcase-large-img {
            grid-row: auto !important;
            grid-column: 1 / -1 !important;
          }

          .showcase-large-img-el {
            min-height: 320px !important;
          }

          .showcase-remaining-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .showcase-header-row {
            gap: 1.5rem !important;
          }

          .showcase-tabs {
            width: 100%;
          }

          .showcase-tab-btn {
            padding: 0.5rem 1rem !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
          }

          .showcase-large-img-el {
            min-height: 280px !important;
          }

          .showcase-remaining-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

export default memo(CollectionShowcase)
