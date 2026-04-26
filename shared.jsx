// ─── AYWC Shared Components ─────────────────────────────────────────────────
// Imported by every page. Exports: themes, Nav, Footer, PageHero, SectionLabel,
// CardGrid, useTheme, commonCSS

const { useState, useEffect } = React;

// ─── THEMES ─────────────────────────────────────────────────────────────────
const themes = {
  midnight: {
    name: "Midnight",
    bg: "#F5EFE4", bgAlt: "#EDE5D6", bgCard: "#FDFAF5", bgCardHover: "#F7F0E5",
    border: "rgba(28,20,16,0.10)", text: "#1C1410", textMuted: "#5A4A3A", textDim: "#6A5A4A",
    accent: "#7B2040", accentDim: "rgba(123,32,64,0.08)", accentText: "#FFFFFF",
    accentOnDark: "#E8A0B8", accentHover: "#9B2A52", burgundy: "#7B2040",
    navBg: "rgba(22,40,64,0.97)", navText: "#E8DDD0",
    ornament: "#7B2040", sectionLine: "rgba(123,32,64,0.2)",
    tagBg: "rgba(123,32,64,0.08)", tagText: "#7B2040",
    inputBg: "#FFFFFF", inputBorder: "rgba(28,20,16,0.18)",
    cardShadow: "0 2px 20px rgba(28,20,16,0.06)",
    darkSection: "#162840", darkSectionText: "#E8DDD0", darkSectionMuted: "#A8C4DC",
  },
  dawn: {
    name: "Dawn",
    bg: "#F8F2E8", bgAlt: "#EFE7D8", bgCard: "#FFFFFF", bgCardHover: "#FBF7F0",
    border: "rgba(28,20,16,0.09)", text: "#1C1410", textMuted: "#5A4A3A", textDim: "#6A5A4A",
    accent: "#8B5500", accentDim: "rgba(139,85,0,0.10)", accentText: "#FFFFFF",
    accentOnDark: "#E8C080", accentHover: "#9B6510", burgundy: "#7B2040",
    navBg: "rgba(22,40,64,0.97)", navText: "#E8DDD0",
    ornament: "#8B5500", sectionLine: "rgba(139,85,0,0.25)",
    tagBg: "rgba(139,85,0,0.10)", tagText: "#8B5500",
    inputBg: "#FFFFFF", inputBorder: "rgba(28,20,16,0.18)",
    cardShadow: "0 2px 20px rgba(28,20,16,0.06)",
    darkSection: "#162840", darkSectionText: "#E8DDD0", darkSectionMuted: "#A8C4DC",
  },
  threshold: {
    name: "Threshold",
    bg: "#FAF5EE", bgAlt: "#F0E8D8", bgCard: "#FFFFFF", bgCardHover: "#FAF6EF",
    border: "rgba(28,20,16,0.09)", text: "#1C1410", textMuted: "#5A4A3A", textDim: "#6A5A4A",
    accent: "#7B2040", accentDim: "rgba(123,32,64,0.08)", accentText: "#FFFFFF",
    accentOnDark: "#E8A0B8", accentHover: "#9B2A52", burgundy: "#7B2040",
    navBg: "rgba(22,40,64,0.97)", navText: "#E8DDD0",
    ornament: "#7B2040", sectionLine: "rgba(123,32,64,0.2)",
    tagBg: "rgba(123,32,64,0.08)", tagText: "#7B2040",
    inputBg: "#FFFFFF", inputBorder: "rgba(28,20,16,0.18)",
    cardShadow: "0 2px 20px rgba(28,20,16,0.06)",
    darkSection: "#162840", darkSectionText: "#E8DDD0", darkSectionMuted: "#A8C4DC",
  },
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",        href: "about.html" },
  { label: "News & Events",href: "news.html" },
  { label: "Study Groups", href: "groups.html" },
  { label: "Resources",    href: "resources.html" },
  { label: "Join",         href: "join.html" },
];

