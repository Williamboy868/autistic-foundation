const { useState, useEffect } = React;

/* ═══════════════════════════════════════════════════════════
   LUMINA FOUNDATION — REDESIGNED DESIGN SYSTEM
   Bento Minimalism · Refined Blue Palette · Three-Font System

   FONTS:
   • Headline : "Syne"    — geometric, architectural, confident
   • Body     : "Epilogue"— humanist, readable, warm
   • Alternate: "Lora"    — editorial serif, quotes & pull text

   COLOR SYSTEM (single blue family):
   • Blue 50  #EBF2FF  · 100 #CCDEFF · 200 #99BEFF
   • Blue 400 #4A90E2  · 500 #2970D6 · 600 #1A56BF
   • Blue 800 #0F2E6B  · 900 #091D48  · 950 #050E25
   • Surface #F7F8FC  · Card #FFFFFF  · Ink #1C2035
═══════════════════════════════════════════════════════════ */

const T = {
  color: {
    blue50:  "#EBF2FF",
    blue100: "#CCDEFF",
    blue200: "#99BEFF",
    blue300: "#6699F0",
    blue400: "#4A90E2",
    blue500: "#2970D6",
    blue600: "#1A56BF",
    blue700: "#1244A0",
    blue800: "#0F2E6B",
    blue900: "#091D48",
    blue950: "#050E25",
    surface: "#F7F8FC",
    card:    "#FFFFFF",
    ink:     "#1C2035",
    inkMid:  "#4A5068",
    inkMute: "#8A90A8",
    border:  "#E3E8F4",
    borderStrong: "#C8D4EE",
  },
  font: {
    headline: "'Syne', sans-serif",
    body:     "'Epilogue', sans-serif",
    alt:      "'Lora', Georgia, serif",
  },
  radius: {
    sm: "6px", md: "10px", lg: "16px",
    xl: "20px", "2xl": "28px", "3xl": "36px",
  },
  shadow: {
    card:  "0 1px 3px rgba(9,29,72,0.07), 0 4px 16px rgba(9,29,72,0.06)",
    hover: "0 4px 24px rgba(9,29,72,0.13), 0 1px 4px rgba(9,29,72,0.07)",
    blue:  "0 6px 28px rgba(41,112,214,0.30)",
  },
};

/* ── Global Styles ───────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Epilogue:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Epilogue', system-ui, sans-serif; -webkit-font-smoothing: antialiased; background: #F7F8FC; color: #1C2035; }
    a { text-decoration: none; color: inherit; }
    ::selection { background: #CCDEFF; color: #091D48; }
    :focus-visible { outline: 2px solid #2970D6; outline-offset: 3px; border-radius: 4px; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: #99BEFF; border-radius: 99px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse  { 0%,100%{transform:scale(1);opacity:0.7;} 50%{transform:scale(1.55);opacity:0;} }
    .fu  { animation: fadeUp 0.65s cubic-bezier(.22,.68,0,1.2) forwards; }
    .fi  { animation: fadeIn 0.55s ease forwards; }
    .pr  { animation: pulse 2.2s ease-out infinite; }
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}
  `}</style>
);

/* ── Badge ───────────────────────────────── */
const Badge = ({ children, light = false }) => (
  <span style={{
    display:"inline-flex",alignItems:"center",
    fontFamily:T.font.body, fontSize:"0.675rem", fontWeight:600,
    letterSpacing:"0.09em", textTransform:"uppercase",
    color: light ? T.color.blue300 : T.color.blue600,
    background: light ? "rgba(255,255,255,0.10)" : T.color.blue50,
    border: `1px solid ${light ? "rgba(255,255,255,0.18)" : T.color.blue100}`,
    padding:"0.3rem 0.85rem", borderRadius:"99px",
  }}>{children}</span>
);

