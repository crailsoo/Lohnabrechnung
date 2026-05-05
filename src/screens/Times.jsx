import Ic from '../lib/icons.jsx';
import { Avatar, Card, Row, Num, TopBar, IconBtn, SectionHead, ProgressBar } from '../lib/ui.jsx';
import { RAPHIS_TEAM } from '../data/employees.js';
import { TIPS_WEEK } from '../data/events.js';
import { fmtEUR, fmtH } from '../data/helpers.js';

const WEEK_DAYS = [
  { d: 'Mo', h: 22   },
  { d: 'Di', h: 28   },
  { d: 'Mi', h: 26   },
  { d: 'Do', h: 31   },
  { d: 'Fr', h: 38   },
  { d: 'Sa', h: 28   },
  { d: 'So', h: 13.5 },
];
const WEEK_TOTAL = WEEK_DAYS.reduce((s, d) => s + d.h, 0);

export default function ScreenTimes({ t, nav }) {
  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} large subtitle="April 2026" title="Arbeitszeiten"
        trailing={<>
          <IconBtn icon={Ic.Filter} t={t}/>
          <IconBtn icon={Ic.Plus}   t={t}/>
        </>}/>

      {/* Wochenübersicht */}
      <div style={{ padding: '0 16px' }}>
        <Card t={t} padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                KW 18 · 27. Apr – 3. Mai
              </div>
              <Num size={22} weight={700} style={{ color: t.fg, marginTop: 4 }}>
                {fmtH(WEEK_TOTAL).replace(' h', '')}{' '}
                <span style={{ fontSize: 14, color: t.fgMuted, fontWeight: 500 }}>Stunden</span>
              </Num>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <IconBtn icon={Ic.ChevronL} t={t}/>
              <IconBtn icon={Ic.ChevronR} t={t}/>
            </div>
          </div>
          {/* Balken-Chart */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80, marginTop: 8 }}>
            {WEEK_DAYS.map((day, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', height: `${(day.h / 40) * 100}%`,
                  background: i === 4 ? t.accent : t.chip,
                  borderRadius: 4, minHeight: 4,
                }}/>
                <div style={{ fontSize: 10, color: t.fgMuted, fontWeight: 600 }}>{day.d}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pro Mitarbeiter */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Pro Mitarbeiter · April"/>
        <Card t={t}>
          {RAPHIS_TEAM.map((e, i) => {
            const pct = e.hoursThisMonth / e.hoursTarget;
            const over = pct > 1;
            return (
              <Row key={e.id} t={t} last={i === RAPHIS_TEAM.length - 1}
                   onClick={() => nav.go('employee', { id: e.id })}>
                <Avatar emp={e} size={32}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>
                    {e.firstName} {e.lastName}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <ProgressBar
                      value={Math.min(e.hoursThisMonth, e.hoursTarget)}
                      max={e.hoursTarget} t={t}
                      color={over ? t.warn : e.color}/>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Num size={13} weight={600} style={{ color: over ? t.warn : t.fg }}>
                    {fmtH(e.hoursThisMonth)}
                  </Num>
                  <div style={{ fontSize: 10, color: t.fgFaint, marginTop: 2 }}>
                    von {fmtH(e.hoursTarget)}
                  </div>
                </div>
              </Row>
            );
          })}
        </Card>
      </div>

      {/* Trinkgeld */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Trinkgeld" action={{ label: 'Verteilen', onClick: () => nav.go('tips') }}/>
        <Card t={t} padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: t.fgMuted, fontWeight: 500 }}>Pool diese Woche</span>
            <Num size={20} weight={700} style={{ color: t.fg }}>{fmtEUR(TIPS_WEEK.total)} €</Num>
          </div>
          <div style={{ fontSize: 12, color: t.fgMuted }}>
            4 Servicekräfte · Verteilung nach Service-Stunden
          </div>
        </Card>
      </div>
    </div>
  );
}
