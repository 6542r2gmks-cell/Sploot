import Link from "next/link";
import { BrandPreview } from "@/lib/brand-previews";

export function BrandPreviewPage({ preview }: { preview: BrandPreview }) {
  return (
    <>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src={preview.logo} alt={`${preview.name} logo concept`} />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>{preview.tagline}</span>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/">Public landing page</Link>
            <Link href="/demo">Demo hub</Link>
            <Link href="/demo/trial">Trial app</Link>
          </div>
        </div>

        <div className="grid two-col">
          <div>
            <span className="eyebrow">{preview.routeLabel}</span>
            <h1 className="headline">{preview.heroTitle}</h1>
            <p className="subhead">{preview.heroBody}</p>
            <div className="cta-row">
              <Link className="button" href="/">
                Get beta access
              </Link>
              <Link className="ghost-button" href="/demo/trial">
                View the live demo
              </Link>
            </div>
            <div className="metric-strip">
              {preview.bullets.map((bullet) => (
                <div className="metric" key={bullet}>
                  <strong>Why</strong>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card hero-panel">
            <div className="grid">
              <div className="hero-photo">
                <img src="/amber-doodle.jpg" alt="Dog looking directly toward the camera" />
                <div className="hero-photo-caption">
                  Dog-eye visibility stays central across all concepts because connection matters before users ever read the copy.
                </div>
              </div>
              <div className="stack-item">
                <strong>Trust signal</strong>
                <p className="muted" style={{ margin: "8px 0 0" }}>
                  {preview.trustLine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">Homepage Structure</span>
          <h2 className="section-title">What this route would show before the app experience begins.</h2>
          <div className="steps-grid" style={{ marginTop: 28 }}>
            <div className="card tile">
              <h3>Hero promise</h3>
              <p>Readiness plus matching, with the brand voice tuned to this concept route.</p>
            </div>
            <div className="card tile">
              <h3>How Sploot works</h3>
              <p>Screen, curate, support. The structure stays constant even when the voice changes.</p>
            </div>
            <div className="card tile">
              <h3>Demo handoff</h3>
              <p>This concept can still be reviewed in class, but the public root should drive beta access first and send demos into the separate namespace.</p>
            </div>
          </div>
          <div className="cta-row">
            <Link className="button" href="/demo/trial">
              Open the trial app
            </Link>
            <Link className="ghost-button" href="/demo">
              Back to demo hub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