function Nav({ t, transparent = false, currentPage = "" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <nav aria-label="Main navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: solid ? t.navBg : "transparent",
      backdropFilter: solid ? "blur(12px)" : "none",
      borderBottom: solid ? `1px solid rgba(232,221,208,0.08)` : "none",
      transition: "background 0.4s, backdrop-filter 0.4s, border 0.4s",
      padding: "0 3rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="index.html" className="on-dark" style={{
          color: t.navText, fontSize: 11, fontWeight: 700, letterSpacing: 4,
          textTransform: "uppercase", opacity: 0.95, display: "inline-flex", alignItems: "center",
        }}>AYWC</a>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {NAV_LINKS.map(l => {
            const active = currentPage === l.href;
            return (
              <a key={l.label} href={l.href} className="on-dark" style={{
                color: t.navText, fontSize: 11, fontWeight: active ? 600 : 500,
                letterSpacing: 2, textTransform: "uppercase",
                opacity: active ? 1 : 0.7,
                borderBottom: active ? `1px solid ${t.accentOnDark}` : "none",
                paddingBottom: active ? 2 : 0,
                transition: "opacity 0.2s",
                display: "inline-flex", alignItems: "center",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = active ? 1 : 0.7}
              >{l.label}</a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ─── PAGE HERO (inner pages) ─────────────────────────────────────────────────
function PageHero({ t, label, title, subtitle, breadcrumb }) {
  return (
    <section aria-label={`${title} hero`} style={{
      background: t.darkSection,
      paddingTop: 128, paddingBottom: "4rem",
      paddingLeft: "3rem", paddingRight: "3rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", alignItems: "center" }}>
              <li><a href="index.html" style={{ color: t.darkSectionMuted, fontSize: "0.78rem", letterSpacing: 1 }}>Home</a></li>
              <li style={{ color: t.darkSectionMuted, fontSize: "0.78rem" }}>/</li>
              <li><span style={{ color: t.darkSectionText, fontSize: "0.78rem", letterSpacing: 1 }}>{title}</span></li>
            </ol>
          </nav>
        )}
        {label && (
          <div style={{ color: t.accentOnDark, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: "0.8rem" }}>{label}</div>
        )}
        <h1 style={{
          fontFamily: "var(--heading-font, 'Jost', sans-serif)",
          fontWeight: "var(--heading-weight, 300)",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          color: t.darkSectionText, lineHeight: 1.1, letterSpacing: "-0.01em",
          maxWidth: 720, marginBottom: subtitle ? "1.2rem" : 0,
        }}>{title}</h1>
        {subtitle && (
          <p style={{ color: t.darkSectionMuted, fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, maxWidth: 600 }}>{subtitle}</p>
        )}
        <div style={{ width: 48, height: 2, background: t.accentOnDark, marginTop: "2rem", opacity: 0.6 }}></div>
      </div>
    </section>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
function SectionLabel({ t, children, onDark = false }) {
  return (
    <div style={{
      color: onDark ? t.accentOnDark : t.accent,
      fontSize: 10, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: "0.8rem",
    }}>{children}</div>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
function SectionHeading({ t, children, id, color }) {
  return (
    <h2 id={id} style={{
      fontFamily: "var(--heading-font, 'Jost', sans-serif)",
      fontWeight: "var(--heading-weight, 300)",
      fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
      color: color || t.text, letterSpacing: "-0.01em", lineHeight: 1.1,
    }}>{children}</h2>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
function Card({ t, children, onClick, href, style = {} }) {
  const base = {
    background: t.bgCard, padding: "2rem",
    transition: "background 0.2s", display: "block", color: "inherit",
    ...style,
  };
  if (href) return (
    <a href={href} style={base}
      onMouseEnter={e => e.currentTarget.style.background = t.bgCardHover}
      onMouseLeave={e => e.currentTarget.style.background = t.bgCard}
    >{children}</a>
  );
  return (
    <div style={base}
      onMouseEnter={e => e.currentTarget.style.background = t.bgCardHover}
      onMouseLeave={e => e.currentTarget.style.background = t.bgCard}
    >{children}</div>
  );
}

// ─── CARD GRID ───────────────────────────────────────────────────────────────
function CardGrid({ t, cols = "repeat(auto-fit, minmax(280px, 1fr))", children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: "1.5px", background: t.border }}>
      {children}
    </div>
  );
}

// ─── ACCENT LINE ─────────────────────────────────────────────────────────────
function AccentLine({ t, onDark = false }) {
  return <div style={{ width: 32, height: 1, background: onDark ? t.accentOnDark : t.accent, marginBottom: "1.5rem", opacity: 0.6 }}></div>;
}

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
function CTAButton({ t, href, children, outline = false, onDark = false }) {
  const [hovered, setHovered] = useState(false);
  const bg = outline ? "transparent" : (hovered ? t.accentHover : t.accent);
  const color = outline
    ? (onDark ? (hovered ? "#fff" : "rgba(232,221,208,0.75)") : (hovered ? t.accent : t.textMuted))
    : t.accentText;
  const border = outline
    ? (onDark ? `1px solid rgba(232,221,208,${hovered ? 0.6 : 0.25})` : `1px solid ${t.border}`)
    : "none";
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center",
      padding: "0.8rem 2rem",
      background: bg, color, border,
      fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
      transition: "background 0.2s, color 0.2s, border-color 0.2s",
      whiteSpace: "nowrap",
    }}
      className={onDark ? "on-dark" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >{children}</a>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer role="contentinfo" style={{
      background: t.darkSection,
      borderTop: "1px solid rgba(232,221,208,0.08)",
      padding: "3rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ color: t.darkSectionText, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: "1rem" }}>AYWC</div>
            <p style={{ color: t.darkSectionMuted, fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300, marginBottom: "1rem" }}>
              Connecting students of the Living Ethics teachings worldwide.
            </p>
            <div style={{ color: t.darkSectionMuted, fontSize: "0.78rem" }}>White Mountain Education Association</div>
          </div>
          <div>
            <div style={{ color: t.darkSectionText, fontSize: "0.78rem", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Learn</div>
            {[["About Agni Yoga", "about.html"], ["The Teachings", "about.html#teachings"], ["Nicholas Roerich", "resources.html#roerich"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <a href={href} className="on-dark" style={{ color: t.darkSectionMuted, fontSize: "0.82rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = t.accentOnDark}
                  onMouseLeave={e => e.target.style.color = t.darkSectionMuted}
                >{label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: t.darkSectionText, fontSize: "0.78rem", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Community</div>
            {[["Study Groups", "groups.html"], ["News & Events", "news.html"], ["Join Us", "join.html"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <a href={href} className="on-dark" style={{ color: t.darkSectionMuted, fontSize: "0.82rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = t.accentOnDark}
                  onMouseLeave={e => e.target.style.color = t.darkSectionMuted}
                >{label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: t.darkSectionText, fontSize: "0.78rem", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>Resources</div>
            {[["All Resources", "resources.html"], ["Agni Yoga Series", "resources.html#texts"], ["Roerich Paintings", "resources.html#gallery"]].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <a href={href} className="on-dark" style={{ color: t.darkSectionMuted, fontSize: "0.82rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = t.accentOnDark}
                  onMouseLeave={e => e.target.style.color = t.darkSectionMuted}
                >{label}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(232,221,208,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ color: "rgba(232,221,208,0.4)", fontSize: "0.75rem" }}>© White Mountain Education Association. All rights reserved.</div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="on-dark" style={{ color: "rgba(232,221,208,0.65)", fontSize: "0.75rem", fontWeight: 400, letterSpacing: 1, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = t.accentOnDark}
                onMouseLeave={e => e.target.style.color = "rgba(232,221,208,0.65)"}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── COMMON CSS ──────────────────────────────────────────────────────────────
const commonCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
  body { font-family: 'Jost', sans-serif; }
  h1, h2, h3, h4 { font-family: var(--heading-font, 'Jost', sans-serif); font-weight: var(--heading-weight, 300); }
  a { text-decoration: none; }
  img { max-width: 100%; display: block; }
  .skip-link { position: absolute; top: -9999px; left: 1rem; background: #162840; color: #E8DDD0; padding: 0.75rem 1.5rem; font-size: 0.9rem; font-weight: 600; z-index: 9999; }
  .skip-link:focus { top: 0; outline: 2px solid #E8DDD0; outline-offset: 2px; }
  :focus-visible { outline: 3px solid #7B2040; outline-offset: 3px; }
  .on-dark:focus-visible { outline: 3px solid #E8DDD0; outline-offset: 3px; }
  input:focus-visible, textarea:focus-visible, select:focus-visible, button:focus-visible { outline: 3px solid #7B2040; outline-offset: 2px; }
  .field { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
  .field label { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  a, button { min-height: 44px; }
`;

// ─── THEME HOOK ──────────────────────────────────────────────────────────────
function useTheme(defaultTheme = "threshold") {
  const stored = (() => { try { return JSON.parse(localStorage.getItem("aywc-theme") || "{}"); } catch { return {}; } })();
  const [themeName, setThemeName] = useState(stored.theme || defaultTheme);
  const [titleFont, setTitleFont] = useState(stored.titleFont || "cinzel");

  useEffect(() => {
    const font = titleFont === "cinzel" ? "'Cinzel', serif" : "'Jost', sans-serif";
    const weight = titleFont === "cinzel" ? "400" : "300";
    document.documentElement.style.setProperty("--heading-font", font);
    document.documentElement.style.setProperty("--heading-weight", weight);
    localStorage.setItem("aywc-theme", JSON.stringify({ theme: themeName, titleFont }));
  }, [themeName, titleFont]);

  return { t: themes[themeName] || themes.threshold, themeName, setThemeName, titleFont, setTitleFont };
}

// Export everything to window for cross-script access
Object.assign(window, {
  aywcThemes: themes,
  Nav, Footer, PageHero, SectionLabel, SectionHeading,
  Card, CardGrid, AccentLine, CTAButton, useTheme, commonCSS,
});
