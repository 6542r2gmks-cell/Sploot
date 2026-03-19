import Link from "next/link";
import { brandPreviews } from "@/lib/brand-previews";

export function DemoGalleryPage() {
  return (
    <>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src="/logo-infinity-corgi.jpg" alt="Sploot concept logo" />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>Internal review hub for homepage concepts and the working demo.</span>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/">Public landing page</Link>
            <Link href="/demo/trial">Trial app</Link>
          </div>
        </div>

        <span className="eyebrow">Classroom review hub</span>
        <h1 className="headline">Compare the homepage directions, then open the live demo.</h1>
        <p className="subhead">
          This area is for internal review. It lets your team compare homepage concepts without
          treating the design review itself as the public product.
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
                  <Link className="button" href={`/demo/${preview.slug}`}>
                    Open {preview.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="cta-row" style={{ marginTop: 28 }}>
            <Link className="ghost-button" href="/demo/trial">
              Skip to the live trial app
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