/* ── Button ──────────────────────────────── */
const Btn = ({ children, variant="primary", size="md", href, onClick, icon }) => {
  const [h, setH] = useState(false);
  const sz = { sm:{fontSize:"0.775rem",padding:"0.55rem 1.2rem"}, md:{fontSize:"0.875rem",padding:"0.72rem 1.65rem"}, lg:{fontSize:"0.95rem",padding:"0.875rem 2.1rem"} };
  const v = {
    primary:   { background:h?T.color.blue600:T.color.blue500, color:"#fff", border:"none", boxShadow:h?T.shadow.blue:"none" },
    ghost:     { background:h?T.color.blue50:"transparent", color:T.color.blue600, border:`1.5px solid ${h?T.color.blue300:T.color.borderStrong}`, boxShadow:"none" },
    ghostLight:{ background:h?"rgba(255,255,255,0.15)":"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,0.28)", boxShadow:"none" },
  }[variant];
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      display:"inline-flex",alignItems:"center",gap:"0.45rem",
      fontFamily:T.font.body,fontWeight:500,cursor:"pointer",borderRadius:"99px",
      transition:"all 0.2s ease", transform:h?"translateY(-1px)":"none",
      ...sz[size], ...v,
    }}>{children}{icon}</Tag>
  );
};

/* ── Image Placeholder ───────────────────── */
const ImgBox = ({ ratio="16/9", label="Image", style={}, dark=false }) => (
  <div style={{
    aspectRatio:ratio,
    background: dark ? `linear-gradient(135deg,${T.color.blue800},${T.color.blue900})` : `linear-gradient(135deg,${T.color.blue50},${T.color.blue100})`,
    borderRadius:T.radius.lg, display:"flex", flexDirection:"column",
    alignItems:"center", justifyContent:"center", gap:"0.5rem",
    color: dark ? T.color.blue200 : T.color.blue400,
    fontFamily:T.font.body, fontSize:"0.72rem", fontWeight:500,
    border:`1px solid ${dark?"rgba(255,255,255,0.06)":T.color.border}`,
    position:"relative", overflow:"hidden", ...style,
  }} role="img" aria-label={`Placeholder: ${label}`}>
    <div style={{ position:"absolute",inset:0, backgroundImage:`linear-gradient(${dark?"rgba(255,255,255,0.03)":"rgba(41,112,214,0.05)"} 1px,transparent 1px),linear-gradient(90deg,${dark?"rgba(255,255,255,0.03)":"rgba(41,112,214,0.05)"} 1px,transparent 1px)`, backgroundSize:"28px 28px" }} />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{position:"relative",zIndex:1,opacity:0.5}}>
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
    </svg>
    <span style={{position:"relative",zIndex:1,opacity:0.6,textAlign:"center",padding:"0 1rem",lineHeight:1.4}}>{label}</span>
  </div>
);

