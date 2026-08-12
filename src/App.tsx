import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandIntro from '@/components/BrandIntro'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import EditorialSection from '@/components/EditorialSection'
import CollectionShowcase from '@/components/CollectionShowcase'
import BrandStory from '@/components/BrandStory'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function App() {
  const [isHovering, setIsHovering] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Cursor dot/ring are driven entirely outside React state — mousemove can
  // fire hundreds of times a second, and routing that through setState was
  // re-rendering the whole app (every section, including the hero videos)
  // on every pixel of mouse movement. Positions are written straight to the
  // DOM via refs, and the ring's follow loop is a single persistent RAF that
  // never gets torn down, unlike before where it restarted on every
  // mousemove and could get cancelled before it ever ran.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      dotRef.current?.style.setProperty(
        'transform',
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let rafId: number
    const animate = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      ringRef.current?.style.setProperty(
        'transform',
        `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      )
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const handleImageHover = useCallback(() => setIsHovering(true), [])
  const handleImageLeave = useCallback(() => setIsHovering(false), [])

  return (
    <>
      {/* Custom cursor */}
      <div ref={dotRef} className={`cursor-dot${isHovering ? ' hovering' : ''}`}>
        <span
          className="cursor-label"
          style={{ fontSize: '7px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAF8F4', userSelect: 'none' }}
        >
          View
        </span>
      </div>
      <div ref={ringRef} className={`cursor-ring${isHovering ? ' hovering' : ''}`} />

      {/* Site */}
      <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
        <Navbar />
        <main>
          <Hero onImageHover={handleImageHover} onImageLeave={handleImageLeave} />
          <BrandIntro />
          <Categories onImageHover={handleImageHover} onImageLeave={handleImageLeave} />
          <FeaturedProducts onImageHover={handleImageHover} onImageLeave={handleImageLeave} />
          <EditorialSection />
          <CollectionShowcase onImageHover={handleImageHover} onImageLeave={handleImageLeave} />
          <BrandStory />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
