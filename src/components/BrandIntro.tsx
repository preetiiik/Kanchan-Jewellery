import { useReveal } from '@/hooks/useReveal'
// import brandImage from '@/imports/products/brand-intro-earring.jpg'
import boxImg from '@/imports/products/brand-intro-earring.jpg'
import ScrollExpand from './ScrollExpand.tsx'

export default function BrandIntro() {
  return (
    <>
      <style>{`

        #ka-about {
          font-family: var(--font-body);
        }

        // .ka-content-label {
        //   font-family: var(--font-body);
        //   font-weight: 500;
        //   font-size: 12px;
        //   letter-spacing: 0.34em;
        //   text-transform: uppercase;
        //   color: rgba(179,150,86,0.85);
        //   margin: 0 0 1.4rem;
        // }

        .ka-content-heading {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(3rem, 6vw, 6.5rem);
          line-height: 0.92;
          color: #F0E8DC;
          letter-spacing: -0.03em;
          margin: 0 0 2rem;
          text-align: center;
        }

        .ka-content-heading em {
          font-style: italic;
        }

        .ka-rule {
          width: 36px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(179,150,86,0.7),
            transparent
          );
          margin: 0 auto 1.8rem;
        }

        .ka-content-body {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: clamp(12px, 1.1vw, 16px);
          line-height: 2;
          color: rgba(240,232,220,0.72);
          text-align: center;
          max-width: 38ch;
          margin: 0;
          letter-spacing: 0.01em;
        }

      `}</style>

      <section
        id="BrandIntro"
        style={{
          background: '#F0E8DC',
          scrollMarginTop: '92px',
        }}
      >
        <ScrollExpand
          src={boxImg}
          alt="Kanchan red jewellery box with gold bangle"
          title="The House of Kanchan"
          scrollHint="Scroll to reveal"
          useWindowScroll
          startWidth={42}
          startHeight={58}
          startRadius={18}
          endRadius={0}
          mediaZoom={1.35}
          scrollDistance={1.6}
          holdDistance={0.3}
          smoothing={0.09}
          overlayScrim={0.52}
          enabled
        >
          {/* Content revealed as frame opens */}

          {/* <p className="ka-content-label">
            The House of Kanchan
          </p> */}

          <h2 className="ka-content-heading">
            Our
            <br />
            <em>Story</em>
          </h2>

          <div className="ka-rule" />

          <p className="ka-content-body">
            Kanchan Jewellery is a celebration of timeless Indian craftsmanship —
            where every piece is conceived with intention, shaped with patience,
            and created to be treasured across generations.
          </p>
        </ScrollExpand>
      </section>
    </>
  )
}