/* ── Nav ─────────────────────────────────── */
const Nav = ({ scrolled }) => (
  <nav style={{
    position:"fixed",top:0,left:0,right:0,zIndex:100,
    background: scrolled ? "rgba(247,248,252,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: `1px solid ${scrolled ? T.color.border : "transparent"}`,
    transition:"all 0.35s ease",
  }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
      <a href="#" style={{ display:"flex",alignItems:"center",gap:"0.65rem" }}>
        <div style={{ width:34,height:34,background:T.color.blue500,borderRadius:T.radius.md,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.5" fill="white"/><circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.25" strokeDasharray="2 2.5" fill="none"/></svg>
        </div>
        <span style={{ fontFamily:T.font.headline,fontSize:"1rem",fontWeight:700,color:T.color.ink,letterSpacing:"-0.01em" }}>Lumina</span>
      </a>
      <div style={{ display:"flex",alignItems:"center",gap:"2rem" }}>
        {["Mission","Programs","Stories","Research","Get Involved"].map(l=>(
          <a key={l} href="#" style={{ fontFamily:T.font.body,fontSize:"0.82rem",fontWeight:500,color:T.color.inkMid,letterSpacing:"0.01em",transition:"color 0.15s" }}
            onMouseEnter={e=>e.target.style.color=T.color.blue500}
            onMouseLeave={e=>e.target.style.color=T.color.inkMid}>{l}</a>
        ))}
      </div>
      <Btn size="sm">Donate Now</Btn>
    </div>
  </nav>
);

/* ── Hero ─────────────────────────────────── */
const Hero = () => (
  <section style={{ minHeight:"100vh",background:T.color.surface,padding:"7rem 0 5rem",position:"relative",overflow:"hidden" }}>
    <div style={{ position:"absolute",top:"6%",right:"-4%",width:480,height:480,borderRadius:"50%",background:`radial-gradient(circle,${T.color.blue100} 0%,transparent 72%)`,pointerEvents:"none" }} />
    <div style={{ position:"absolute",bottom:"10%",left:"2%",width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${T.color.blue50} 0%,transparent 70%)`,pointerEvents:"none" }} />
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem",alignItems:"stretch" }}>

        {/* Left: main copy */}
        <div style={{ background:T.color.card,borderRadius:T.radius["3xl"],padding:"3rem 3rem 2.5rem",border:`1px solid ${T.color.border}`,boxShadow:T.shadow.card,display:"flex",flexDirection:"column",justifyContent:"space-between",gridRow:"span 2" }}>
          <div>
            <div className="fu" style={{ animationDelay:"0.05s",opacity:0,marginBottom:"2rem" }}><Badge>Lumina Health Foundation</Badge></div>
            <h1 className="fu" style={{ fontFamily:T.font.headline,fontSize:"clamp(2.6rem,4.5vw,4rem)",fontWeight:700,letterSpacing:"-0.03em",lineHeight:1.08,color:T.color.ink,marginBottom:"1.75rem",animationDelay:"0.15s",opacity:0 }}>
              Every mind<br/><span style={{ color:T.color.blue500 }}>shines</span> in<br/>its own way.
            </h1>
            <p className="fu" style={{ fontFamily:T.font.body,fontSize:"1rem",fontWeight:300,color:T.color.inkMid,lineHeight:1.85,maxWidth:420,marginBottom:"2.5rem",animationDelay:"0.3s",opacity:0 }}>
              Supporting autistic individuals and their families through compassionate health care, community, and advocacy — because belonging is a right, not a privilege.
            </p>
            <div className="fu" style={{ display:"flex",gap:"0.75rem",animationDelay:"0.42s",opacity:0 }}>
              <Btn size="lg" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}>Discover Our Mission</Btn>
              <Btn size="lg" variant="ghost">Read Stories</Btn>
            </div>
          </div>
          <div className="fu" style={{ display:"flex",gap:"2rem",paddingTop:"2rem",borderTop:`1px solid ${T.color.border}`,marginTop:"3rem",animationDelay:"0.55s",opacity:0 }}>
            {[["12K+","Families Supported"],["48","Partner Clinics"],["20 yrs","of Service"]].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:T.font.headline,fontSize:"1.6rem",fontWeight:700,color:T.color.blue500,lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:T.font.body,fontSize:"0.7rem",fontWeight:400,color:T.color.inkMute,marginTop:"0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right top: image */}
        <div className="fi" style={{ animationDelay:"0.3s",opacity:0,background:T.color.card,borderRadius:T.radius["3xl"],border:`1px solid ${T.color.border}`,boxShadow:T.shadow.card,overflow:"hidden",position:"relative" }}>
          <ImgBox ratio="16/9" label="Family — joyful connection" style={{ borderRadius:0,border:"none" }} />
          <div style={{ position:"absolute",bottom:16,left:16,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",border:`1px solid ${T.color.border}`,borderRadius:T.radius.xl,padding:"0.7rem 1rem",display:"flex",alignItems:"center",gap:"0.65rem",boxShadow:T.shadow.card }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:T.color.blue500,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0 }}>
              <div className="pr" style={{ position:"absolute",inset:-4,borderRadius:"50%",border:`2px solid ${T.color.blue300}` }} />
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div style={{ fontFamily:T.font.body,fontWeight:600,fontSize:"0.78rem",color:T.color.ink }}>Active Community</div>
              <div style={{ fontFamily:T.font.body,fontSize:"0.67rem",color:T.color.inkMute }}>In 12 cities across Ghana</div>
            </div>
          </div>
        </div>

        {/* Right bottom: pull quote */}
        <div className="fi" style={{ animationDelay:"0.42s",opacity:0,background:T.color.blue900,borderRadius:T.radius["3xl"],padding:"2rem",border:`1px solid ${T.color.blue800}`,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
          <svg width="24" height="20" viewBox="0 0 32 24" fill={T.color.blue300} style={{ opacity:0.4 }}>
            <path d="M0 24V14.4C0 10.88 0.8 7.88 2.4 5.4C4 2.92 6.48 1.08 9.84 0L11.52 2.64C9.04 3.56 7.2 4.88 6 6.6C4.88 8.32 4.32 10.24 4.32 12.36H8.16V24H0ZM20.16 24V14.4C20.16 10.88 20.96 7.88 22.56 5.4C24.16 2.92 26.64 1.08 30 0L31.68 2.64C29.2 3.56 27.36 4.88 26.16 6.6C25.04 8.32 24.48 10.24 24.48 12.36H28.32V24H20.16Z"/>
          </svg>
          <p style={{ fontFamily:T.font.alt,fontStyle:"italic",fontSize:"1.05rem",fontWeight:400,color:"#fff",lineHeight:1.75,margin:"1rem 0" }}>
            Before Lumina, every appointment felt like a battle. Now my son walks in with confidence.
          </p>
          <div>
            <div style={{ fontFamily:T.font.body,fontWeight:600,fontSize:"0.78rem",color:T.color.blue200 }}>Adwoa M.</div>
            <div style={{ fontFamily:T.font.body,fontSize:"0.68rem",color:T.color.blue400 }}>Mother of a 9-year-old, Kumasi</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Mission ─────────────────────────────── */
const Mission = () => (
  <section style={{ padding:"5rem 0",background:"#fff" }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1.5rem" }}>
        <div>
          <Badge>Our Mission</Badge>
          <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,letterSpacing:"-0.03em",color:T.color.ink,marginTop:"1rem",lineHeight:1.1 }}>
            Understanding is the<br/>first form of care.
          </h2>
        </div>
        <p style={{ fontFamily:T.font.body,fontSize:"0.95rem",fontWeight:300,color:T.color.inkMid,lineHeight:1.8,maxWidth:360 }}>
          For too long, autistic individuals navigated a world not built for them. Lumina exists to change that — one family, one program, one breakthrough at a time.
        </p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }}>
        {[
          { lbl:"Safe Health Care",c:T.color.blue500,title:"Sensory-Informed Medical Support",body:"We partner with clinics trained in autism-informed care — where appointments move at your pace and your child is never rushed.",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
          { lbl:"Community",c:T.color.blue600,title:"Families Who Understand",body:"Our peer circles, family camps, and online spaces connect people who truly understand. No explaining needed. Just belonging.",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
          { lbl:"Advocacy",c:T.color.blue700,title:"Fighting for the Right Systems",body:"We lobby for inclusive education, workplace accommodations, and health policies — because individual support alone is never enough.",icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
        ].map(p=>{
          const [h,setH]=useState(false);
          return(
            <div key={p.lbl} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:T.color.card,border:`1px solid ${h?T.color.blue200:T.color.border}`,borderRadius:T.radius["2xl"],padding:"1.75rem",transition:"all 0.22s ease",boxShadow:h?T.shadow.hover:T.shadow.card,transform:h?"translateY(-3px)":"none" }}>
              <div style={{ width:44,height:44,borderRadius:T.radius.lg,background:T.color.blue50,color:p.c,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem" }}>{p.icon}</div>
              <span style={{ fontFamily:T.font.body,fontSize:"0.65rem",fontWeight:600,letterSpacing:"0.09em",textTransform:"uppercase",color:p.c,display:"block",marginBottom:"0.5rem" }}>{p.lbl}</span>
              <h3 style={{ fontFamily:T.font.headline,fontSize:"1.05rem",fontWeight:600,color:T.color.ink,marginBottom:"0.85rem",lineHeight:1.3 }}>{p.title}</h3>
              <p style={{ fontFamily:T.font.body,fontSize:"0.875rem",fontWeight:300,color:T.color.inkMid,lineHeight:1.85 }}>{p.body}</p>
            </div>
          );
        })}

        {/* Alt-text wide quote card */}
        <div style={{ gridColumn:"span 3",background:T.color.blue50,borderRadius:T.radius["2xl"],border:`1px solid ${T.color.blue100}`,padding:"2rem 2.5rem",display:"flex",alignItems:"center",gap:"3rem" }}>
          <p style={{ fontFamily:T.font.alt,fontStyle:"italic",fontSize:"1.25rem",fontWeight:400,color:T.color.blue800,lineHeight:1.7,flex:1 }}>
            "Autism is not a processing error — it's a different operating system. Our work is building a world that runs on both."
          </p>
          <div style={{ flexShrink:0,textAlign:"right" }}>
            <div style={{ fontFamily:T.font.body,fontWeight:600,fontSize:"0.82rem",color:T.color.blue700 }}>Dr. Abena Owusu</div>
            <div style={{ fontFamily:T.font.body,fontSize:"0.72rem",color:T.color.blue500,marginTop:"0.2rem" }}>Founder & Chief Advocate</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Impact ──────────────────────────────── */
const Impact = () => (
  <section style={{ padding:"5rem 0",background:T.color.blue900,position:"relative",overflow:"hidden" }}>
    <div style={{ position:"absolute",top:-80,right:-80,width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,153,240,0.12) 0%,transparent 70%)",pointerEvents:"none" }} />
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ textAlign:"center",marginBottom:"3rem" }}>
        <Badge light>Our Impact</Badge>
        <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:700,letterSpacing:"-0.03em",color:"#fff",marginTop:"1rem" }}>Numbers that matter.</h2>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.25rem" }}>
        {[
          { n:"12,400+",l:"Families Supported",d:"Since 2025" },
          { n:"48",     l:"Partner Clinics",   d:"Across 6 regions" },
          { n:"94%",    l:"Satisfaction Rate", d:"From family surveys" },
          { n:"3,200",  l:"Hours of Training", d:"Delivered to clinicians" },
        ].map(s=>(
          <div key={s.l} style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:T.radius["2xl"],padding:"2rem 1.5rem",textAlign:"center" }}>
            <div style={{ fontFamily:T.font.headline,fontSize:"2.4rem",fontWeight:700,color:T.color.blue200,lineHeight:1 }}>{s.n}</div>
            <div style={{ fontFamily:T.font.body,fontWeight:500,fontSize:"0.88rem",color:"#fff",marginTop:"0.6rem" }}>{s.l}</div>
            <div style={{ fontFamily:T.font.body,fontSize:"0.7rem",color:T.color.blue400,marginTop:"0.3rem" }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Programs ────────────────────────────── */
const Programs = () => (
  <section style={{ padding:"5rem 0",background:T.color.surface }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ marginBottom:"2.5rem" }}>
        <Badge>Programs</Badge>
        <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,letterSpacing:"-0.03em",color:T.color.ink,marginTop:"1rem" }}>Built for real lives.</h2>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:"1.25rem" }}>
        {/* Featured */}
        <div style={{ background:T.color.blue500,borderRadius:T.radius["3xl"],padding:"2.5rem",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:380,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",bottom:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"rgba(255,255,255,0.06)",pointerEvents:"none" }} />
          <div>
            <Badge light>Early Intervention</Badge>
            <h3 style={{ fontFamily:T.font.headline,fontSize:"1.6rem",fontWeight:700,color:"#fff",margin:"1.25rem 0 1rem",lineHeight:1.2 }}>Early Childhood<br/>Autism Support</h3>
            <p style={{ fontFamily:T.font.body,fontSize:"0.9rem",fontWeight:300,color:"rgba(255,255,255,0.78)",lineHeight:1.8,maxWidth:340 }}>Tailored support for children under 8, combining speech therapy, occupational therapy, and family coaching in one integrated program.</p>
          </div>
          <Btn variant="ghostLight" size="sm">Learn More</Btn>
        </div>

        {/* Stack */}
        <div style={{ display:"flex",flexDirection:"column",gap:"1.25rem" }}>
          {[
            { lbl:"Family Navigation",  t:"Guides, Grants & Advocacy",      d:"Dedicated navigators help families access services, benefits, and the right specialists." },
            { lbl:"Adult Transition",   t:"Employment & Independent Living", d:"Supporting autistic adults as they move into work, education, and community life." },
            { lbl:"Mental Health",      t:"Trauma-Informed Counselling",     d:"Affordable, autism-adapted counselling for individuals and family members." },
          ].map(prog=>{
            const [h,setH]=useState(false);
            return(
              <div key={prog.lbl} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:T.color.card,border:`1px solid ${h?T.color.blue200:T.color.border}`,borderRadius:T.radius["2xl"],padding:"1.4rem 1.6rem",transition:"all 0.2s ease",boxShadow:h?T.shadow.hover:T.shadow.card,cursor:"pointer",flex:1 }}>
                <span style={{ fontFamily:T.font.body,fontSize:"0.635rem",fontWeight:600,letterSpacing:"0.09em",textTransform:"uppercase",color:T.color.blue500,display:"block",marginBottom:"0.4rem" }}>{prog.lbl}</span>
                <div style={{ fontFamily:T.font.headline,fontSize:"0.97rem",fontWeight:600,color:T.color.ink,marginBottom:"0.5rem" }}>{prog.t}</div>
                <p style={{ fontFamily:T.font.body,fontSize:"0.82rem",fontWeight:300,color:T.color.inkMid,lineHeight:1.75 }}>{prog.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ── Stories ─────────────────────────────── */
const Stories = () => (
  <section style={{ padding:"5rem 0",background:"#fff" }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem" }}>
        <div>
          <Badge>Stories</Badge>
          <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,letterSpacing:"-0.03em",color:T.color.ink,marginTop:"1rem" }}>Heard in their own voices.</h2>
        </div>
        <p style={{ fontFamily:T.font.body,fontSize:"0.88rem",fontWeight:300,color:T.color.inkMid,maxWidth:300 }}>We don't speak for the autistic community. We amplify them.</p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }}>
        {/* Wide quote */}
        <div style={{ gridColumn:"span 2",background:T.color.blue50,border:`1px solid ${T.color.blue100}`,borderRadius:T.radius["3xl"],padding:"2.5rem",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
          <svg width="26" height="22" viewBox="0 0 32 24" fill={T.color.blue300} style={{ opacity:0.45,marginBottom:"1.25rem" }}>
            <path d="M0 24V14.4C0 10.88 0.8 7.88 2.4 5.4C4 2.92 6.48 1.08 9.84 0L11.52 2.64C9.04 3.56 7.2 4.88 6 6.6C4.88 8.32 4.32 10.24 4.32 12.36H8.16V24H0ZM20.16 24V14.4C20.16 10.88 20.96 7.88 22.56 5.4C24.16 2.92 26.64 1.08 30 0L31.68 2.64C29.2 3.56 27.36 4.88 26.16 6.6C25.04 8.32 24.48 10.24 24.48 12.36H28.32V24H20.16Z"/>
          </svg>
          <p style={{ fontFamily:T.font.alt,fontStyle:"italic",fontSize:"1.3rem",fontWeight:400,color:T.color.blue900,lineHeight:1.75,flex:1 }}>
            Before Lumina, every doctor's visit felt like a battle. Now my son walks in confidently. Someone finally designed care for him — not for everyone else.
          </p>
          <div style={{ marginTop:"2rem" }}>
            <div style={{ fontFamily:T.font.body,fontWeight:600,fontSize:"0.82rem",color:T.color.blue700 }}>Adwoa M.</div>
            <div style={{ fontFamily:T.font.body,fontSize:"0.72rem",color:T.color.blue400,marginTop:"0.2rem" }}>Mother of a 9-year-old, Kumasi</div>
          </div>
        </div>

        {/* Stat card */}
        <div style={{ background:T.color.blue600,borderRadius:T.radius["3xl"],padding:"2rem",display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
          <ImgBox ratio="1" label="Portrait" dark style={{ borderRadius:T.radius.xl,marginBottom:"1.25rem",flex:1 }} />
          <div style={{ fontFamily:T.font.headline,fontSize:"2rem",fontWeight:700,color:"#fff",lineHeight:1 }}>94%</div>
          <div style={{ fontFamily:T.font.body,fontSize:"0.82rem",color:"rgba(255,255,255,0.7)",marginTop:"0.35rem" }}>of families report improved well-being</div>
        </div>

        {/* Story cards */}
        {[
          { name:"Kofi A., 24",      role:"Program Graduate",          quote:"The transition program helped me get my first job. My manager actually understands how I work." },
          { name:"Ama & Family",     role:"Community Circle Members",   quote:"We found a group of parents who just get it. No judgment. Just shared lunches and shared struggles." },
          { name:"Dr. Mensah",       role:"Partner Clinician",          quote:"Training with Lumina changed how I practice. I see sensory needs I used to miss entirely." },
        ].map(s=>{
          const [h,setH]=useState(false);
          return(
            <div key={s.name} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:T.color.card,border:`1px solid ${h?T.color.blue200:T.color.border}`,borderRadius:T.radius["2xl"],overflow:"hidden",transition:"all 0.22s ease",boxShadow:h?T.shadow.hover:T.shadow.card,transform:h?"translateY(-3px)":"none" }}>
              <ImgBox ratio="16/9" label={s.name} style={{ borderRadius:0,border:"none" }} />
              <div style={{ padding:"1.4rem" }}>
                <p style={{ fontFamily:T.font.alt,fontStyle:"italic",fontSize:"0.92rem",color:T.color.inkMid,lineHeight:1.8,marginBottom:"1.1rem" }}>"{s.quote}"</p>
                <div style={{ borderTop:`1px solid ${T.color.border}`,paddingTop:"0.9rem" }}>
                  <div style={{ fontFamily:T.font.body,fontWeight:600,fontSize:"0.78rem",color:T.color.ink }}>{s.name}</div>
                  <div style={{ fontFamily:T.font.body,fontSize:"0.67rem",color:T.color.inkMute,marginTop:"0.15rem" }}>{s.role}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Get Involved ────────────────────────── */
const GetInvolved = () => (
  <section style={{ padding:"5rem 0",background:T.color.surface }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
        <Badge>Get Involved</Badge>
        <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,letterSpacing:"-0.03em",color:T.color.ink,marginTop:"1rem" }}>There is a place for you in this.</h2>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }}>
        {[
          { lbl:"Donate",    c:T.color.blue500, t:"Fund What Matters",           b:"Your donation directly funds diagnostic sessions, family navigators, and scholarship programs.",                      a:"Donate Now",         icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
          { lbl:"Volunteer", c:T.color.blue600, t:"Give Your Time",              b:"We need transport volunteers, event organisers, peer mentors, and professionals willing to donate expertise.",       a:"Join as Volunteer",  icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
          { lbl:"Partner",   c:T.color.blue700, t:"Institutional Partnership",   b:"Clinics, schools, and corporations — partner with us to build autism-informed environments with lasting impact.",  a:"Become a Partner",   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
        ].map(c=>{
          const [h,setH]=useState(false);
          return(
            <div key={c.lbl} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ background:T.color.card,border:`1px solid ${h?T.color.blue200:T.color.border}`,borderRadius:T.radius["2xl"],padding:"2rem",display:"flex",flexDirection:"column",transition:"all 0.22s ease",boxShadow:h?T.shadow.hover:T.shadow.card,transform:h?"translateY(-3px)":"none" }}>
              <div style={{ width:48,height:48,borderRadius:T.radius.lg,background:T.color.blue50,color:c.c,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem" }}>{c.icon}</div>
              <span style={{ fontFamily:T.font.body,fontSize:"0.64rem",fontWeight:600,letterSpacing:"0.09em",textTransform:"uppercase",color:c.c,display:"block",marginBottom:"0.45rem" }}>{c.lbl}</span>
              <h3 style={{ fontFamily:T.font.headline,fontSize:"1.05rem",fontWeight:600,color:T.color.ink,marginBottom:"0.85rem",lineHeight:1.3 }}>{c.t}</h3>
              <p style={{ fontFamily:T.font.body,fontSize:"0.875rem",fontWeight:300,color:T.color.inkMid,lineHeight:1.8,flexGrow:1,marginBottom:"1.75rem" }}>{c.b}</p>
              <Btn variant="ghost" size="sm">{c.a}</Btn>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Newsletter ───────────────────────────── */
const Newsletter = () => {
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  return(
    <section style={{ padding:"5rem 0",background:"#fff" }}>
      <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
        <div style={{ background:T.color.blue900,borderRadius:T.radius["3xl"],padding:"4rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",right:-80,top:-80,width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,144,226,0.18) 0%,transparent 70%)",pointerEvents:"none" }} />
          <div style={{ position:"relative",zIndex:1 }}>
            <Badge light>Stay Connected</Badge>
            <h2 style={{ fontFamily:T.font.headline,fontSize:"clamp(1.5rem,2.5vw,2.1rem)",fontWeight:700,letterSpacing:"-0.03em",color:"#fff",margin:"1.25rem 0 1rem",lineHeight:1.15 }}>
              Stories, research, and good news — monthly.
            </h2>
            <p style={{ fontFamily:T.font.body,fontSize:"0.88rem",fontWeight:300,color:T.color.blue300,lineHeight:1.8 }}>No noise. Just meaningful updates from our community. Unsubscribe anytime.</p>
          </div>
          <div style={{ position:"relative",zIndex:1 }}>
            {!done?(
              <>
                <div style={{ display:"flex",background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.14)",borderRadius:"99px",overflow:"hidden",padding:"0.3rem",marginBottom:"0.85rem" }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"
                    style={{ flex:1,background:"transparent",border:"none",outline:"none",padding:"0.75rem 1.25rem",fontFamily:T.font.body,fontSize:"0.88rem",color:"#fff" }}/>
                  <button onClick={()=>email&&setDone(true)} style={{ background:T.color.blue500,color:"#fff",border:"none",borderRadius:"99px",padding:"0.75rem 1.5rem",fontFamily:T.font.body,fontWeight:500,fontSize:"0.82rem",cursor:"pointer" }}>Subscribe</button>
                </div>
                <p style={{ fontFamily:T.font.body,fontSize:"0.68rem",color:T.color.blue400 }}>We respect your inbox and your privacy.</p>
              </>
            ):(
              <div style={{ background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.14)",borderRadius:T.radius.xl,padding:"2rem",textAlign:"center" }}>
                <div style={{ fontSize:"1.6rem",marginBottom:"0.75rem" }}>✦</div>
                <div style={{ fontFamily:T.font.headline,fontSize:"1.15rem",fontWeight:700,color:"#fff",marginBottom:"0.5rem" }}>You're in!</div>
                <div style={{ fontFamily:T.font.body,fontSize:"0.8rem",fontWeight:300,color:T.color.blue300 }}>Thank you — look out for our next dispatch.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ──────────────────────────────── */
const Footer = () => (
  <footer style={{ background:T.color.blue950,padding:"5rem 0 2.5rem" }}>
    <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 1.5rem" }}>
      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem",marginBottom:"4rem" }}>
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:"0.65rem",marginBottom:"1.25rem" }}>
            <div style={{ width:32,height:32,background:T.color.blue500,borderRadius:T.radius.md,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.5" fill="white"/><circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.25" strokeDasharray="2 2.5" fill="none"/></svg>
            </div>
            <span style={{ fontFamily:T.font.headline,fontSize:"1rem",fontWeight:700,color:"#fff" }}>Lumina</span>
          </div>
          <p style={{ fontFamily:T.font.body,fontSize:"0.8rem",fontWeight:300,color:"rgba(255,255,255,0.38)",lineHeight:1.85,maxWidth:240,marginBottom:"1.5rem" }}>Supporting autistic individuals and their families through compassionate care, community, and advocacy.</p>
          <div style={{ display:"flex",gap:"0.5rem" }}>
            {["𝕏","in","f","◎"].map((s,i)=>(
              <a key={i} href="#" style={{ width:32,height:32,borderRadius:T.radius.md,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.35)",fontSize:"0.7rem",fontFamily:T.font.body }}>{s}</a>
            ))}
          </div>
        </div>
        {[
          { h:"Programs",   ls:["Early Intervention","Family Navigation","Adult Transition","Mental Health","Research"] },
          { h:"Foundation", ls:["Our Mission","Our Team","Annual Reports","Press","Careers"] },
          { h:"Connect",    ls:["Contact Us","Donate","Volunteer","Partner With Us","Newsletter"] },
        ].map(col=>(
          <div key={col.h}>
            <h4 style={{ fontFamily:T.font.body,fontSize:"0.64rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginBottom:"1.25rem" }}>{col.h}</h4>
            <ul style={{ listStyle:"none" }}>
              {col.ls.map(l=>(
                <li key={l} style={{ marginBottom:"0.7rem" }}>
                  <a href="#" style={{ fontFamily:T.font.body,fontSize:"0.8rem",fontWeight:300,color:"rgba(255,255,255,0.45)",transition:"color 0.15s" }}
                    onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.85)"}
                    onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem" }}>
        <p style={{ fontFamily:T.font.body,fontSize:"0.68rem",color:"rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} Lumina Foundation. Registered Non-Profit. All rights reserved.</p>
        <div style={{ display:"flex",gap:"1.5rem" }}>
          {["Privacy Policy","Terms of Use","Accessibility Statement"].map(l=>(
            <a key={l} href="#" style={{ fontFamily:T.font.body,fontSize:"0.68rem",color:"rgba(255,255,255,0.25)" }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ── Root ────────────────────────────────── */
export default function LuminaFoundation() {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  return(
    <>
      <GlobalStyles/>
      <div style={{ minHeight:"100vh",background:T.color.surface }}>
        <Nav scrolled={scrolled}/>
        <main>
          <Hero/><Mission/><Impact/><Programs/><Stories/><GetInvolved/><Newsletter/>
        </main>
        <Footer/>
      </div>
    </>
  );
}
