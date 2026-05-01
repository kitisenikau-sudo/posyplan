import { useState, useEffect } from 'react';
import { ArrowRight, Check, Loader2, ChevronDown, Heart } from 'lucide-react';

export default function PosyLanding() {
  const [email, setEmail] = useState('');
  const [emailBottom, setEmailBottom] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(127);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('posy-counter');
      if (stored) {
        setWaitlistCount(parseInt(stored));
      }
    } catch (e) {
      console.log('Storage not available');
    }
  }, []);

  const handleSignup = async (emailValue) => {
    if (!emailValue || !emailValue.includes('@')) return;
    setSubmitting(true);

    try {
      const newCount = waitlistCount + 1;
      try {
        localStorage.setItem('posy-counter', String(newCount));
      } catch (e) {
        console.log('Storage not available');
      }
      setWaitlistCount(newCount);

      await new Promise(r => setTimeout(r, 700));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const PosySprig = ({ size = 40, color = '#7A8B6A' }) => (
    <svg viewBox="0 0 60 80" width={size} height={size * 1.33} style={{ display: 'inline-block' }}>
      <path d="M30 75 Q30 50, 30 20" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="22" cy="35" rx="6" ry="3" fill={color} opacity="0.85" transform="rotate(-30 22 35)"/>
      <ellipse cx="38" cy="40" rx="6" ry="3" fill={color} opacity="0.85" transform="rotate(30 38 40)"/>
      <ellipse cx="20" cy="50" rx="7" ry="3.5" fill={color} opacity="0.7" transform="rotate(-25 20 50)"/>
      <ellipse cx="40" cy="55" rx="7" ry="3.5" fill={color} opacity="0.7" transform="rotate(25 40 55)"/>
      <ellipse cx="22" cy="65" rx="8" ry="4" fill={color} opacity="0.55" transform="rotate(-20 22 65)"/>
      <ellipse cx="38" cy="70" rx="8" ry="4" fill={color} opacity="0.55" transform="rotate(20 38 70)"/>
      <circle cx="30" cy="18" r="3.5" fill="#C46B3C" opacity="0.9"/>
      <circle cx="33" cy="14" r="2.5" fill="#D88B6A" opacity="0.85"/>
      <circle cx="27" cy="14" r="2.5" fill="#E8A887" opacity="0.85"/>
    </svg>
  );

  const Wordmark = ({ color = '#2D2A26', size = 36 }) => (
    <span style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: size,
      color,
      letterSpacing: '0.02em',
      fontWeight: 500,
      lineHeight: 1
    }}>posy</span>
  );

  return (
    <div style={{
      background: '#FAF6EE',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#2D2A26'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(8px, -10px) rotate(3deg); } }
        @keyframes drift { 0%, 100% { transform: translate(0, 0) rotate(-5deg); } 50% { transform: translate(-12px, 6px) rotate(-8deg); } }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
        .float { animation: float 7s ease-in-out infinite; }
        .drift { animation: drift 9s ease-in-out infinite; }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .linen {
          background-image:
            linear-gradient(45deg, transparent 49%, rgba(122, 110, 92, 0.04) 49%, rgba(122, 110, 92, 0.04) 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(122, 110, 92, 0.04) 49%, rgba(122, 110, 92, 0.04) 51%, transparent 51%);
          background-size: 4px 4px;
        }
      `}</style>

      <div className="grain fixed inset-0 pointer-events-none z-0 opacity-40"></div>

      <nav className="relative z-20 px-5 sm:px-10 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <PosySprig size={26} color="#7A8B6A" />
          <Wordmark size={32} />
        </div>
        <a href="#signup" className="text-[11px] uppercase tracking-[0.22em] font-medium px-5 py-2.5 rounded-full transition-colors" style={{
          background: '#2D2A26', color: '#FAF6EE'
        }}>Join waitlist</a>
      </nav>

      <section className="relative z-10 px-5 sm:px-10 pt-8 pb-20 sm:pt-16 sm:pb-32 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="fade-up flex items-center gap-2 mb-6" style={{ animationDelay: '0.05s' }}>
              <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#C46B3C' }}></span>
              <span className="text-[10px] uppercase tracking-[0.28em] font-medium" style={{ color: '#7A6E5C' }}>
                Made in Newcastle · launching soon
              </span>
            </div>

            <h1 className="fade-up mb-7" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              animationDelay: '0.15s'
            }}>
              The calm<br/>
              wedding planner<br/>
              <em style={{ color: '#C46B3C', fontWeight: 500 }}>you've been looking for.</em>
            </h1>

            <p className="fade-up text-base sm:text-lg leading-relaxed max-w-md mb-9" style={{
              color: '#5A5347',
              animationDelay: '0.25s',
              fontWeight: 400
            }}>
              A beautiful, ad-free private space to keep every payment, contract, and vendor in one place — without an app trying to sell you flowers every five seconds.
            </p>

            {!submitted ? (
              <div className="fade-up max-w-md" style={{ animationDelay: '0.35s' }}>
                <div className="flex gap-2 p-1.5 rounded-full" style={{
                  background: '#FFFDF8',
                  boxShadow: '0 1px 0 rgba(45,42,38,0.04), 0 6px 24px -10px rgba(45,42,38,0.15)'
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup(email)}
                    placeholder="your@email.com"
                    className="flex-1 px-5 py-3 bg-transparent outline-none text-sm"
                    style={{ color: '#2D2A26' }}
                    disabled={submitting}
                  />
                  <button
                    onClick={() => handleSignup(email)}
                    disabled={submitting || !email.includes('@')}
                    className="px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                    style={{
                      background: email.includes('@') ? '#7A8B6A' : '#C8C0AE',
                      color: '#FAF6EE'
                    }}
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <><span className="hidden sm:inline">Save my spot</span><ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
                <p className="text-xs mt-3 ml-2" style={{ color: '#7A6E5C' }}>
                  Join <strong style={{ color: '#2D2A26' }}>{waitlistCount?.toLocaleString() || '—'}</strong> Australian brides on the waitlist · No spam, ever.
                </p>
              </div>
            ) : (
              <div className="fade-up max-w-md p-5 rounded-2xl flex items-start gap-3" style={{
                background: '#7A8B6A', color: '#FAF6EE'
              }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FAF6EE' }}>
                  <Check className="w-4 h-4" style={{ color: '#7A8B6A' }} strokeWidth={3} />
                </div>
                <div>
                  <div className="font-medium mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>You're #{waitlistCount?.toLocaleString()}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#E8E2D0' }}>
                    Welcome to Posy. We'll email you the moment we launch — and the first 200 brides get Pro at the basic price.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="fade-up relative flex justify-center" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -top-8 -left-4 drift opacity-60">
              <PosySprig size={70} color="#9DAA8B" />
            </div>
            <div className="absolute -bottom-4 -right-2 float opacity-50">
              <PosySprig size={55} color="#A8B596" />
            </div>

            <div className="float relative">
              <div className="relative w-[260px] h-[540px] rounded-[2.5rem] p-2.5" style={{
                background: '#1A1814',
                boxShadow: '0 30px 80px -20px rgba(45,42,38,0.4)'
              }}>
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden" style={{ background: '#FAF6EE' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl z-50" style={{ background: '#1A1814' }}></div>

                  <div className="absolute inset-0 pt-10 px-5">
                    <div className="text-center mb-4">
                      <p className="text-[9px] uppercase tracking-[0.28em] mb-1" style={{ color: '#7A6E5C' }}>78 days to go</p>
                      <h2 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2D2A26' }}>
                        <em>Sarah & James</em>
                      </h2>
                    </div>

                    <div className="rounded-2xl p-4 mb-3" style={{
                      background: 'linear-gradient(160deg, #C46B3C, #A85530)'
                    }}>
                      <p className="text-[9px] uppercase tracking-[0.22em] mb-1" style={{ color: '#FAE0CF' }}>Next payment</p>
                      <p className="text-base font-medium" style={{ color: '#FAF6EE', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Florist · A$1,200</p>
                      <p className="text-[10px]" style={{ color: '#FAE0CF' }}>Due in 5 days</p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: 'Mountain Falls Estate', cat: 'Venue', status: '✓ Paid' },
                        { name: 'Olive & Oak Studios', cat: 'Photography', status: 'Deposit' },
                        { name: 'Wild Bloom Florals', cat: 'Florist', status: 'Due soon' },
                        { name: 'Coastal Catering Co', cat: 'Catering', status: 'Deposit' }
                      ].map((v, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: '#F4ECE0' }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#7A8B6A' }}>
                            <span className="text-[8px] font-medium" style={{ color: '#FAF6EE' }}>{v.cat[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium truncate" style={{ color: '#2D2A26' }}>{v.name}</p>
                            <p className="text-[8px] truncate" style={{ color: '#7A6E5C' }}>{v.cat}</p>
                          </div>
                          <span className="text-[8px] uppercase tracking-wider flex-shrink-0" style={{ color: '#7A8B6A' }}>{v.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-10 py-20 sm:py-28" style={{ background: '#F4ECE0' }}>
        <div className="grain absolute inset-0 opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative">
          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-4" style={{ color: '#C46B3C' }}>The trap most brides fall into</p>

          <h2 className="mb-10" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            fontWeight: 500
          }}>
            47 browser tabs. 3 spreadsheets.<br/>
            6 vendor email threads. <em style={{ color: '#C46B3C' }}>Sound familiar?</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: '#5A5347' }}>
                You've spent months curating your vendors. They're booked. The aesthetic is locked in. The Pinterest board is finally <em>complete</em>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#5A5347' }}>
                But the <em>tracking</em> is chaos. Deposits in one folder. Contracts in your inbox. Balance due dates scattered across calendars.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: '#5A5347' }}>
                You download a free wedding app — and it bombards you with vendor ads, suggestions you didn't ask for, and tries to upsell you flowers you've already booked.
              </p>
              <p className="text-base leading-relaxed font-medium" style={{ color: '#2D2A26', fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontStyle: 'italic' }}>
                There has to be a calmer way.
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-8 sm:p-10" style={{ background: '#FFFDF8', boxShadow: '0 1px 0 rgba(45,42,38,0.04), 0 4px 24px -8px rgba(45,42,38,0.06)' }}>
            <div className="grid md:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center">
              <div className="flex justify-center">
                <div className="relative" style={{ transform: 'rotate(-4deg)' }}>
                  <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-sm flex flex-col items-center justify-center p-4" style={{
                    background: 'linear-gradient(135deg, #D4A5A5 0%, #C49595 100%)',
                    boxShadow: '0 12px 30px -8px rgba(45,42,38,0.2), inset 0 0 0 4px rgba(255,255,255,0.15)'
                  }}>
                    <p className="text-[8px] uppercase tracking-[0.22em] font-medium mb-2" style={{ color: '#FAF6EE', opacity: 0.85 }}>Our</p>
                    <p className="text-center" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: '#FAF6EE',
                      fontSize: '22px',
                      lineHeight: 1.1
                    }}>Wedding<br/>Planner</p>
                    <div className="w-8 h-px mt-3" style={{ background: '#FAF6EE', opacity: 0.5 }}></div>
                  </div>
                  <div className="absolute -top-2 -right-3 w-12 h-10 p-1 flex items-center justify-center text-[7px] uppercase tracking-wider" style={{
                    background: '#F4D88A',
                    color: '#5A5347',
                    transform: 'rotate(8deg)',
                    boxShadow: '0 2px 4px rgba(45,42,38,0.1)'
                  }}>
                    Florist!!
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-3" style={{ color: '#C46B3C' }}>And then there's the wedding book...</p>
                <h3 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 500, lineHeight: 1.15 }}>
                  Beautiful in the shop. <em style={{ color: '#C46B3C' }}>Useless three months in.</em>
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'You forget to update it for two weeks at a time',
                    'No way to attach a receipt or contract',
                    'Can\'t set a real reminder for that balance due',
                    'Your fiancé has no idea what\'s in it',
                    'It\'s sitting at home when you\'re at the venue'
                  ].map((pain, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: '#5A5347' }}>
                      <span className="mt-2 w-3 h-px flex-shrink-0" style={{ background: '#C46B3C' }}></span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm sm:text-base italic" style={{ color: '#7A6E5C', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px' }}>
                  Posy is what the wedding book wishes it could be.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-10 py-20 sm:py-28 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <PosySprig size={50} color="#7A8B6A" />
          <h2 className="mt-4 mb-3" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            fontWeight: 500
          }}>
            Posy is different. <em style={{ color: '#C46B3C' }}>On purpose.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-8 rounded-3xl" style={{ background: '#7A8B6A', color: '#FAF6EE' }}>
            <p className="text-[10px] uppercase tracking-[0.28em] mb-4" style={{ color: '#D4DBC8' }}>Posy is</p>
            <ul className="space-y-3.5">
              {[
                'A calm, beautiful tracker',
                'Ad-free, forever',
                'Made for the bride who already knows her vendors',
                'A private space — just you and your partner',
                'Designed for boho, intimate, aesthetic weddings'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#FAF6EE' }}>
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4DBC8' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-3xl" style={{ background: '#FFFDF8', boxShadow: '0 1px 0 rgba(45,42,38,0.04), 0 4px 24px -8px rgba(45,42,38,0.06)' }}>
            <p className="text-[10px] uppercase tracking-[0.28em] mb-4" style={{ color: '#C46B3C' }}>Posy is not</p>
            <ul className="space-y-3.5">
              {[
                'A vendor marketplace',
                'A free app that sells your data',
                'Trying to plan your whole wedding for you',
                'Cluttered with features you\'ll never use',
                'A US/UK app pretending to understand Aussie weddings'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#5A5347' }}>
                  <span className="mt-1.5 w-3 h-px flex-shrink-0" style={{ background: '#C46B3C' }}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-10 py-20 sm:py-28" style={{ background: '#F4ECE0' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-4 text-center" style={{ color: '#C46B3C' }}>How it works</p>
          <h2 className="text-center mb-14" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            fontWeight: 500
          }}>
            Four things. Done <em style={{ color: '#C46B3C' }}>well</em>.
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { num: '01', title: 'Vendor Tracker', body: 'Every supplier in one place. Contact details, what you\'ve agreed, what they\'re delivering. No more digging through emails.' },
              { num: '02', title: 'Payment Timeline', body: 'A chronological view of every deposit and balance due. Push notifications 7 days before — never a missed payment again.' },
              { num: '03', title: 'Document Vault', body: 'Every contract, receipt, and email screenshot in one private place. Search-friendly, partner-shared, never lost.' },
              { num: '04', title: 'Day-of Timeline', body: 'The morning of your wedding, see everyone\'s arrival times in one screen. Forward to your maid of honour with one tap.' }
            ].map((step, i) => (
              <div key={i} className="rounded-2xl p-7" style={{ background: '#FFFDF8' }}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C46B3C', fontStyle: 'italic' }}>{step.num}</span>
                  <h3 className="text-xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2D2A26' }}>{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#5A5347' }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-10 py-20 sm:py-28 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-4" style={{ color: '#C46B3C' }}>Pricing</p>
          <h2 className="mb-3" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            fontWeight: 500
          }}>
            One purchase. <em style={{ color: '#C46B3C' }}>That's it.</em>
          </h2>
          <p className="text-sm" style={{ color: '#7A6E5C' }}>No subscriptions. No surprise fees. Pay once and use until your wedding day.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="p-8 rounded-3xl" style={{ background: '#FFFDF8', boxShadow: '0 1px 0 rgba(45,42,38,0.04), 0 4px 24px -8px rgba(45,42,38,0.06)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Basic</h3>
              <div>
                <span className="text-3xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2D2A26' }}>A$29</span>
                <span className="text-xs ml-1" style={{ color: '#7A6E5C' }}>once</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm" style={{ color: '#5A5347' }}>
              {['Vendor tracker (up to 25 vendors)', 'Payment timeline + reminders', 'Document vault (5GB)', 'Shared with one partner', 'Day-of-wedding timeline'].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: '#7A8B6A' }} strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-3xl relative" style={{ background: '#7A8B6A', color: '#FAF6EE', boxShadow: '0 8px 32px -8px rgba(122,139,106,0.4)' }}>
            <div className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-medium" style={{ background: '#C46B3C', color: '#FAF6EE' }}>
              Recommended
            </div>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Pro</h3>
              <div>
                <span className="text-3xl font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FAF6EE' }}>A$59</span>
                <span className="text-xs ml-1" style={{ color: '#D4DBC8' }}>once</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm" style={{ color: '#FAF6EE' }}>
              {['Everything in Basic — and:', 'Unlimited vendors', 'Budget tracker (with category breakdowns)', 'Guest list & RSVP manager', 'Document vault (50GB)', 'Multi-partner sharing (up to 5)', 'Priority support'].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5" style={i === 0 ? { fontWeight: 500, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.15)' } : {}}>
                  {i !== 0 && <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: '#D4DBC8' }} strokeWidth={2.5} />}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-3xl text-center max-w-2xl mx-auto" style={{ background: '#F4ECE0' }}>
          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-2" style={{ color: '#C46B3C' }}>Founding Bride Offer</p>
          <p className="text-base leading-relaxed" style={{ color: '#2D2A26' }}>
            <strong style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontStyle: 'italic' }}>The first 200 brides on the waitlist get Posy Pro for A$29</strong> — that's A$30 off, plus early access before public launch.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-10 py-20 sm:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mb-4" style={{ color: '#C46B3C' }}>Quick questions</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 500 }}>
            <em>Asked & answered</em>
          </h2>
        </div>

        <div className="space-y-1">
          {[
            { q: 'When does Posy launch?', a: 'Aiming for Q3 2026 on iOS and Android. Waitlist members get early access about 4-6 weeks before public launch — and a 50% discount as a thank-you for backing us early.' },
            { q: 'Do I need both Posy and Easy Weddings/Bridebook?', a: 'No. Posy is built for brides who\'ve already chosen their vendors and want a calm tracker — not another marketplace. Most users find they can ditch the free apps once they\'ve booked their team.' },
            { q: 'Will it work for small intimate weddings?', a: 'Yes — Posy is designed exactly for this. Whether it\'s 30 guests in a backyard or 80 in a vineyard, the workflow is the same. We don\'t bombard you with features built for 200-person extravaganzas.' },
            { q: 'Can my partner use it too?', a: 'Yes. Basic includes shared access for one partner. Pro extends this to 5 people — useful if your maid of honour or wedding planner needs to see what\'s happening.' },
            { q: 'What happens to my data after the wedding?', a: 'It\'s yours, forever. Your vault stays accessible for 12 months free — perfect for thank-you notes, vendor reviews, or anniversary memories. After that you can export everything as a PDF keepsake.' },
            { q: 'Is this Australian-made?', a: 'Yes — built in Newcastle NSW, designed for Australian weddings. We understand the Hunter Valley, the South Coast, Margaret River, the Adelaide Hills. No US-centric workflows.' }
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left p-5 rounded-2xl transition-colors flex items-start justify-between gap-4"
              style={{ background: openFaq === i ? '#FFFDF8' : 'transparent' }}
            >
              <div className="flex-1">
                <h3 className="text-base font-medium" style={{ color: '#2D2A26', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>{item.q}</h3>
                {openFaq === i && (
                  <p className="text-sm leading-relaxed mt-2.5" style={{ color: '#5A5347' }}>{item.a}</p>
                )}
              </div>
              <ChevronDown className="w-4 h-4 mt-2 flex-shrink-0 transition-transform" style={{
                color: '#7A6E5C',
                transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>
          ))}
        </div>
      </section>

      <section id="signup" className="relative z-10 px-5 sm:px-10 py-20 sm:py-32" style={{ background: '#7A8B6A', color: '#FAF6EE' }}>
        <div className="grain absolute inset-0 opacity-20 pointer-events-none"></div>
        <div className="max-w-2xl mx-auto text-center relative">
          <PosySprig size={60} color="#FAF6EE" />

          <p className="text-[10px] uppercase tracking-[0.28em] font-medium mt-6 mb-5" style={{ color: '#D4DBC8' }}>
            Be one of the first 200 founding brides
          </p>

          <h2 className="mb-6" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.05,
            fontWeight: 500
          }}>
            Plan your wedding<br/>
            <em style={{ color: '#FAE0CF' }}>the way it should feel.</em>
          </h2>

          <p className="text-base leading-relaxed mb-9 max-w-lg mx-auto" style={{ color: '#E8E2D0' }}>
            Save your spot. We'll email you the moment Posy launches with your founding bride discount waiting.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto">
              <div className="flex gap-2 p-1.5 rounded-full" style={{
                background: '#FAF6EE'
              }}>
                <input
                  type="email"
                  value={emailBottom}
                  onChange={(e) => setEmailBottom(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSignup(emailBottom)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 bg-transparent outline-none text-sm"
                  style={{ color: '#2D2A26' }}
                  disabled={submitting}
                />
                <button
                  onClick={() => handleSignup(emailBottom)}
                  disabled={submitting || !emailBottom.includes('@')}
                  className="px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                  style={{
                    background: emailBottom.includes('@') ? '#2D2A26' : '#A8A18F',
                    color: '#FAF6EE'
                  }}
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>Save my spot<ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
              <p className="text-xs mt-4" style={{ color: '#D4DBC8' }}>
                <strong style={{ color: '#FAF6EE' }}>{waitlistCount?.toLocaleString() || '—'}</strong> brides already saved their spot
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto p-5 rounded-2xl flex items-center gap-3 justify-center" style={{
              background: '#FAF6EE', color: '#2D2A26'
            }}>
              <Check className="w-5 h-5" style={{ color: '#7A8B6A' }} strokeWidth={3} />
              <span className="font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>You're in. Welcome to Posy.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 px-5 sm:px-10 py-10" style={{ background: '#2D2A26', color: '#A8A18F' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <PosySprig size={20} color="#A8A18F" />
            <Wordmark color="#FAF6EE" size={22} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] flex items-center gap-6">
            <span>© 2026</span>
            <span className="flex items-center gap-1.5">Made with <Heart className="w-3 h-3 fill-current" style={{ color: '#C46B3C' }} /> in Newcastle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
