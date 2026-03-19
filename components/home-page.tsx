"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { defaultQuizResponse, dogs as fallbackDogs, researchSignals } from "@/lib/data";
import { assessReadiness, buildMatches } from "@/lib/matching";
import { MatchCandidate, QuizResponse, ReadinessAssessment } from "@/lib/types";

const quizSteps = [
  { label: "Foundation", hint: "Who you are and what your days look like." },
  { label: "Household", hint: "Where the dog will live and who is already there." },
  { label: "Resilience", hint: "Budget, transitions, support, and training tolerance." },
  { label: "Preference", hint: "What you want, and how much that may distort fit." },
];

const readinessTone = {
  ready: { className: "ready", label: "Ready to shortlist" },
  "proceed-with-caveats": { className: "caution", label: "Proceed with caveats" },
  "not-ready-yet": { className: "not-ready", label: "Not ready yet" },
} as const;

export function HomePage({
  mode = "demo",
  initialDogs = fallbackDogs,
}: {
  mode?: "demo" | "full";
  initialDogs?: typeof fallbackDogs;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [quiz, setQuiz] = useState<QuizResponse>(defaultQuizResponse);
  const [assessment, setAssessment] = useState<ReadinessAssessment | null>(null);
  const [matches, setMatches] = useState<MatchCandidate[]>([]);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [reactions, setReactions] = useState<Record<string, "liked" | "passed">>({});
  const [waitlistState, setWaitlistState] = useState({ name: "", email: "", focus: "general" });
  const [waitlistMessage, setWaitlistMessage] = useState("");

  useEffect(() => {
    trackEvent("homepage_cta_click", { surfaced: true });
  }, []);

  useEffect(() => {
    if (stepIndex > 0) {
      trackEvent("quiz_started", { step: stepIndex + 1 });
    }
  }, [stepIndex]);

  useEffect(() => {
    if (assessment?.preparationPlans.length) {
      trackEvent("preparation_plan_viewed", { planCount: assessment.preparationPlans.length });
    }
  }, [assessment]);

  useEffect(() => {
    if (matches[activeMatchIndex]) {
      trackEvent("match_viewed", {
        petId: matches[activeMatchIndex].pet.id,
        score: matches[activeMatchIndex].explanation.score,
      });
      trackEvent("lifecycle_panel_viewed", { petId: matches[activeMatchIndex].pet.id });
    }
  }, [activeMatchIndex, matches]);

  const activeMatch = matches[activeMatchIndex] ?? null;

  function updateField<K extends keyof QuizResponse>(field: K, value: QuizResponse[K]) {
    setQuiz((current) => ({ ...current, [field]: value }));
  }

  function nextStep() {
    const next = Math.min(stepIndex + 1, quizSteps.length - 1);
    setStepIndex(next);
    trackEvent("quiz_step_advanced", { step: next + 1 });
  }

  function previousStep() {
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function handleQuizSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("quiz_completed", { totalFields: Object.keys(quiz).length });
    const nextAssessment = assessReadiness(quiz);
    const nextMatches = buildMatches(quiz, nextAssessment, initialDogs);
    setAssessment(nextAssessment);
    setMatches(nextMatches);
    setActiveMatchIndex(0);
    trackEvent("readiness_scored", {
      status: nextAssessment.status,
      score: nextAssessment.score,
    });
  }

  function reactToMatch(reaction: "liked" | "passed") {
    if (!activeMatch) return;
    setReactions((current) => ({ ...current, [activeMatch.pet.id]: reaction }));
    trackEvent(reaction === "liked" ? "match_liked" : "match_passed", {
      petId: activeMatch.pet.id,
      petName: activeMatch.pet.name,
    });
    setActiveMatchIndex((current) => Math.min(current + 1, matches.length - 1));
  }

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(waitlistState),
    });
    const payload = (await response.json()) as { message?: string; error?: string };
    if (!response.ok) {
      setWaitlistMessage(payload.error ?? "Unable to submit at the moment.");
      return;
    }
    setWaitlistMessage(payload.message ?? "Submitted.");
    trackEvent("waitlist_submitted", { focus: waitlistState.focus });
    setWaitlistState({ name: "", email: "", focus: "general" });
  }

  return (
    <>
      <section className="hero shell">
        <div className="topbar">
          <div className="brand-lockup">
            <img src="/sploot-logo-primary.jpg" alt="Sploot primary logo" />
            <div className="brand-title">
              <strong>Sploot</strong>
              <span>Match. Care. Thrive.</span>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/demo">Concepts</Link>
            <a href="#how-it-works">How it works</a>
            <a href="#quiz">Start demo</a>
            <a href="#waitlist">Early access</a>
          </div>
        </div>

        <div className="grid two-col">
          <div>
            <span className="eyebrow">Research-integrated adoption guidance</span>
            <h1 className="headline">Ready for the right dog, not just the cutest listing.</h1>
            <p className="subhead">
              Sploot is a web-first proof of concept that screens human-side risk,
              curates dog matches with visible fit logic, and stays with owners through
              the first 30, 90, and 365 days after adoption.
            </p>
            <p className="concept-support-line">Find the dog. Learn the relationship.</p>
            <div className="cta-row">
              <a className="button" href="#quiz">Start the readiness quiz</a>
              <a className="ghost-button" href="#waitlist">Get mobile beta access</a>
            </div>
            <div className="metric-strip">
              <div className="metric">
                <strong>Screen</strong>
                <span>Surface expectation gaps, move risk, budget strain, and training tolerance before a dog is chosen.</span>
              </div>
              <div className="metric">
                <strong>Curate</strong>
                <span>Show matches in a swipeable format, but keep each card accountable with reasons and cautions.</span>
              </div>
              <div className="metric">
                <strong>Support</strong>
                <span>Transition from match discovery into decompression, routine, and lifecycle planning immediately.</span>
              </div>
            </div>
          </div>
          <div className="card hero-panel">
            <div className="hero-photo-grid">
              <div className="hero-photo">
                <img src="/amber-doodle.jpg" alt="Small tan dog looking into the camera" />
                <div className="hero-photo-caption">
                  Eye-contact-forward imagery helps people feel connection without letting aesthetics override fit.
                </div>
              </div>
              <div className="grid">
                <div className="hero-photo">
                  <img src="/blue-merle.jpg" alt="Blue merle dog turning toward the camera" />
                  <div className="hero-photo-caption">
                    The product stays human-centered: support, routine, and expectation management matter more than novelty.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="shell">
          <span className="eyebrow">How Sploot Works</span>
          <h2 className="section-title">A homepage and app flow built around fit, not friction.</h2>
          <p className="subhead">
            The concept review and adoption studies point to the same pattern: failed placements usually come from
            expectation gaps, household mismatch, or weak support during the transition window. Sploot puts those
            signals at the center of the journey.
          </p>
          <div className="steps-grid" style={{ marginTop: 28 }}>
            <div className="card tile">
              <h3>1. Screen readiness</h3>
              <p>Score life stability, budget resilience, support system depth, training tolerance, and bias toward appearance-only decisions.</p>
            </div>
            <div className="card tile">
              <h3>2. Curate matches</h3>
              <p>Give every dog card a fit score, confidence level, &quot;why this works,&quot; and &quot;why this may not&quot; summary before the user swipes.</p>
            </div>
            <div className="card tile">
              <h3>3. Support the first months</h3>
              <p>Move directly into decompression, routine building, integration with kids or pets, and long-term care prompts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="quiz">
        <div className="shell">
          <span className="eyebrow">Guided demo</span>
          <h2 className="section-title">See how Sploot screens, curates, and supports.</h2>
          <p className="subhead">
            This version keeps the matching engine transparent. It is not trying to simulate certainty; it is trying to reduce obvious preventable mismatch.
          </p>
          <form className="card quiz-shell" onSubmit={handleQuizSubmit}>
            <div className="quiz-progress">
              {quizSteps.map((step, index) => (
                <div className={`quiz-step-pill ${index === stepIndex ? "active" : ""}`} key={step.label}>
                  <strong>{step.label}</strong>
                </div>
              ))}
            </div>

            {stepIndex === 0 ? (
              <div className="question-grid">
                <div className="field">
                  <label htmlFor="fullName">Your name</label>
                  <input
                    id="fullName"
                    value={quiz.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder="Casey"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={quiz.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="casey@example.com"
                  />
                </div>
                <SelectField
                  label="How flexible is your schedule?"
                  value={quiz.scheduleFlexibility}
                  onChange={(value) => updateField("scheduleFlexibility", value as QuizResponse["scheduleFlexibility"])}
                  options={[
                    ["mostly-home", "Mostly home"],
                    ["hybrid", "Hybrid"],
                    ["office-heavy", "Office-heavy"],
                    ["unpredictable", "Unpredictable"],
                  ]}
                />
                <SelectField
                  label="What energy level describes you best?"
                  value={quiz.activityLevel}
                  onChange={(value) => updateField("activityLevel", value as QuizResponse["activityLevel"])}
                  options={[
                    ["calm", "Calm"],
                    ["balanced", "Balanced"],
                    ["active", "Active"],
                    ["very-active", "Very active"],
                  ]}
                />
              </div>
            ) : null}

            {stepIndex === 1 ? (
              <div className="question-grid">
                <SelectField
                  label="What kind of home will the dog live in?"
                  value={quiz.homeType}
                  onChange={(value) => updateField("homeType", value as QuizResponse["homeType"])}
                  options={[
                    ["house-yard", "House with yard"],
                    ["house-no-yard", "House without yard"],
                    ["apartment", "Apartment"],
                    ["shared-home", "Shared home"],
                  ]}
                />
                <SelectField
                  label="What best describes your household?"
                  value={quiz.householdType}
                  onChange={(value) => updateField("householdType", value as QuizResponse["householdType"])}
                  options={[
                    ["solo", "Solo"],
                    ["couple", "Couple"],
                    ["family-young-kids", "Family with young kids"],
                    ["family-teens", "Family with teens"],
                    ["multi-gen", "Multi-generation"],
                  ]}
                />
                <SelectField
                  label="Do you already have pets?"
                  value={quiz.existingPets}
                  onChange={(value) => updateField("existingPets", value as QuizResponse["existingPets"])}
                  options={[
                    ["none", "No existing pets"],
                    ["dog", "Dog already at home"],
                    ["cat", "Cat already at home"],
                    ["dog-and-cat", "Dog and cat already at home"],
                  ]}
                />
                <SelectField
                  label="How much dog experience do you have?"
                  value={quiz.dogExperience}
                  onChange={(value) => updateField("dogExperience", value as QuizResponse["dogExperience"])}
                  options={[
                    ["first-time", "First-time owner"],
                    ["some", "Some experience"],
                    ["experienced", "Experienced"],
                    ["behavior-savvy", "Behavior-savvy"],
                  ]}
                />
              </div>
            ) : null}

            {stepIndex === 2 ? (
              <div className="question-grid">
                <SelectField
                  label="How would you describe your monthly dog-care budget?"
                  value={quiz.monthlyBudget}
                  onChange={(value) => updateField("monthlyBudget", value as QuizResponse["monthlyBudget"])}
                  options={[
                    ["tight", "Tight"],
                    ["steady", "Steady"],
                    ["comfortable", "Comfortable"],
                    ["high", "High"],
                  ]}
                />
                <SelectField
                  label="How comfortable are you with training or coaching?"
                  value={quiz.trainingComfort}
                  onChange={(value) => updateField("trainingComfort", value as QuizResponse["trainingComfort"])}
                  options={[
                    ["low", "Low"],
                    ["moderate", "Moderate"],
                    ["high", "High"],
                    ["professional-help-ok", "I will use professional help"],
                  ]}
                />
                <SelectField
                  label="How likely are you to move soon?"
                  value={quiz.movingRisk}
                  onChange={(value) => updateField("movingRisk", value as QuizResponse["movingRisk"])}
                  options={[
                    ["very-likely", "Very likely"],
                    ["possible", "Possible"],
                    ["unlikely", "Unlikely"],
                  ]}
                />
                <SelectField
                  label="How stable is your current season of life?"
                  value={quiz.lifeTransitionRisk}
                  onChange={(value) => updateField("lifeTransitionRisk", value as QuizResponse["lifeTransitionRisk"])}
                  options={[
                    ["major", "Major transition underway"],
                    ["moderate", "Some change underway"],
                    ["stable", "Relatively stable"],
                  ]}
                />
                <SelectField
                  label="How much backup support do you have?"
                  value={quiz.supportSystem}
                  onChange={(value) => updateField("supportSystem", value as QuizResponse["supportSystem"])}
                  options={[
                    ["solo", "Almost none"],
                    ["small", "A little"],
                    ["reliable", "Reliable"],
                    ["strong", "Strong"],
                  ]}
                />
              </div>
            ) : null}

            {stepIndex === 3 ? (
              <div className="question-grid">
                <SelectField
                  label="Preferred dog size"
                  value={quiz.dogSizePreference}
                  onChange={(value) => updateField("dogSizePreference", value as QuizResponse["dogSizePreference"])}
                  options={[
                    ["small", "Small"],
                    ["medium", "Medium"],
                    ["large", "Large"],
                    ["open", "Open"],
                  ]}
                />
                <SelectField
                  label="Preferred dog energy"
                  value={quiz.dogEnergyPreference}
                  onChange={(value) => updateField("dogEnergyPreference", value as QuizResponse["dogEnergyPreference"])}
                  options={[
                    ["low", "Low"],
                    ["moderate", "Moderate"],
                    ["high", "High"],
                    ["open", "Open"],
                  ]}
                />
                <SelectField
                  label="How heavily do looks drive your choice?"
                  value={quiz.appearancePriority}
                  onChange={(value) => updateField("appearancePriority", value as QuizResponse["appearancePriority"])}
                  options={[
                    ["low", "Low"],
                    ["medium", "Medium"],
                    ["high", "High"],
                  ]}
                />
                <SelectField
                  label="Which expectation sounds closest to you?"
                  value={quiz.expectationStyle}
                  onChange={(value) => updateField("expectationStyle", value as QuizResponse["expectationStyle"])}
                  options={[
                    ["flexible", "I expect a real adjustment period"],
                    ["hopeful-but-realistic", "I want a good fit but I expect work"],
                    ["want-easy", "I need a relatively easy dog"],
                    ["idealized", "I have a strong image in my head already"],
                  ]}
                />
                <div className="field question-span">
                  <small>
                    Sploot keeps these preference questions lower-weighted than schedule, household fit,
                    budget, and support. That is intentional.
                  </small>
                </div>
              </div>
            ) : null}

            <div className="quiz-actions">
              <div className="cta-row">
                <button className="ghost-button" type="button" onClick={previousStep} disabled={stepIndex === 0}>
                  Back
                </button>
                {stepIndex < quizSteps.length - 1 ? (
                  <button className="button" type="button" onClick={nextStep}>
                    Next section
                  </button>
                ) : (
                  <button className="button" type="submit">
                    Score readiness and curate matches
                  </button>
                )}
              </div>
              <span className="muted">{quizSteps[stepIndex].hint}</span>
            </div>
          </form>

          {assessment ? (
            <div className="grid" style={{ marginTop: 26 }}>
              <div className="card assessment">
                <div className={`assessment-banner ${readinessTone[assessment.status].className}`}>
                  <strong>{readinessTone[assessment.status].label}</strong>
                  <div>{assessment.summary}</div>
                </div>
                <div className="assessment-grid">
                  <div className="stack-list">
                    <h3>Strengths</h3>
                    {assessment.strengths.map((item) => (
                      <div className="stack-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="stack-list">
                    <h3>Risks</h3>
                    {assessment.risks.map((item) => (
                      <div className="stack-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="stack-list">
                    <h3>Preparation plan</h3>
                    {assessment.preparationPlans.length ? (
                      assessment.preparationPlans.map((plan) => (
                        <div className="stack-item" key={plan.title}>
                          <strong>{plan.title}</strong>
                          <ul>
                            {plan.actions.map((action) => (
                              <li key={action}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="stack-item">No extra prep gate triggered. Proceed, but still use the first-30-days support plan.</div>
                    )}
                  </div>
                </div>
              </div>

              {activeMatch ? (
                <div className="match-area">
                  <article className="card match-card">
                    <img src={activeMatch.pet.image} alt={`${activeMatch.pet.name} profile photo`} />
                    <div className="match-content">
                      <div className="match-header">
                        <div>
                          <span className="eyebrow">Current best-fit candidate</span>
                          <h3 className="section-title" style={{ fontSize: "2.2rem", marginBottom: 4 }}>
                            {activeMatch.pet.name}
                          </h3>
                          <div className="muted">
                            {activeMatch.pet.ageBand.replace("-", " ")} | {activeMatch.pet.size} | {activeMatch.pet.energy} energy
                          </div>
                        </div>
                        <div className="score-ring" style={{ ["--score" as string]: activeMatch.explanation.score }}>
                          {activeMatch.explanation.score}
                        </div>
                      </div>

                      <div className="match-meta">
                        <span className="chip">{activeMatch.explanation.confidence} confidence</span>
                        <span className="chip">{activeMatch.pet.trainingLoad} training load</span>
                        <span className="chip">{activeMatch.pet.shelter.integrationType} integration path</span>
                        <span className="chip">
                          saved {Object.values(reactions).filter((reaction) => reaction === "liked").length}
                        </span>
                      </div>

                      <p>{activeMatch.pet.story}</p>

                      <div className="grid">
                        <div className="stack-item">
                          <strong>Why this works</strong>
                          <ul>
                            {activeMatch.explanation.reasons.map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="stack-item">
                          <strong>Why this may not work</strong>
                          <ul>
                            {[...activeMatch.explanation.cautions, ...activeMatch.explanation.notForYou].map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="reaction-row">
                        <button className="ghost-button reaction-button" type="button" onClick={() => reactToMatch("passed")}>
                          Pass for now
                        </button>
                        <button className="button reaction-button" type="button" onClick={() => reactToMatch("liked")}>
                          Save this match
                        </button>
                        <a
                          className="ghost-button"
                          href={activeMatch.pet.shelter.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            trackEvent("outbound_shelter_click", {
                              petId: activeMatch.pet.id,
                              shelterId: activeMatch.pet.shelter.id,
                            })
                          }
                        >
                          Visit shelter profile
                        </a>
                      </div>
                    </div>
                  </article>

                  <aside className="card support-panel">
                    <h3>Lifecycle support handoff</h3>
                    <p className="muted">
                      Matching does not end the flow. Sploot immediately shifts into support because the
                      first 30 to 90 days decide whether a fit survives real life.
                    </p>
                    <div className="timeline">
                      <div className="timeline-step">
                        <strong>First 30 days</strong>
                        <ul>
                          {activeMatch.pet.lifecyclePlan.first30Days.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="timeline-step">
                        <strong>First 90 days</strong>
                        <ul>
                          {activeMatch.pet.lifecyclePlan.first90Days.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="timeline-step">
                        <strong>Longer term</strong>
                        <ul>
                          {activeMatch.pet.lifecyclePlan.longerTerm.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </aside>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {mode === "full" ? (
        <section className="section">
          <div className="shell">
            <span className="eyebrow">Research Signals</span>
            <h2 className="section-title">The product decisions this prototype is already honoring.</h2>
            <div className="signal-grid" style={{ marginTop: 28 }}>
              {researchSignals.map((signal) => (
                <div className="card tile" key={signal.title}>
                  <h4>{signal.title}</h4>
                  <p>{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {mode === "full" ? (
        <section className="section">
          <div className="shell">
            <span className="eyebrow">Hybrid shelter path</span>
            <h2 className="section-title">API first where possible, outbound or embedded where necessary.</h2>
            <div className="partners-grid" style={{ marginTop: 28 }}>
              <div className="card tile">
                <h3>Primary path: normalized imports</h3>
                <p>Ingest API-accessible adoptable dog data into Sploot&apos;s own schema for matching, fit explanations, and lifecycle tagging.</p>
              </div>
              <div className="card tile">
                <h3>Secondary path: widget or outbound</h3>
                <p>When direct access is limited, Sploot still curates the shortlist and routes to a shelter widget or profile without losing the readiness context.</p>
              </div>
              <div className="card tile">
                <h3>Partner roadmap: better listings</h3>
                <p>Later shelter tooling can improve profile photos, eye-forward card selection, and expectation-setting copy before adoption ever happens.</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {mode === "full" ? (
        <section className="section" id="agents">
          <div className="shell">
            <span className="eyebrow">Operating system</span>
            <h2 className="section-title">Six working agents keep the product, brand, and analytics aligned.</h2>
            <div className="agent-grid" style={{ marginTop: 28 }}>
              <div className="card tile">
                <h3>Brand Management</h3>
                <p>Owns positioning, visual consistency, taglines, and homepage voice.</p>
              </div>
              <div className="card tile">
                <h3>Software & App Development</h3>
                <p>Owns architecture, delivery sequencing, data shape, and technical quality.</p>
              </div>
              <div className="card tile">
                <h3>Marketing</h3>
                <p>Owns audience targeting, content pillars, channel testing, and conversion funnels.</p>
              </div>
              <div className="card tile">
                <h3>Shelter Partnership</h3>
                <p>Owns integration discovery, outreach, onboarding requirements, and trust narrative.</p>
              </div>
              <div className="card tile">
                <h3>Quiz Pairing Optimization</h3>
                <p>Owns readiness logic, calibration, fit explanations, and expectation-gap design.</p>
              </div>
              <div className="card tile">
                <h3>Analytics</h3>
                <p>Owns funnel instrumentation, readiness-quality reporting, and experiment readouts.</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" id="waitlist">
        <div className="shell">
          <span className="eyebrow">Get the app</span>
          <h2 className="section-title">Join the mobile beta while the trial app proves the flow.</h2>
          <form className="card quiz-shell" onSubmit={submitWaitlist}>
            <div className="waitlist-form">
              <div className="field">
                <label htmlFor="waitlistName">Name</label>
                <input
                  id="waitlistName"
                  value={waitlistState.name}
                  onChange={(event) => setWaitlistState((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Jordan"
                />
              </div>
              <div className="field">
                <label htmlFor="waitlistEmail">Email</label>
                <input
                  id="waitlistEmail"
                  type="email"
                  value={waitlistState.email}
                  onChange={(event) => setWaitlistState((current) => ({ ...current, email: event.target.value }))}
                  placeholder="jordan@example.com"
                />
              </div>
              <div className="field">
                <label htmlFor="waitlistFocus">Focus</label>
                <select
                  id="waitlistFocus"
                  value={waitlistState.focus}
                  onChange={(event) => setWaitlistState((current) => ({ ...current, focus: event.target.value }))}
                >
                  <option value="general">General interest</option>
                  <option value="adopter">Adopter</option>
                  <option value="shelter">Shelter partner</option>
                  <option value="brand">Brand or sponsor</option>
                </select>
              </div>
            </div>
            <div className="cta-row" style={{ marginTop: 18 }}>
              <button className="button" type="submit">Get beta access</button>
              <span className="muted">
                App Store and Google Play delivery are not live yet. This queue captures early download interest.
              </span>
            </div>
            {waitlistMessage ? <div className="waitlist-message">{waitlistMessage}</div> : null}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="shell">
          <div className="card footer-note">
            Sploot is positioned as guidance and coordination, not veterinary or behavioral care delivery. The demo uses mock shelter data until live integrations are connected.
          </div>
        </div>
      </footer>
    </>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
