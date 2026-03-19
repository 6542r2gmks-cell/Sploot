"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

export function PublicLandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const primaryCta = useMemo(() => {
    if (typeof navigator === "undefined") {
      return "Get beta access";
    }
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad")) {
      return "Get iPhone beta access";
    }
    if (ua.includes("android")) {
      return "Get Android beta access";
    }
    return "Send me the app";
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        focus: "beta-download",
      }),
    });
    const payload = (await response.json()) as { message?: string; error?: string };
    setMessage(payload.message ?? payload.error ?? "Submitted.");
    if (response.ok) {
      setEmail("");
      setName("");
    }
  }

  return (
    <>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src="/logo-infinity-corgi.jpg" alt="Sploot primary logo" />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>Match. Care. Thrive.</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#beta">Beta access</a>
            <Link href="/demo">See concepts</Link>
          </div>
        </div>

        <div className="grid two-col">
          <div>
            <span className="eyebrow">Dog matching + life cycle assistance</span>
            <h1 className="headline">Match with a dog you can truly keep.</h1>
            <p className="subhead">
              Sploot screens readiness before it recommends dogs, then stays with owners through
              the most fragile part of adoption. Better fits. Clearer expectations. Stronger outcomes.
            </p>
            <p className="concept-support-line">Find the dog. Learn the relationship.</p>
            <div className="cta-row">
              <a className="button" href="#beta">{primaryCta}</a>
              <Link className="ghost-button" href="/demo/trial">
                See how Sploot works
              </Link>
            </div>
            <div className="metric-strip">
              <div className="metric">
                <strong>Match</strong>
                <span>Curated fit instead of endless scrolling through listings.</span>
              </div>
              <div className="metric">
                <strong>Care</strong>
                <span>First-30-day and first-90-day support built into the experience.</span>
              </div>
              <div className="metric">
                <strong>Thrive</strong>
                <span>Lifecycle reminders and support so the match survives real life.</span>
              </div>
            </div>
          </div>
          <div className="card hero-panel">
            <div className="hero-photo-grid">
              <div className="hero-photo">
                <img src="/blue-merle.jpg" alt="Dog looking back at the camera" />
                <div className="hero-photo-caption">
                  Sploot is built to reduce the mismatch that happens when emotion outruns readiness.
                </div>
              </div>
              <div className="grid">
                <div className="stack-item">
                  <strong>What the app does</strong>
                  <ul>
                    <li>Readiness quiz before the match.</li>
                    <li>Curated dogs with reasons and cautions.</li>
                    <li>Lifecycle support after adoption.</li>
                  </ul>
                </div>
                <div className="stack-item">
                  <strong>Launch posture</strong>
                  <p className="muted" style={{ margin: "8px 0 0" }}>
                    The public page stays focused on adoption readiness and beta access. Concept comparison and prototype review live under the separate `/demo` namespace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="shell">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">Screen. Curate. Support.</h2>
          <div className="steps-grid" style={{ marginTop: 28 }}>
            <div className="card tile">
              <h3>Screen readiness</h3>
              <p>Assess routine, budget, household friction, move risk, and expectation gaps before the shortlist ever appears.</p>
            </div>
            <div className="card tile">
              <h3>Curate the shortlist</h3>
              <p>Show dogs in an intuitive browse flow, but keep every recommendation grounded in reasons and caveats.</p>
            </div>
            <div className="card tile">
              <h3>Support the relationship</h3>
              <p>Shift into first-30-day and first-90-day guidance so the match has a real chance to hold.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="beta">
        <div className="shell">
          <span className="eyebrow">Get the app</span>
          <h2 className="section-title">Join the beta list and get the download first.</h2>
          <form className="card quiz-shell" onSubmit={handleSubmit}>
            <div className="waitlist-form">
              <div className="field">
                <label htmlFor="betaName">Name</label>
                <input
                  id="betaName"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Jordan"
                />
              </div>
              <div className="field">
                <label htmlFor="betaEmail">Email</label>
                <input
                  id="betaEmail"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jordan@example.com"
                />
              </div>
              <div className="field">
                <label>Platforms</label>
                <div className="stack-item">
                  iPhone beta, Android beta, and desktop demo access are being staged from one queue.
                </div>
              </div>
            </div>
            <div className="cta-row" style={{ marginTop: 18 }}>
              <button className="button" type="submit">{primaryCta}</button>
              <Link className="ghost-button" href="/demo">
                Review concepts and demo
              </Link>
            </div>
            {message ? <div className="waitlist-message">{message}</div> : null}
          </form>
        </div>
      </section>
    </>
  );
}
