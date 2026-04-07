"use client";

import { RiHeartPulseLine, RiTwitterXLine, RiLinkedinBoxLine, RiInstagramLine } from "react-icons/ri";

const FOOTER_COLS = [
  {
    h: "Programs",
    ls: ["Early Intervention", "Family Navigation", "Adult Transition", "Mental Health", "Research"],
  },
  {
    h: "Foundation",
    ls: ["Our Mission", "Our Team", "Annual Reports", "Press", "Careers"],
  },
  {
    h: "Connect",
    ls: ["Contact Us", "Donate", "Volunteer", "Partner With Us", "Newsletter"],
  },
];

const SOCIAL = [
  { Icon: RiTwitterXLine, label: "Twitter / X" },
  { Icon: RiLinkedinBoxLine, label: "LinkedIn" },
  { Icon: RiInstagramLine, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0d1219",
        padding: "5rem 0 2.5rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
      role="contentinfo"
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Top grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
          style={{
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "var(--brand-6)",
                  borderRadius: "var(--r-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RiHeartPulseLine size={16} color="#fff" aria-hidden="true" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Romeo
                <span style={{ color: "var(--brand-6)" }}>.</span>
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.85,
                maxWidth: 240,
                marginBottom: "1.75rem",
              }}
            >
              Supporting autistic individuals and their families through
              compassionate care, community, and advocacy.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "var(--r-sm)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(20,86,240,0.2)";
                    el.style.borderColor = "rgba(20,86,240,0.3)";
                    el.style.color = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.h}>
              <h4
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.64rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "1.25rem",
                }}
              >
                {col.h}
              </h4>
              <ul style={{ listStyle: "none" }}>
                {col.ls.map((l) => (
                  <li key={l} style={{ marginBottom: "0.72rem" }}>
                    <a
                      href={
                        ["Contact Us", "Donate", "Volunteer", "Partner With Us"].includes(l)
                          ? `https://wa.me/233592945680?text=${encodeURIComponent("Hi! I am interested in: " + l)}`
                          : "#"
                      }
                      target={["Contact Us", "Donate", "Volunteer", "Partner With Us"].includes(l) ? "_blank" : undefined}
                      rel={["Contact Us", "Donate", "Volunteer", "Partner With Us"].includes(l) ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.82rem",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.42)",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "rgba(255,255,255,0.88)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "rgba(255,255,255,0.42)")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            © {new Date().getFullYear()} Romeo Foundation. Registered Non-Profit.
            All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use", "Accessibility Statement"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.22)",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.22)")
                  }
                >
                  {l}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
