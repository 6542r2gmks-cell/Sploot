import Link from "next/link";
import { brandPreviews } from "@/lib/brand-previews";

export default function Page() {
  return (
    <>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src="/logo-infinity-corgi.jpg" alt="Sploot concept logo" />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>Compare homepage concepts, then open the live trial app.</span>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/trial">Trial app</Link>
          </div>
        </div>

        <span className="eyebrow">Team review hub</span>
        <h1 className="headline">Four homepage routes. One trial app.</h1>
        <p className="subhead">
          Use this page as the host URL in GitHub Pages, Vercel, or another static deployment.
          Each concept below has its own URL so your team can compare the homepage direction before
          stepping into the interactive Sploot demo.
        </p>
      </section>

      <section className="section">
        <div className="shell">
          <div className="route-grid">
            {brandPreviews.map((preview) => (
              <article className="card tile" key={preview.slug}>
                <img
                  src={preview.logo}
                  alt={`${preview.name} logo preview`}
                  style={{
                    width: "100%",
                    maxWidth: 220,
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(23,56,54,0.12)",
                    padding: 12,
                    marginBottom: 18,
                  }}
                />
                <span className="route-badge">{preview.tagline}</span>
                <h3>{preview.name}</h3>
                <p>{preview.heroBody}</p>
                <div className="cta-row">
                  <Link className="button" href={`/${preview.slug}`}>
                    Open {preview.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="cta-row" style={{ marginTop: 28 }}>
            <Link className="ghost-button" href="/trial">
              Skip to the trial app
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
