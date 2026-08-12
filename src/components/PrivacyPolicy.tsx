import { memo } from 'react'

type PrivacyPolicyProps = {
  onClose: () => void
}

const sections = [
  {
    title: '1. Information We Collect',
    body: (
      <>
        <p>We may collect information that you voluntarily provide when you interact with our website, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, shipping address, and other contact details.</li>
          <li><strong>Order Information:</strong> Details about products you purchase, order history, delivery information, and transaction-related details.</li>
          <li><strong>Communication Information:</strong> Information you provide when you contact us through forms, email, phone, or other communication channels.</li>
          <li><strong>Technical Information:</strong> IP address, browser type, device information, operating system, pages visited, and general website usage information.</li>
          <li><strong>Cookies and Similar Technologies:</strong> We may use cookies and similar technologies to improve website functionality and understand how visitors use our website.</li>
        </ul>
        <p>We only collect information that is reasonably necessary for the purposes described in this Privacy Policy.</p>
      </>
    ),
  },
  {
    title: '2. How We Use Your Information',
    body: (
      <>
        <p>Kanchan Jewellery may use your information to:</p>
        <ul>
          <li>Process and fulfil your orders.</li>
          <li>Deliver purchased products and provide order-related updates.</li>
          <li>Respond to your enquiries and requests.</li>
          <li>Provide customer support.</li>
          <li>Improve our website, products, and services.</li>
          <li>Personalise your experience on our website.</li>
          <li>Send promotional communications where permitted and where you have provided the necessary consent.</li>
          <li>Detect, prevent, and address fraudulent or unauthorised activities.</li>
          <li>Comply with applicable legal and regulatory requirements.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Payment Information',
    body: (
      <>
        <p>If you make a purchase through our website, payments may be processed through third-party payment service providers.</p>
        <p>Kanchan Jewellery does not intend to store your complete payment card details on its own servers. Payment information may be collected and processed directly by the relevant payment service provider in accordance with its own privacy and security practices.</p>
      </>
    ),
  },
  {
    title: '4. Cookies',
    body: (
      <>
        <p>Our website may use cookies and similar technologies to improve your browsing experience.</p>
        <p>Cookies may help us:</p>
        <ul>
          <li>Remember your preferences.</li>
          <li>Understand how visitors use our website.</li>
          <li>Improve website performance.</li>
          <li>Provide relevant website functionality.</li>
          <li>Maintain website security.</li>
        </ul>
        <p>You may be able to control or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.</p>
      </>
    ),
  },
  {
    title: '5. Sharing of Information',
    body: (
      <>
        <p>We do not sell or rent your personal information.</p>
        <p>We may share information with trusted third parties when necessary to provide our services, including:</p>
        <ul>
          <li>Payment processing providers.</li>
          <li>Delivery and logistics partners.</li>
          <li>Website hosting and technology service providers.</li>
          <li>Analytics and website-support providers.</li>
          <li>Professional advisers or service providers where reasonably necessary.</li>
          <li>Government authorities or law-enforcement agencies where required by applicable law.</li>
        </ul>
        <p>Such sharing will be limited to what is reasonably necessary for the relevant purpose.</p>
      </>
    ),
  },
  {
    title: '6. WhatsApp Communications',
    body: (
      <>
        <p>Kanchan Jewellery may use the WhatsApp Business Platform to communicate with customers and provide customer support, respond to enquiries, share information related to products or services, and provide updates regarding customer requests or orders.</p>
        <p>When you contact Kanchan Jewellery through WhatsApp, or when you choose to receive communications from us through WhatsApp, we may process information such as your name, phone number, WhatsApp messages, and other information that you voluntarily provide during the conversation.</p>
        <p>We use this information only for legitimate business purposes, including:</p>
        <ul>
          <li>Responding to customer enquiries and requests.</li>
          <li>Providing customer support.</li>
          <li>Sharing information about products and services requested by you.</li>
          <li>Providing order or service-related updates.</li>
          <li>Maintaining and improving our customer communication services.</li>
        </ul>
        <p>Kanchan Jewellery does not sell your WhatsApp information or use it for purposes unrelated to the services described in this Privacy Policy.</p>
        <p>WhatsApp communications are handled through Meta's WhatsApp services and may be subject to WhatsApp's own terms and privacy practices.</p>
        <p>You may stop receiving non-essential WhatsApp communications from Kanchan Jewellery by contacting us or by following the available opt-out instructions in the relevant communication.</p>
        <p style={{ margin: '1.5rem 0 0.75rem', fontWeight: 500, color: '#1C1814' }}>WhatsApp Data Deletion Requests</p>
        <p>If you would like Kanchan Jewellery to delete personal information associated with your WhatsApp communications, you may submit a deletion request by contacting us at:</p>
        <p style={{ margin: 0 }}>Email: [your email address]</p>
        <p style={{ margin: 0 }}>Subject: WhatsApp Data Deletion Request</p>
        <p>Please provide sufficient information for us to identify the relevant information or communication. We will review and process valid requests in accordance with applicable law and our data-retention requirements.</p>
      </>
    ),
  },
  {
    title: '7. Data Security',
    body: (
      <>
        <p>We take reasonable measures to protect your personal information from unauthorised access, misuse, alteration, disclosure, or loss.</p>
        <p>However, no method of transmission or electronic storage is completely secure. Therefore, while we take appropriate precautions, we cannot guarantee absolute security of information transmitted through the internet.</p>
      </>
    ),
  },
  {
    title: '8. Data Retention',
    body: (
      <>
        <p>We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, provide our services, maintain business and transaction records, resolve disputes, and comply with applicable legal obligations.</p>
        <p>When information is no longer required, we may delete or securely dispose of it, subject to applicable legal requirements.</p>
      </>
    ),
  },
  {
    title: '9. Your Privacy Rights',
    body: (
      <>
        <p>Depending on applicable law, you may have rights regarding your personal information, including the right to:</p>
        <ul>
          <li>Request information about the personal data we process about you.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>Request deletion of personal information where applicable.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Raise a concern or grievance regarding the processing of your personal information.</li>
        </ul>
        <p>To exercise an applicable privacy right, please contact us using the details provided below.</p>
      </>
    ),
  },
  {
    title: '10. Third-Party Websites',
    body: (
      <>
        <p>Our website may contain links to third-party websites, social media platforms, payment providers, or other external services.</p>
        <p>Kanchan Jewellery is not responsible for the privacy practices, content, or security of third-party websites. We recommend reviewing the privacy policies of those websites before providing them with your personal information.</p>
      </>
    ),
  },
  {
    title: "11. Children's Privacy",
    body: (
      <>
        <p>Our website is not intentionally designed to collect personal information from children.</p>
        <p>If you believe that a child has provided personal information to us without appropriate consent, please contact us so that we can take appropriate steps to address the situation.</p>
      </>
    ),
  },
  {
    title: '12. Changes to This Privacy Policy',
    body: (
      <>
        <p>Kanchan Jewellery may update this Privacy Policy from time to time to reflect changes in our services, website practices, or applicable legal requirements.</p>
        <p>Any updated version will be posted on this page with a revised "Last Updated" date.</p>
        <p>We encourage you to review this page periodically to stay informed about how we protect your information.</p>
      </>
    ),
  },
  {
    title: '13. Contact Us',
    body: (
      <>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us:</p>
        <p style={{ margin: '1.25rem 0 0.25rem', fontWeight: 500 }}>Kanchan Jewellery</p>
        <p style={{ margin: 0 }}>Email: [your email address]</p>
        <p style={{ margin: 0 }}>Phone: [your phone number]</p>
        <p style={{ margin: 0 }}>Address: [your business address]</p>
        <p>We will make reasonable efforts to respond to your privacy-related requests within the applicable time period.</p>
      </>
    ),
  },
]

function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div
      style={{
        background: '#FAF8F4',
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        overflowY: 'auto',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close privacy policy"
        style={{
          position: 'fixed',
          top: 'clamp(20px, 3vw, 32px)',
          right: 'clamp(20px, 5vw, 48px)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          zIndex: 301,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="2" y1="2" x2="20" y2="20" stroke="#1C1814" strokeWidth="1.2" />
          <line x1="20" y1="2" x2="2" y2="20" stroke="#1C1814" strokeWidth="1.2" />
        </svg>
      </button>
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'clamp(100px, 14vw, 140px) clamp(1.5rem, 6vw, 2rem) clamp(4rem, 10vw, 6rem)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#B39656',
              margin: '0 0 0.75rem',
            }}
          >
            Känchan
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              color: '#1C1814',
              letterSpacing: '0.02em',
              margin: '0 0 0.75rem',
            }}
          >
            Privacy Policy
          </h1>
        </div>

        <div style={{ height: '1px', width: '48px', background: 'rgba(179, 150, 86, 0.4)', margin: '0 auto 3rem' }} />

        {/* Intro */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'rgba(28, 24, 20, 0.8)',
            marginBottom: '3rem',
          }}
        >
          At <strong>Kanchan Jewellery</strong>, we respect your privacy and are committed to protecting the
          personal information you share with us. This Privacy Policy explains how we collect, use, store, and
          protect your information when you visit our website, contact us, or use our services.
          <br />
          <br />
          By using the Kanchan Jewellery website, you acknowledge that you have read and understood this Privacy
          Policy.
        </p>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.title} style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
                color: '#1C1814',
                letterSpacing: '0.01em',
                margin: '0 0 1rem',
              }}
            >
              {section.title}
            </h2>
            <div
              className="privacy-body"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(28, 24, 20, 0.7)',
                fontWeight: 300,
              }}
            >
              {section.body}
            </div>
          </section>
        ))}

        <div style={{ height: '1px', background: 'rgba(179, 150, 86, 0.2)', margin: '3rem 0 2rem' }} />

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            letterSpacing: '0.06em',
            color: 'rgba(28, 24, 20, 0.35)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Kanchan Jewellery. All Rights Reserved.
        </p>
      </div>

      <style>{`
        .privacy-body p {
          margin: 0 0 1rem;
        }
        .privacy-body ul {
          margin: 0 0 1rem;
          padding-left: 1.25rem;
        }
        .privacy-body li {
          margin-bottom: 0.5rem;
        }
        .privacy-body strong {
          color: #1C1814;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default memo(PrivacyPolicy)