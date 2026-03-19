import Link from "next/link";
import { BrandPreview } from "@/lib/brand-previews";

export function BrandPreviewPage({ preview }: { preview: BrandPreview }) {
  return (
    <div className={`concept-page ${preview.themeClass}`}>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src={preview.logo} alt={`${preview.name} logo concept`} />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>Match. Care. Thrive.</span>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/demo">Concepts</Link>
            <Link href="/demo/trial">Live demo</Link>
          </div>
        </div>

        <div className={`concept-layout ${preview.layoutVariant}`}>
          <div className="concept-copy">
            <span className="eyebrow">{preview.routeLabel}</span>
            <div className="concept-tagline">{preview.conceptTagline}</div>
            <h1 className="headline">{preview.heroTitle}</h1>
            <p className="subhead">{preview.heroBody}</p>
            <p className="concept-support-line">{preview.supportLine}</p>
            <div className="cta-row">
              <Link className="button" href="/demo/trial">
                {preview.cta}
              </Link>
              <Link className="ghost-button" href="/demo">
                Compare all concepts
              </Link>
            </div>
            <div className="concept-metrics">
              {preview.metrics.map((metric) => (
                <div className="concept-metric" key={metric.label}>
                  <strong>{metric.label}</strong>
                  <span>{metric.detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="concept-visual">{renderVisualPanel(preview)}</div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">Homepage structure</span>
          <h2 className="section-title">How this route would introduce Sploot before the app experience begins.</h2>
          <div className="concept-sections">
            {preview.sections.map((section) => (
              <article className="card tile concept-section-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
          <div className="concept-proof-strip">
            <div className="concept-proof-card">
              <strong>Brand line</strong>
              <p>Match. Care. Thrive.</p>
            </div>
            <div className="concept-proof-card">
              <strong>Support line</strong>
              <p>{preview.supportLine}</p>
            </div>
            <div className="concept-proof-card">
              <strong>Trust signal</strong>
              <p>{preview.trustLine}</p>
            </div>
          </div>
          <div className="cta-row">
            <Link className="button" href="/demo/trial">
              Open the live demo
            </Link>
            <Link className="ghost-button" href="/">
              Back to the public page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function renderVisualPanel(preview: BrandPreview) {
  if (preview.layoutVariant === "editorial") {
    return (
      <div className="card concept-panel editorial-panel">
        <div className="concept-photo tall">
          <img src={preview.image} alt={preview.imageAlt} />
        </div>
        <div className="concept-note">
          <strong>What it feels like</strong>
          <p>Quieter spacing, calmer contrast, and copy that helps mainstream households make a serious decision without panic.</p>
        </div>
        <div className="concept-checklist">
          <span>Expectation coaching</span>
          <span>Household-fit language</span>
          <span>First-time adopter trust</span>
        </div>
      </div>
    );
  }

  if (preview.layoutVariant === "product") {
    return (
      <div className="card concept-panel product-panel">
        <div className="swipe-stack">
          <article className="swipe-card ghost">
            <span className="route-badge">Caveat</span>
            <strong>High energy dog</strong>
            <p>Great fit only if your schedule and training tolerance can support it.</p>
          </article>
          <article className="swipe-card active">
            <img src={preview.image} alt={preview.imageAlt} />
            <div className="swipe-card-copy">
              <div className="chip-row">
                <span className="chip">84 fit</span>
                <span className="chip">high confidence</span>
              </div>
              <strong>Browse with accountability</strong>
              <p>Make the product feel alive without hiding the reasons a match might fail.</p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  if (preview.layoutVariant === "impact") {
    return (
      <div className="card concept-panel impact-panel">
        <div className="impact-head">
          <strong>Designed around preventable mismatch</strong>
          <p>Position Sploot as a serious readiness and support system for shelters and adopters.</p>
        </div>
        <div className="impact-grid">
          <div className="impact-stat">
            <span>Readiness first</span>
            <strong>Screen before shortlist</strong>
          </div>
          <div className="impact-stat">
            <span>Outcome focus</span>
            <strong>Support after adoption</strong>
          </div>
          <div className="impact-stat full">
            <img src={preview.image} alt={preview.imageAlt} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card concept-panel journey-panel">
      <div className="journey-photo">
        <img src={preview.image} alt={preview.imageAlt} />
      </div>
      <div className="journey-steps">
        <div className="journey-step">
          <strong>Match</strong>
          <span>Readiness and household fit come first.</span>
        </div>
        <div className="journey-step">
          <strong>Care</strong>
          <span>Guide the first 30 and 90 days with fewer blind spots.</span>
        </div>
        <div className="journey-step">
          <strong>Thrive</strong>
          <span>Keep the relationship supported as real life changes.</span>
        </div>
      </div>
    </div>
  );
}
