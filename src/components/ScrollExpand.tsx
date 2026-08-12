import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollExpandProps {
  src: string
  alt?: string
  title?: string
  scrollHint?: string
  useWindowScroll?: boolean
  children?: ReactNode
  startWidth?: number      // % of container width
  startHeight?: number     // % of container height
  startRadius?: number     // px
  endRadius?: number       // px
  mediaZoom?: number       // image scale at start (zooms out to 1 when full)
  scrollDistance?: number  // multiplier of 100vh for outer wrapper height
  holdDistance?: number    // fraction of progress to hold at full before next section
  smoothing?: number       // lerp factor per frame (0.05=slow, 0.2=fast)
  overlayScrim?: number    // final darkness of overlay (0–1)
  enabled?: boolean
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function ScrollExpand({
  src,
  alt = '',
  title,
  scrollHint,
  useWindowScroll: useWin = false,
  children,
  startWidth    = 42,
  startHeight   = 58,
  startRadius   = 20,
  endRadius     = 0,
  mediaZoom     = 1.25,
  scrollDistance = 1.2,
  holdDistance  = 0.3,
  smoothing     = 0.1,
  overlayScrim  = 0.45,
  enabled       = true,
}: ScrollExpandProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const frameRef    = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const scrimRef    = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const hintRef     = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)

  // Smoothed current values
  const cur = useRef({ w: startWidth, h: startHeight, r: startRadius, scrim: 0, content: 0 })
  const rafId = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const getProgress = (): number => {
      const el = wrapperRef.current
      if (!el) return 0
      if (useWin) {
        const rect = el.getBoundingClientRect()
        const scrollable = el.offsetHeight - window.innerHeight
        if (scrollable <= 0) return 0
        return Math.max(0, Math.min(1, -rect.top / scrollable))
      }
      // Container scroll mode — wrapper's parent must have overflow:auto/scroll
      const parent = el.parentElement
      if (!parent) return 0
      const max = parent.scrollHeight - parent.clientHeight
      return max > 0 ? Math.max(0, Math.min(1, parent.scrollTop / max)) : 0
    }

    const tick = () => {
      const raw = getProgress()
      // Compress animation into (1 - holdDistance) of progress so it holds at full
      const p = holdDistance < 1 ? Math.min(1, raw / (1 - holdDistance)) : raw

      const targetW     = lerp(startWidth,  100,          p)
      const targetH     = lerp(startHeight, 100,          p)
      const targetR     = lerp(startRadius, endRadius,    p)
      const targetScrim = overlayScrim * p
      const titleHidden = raw > 0.002
      const targetTitle = titleHidden ? 0 : 1
      const targetCont  = Math.max(0, (p - 0.65) / 0.35)   // fade in last 35% of travel

      const c = cur.current
      c.w       = lerp(c.w,       targetW,     smoothing)
      c.h       = lerp(c.h,       targetH,     smoothing)
      c.r       = lerp(c.r,       targetR,     smoothing)
      c.scrim   = lerp(c.scrim,   targetScrim, smoothing)
      c.content = lerp(c.content, targetCont,  smoothing)

      const imgScale = lerp(mediaZoom, 1, p)

      if (frameRef.current) {
        const f = frameRef.current.style
        f.width        = `${c.w}%`
        f.height       = `${c.h}%`
        f.borderRadius = `${c.r}px`
      }
      if (imgRef.current)
        imgRef.current.style.transform = `scale(${imgScale})`

      if (titleRef.current) {
        titleRef.current.style.opacity = String(targetTitle)
        titleRef.current.style.visibility = titleHidden ? 'hidden' : 'visible'
      }

      if (scrimRef.current)
        scrimRef.current.style.opacity = String(c.scrim)

      if (contentRef.current) {
        const s = contentRef.current.style
        s.opacity  = String(c.content)
        s.transform = `translateY(${(1 - c.content) * 22}px)`
      }
      if (hintRef.current)
        hintRef.current.style.opacity = String(Math.max(0, 1 - p * 4))

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [
    enabled, useWin, startWidth, startHeight, startRadius, endRadius,
    mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim,
  ])

  return (
    /* Outer wrapper — its height creates the scroll runway */
    <div
      ref={wrapperRef}
      style={{ position: 'relative', height: useWin ? `${scrollDistance * 100}vh` : '100%' }}
    >
      {/* Sticky stage */}
      <div style={{
        position: useWin ? 'sticky' : 'relative',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'inherit',
      }}>

        {/* Optional top label */}
        {title && (
          <p 
          ref={titleRef}
          style={{
            position: 'absolute',
            top: '2.2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0,
            fontFamily: 'inherit',
            fontSize: '18px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#B39656',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}>{title}</p>
        )}

        {/* The expanding frame */}
        <div
          ref={frameRef}
          style={{
            position: 'relative',
            width:  `${startWidth}%`,
            height: `${startHeight}%`,
            borderRadius: `${startRadius}px`,
            overflow: 'hidden',
            willChange: 'width, height, border-radius',
          }}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 28%',
              display: 'block',
              transform: `scale(${mediaZoom})`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          />

          {/* Dark/warm overlay for readability */}
          <div
            ref={scrimRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(28,24,20,0.85) 0%, rgba(28,24,20,0.3) 50%, transparent 100%)',
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Children — revealed near end of animation */}
          {children && (
            <div
              ref={contentRef}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                opacity: 0,
                transform: 'translateY(22px)',
                padding: 'clamp(2rem,5vw,4.5rem)',
                pointerEvents: 'none',
                willChange: 'opacity, transform',
              }}
            >
              {children}
            </div>
          )}
        </div>

        {/* Scroll hint */}
        {scrollHint && (
          <p
            ref={hintRef}
            style={{
              position: 'absolute',
              bottom: '2.2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              margin: 0,
              fontFamily: 'inherit',
              fontSize: '17px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(110,96,88,0.6)',
              whiteSpace: 'nowrap',
            }}
          >{scrollHint}</p>
        )}

        {/* Scroll cue arrow */}
        {scrollHint && (
          <div style={{
            position: 'absolute',
            bottom: '3.8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            height: '32px',
            background: 'linear-gradient(180deg, transparent, rgba(179,150,86,0.6))',
          }} />
        )}
      </div>
    </div>
  )
}