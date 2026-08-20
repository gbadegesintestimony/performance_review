import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  Award,
  ShieldCheck,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Zap,
  BarChart3,
  Layers,
  FileText,
  UserCheck,
  User,
} from "lucide-react";
import "../styles/LandingPage.css";

export default function LandingPage({ onGetStarted, onLogin }) {
  const [activeRoleTab, setActiveRoleTab] = useState("ic");
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does the performance review process work?",
      a: "Employees (ICs) fill out their periodic review covering employee info, goals & progress, competencies ratings, growth areas, and self-evaluations. Once submitted, managers are notified to review the submission, assign official ratings, and provide constructive feedback.",
    },
    {
      q: "Can managers and employees communicate within the platform?",
      a: "Yes! Once a manager submits feedback and a rating, the employee receives an in-app notification and can inspect the full evaluation breakdown and acknowledge it.",
    },
    {
      q: "Is role-based security supported?",
      a: "Absolutely. The system features JWT-backed authentication with distinct permissions for Individual Contributors, Senior ICs, and Managers to ensure data confidentiality.",
    },
    {
      q: "What other modules are planned?",
      a: "The platform is expanding into a full workplace ecosystem including Timesheet management, Goal/Task boards, and Expense tracking.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container" id="landing-top">
      {/* Background Ambient Glow Orbs */}
      <div className="landing-ambient-glow" aria-hidden="true">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
        <div className="glow-orb-3"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="landing-navbar" id="main-navigation">
        <div className="nav-content">
          <div className="nav-brand" onClick={() => scrollToSection("landing-top")}>
            <div className="brand-icon">
              <TrendingUp size={22} />
            </div>
            <span className="brand-name">Performance Review</span>
          </div>

          <ul className="nav-links">
            <li>
              <span className="nav-link-item" onClick={() => scrollToSection("features")}>
                Features
              </span>
            </li>
            <li>
              <span className="nav-link-item" onClick={() => scrollToSection("roles")}>
                Role Workflows
              </span>
            </li>
            <li>
              <span className="nav-link-item" onClick={() => scrollToSection("workflow")}>
                How It Works
              </span>
            </li>
            <li>
              <span className="nav-link-item" onClick={() => scrollToSection("faq")}>
                FAQ
              </span>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              id="nav-login-btn"
              className="btn-nav-login"
              onClick={onLogin}
            >
              Sign In
            </button>
            <button
              id="nav-get-started-btn"
              className="btn-nav-cta"
              onClick={onGetStarted}
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content-col">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <Sparkles size={14} /> Next-Gen Performance Reviews
          </div>

          <h1 className="hero-title">
            Transform Reviews into <span className="hero-title-gradient">Continuous Growth</span> & High Performance
          </h1>

          <p className="hero-description">
            Empower employees with structured self-evaluations and equip managers with actionable feedback tools. Streamline appraisal cycles, align goals, and elevate team productivity effortlessly.
          </p>

          <div className="hero-cta-group">
            <button
              id="hero-primary-cta"
              className="btn-primary-hero"
              onClick={onGetStarted}
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button
              id="hero-secondary-cta"
              className="btn-secondary-hero"
              onClick={onLogin}
            >
              Sign In to Dashboard
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="avatar-stack">
              <div className="avatar-item" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>JD</div>
              <div className="avatar-item" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>SM</div>
              <div className="avatar-item" style={{ background: "linear-gradient(135deg, #ec4899, #f43f5e)" }}>AK</div>
              <div className="avatar-item" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>+</div>
            </div>
            <div>
              <div className="proof-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <div className="proof-text">
                Rated <strong>4.9/5</strong> by agile teams & engineering leads
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="hero-visual-card">
          <div className="mock-card-header">
            <div className="mock-user-info">
              <div className="mock-avatar">AP</div>
              <div>
                <div className="mock-name">Alex Parker</div>
                <div className="mock-role">Senior Software Engineer • Engineering</div>
              </div>
            </div>
            <div className="mock-status-badge">
              ✓ Reviewed
            </div>
          </div>

          <div className="mock-section-title">Key Goals & Milestone Progress</div>
          <div className="mock-goals-list">
            <div className="mock-goal-item">
              <div className="mock-goal-header">
                <span>Migrate Core Auth to JWT Microservice</span>
                <span style={{ color: "#2d9d8e", fontWeight: "700" }}>95%</span>
              </div>
              <div className="mock-progress-bar">
                <div className="mock-progress-fill" style={{ width: "95%" }}></div>
              </div>
            </div>
            <div className="mock-goal-item">
              <div className="mock-goal-header">
                <span>Improve Test Coverage to 90%</span>
                <span style={{ color: "#2d9d8e", fontWeight: "700" }}>85%</span>
              </div>
              <div className="mock-progress-bar">
                <div className="mock-progress-fill" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>

          <div className="mock-manager-feedback-box">
            <div className="mock-feedback-header">
              <div className="mock-feedback-author">
                <ShieldCheck size={16} /> Sarah Jenkins (Engineering Manager)
              </div>
              <div className="mock-rating-badge">
                ★ 4.8 / 5.0
              </div>
            </div>
            <p className="mock-feedback-text">
              "Outstanding leadership during the Q3 infrastructure migration. Excellent architectural rigor and team mentoring."
            </p>
          </div>
        </div>
      </header>

      {/* Metrics Counter Strip */}
      <section className="metrics-strip">
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-number">98%</div>
            <div className="metric-label">Team Goal Alignment</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">10x</div>
            <div className="metric-label">Faster Review Cycles</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">5,000+</div>
            <div className="metric-label">Appraisals Completed</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">4.9/5</div>
            <div className="metric-label">Employee Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="features-section" id="features">
        <div className="section-header-center">
          <div className="section-pill">Feature Suite</div>
          <h2 className="section-main-title">Everything Needed for Meaningful Reviews</h2>
          <p className="section-subtitle">
            Eliminate messy spreadsheets and vague feedback with a purpose-built system designed for modern engineering and product teams.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-indigo">
              <Target size={26} />
            </div>
            <h3 className="feature-title">Goal & OKR Tracking</h3>
            <p className="feature-text">
              Set clear objectives, update live percentage progress, and link accomplishments directly to appraisal periods.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-cyan">
              <BarChart3 size={26} />
            </div>
            <h3 className="feature-title">Competency Scoring Matrix</h3>
            <p className="feature-text">
              Multi-dimensional 1–5 scale scoring across technical expertise, communication, delivery speed, and leadership.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-pink">
              <Award size={26} />
            </div>
            <h3 className="feature-title">Actionable Manager Reviews</h3>
            <p className="feature-text">
              Enable managers to provide quantitative ratings along with detailed, qualitative coaching notes and growth roadmaps.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-emerald">
              <Bell size={26} />
            </div>
            <h3 className="feature-title">Real-Time Notification Hub</h3>
            <p className="feature-text">
              Instant alerts for managers when reviews are submitted and for employees when appraisals are completed and ready.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-amber">
              <ShieldCheck size={26} />
            </div>
            <h3 className="feature-title">Role-Based Security</h3>
            <p className="feature-text">
              Enterprise-grade JWT authentication ensuring that appraisals remain confidential and only accessible by authorized roles.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon-purple">
              <Layers size={26} />
            </div>
            <h3 className="feature-title">Comprehensive Workspace</h3>
            <p className="feature-text">
              Unified design ready for upcoming extensions: Timesheets, Sprint Task Tracking, and Expense Management.
            </p>
          </div>
        </div>
      </section>

      {/* Role-Based Interactive Showcase */}
      <section className="roles-section" id="roles">
        <div className="section-header-center">
          <div className="section-pill">Role Perspectives</div>
          <h2 className="section-main-title">Tailored for Every Team Member</h2>
          <p className="section-subtitle">
            Whether you are self-evaluating your milestones or coaching your team to new heights, the interface adapts to your role.
          </p>
        </div>

        <div className="role-tabs-container">
          <div className="role-toggle-buttons">
            <button
              className={`btn-role-tab ${activeRoleTab === "ic" ? "active" : ""}`}
              onClick={() => setActiveRoleTab("ic")}
            >
              <User size={18} /> Individual Contributor (IC)
            </button>
            <button
              className={`btn-role-tab ${activeRoleTab === "manager" ? "active" : ""}`}
              onClick={() => setActiveRoleTab("manager")}
            >
              <UserCheck size={18} /> Manager / Lead
            </button>
          </div>

          <div className="role-content-grid">
            <div className="role-features-list">
              {activeRoleTab === "ic" ? (
                <>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Guided Self-Evaluation</div>
                      <div className="role-feature-desc">Easily detail your accomplishments, key challenges, learnings, and aspirations.</div>
                    </div>
                  </div>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Competencies Self-Rating</div>
                      <div className="role-feature-desc">Rate your proficiency across role-specific technical and interpersonal criteria.</div>
                    </div>
                  </div>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Review Status Tracking</div>
                      <div className="role-feature-desc">View past performance submissions and read manager feedback once completed.</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Pending Submissions Queue</div>
                      <div className="role-feature-desc">Centralized queue showing all awaiting appraisals with employee details.</div>
                    </div>
                  </div>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Deep-Dive Evaluation Modal</div>
                      <div className="role-feature-desc">Inspect goals, competency self-ratings, and accomplishments side-by-side.</div>
                    </div>
                  </div>
                  <div className="role-feature-item">
                    <div className="role-check-icon"><Check size={14} /></div>
                    <div>
                      <div className="role-feature-heading">Actionable Feedback & Scoring</div>
                      <div className="role-feature-desc">Provide official manager score (1-5) and constructive growth notes.</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="role-preview-box">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#2d9d8e"
                }}></div>
                <strong style={{ fontSize: "1rem", color: "#1a202c" }}>
                  {activeRoleTab === "ic" ? "Employee Appraisal Workflow" : "Manager Evaluation Panel"}
                </strong>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#4a5568", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                {activeRoleTab === "ic"
                  ? "Employees have a streamlined submission flow with interactive goal inputs, competency sliders, and narrative reflection textareas."
                  : "Managers get an organized queue of pending team submissions, quick one-click modal review, and instant grading tools."}
              </p>
              <button
                className="btn-primary-hero"
                style={{ width: "100%", justifyContent: "center", padding: "0.85rem 1.25rem", fontSize: "1rem" }}
                onClick={onGetStarted}
              >
                Experience {activeRoleTab === "ic" ? "Employee" : "Manager"} View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Workflow Section */}
      <section className="workflow-section" id="workflow">
        <div className="section-header-center">
          <div className="section-pill">Workflow</div>
          <h2 className="section-main-title">Simple 3-Step Review Cycle</h2>
          <p className="section-subtitle">
            Say goodbye to disorganized review documents. Our clear pipeline keeps everyone synchronized.
          </p>
        </div>

        <div className="workflow-steps-grid">
          <div className="workflow-card">
            <div className="workflow-step-num">01</div>
            <div className="feature-icon-wrapper feature-icon-indigo">
              <FileText size={24} />
            </div>
            <h3 className="workflow-title">1. Self-Appraisal</h3>
            <p className="workflow-text">
              The employee completes their evaluation by recording achievements, scoring competency metrics, and outlining future goals.
            </p>
          </div>

          <div className="workflow-card">
            <div className="workflow-step-num">02</div>
            <div className="feature-icon-wrapper feature-icon-cyan">
              <Users size={24} />
            </div>
            <h3 className="workflow-title">2. Manager Review</h3>
            <p className="workflow-text">
              The manager inspects the self-evaluation, grades overall performance, and provides actionable coaching feedback.
            </p>
          </div>

          <div className="workflow-card">
            <div className="workflow-step-num">03</div>
            <div className="feature-icon-wrapper feature-icon-emerald">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="workflow-title">3. Growth & Alignment</h3>
            <p className="workflow-text">
              The employee receives notifications, reviews the manager's notes, marks them acknowledged, and sets new career goals.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-header-center">
          <div className="section-pill">Got Questions?</div>
          <h2 className="section-main-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about the platform and review workflows.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <h2 className="cta-banner-title">Ready to Elevate Your Team's Performance?</h2>
          <p className="cta-banner-subtitle">
            Join forward-thinking companies using Performance Review to cultivate growth, accountability, and excellence.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "1.25rem", flexWrap: "wrap" }}>
            <button
              id="cta-bottom-register"
              className="btn-primary-hero"
              onClick={onGetStarted}
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button
              id="cta-bottom-login"
              className="btn-secondary-hero"
              onClick={onLogin}
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="nav-brand" onClick={() => scrollToSection("landing-top")}>
              <div className="brand-icon">
                <TrendingUp size={20} />
              </div>
              <span className="brand-name">Performance Review</span>
            </div>
            <div className="footer-tagline">
              Next-generation performance reviews and team growth platform.
            </div>
          </div>

          <ul className="footer-links">
            <li><span className="footer-link-item" onClick={() => scrollToSection("features")}>Features</span></li>
            <li><span className="footer-link-item" onClick={() => scrollToSection("roles")}>Roles</span></li>
            <li><span className="footer-link-item" onClick={() => scrollToSection("workflow")}>Workflow</span></li>
            <li><span className="footer-link-item" onClick={() => scrollToSection("faq")}>FAQ</span></li>
          </ul>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Performance Review. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
