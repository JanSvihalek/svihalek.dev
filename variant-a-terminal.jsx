// Variant A — Terminal / IDE web (dark)
// Pulls the dark side of the business card to a full-page IDE metaphor.

const TS_TABS_BY_LANG = {
  cs: [
    { slug: 'about', label: 'o mně', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'services', label: 'služby', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'portfolio', label: 'portfolio', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'stack', label: 'stack', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'contact', label: 'kontakt', icon: '◆', iconColor: '#54c7fc' },
  ],
  en: [
    { slug: 'about', label: 'about', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'services', label: 'services', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'portfolio', label: 'portfolio', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'stack', label: 'stack', icon: '◆', iconColor: '#54c7fc' },
    { slug: 'contact', label: 'contact', icon: '◆', iconColor: '#54c7fc' },
  ],
};

const TerminalSite = ({ tweaks = { showAvailability: true }, setTweak = () => { } }) => {
  const [activeTab, setActiveTab] = React.useState('about');
  const [lang, setLang] = React.useState('cs');
  const [cursorOn, setCursorOn] = React.useState(true);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakToggle = window.TweakToggle;
  const TweakColor = window.TweakColor;

  React.useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Scroll-spy — update active tab based on which section is in view
  React.useEffect(() => {
    const slugs = TS_TABS_BY_LANG.cs.map((t) => t.slug);
    const onScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = slugs[0];
      for (const s of slugs) {
        const el = document.getElementById('ts-' + s);
        if (el && el.offsetTop <= scrollY) current = s;
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = lang === 'cs' ? cs : en;
  const TABS = TS_TABS_BY_LANG[lang];

  const scrollToSlug = (slug) => {
    const el = document.getElementById('ts-' + slug);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return (
    <div style={tsRoot} className="ts-root">
      {/* === Sticky header: IDE tab bar === */}
      <div className="ts-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0a0a0c' }}>

        {/* === IDE tab bar === */}
        <div style={tsTabBar} className="ts-tabbar">
          {/* Desktop tabs */}
          <div className="ts-tab-btns">
            {TABS.map((tab) => (
              <button key={tab.slug} onClick={() => { setActiveTab(tab.slug); scrollToSlug(tab.slug); }} style={{
                ...tsTab,
                background: activeTab === tab.slug ? 'var(--dark-2)' : 'transparent',
                color: activeTab === tab.slug ? '#e8e6e0' : '#6a6a75',
                borderTop: activeTab === tab.slug ? '2px solid var(--blue)' : '2px solid transparent',
              }}>
                <span style={{ color: 'var(--blue)', marginRight: 8, fontSize: 11 }}>●</span>
                {tab.label}
              </button>
            ))}
            <div style={{ flex: 1 }}></div>
          </div>

          {/* Hamburger button — mobile only */}
          <button className="ts-hamburger" onClick={() => setMobileNavOpen(v => !v)} aria-label="Menu">
            {mobileNavOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="5" x2="16" y2="5" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="13" x2="16" y2="13" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div style={{ background: '#0d0d0f', borderTop: '1px solid #1f1f26', padding: '8px 0' }}>
            {TABS.map((tab) => (
              <button key={tab.slug} onClick={() => { setActiveTab(tab.slug); scrollToSlug(tab.slug); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 20px',
                background: activeTab === tab.slug ? 'rgba(79,138,255,0.08)' : 'transparent',
                border: 'none', borderLeft: activeTab === tab.slug ? '2px solid var(--blue)' : '2px solid transparent',
                color: activeTab === tab.slug ? '#e8e6e0' : '#7a7a85',
                fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ color: 'var(--blue)', fontSize: 10 }}>●</span>
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* === Main layout: sidebar + content === */}
      <div style={tsBody} className="ts-body">
        {/* Sidebar */}
        <aside style={tsSidebar} className="ts-sidebar">
          <div style={tsSidebarHeader}>EXPLORER</div>
          <div style={tsSidebarTree}>
            <div style={{ ...tsTreeRow, color: '#a8a8b0' }}>
              <span style={{ color: 'var(--blue)' }}>▾</span> svihalek.dev
            </div>
            {TABS.map((tab) => (
              <div key={tab.slug} onClick={() => scrollToSlug(tab.slug)} style={{
                ...tsTreeRow,
                paddingLeft: 32,
                color: activeTab === tab.slug ? '#e8e6e0' : '#7a7a85',
                background: activeTab === tab.slug ? 'rgba(79,138,255,0.08)' : 'transparent',
                borderLeft: activeTab === tab.slug ? '2px solid var(--blue)' : '2px solid transparent',
              }}>
                <span style={{ color: tab.iconColor, marginRight: 8 }}>{tab.icon}</span>{tab.label}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }}></div>

          <div style={tsSidebarFooter}>
            {tweaks.showAvailability && (<>
              <div style={{ color: '#4a4a52', fontSize: 10, marginBottom: 6 }}>SYSTEM</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#7a7a85' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 8px #28c840' }}></span>
                {t.available}
              </div>
              <div style={{ fontSize: 11, color: '#4a4a52', marginTop: 4 }}>Q2 2026 · 2/3 sloty</div>
            </>)}
          </div>
        </aside>

        {/* Content column */}
        <main style={tsMain} className="ts-main">
          {/* HERO — about */}
          <section id="ts-about" style={tsHero} className="ts-hero">
            <div style={tsLineNumbers} className="ts-line-numbers">
              {[...Array(14)].map((_, i) => <div key={i}>{String(i + 1).padStart(2, '0')}</div>)}
            </div>
            <div style={tsHeroCode} className="ts-hero-code">
              <div style={tsCommentLine}>{`// ${t.heroComment}`}</div>
              <div style={tsPromptLine}>
                <span style={{ color: 'green' }}>~</span>
                <span style={{ color: 'var(--blue)' }}>$</span>
                <span style={{ color: '#e8e6e0' }}>whoami</span>
                <span style={{ color: 'var(--blue)', opacity: cursorOn ? 1 : 0 }}>▎</span>
              </div>

              <h1 style={tsHeroName}>
                Jan <span style={{ display: 'inline-block' }}>Švihálek</span>
              </h1>

              <div style={tsRoleLine}>
                <span style={{ color: 'var(--blue)' }}>▸</span>
                <span style={{ color: 'var(--blue)', letterSpacing: '0.18em' }}>MOBILE APP DEVELOPER</span>
                <span style={{ color: '#4a4a52' }}>/</span>
                <span style={{ color: '#7a7a85', letterSpacing: '0.18em' }}>FLUTTER · CROSS-PLATFORM</span>
              </div>

              <p style={tsHeroBody}>
                {t.heroP1}
              </p>
              <p style={tsHeroBody}>
                {t.heroP2}
              </p>

              <div className="ts-cta-row" style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center' }}>
                <a href="#ts-contact" style={tsCtaPrimary}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>$</span> {t.ctaStart}
                </a>
                <a href="#ts-portfolio" style={tsCtaGhost}>
                  <span style={{ color: 'var(--blue)' }}>{'>'}</span> {t.ctaWork}
                </a>
                <div style={{ flex: 1 }}></div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#4a4a52' }}>
                  Praha, CZ · UTC+1
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="ts-services" style={tsSection} className="ts-section">
            <SectionHeader num="01" file={TABS[1].label} title={t.servicesTitle} subtitle={t.servicesSub} />

            <div style={tsCodeBlock}>
              <div style={tsCodeKey}>class</div>
              <span style={tsCodeClass}>Services</span>
              <span style={{ color: '#e8e6e0' }}> &#123;</span>
            </div>

            <div style={tsServicesGrid} className="ts-services-grid">
              {t.services.map((s, i) => (
                <ServiceCard key={i} idx={i} icon={s.icon} method={s.method} title={s.title} desc={s.desc} bullets={s.bullets} />
              ))}
            </div>

            <div style={{ ...tsCodeBlock, marginTop: 24 }}>
              <span style={{ color: '#e8e6e0' }}>&#125;</span>
            </div>
          </section>

          {/* PORTFOLIO */}
          <section id="ts-portfolio" style={tsSection} className="ts-section">
            <SectionHeader num="02" file={TABS[2].label} title={t.portfolioTitle} subtitle={t.portfolioSub} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <PortfolioCase
                tag="TORKIS"
                tagColor="#54c7fc"
                title={t.torkisTitle}
                desc={t.torkisDesc}
                meta={[
                  ['client', 'Autoservis · B2B'],
                  ['platform', 'iOS · Android'],
                  ['stack', 'Flutter · Firebase · ML Kit'],
                  ['status', 'under development'],
                ]}
                features={t.torkisFeatures}
                mockup="torkis"
                logo={<img src="images/torkis-app-icon-192.png" alt="TORKIS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                websiteHref="https://torkis.cz"
              />
              <PortfolioCase
                tag="QRkni"
                tagColor="var(--blue)"
                title={t.qrkniTitle}
                desc={t.qrkniDesc}
                meta={[
                  ['client', 'malí podnikatelé · B2C'],
                  ['platform', 'iOS · Android · Web'],
                  ['stack', 'Flutter · SPAYD · Hive'],
                  ['status', 'under development'],
                ]}
                features={t.qrkniFeatures}
                mockup="qrkni"
                logo={<img src="images/qrkni-white-256.png" alt="QRkni" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              />
            </div>
          </section>

          {/* TECH STACK */}
          <section id="ts-stack" style={tsSection} className="ts-section">
            <SectionHeader num="03" file={TABS[3].label} title={t.stackTitle} subtitle={t.stackSub} />

            <div style={tsStackBlock} className="ts-stack-block">
              <div style={tsYamlLine}>
                <span style={tsYamlKey}>name</span>
                <span style={{ color: '#e8e6e0' }}>:</span>
                <span style={tsYamlValue}> svihalek_dev</span>
              </div>
              <div style={tsYamlLine}>
                <span style={tsYamlKey}>description</span>
                <span style={{ color: '#e8e6e0' }}>:</span>
                <span style={tsYamlString}> "{t.stackDesc}"</span>
              </div>

              {[
                { group: 'core', items: [['Flutter', '3.27'], ['Dart', '3.6'], ['Riverpod', '2.5'], ['GoRouter', '14.x']] },
                { group: 'backend', items: [['Firebase', 'Auth · Firestore · Functions'], ['Supabase', 'Postgres · Realtime'], ['Node.js', 'Express · Fastify'], ['REST · GraphQL', '—']] },
              ].map((g) => (
                <div key={g.group} style={{ marginTop: 28 }}>
                  <div style={tsYamlLine}>
                    <span style={tsYamlKey}>{g.group}</span>
                    <span style={{ color: '#e8e6e0' }}>:</span>
                  </div>
                  {g.items.map(([k, v]) => (
                    <div key={k} style={{ ...tsYamlLine, paddingLeft: 36 }}>
                      <span style={{ color: '#7a7a85' }}>- </span>
                      <span style={{ color: '#e8e6e0', minWidth: 200 }}>{k}</span>
                      <span style={{ color: '#4a4a52' }}> # </span>
                      <span style={{ color: '#7a7a85' }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="ts-contact" style={tsSection} className="ts-section">
            <SectionHeader num="04" file={TABS[4].label} title={t.contactTitle} subtitle={t.contactSub} />

            <div style={tsContactRow} className="ts-contact-row">
              {/* Form */}
              <div style={tsContactForm}>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#e8e6e0', marginBottom: 24 }}>{t.formHeading}</div>

                {sent ? (
                  <div style={tsSentBox}>
                    <div style={{ color: '#28c840', fontSize: 22, marginBottom: 8 }}>✓</div>
                    <div style={{ fontSize: 18, color: '#e8e6e0', marginBottom: 6 }}>{t.thanksTitle}</div>
                    <div style={{ fontSize: 14, color: '#7a7a85' }}>{t.thanksBody}</div>
                  </div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    setSendError(false);
                    try {
                      const res = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          access_key: '1dd3b7ad-5611-48bf-bdcf-59ed78e807a9',
                          subject: '[svihalek.dev] Nová zpráva od ' + formData.name,
                          from_name: formData.name,
                          email: formData.email,
                          message: formData.message,
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setSent(true);
                      } else {
                        setSendError(true);
                      }
                    } catch {
                      setSendError(true);
                    } finally {
                      setSending(false);
                    }
                  }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <Field label={t.nameLabel} value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} placeholder="Jan Novák" />
                    <Field label={t.emailLabel} value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} placeholder="jan@firma.cz" />
                    <Field label={t.msgLabel} multiline value={formData.message} onChange={(v) => setFormData({ ...formData, message: v })} placeholder={t.msgPlaceholder} />
                    {sendError && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#ff5f57' }}>Odeslání selhalo — zkus to znovu nebo napiš přímo na jan.svihalek00@gmail.com</div>
                    )}
                    <button type="submit" disabled={sending} style={{ ...tsCtaPrimary, alignSelf: 'flex-start', marginTop: 10, opacity: sending ? 0.6 : 1, cursor: sending ? 'default' : 'pointer' }}>
                      {sending ? '...' : t.sendLabel}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact metadata */}
              <div style={tsContactMeta}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#4a4a52', marginBottom: 16, letterSpacing: '0.12em' }}>
                  // {t.directLabel}
                </div>
                <ContactRow k="email" v="jan.svihalek00@gmail.com" />
                <ContactRow k="phone" v="+420 731 901 003" />
                <ContactRow k="web" v="svihalek.dev" highlight />
                <ContactRow k="linkedin" v="/in/jan-švihálek" href="https://www.linkedin.com/in/jan-%C5%A1vih%C3%A1lek-526627170/" />

                <div style={{ height: 32 }}></div>

                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#4a4a52', marginBottom: 12, letterSpacing: '0.12em' }}>
                  // {t.responseLabel}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#7a7a85', lineHeight: 1.7 }}>
                  <div><span style={{ color: 'var(--blue)' }}>→</span> {t.responseTime}</div>
                  <div><span style={{ color: 'var(--blue)' }}>→</span> {t.responseScope}</div>
                  <div><span style={{ color: 'var(--blue)' }}>→</span> {t.responseNDA}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={tsFooter} className="ts-footer">
            <div style={tsPromptLine}>
              <span style={{ color: 'green' }}>~</span>
              <span style={{ color: 'var(--blue)' }}>$</span>
              <span style={{ color: '#e8e6e0' }}>exit</span>
              <span style={{ color: 'var(--blue)', opacity: cursorOn ? 1 : 0 }}>▎</span>
            </div>
            <div style={tsFooterMeta} className="ts-footer-meta">
              <span>svihalek<span style={{ color: 'var(--blue)' }}>.dev</span></span>
              <span style={{ color: '#3a3a42' }}>/</span>
              <span>© 2026</span>
              <span style={{ color: '#3a3a42' }}>/</span>
              <span>{t.footerCraft}</span>
              <span style={{ flex: 1 }}></span>
              <span>IČO 12345678 · neplátce DPH</span>
            </div>
          </footer>
        </main>
      </div>

      {/* === Tweaks panel === */}
      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Sidebar">
            <TweakToggle
              label="Indikátor dostupnosti"
              value={tweaks.showAvailability}
              onChange={(v) => setTweak('showAvailability', v)}
            />
          </TweakSection>

          <TweakSection label="Vzhled">
            <TweakColor
              label="Akcentová barva"
              value={tweaks.accentColor}
              options={['#4f8aff', '#28c840', '#febc2e', '#ff79c6']}
              onChange={(v) => setTweak('accentColor', v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
};

// === Subcomponents ===
const SectionHeader = ({ num, file, title, subtitle }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--mono)', fontSize: 12, color: '#7a7a85', marginBottom: 18 }}>
      <span style={{ color: 'var(--blue)' }}>{num}</span>
      <span style={{ color: '#3a3a42' }}>/</span>
      <span>{file}</span>
      <div style={{ flex: 1, height: 1, background: '#1f1f26' }}></div>
    </div>
    <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 56, color: '#e8e6e0', margin: 0, letterSpacing: '-0.025em', lineHeight: 1 }}>
      {title}
    </h2>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: '#7a7a85', marginTop: 14, maxWidth: 680, lineHeight: 1.6 }}>
      {subtitle}
    </div>
  </div>
);

const ServiceCard = ({ idx, icon, method, title, desc, bullets }) => (
  <div style={tsServiceCard}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{ fontFamily: 'var(--mono)', color: '#4a4a52', fontSize: 12, marginTop: 6 }}>
        0{idx + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--blue)', marginBottom: 6 }}>
          .{method}()
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 24, fontWeight: 600, color: '#e8e6e0', letterSpacing: '-0.015em', marginBottom: 14 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 15, color: '#a8a8b0', lineHeight: 1.55, marginBottom: 18 }}>
          {desc}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#7a7a85' }}>
              <span style={{ color: 'var(--blue)', marginRight: 8 }}>→</span>{b}
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 28, opacity: 0.3 }}>{icon}</div>
    </div>
  </div>
);

const StoreBadge = ({ store, href }) => {
  const isIos = store === 'ios';
  return (
    <a
      href={href || '#'}
      onClick={!href ? (e) => e.preventDefault() : undefined}
      title={!href ? 'Coming soon' : undefined}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 14px', background: '#111', border: '1px solid #2a2a32', borderRadius: 9, color: '#e8e6e0', textDecoration: 'none', opacity: href ? 1 : 0.45, cursor: href ? 'pointer' : 'default', userSelect: 'none' }}
    >
      {isIos ? (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
          <path d="M13.2 9.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9C2.8 3.7.8 5 0 7c-1.7 3.1-.4 7.7 1.2 10.2.8 1.2 1.8 2.5 3 2.5 1.2 0 1.7-.8 3.1-.8 1.4 0 1.8.8 3 .8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.3-.9-2.3-3.9z" />
          <path d="M10.7 2c.7-.8 1.1-1.9 1-3-.9.1-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.8-1.3z" />
        </svg>
      ) : (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
          <path d="M0 1.2v15.6c0 .7.8 1.1 1.4.7l9-7.8-9-8.2C.8.1 0 .5 0 1.2z" />
          <path d="M14.3 7.5L11.8 6l-2.2 1.9 2.2 1.9 2.5-1.5c.7-.4.7-1.4 0-1.8z" opacity=".8" />
          <path d="M1.4 17.5L10 10.4 7.5 8.2 1.4 17.5z" opacity=".6" />
          <path d="M1.4.5L7.5 9.8 10 7.6 1.4.5z" opacity=".6" />
        </svg>
      )}
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: 8, color: '#7a7a85' }}>{isIos ? 'Download on the' : 'Get it on'}</div>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--sans)' }}>{isIos ? 'App Store' : 'Google Play'}</div>
      </div>
    </a>
  );
};

const PortfolioCase = ({ tag, tagColor, title, desc, meta, features, mockup, logo, iosHref, androidHref, websiteHref }) => (
  <div style={tsPortfolioCase} className="ts-portfolio-case">
    <div style={tsPortfolioMockup} className="ts-portfolio-mockup">
      {mockup === 'torkis' ? <TorkisMockup /> : <QrkniMockup />}
    </div>
    <div style={tsPortfolioBody}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {logo && <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>{logo}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: tagColor, boxShadow: `0 0 10px ${tagColor}` }}></span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: tagColor, letterSpacing: '0.18em', fontWeight: 600 }}>{tag}</span>
        </div>
      </div>
      <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: '#e8e6e0', margin: '0 0 14px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: '#a8a8b0', lineHeight: 1.6, margin: '0 0 24px 0' }}>
        {desc}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '6px 16px', fontFamily: 'var(--mono)', fontSize: 12, marginBottom: 22 }}>
        {meta.map(([k, v]) => (
          <React.Fragment key={k}>
            <div style={{ color: '#4a4a52' }}>{k}:</div>
            <div style={{ color: '#a8a8b0' }}>{v}</div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 18px', background: 'rgba(79,138,255,0.04)', border: '1px solid rgba(79,138,255,0.12)', borderRadius: 6, marginBottom: 20 }}>
        {features.map((f, i) => (
          <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#a8a8b0' }}>
            <span style={{ color: 'var(--blue)', marginRight: 10 }}>✓</span>{f}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <StoreBadge store="ios" href={iosHref} />
        <StoreBadge store="android" href={androidHref} />
        {websiteHref && (
          <a href={websiteHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', background: 'transparent', border: '1px solid #2a2a32', borderRadius: 9, color: '#a8a8b0', textDecoration: 'none', fontFamily: 'var(--mono)', fontSize: 12, transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = '#e8e6e0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a32'; e.currentTarget.style.color = '#a8a8b0'; }}
          >
            <span style={{ color: 'var(--blue)' }}>↗</span> {websiteHref.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </div>
  </div>
);

const TorkisMockup = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'linear-gradient(135deg, #080f1a 0%, #0d1929 100%)', borderRadius: 8, overflow: 'hidden' }}>
    <img src="images/torkis_prijem.png" alt="TORKIS – Příjem vozidla" style={{ height: '88%', width: 'auto', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', transform: 'rotate(-2deg)' }} />
    <img src="images/torkis_foto.png" alt="TORKIS – Fotodokumentace" style={{ height: '88%', width: 'auto', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', transform: 'rotate(2deg)' }} />
  </div>
);

const QrkniMockup = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'linear-gradient(135deg, #0a0a0c 0%, #131318 100%)', borderRadius: 8, overflow: 'hidden' }}>
    <img src="images/QRkni.png" alt="QRkni" style={{ height: '88%', width: 'auto', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', transform: 'rotate(-2deg)' }} />
    <img src="images/QRkni_polozky.png" alt="QRkni – položky" style={{ height: '88%', width: 'auto', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', transform: 'rotate(2deg)' }} />
  </div>
);

const Field = ({ label, value, onChange, placeholder, multiline }) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: focus ? 'var(--blue)' : '#7a7a85', marginBottom: 8, letterSpacing: '0.12em', transition: 'color 0.15s' }}>
        {label.toUpperCase()}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          rows={4}
          style={{
            ...tsInput,
            resize: 'vertical',
            minHeight: 110,
            borderColor: focus ? 'var(--blue)' : '#1f1f26',
          }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          style={{
            ...tsInput,
            borderColor: focus ? 'var(--blue)' : '#1f1f26',
          }}
        />
      )}
    </label>
  );
};

const ContactRow = ({ k, v, highlight, href }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '12px 0', borderBottom: '1px solid #1f1f26' }}>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#4a4a52', letterSpacing: '0.12em', minWidth: 75 }}>
      {k.toUpperCase()}
    </div>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 15, color: highlight ? '#e8e6e0' : '#a8a8b0', flex: 1 }}>
      {highlight ? <>svihalek<span style={{ color: 'var(--blue)' }}>.dev</span></> : href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{v}</a> : v}
    </div>
  </div>
);

// === Copy decks ===
const cs = {
  available: 'Online - přijímám projekty',
  heroComment: 'Multiplatformní mobilní aplikace ve Flutteru. Od návrhu po App Store/Google Play.',
  heroP1: 'Stavím produkční iOS + Android aplikace pro malé a střední firmy. Jeden kód, dva story, žádné kompromisy v UX.',
  heroP2: 'Soustředím se na rychlou iteraci, čistou architekturu a aplikace, které lidé skutečně rádi otevírají.',
  ctaStart: 'vytvořit projekt',
  ctaWork: 'portfolio',
  servicesTitle: 'Co dělám',
  servicesSub: 'Čtyři způsoby, jakými s vámi mohu pracovat. Od greenfield aplikace po dlouhodobou údržbu.',
  services: [
    {
      method: 'buildApp', title: 'Vývoj aplikací',
      desc: 'Návrh a vývoj produkční Flutter aplikace pro iOS a Android. Od architektury přes integrace až po publikaci ve storech.',
      bullets: ['greenfield projekt 6–12 týdnů', 'cross-platform: iOS, Android, web, Windows', 'CI/CD, testy, monitoring od dne 1', 'publikace v App Store i Google Play'],
    },
    {
      method: 'consult', title: 'Konzultace',
      desc: 'Diskuze nad architekturou, technologickými volbami, výběrem stacku. Hodinový sazba nebo balíček dní.',
      bullets: ['výběr stack & architektura', 'audit existující codebase', 'odhady, roadmapa, rizika', 'review PR / mentoring týmu'],
    },
    {
      method: 'designUI', title: 'UI / UX',
      desc: 'Návrh rozhraní s ohledem na to, kdo ho bude používat. Jeden člověk od skici po build.',
      bullets: ['design system & komponenty', 'user flows a prototypy', 'iOS & Material guidelines', 'hand-off rovnou do Flutteru'],
    },
    {
      method: 'maintain', title: 'Údržba',
      desc: 'Dlouhodobá péče o aplikaci, kterou jste si nechali postavit jinde nebo se mnou. Updaty SDK, bug fixy, malé fíčury.',
      bullets: ['měsíční retainer (8–24 h)', 'update Flutter / dependencies', 'sledování crash reportů', 'malé fíčury bez čekání'],
    },
  ],
  portfolioTitle: 'Vybrané projekty',
  portfolioSub: 'Dva projekty, na kterých jsem strávil poslední rok. Oba v produkci, oba pro reálné podnikatele.',
  torkisTitle: 'TORKIS — evidence přijatých vozidel pro autoservis',
  torkisDesc: 'Aplikace pro mechaniky autoservisů. Naskenuje SPZ nebo VIN, automaticky dohledá vůz a zákazníka. Fotodokumentace stavu, historie servisů, podpis klienta — to vše v jedné appce na tabletu.',
  torkisFeatures: ['OCR rozpoznání SPZ a VIN pomocí umělé inteligence', 'fotodokumentace s anotacemi přímo ve skice', 'export zakázky do PDF s podpisem klienta'],
  qrkniTitle: 'QRkni — QR platby pro mikropodnikatele',
  qrkniDesc: 'Generování QR kódů pro platby převodem pro malé firmy a jejich brigádníky. Místo posílání IBAN přes SMS si zaměstnanec naskenuje QR a peníze chodí přesně tam, kam mají — s variabilním symbolem a popisem.',
  qrkniFeatures: ['SPAYD spec — funguje s každou českou bankou', 'offline generování — bez backend závislosti', 'šablony plateb pro opakované platby', 'sdílení QR jako obrázek nebo přímý odkaz'],
  stackTitle: 'Tech stack',
  stackSub: 'S čím dnes pracuji. Volba stacku není dogma — beru nástroj, který se k problému hodí.',
  stackDesc: 'Jeden vývojář, produkční kvalita.',
  contactTitle: 'Pošli zprávu',
  contactSub: 'Mám aktuálně 2 volné sloty na Q2 2026. Napiš par řádků o tom, co potřebuješ a já se ti ozvu.',
  formHeading: 'Nová zpráva',
  sendLabel: 'Odeslat zprávu',
  nameLabel: 'Jméno',
  emailLabel: 'E-mail',
  msgLabel: 'Zpráva',
  directLabel: 'PŘÍMÝ KONTAKT',
  responseLabel: 'JAK TO BĚŽÍ DÁL',
  responseTime: 'odpovídám do 1 pracovního dne',
  responseScope: 'do týdne pošlu rámcový odhad a postup',
  responseNDA: 'NDA podepíšu před první schůzkou, pokud chceš',
  msgPlaceholder: 'O co jde, jaký rozsah, kdy by to mělo být hotové...',
  thanksTitle: 'Díky, máš to u mě.',
  thanksBody: 'Ozvu se do jednoho pracovního dne na uvedený email.',
};

const en = {
  available: 'Accepting projects',
  heroComment: 'Cross-platform mobile apps in Flutter. From sketch to App Store.',
  heroP1: 'I ship production iOS + Android apps for startups and small businesses. One codebase, two stores, no UX compromises.',
  heroP2: 'My focus is fast iteration, clean architecture, and apps people actually enjoy opening.',
  ctaStart: 'start a project',
  ctaWork: 'see work',
  servicesTitle: 'What I do',
  servicesSub: 'Four ways we can work together. From greenfield to long-term maintenance.',
  services: [
    { icon: '◆', method: 'buildApp', title: 'App development', desc: 'Designing and building production Flutter apps for iOS and Android. Architecture, integrations, and store release.', bullets: ['greenfield project · 6–12 weeks', 'cross-platform: iOS + Android + web', 'CI/CD, tests, monitoring from day 1', 'App Store and Google Play release'] },
    { icon: '◇', method: 'consult', title: 'Consulting', desc: 'Pair on architecture, tech choices, stack selection. Hourly or daily packages.', bullets: ['stack & architecture review', 'codebase audit', 'estimates, roadmaps, risks', 'PR review / team mentoring'] },
    { icon: '◈', method: 'designUI', title: 'UI / UX', desc: 'Figma design that respects how it gets implemented. One person from sketch to build.', bullets: ['design system & components', 'user flows and prototypes', 'iOS & Material guidelines', 'hand-off straight into Flutter'] },
    { icon: '◉', method: 'maintain', title: 'Maintenance', desc: 'Long-term care for an app you had built elsewhere — or with me. SDK upgrades, bug fixes, small features.', bullets: ['monthly retainer (8–24 h)', 'Flutter / dependency upgrades', 'crash report monitoring', 'small features without queueing'] },
  ],
  portfolioTitle: 'Selected work',
  portfolioSub: "Two projects I've spent the last year on. Both shipped, both for real businesses.",
  torkisTitle: 'TORKIS — vehicle records for auto service shops',
  torkisDesc: 'An app for car mechanics. Scan a license plate or VIN, auto-fetch the vehicle, open a job. Photo documentation, service history, client signature — all on one tablet in the shop.',
  torkisFeatures: ['license plate & VIN OCR via Google ML Kit', 'in-photo annotations on damage shots', 'offline-first: works without signal in the garage', 'PDF export with client signature'],
  qrkniTitle: 'QRkni — QR payments for micro-businesses',
  qrkniDesc: 'QR-code generator for bank transfers, made for small businesses paying out to staff and contractors. Instead of texting an IBAN, the employee scans a QR and the money lands exactly where it should — with variable symbol and note.',
  qrkniFeatures: ['SPAYD spec — works with every Czech bank', 'offline generation — no backend dependency', 'payment templates for recurring transfers', 'share QR as image or direct link'],
  stackTitle: 'Tech stack',
  stackSub: 'What I work with today. Stack choice is not dogma — I pick the tool that fits.',
  stackDesc: 'One developer, two stores, production quality.',
  contactTitle: 'Drop a message',
  contactSub: 'I have 2 open slots for Q2 2026. Tell me a few lines about what you need — I reply within one business day.',
  formHeading: 'New message',
  sendLabel: 'Send message',
  nameLabel: 'Name',
  emailLabel: 'E-mail',
  msgLabel: 'Message',
  directLabel: 'DIRECT CONTACT',
  responseLabel: 'WHAT HAPPENS NEXT',
  responseTime: 'I reply within 1 business day',
  responseScope: 'rough estimate and plan within a week',
  responseNDA: 'NDA signed before the first call if you want',
  msgPlaceholder: 'What it is, scope, when it needs to be done...',
  thanksTitle: 'Thanks — got it.',
  thanksBody: "I'll reply within one business day to the email you provided.",
  footerCraft: '“built in Flutter” would rhyme, but this is HTML.',
};

// === Styles ===
const tsRoot = {
  width: '100%',
  minHeight: '100vh',
  background: 'var(--dark)',
  color: '#e8e6e0',
  fontFamily: 'var(--sans)',
  display: 'flex',
  flexDirection: 'column',
};

const tsChrome = {
  display: 'flex',
  alignItems: 'center',
  padding: '14px 18px',
  background: '#0a0a0c',
  borderBottom: '1px solid #1c1c22',
  gap: 18,
};

const tsTrafficLights = { display: 'flex', gap: 8 };
const tsDot = { width: 12, height: 12, borderRadius: '50%' };

const tsUrlBar = {
  flex: 1,
  background: '#131318',
  border: '1px solid #1c1c22',
  borderRadius: 6,
  padding: '7px 14px',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.02em',
};

const tsChromeRight = { display: 'flex', gap: 8 };

const tsLangBtn = {
  background: '#131318',
  border: '1px solid #1c1c22',
  borderRadius: 6,
  padding: '7px 14px',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  display: 'flex',
  gap: 4,
  cursor: 'pointer',
};

const tsTabBar = {
  display: 'flex',
  background: '#0a0a0c',
  borderBottom: '1px solid #1c1c22',
};

const tsTab = {
  padding: '11px 18px 13px',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  background: 'transparent',
  border: 'none',
  borderRight: '1px solid #1c1c22',
  cursor: 'pointer',
  letterSpacing: '0.02em',
  display: 'flex',
  alignItems: 'center',
};

const tsBody = { display: 'flex', flex: 1, minHeight: 0, position: 'relative' };

const tsSidebar = {
  width: 240,
  background: '#0a0a0c',
  borderRight: '1px solid #1c1c22',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0',
  flexShrink: 0,
  position: 'sticky',
  top: 89,
  alignSelf: 'flex-start',
  height: 'calc(100vh - 89px)',
  overflowY: 'auto',
};

const tsSidebarHeader = {
  padding: '0 20px 12px',
  fontFamily: 'var(--mono)',
  fontSize: 11,
  color: '#4a4a52',
  letterSpacing: '0.15em',
  fontWeight: 600,
};

const tsSidebarTree = { display: 'flex', flexDirection: 'column' };

const tsTreeRow = {
  padding: '6px 20px',
  fontFamily: 'var(--mono)',
  fontSize: 12,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const tsSidebarFooter = {
  padding: '20px',
  borderTop: '1px solid #1c1c22',
  fontFamily: 'var(--mono)',
};

const tsMain = {
  flex: 1,
  background: 'var(--dark)',
  position: 'relative',
  minWidth: 0,
  overflow: 'hidden',
};

const tsHero = {
  display: 'flex',
  padding: '80px 0 100px',
  borderBottom: '1px solid #1c1c22',
};

const tsLineNumbers = {
  width: 60,
  fontFamily: 'var(--mono)',
  fontSize: 12,
  color: '#2a2a32',
  textAlign: 'right',
  paddingRight: 16,
  paddingTop: 4,
  lineHeight: '1.7',
  borderRight: '1px solid #1c1c22',
};

const tsHeroCode = {
  flex: 1,
  padding: '0 64px',
};

const tsCommentLine = {
  fontFamily: 'var(--mono)',
  fontSize: 14,
  color: '#4a4a52',
};

const tsPromptLine = {
  display: 'flex',
  gap: 10,
  fontFamily: 'var(--mono)',
  fontSize: 15,
  marginBottom: 28,
  alignItems: 'center',
};

const tsHeroName = {
  fontFamily: 'var(--sans)',
  fontWeight: 800,
  fontSize: 'clamp(72px, 11vw, 132px)',
  lineHeight: 0.9,
  letterSpacing: '-0.035em',
  margin: 0,
  color: '#f5f2ea',
};

const tsRoleLine = {
  marginTop: 28,
  fontFamily: 'var(--mono)',
  fontSize: 13,
  display: 'flex',
  gap: 12,
  alignItems: 'center',
};

const tsHeroBody = {
  marginTop: 28,
  fontFamily: 'var(--sans)',
  fontSize: 17,
  color: '#a8a8b0',
  maxWidth: 640,
  lineHeight: 1.6,
};

const tsCtaPrimary = {
  background: 'var(--blue)',
  color: '#fff',
  padding: '14px 22px',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  fontWeight: 600,
  border: 'none',
  borderRadius: 4,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

const tsCtaGhost = {
  color: '#e8e6e0',
  padding: '14px 22px',
  fontFamily: 'var(--mono)',
  fontSize: 13,
  fontWeight: 500,
  border: '1px solid #1f1f26',
  borderRadius: 4,
  textDecoration: 'none',
  letterSpacing: '0.02em',
  background: 'transparent',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

const tsSection = {
  padding: '80px 64px',
  borderBottom: '1px solid #1c1c22',
};

const tsCodeBlock = {
  fontFamily: 'var(--mono)',
  fontSize: 14,
  marginBottom: 30,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const tsCodeKey = { color: '#ff79c6' };
const tsCodeClass = { color: '#febc2e' };

const tsServicesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 1,
  background: '#1c1c22',
  border: '1px solid #1c1c22',
};

const tsServiceCard = {
  padding: '32px 30px',
  background: 'var(--dark-2)',
};

const tsPortfolioCase = {
  display: 'grid',
  gridTemplateColumns: 'minmax(360px, 480px) minmax(0, 1fr)',
  gap: 36,
  padding: 32,
  background: 'var(--dark-2)',
  border: '1px solid #1c1c22',
  borderRadius: 6,
};

const tsPortfolioMockup = { height: 480, borderRadius: 6, overflow: 'hidden', minWidth: 0 };
const tsPortfolioBody = { display: 'flex', flexDirection: 'column', minWidth: 0 };

const tsStackBlock = {
  background: 'var(--dark-2)',
  border: '1px solid #1c1c22',
  borderRadius: 6,
  padding: '28px 32px',
  fontFamily: 'var(--mono)',
  fontSize: 13,
};

const tsYamlLine = { display: 'flex', padding: '3px 0' };
const tsYamlKey = { color: '#ff79c6' };
const tsYamlValue = { color: '#a8a8b0' };
const tsYamlString = { color: '#28c840' };

const tsContactRow = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 380px)',
  gap: 48,
};

const tsContactForm = {
  background: 'var(--dark-2)',
  border: '1px solid #1c1c22',
  borderRadius: 6,
  padding: 32,
};

const tsContactMeta = {
  background: 'var(--dark-2)',
  border: '1px solid #1c1c22',
  borderRadius: 6,
  padding: 32,
};

const tsInput = {
  width: '100%',
  background: 'var(--dark)',
  border: '1px solid #1f1f26',
  borderRadius: 4,
  padding: '12px 14px',
  fontFamily: 'var(--mono)',
  fontSize: 14,
  color: '#e8e6e0',
  outline: 'none',
  transition: 'border-color 0.15s',
};

const tsSentBox = {
  marginTop: 24,
  padding: 28,
  background: 'rgba(40,200,64,0.06)',
  border: '1px solid rgba(40,200,64,0.2)',
  borderRadius: 6,
};

const tsFooter = {
  padding: '40px 64px 48px',
  borderTop: '1px solid #1c1c22',
};

const tsFooterMeta = {
  display: 'flex',
  gap: 12,
  fontFamily: 'var(--mono)',
  fontSize: 11,
  color: '#4a4a52',
  marginTop: 18,
  letterSpacing: '0.04em',
  alignItems: 'center',
};

window.TerminalSite = TerminalSite;
