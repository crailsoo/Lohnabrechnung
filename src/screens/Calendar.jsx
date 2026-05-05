import Ic from '../lib/icons.jsx';
import { Avatar, Card, Row, Num, TopBar, IconBtn, SectionHead } from '../lib/ui.jsx';
import { RAPHIS_TEAM, TODAY_SHIFTS, empById } from '../data/employees.js';
import { CALENDAR_EVENTS } from '../data/events.js';

// May 2026: starts on Friday (index 5 in Mo=1 … So=7)
const MONTH_START = 5;
const DAYS_IN_MONTH = 31;
const TODAY = 5;

function buildCells() {
  const cells = [];
  for (let i = 1; i < MONTH_START; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  return cells;
}

export default function ScreenCalendar({ t, nav }) {
  const cells = buildCells();

  const evByDate = {};
  CALENDAR_EVENTS.forEach((e) => {
    if (!evByDate[e.date]) evByDate[e.date] = [];
    evByDate[e.date].push(e);
  });

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} large subtitle="Mai 2026" title="Kalender"
        trailing={<>
          <IconBtn icon={Ic.Filter} t={t}/>
          <IconBtn icon={Ic.Plus}   t={t}/>
        </>}/>

      {/* Monat-Navigation */}
      <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: t.fg, letterSpacing: '-0.01em' }}>
            Mai 2026
          </h2>
          <Ic.ChevronD width={16} height={16} style={{ color: t.fgMuted }}/>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <IconBtn icon={Ic.ChevronL} t={t}/>
          <IconBtn icon={Ic.ChevronR} t={t}/>
        </div>
      </div>

      {/* Kalender-Grid */}
      <div style={{ padding: '0 16px' }}>
        <Card t={t} padding={12}>
          {/* Wochentag-Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => (
              <div key={d} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                textTransform: 'uppercase', color: t.fgFaint,
                textAlign: 'center', padding: '4px 0',
              }}>{d}</div>
            ))}
          </div>
          {/* Tage */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i} style={{ aspectRatio: '1' }}/>;
              const events = evByDate[d] || [];
              const isToday = d === TODAY;
              const hasHoliday = events.some((e) => e.type === 'holiday');
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 8,
                  background: isToday ? t.accent : 'transparent',
                  color: isToday ? t.accentFg : (hasHoliday ? t.warn : t.fg),
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                  padding: '6px 0 4px', position: 'relative', cursor: 'pointer',
                }}>
                  <span style={{
                    fontSize: 13, fontWeight: isToday ? 700 : 500,
                    fontFamily: '"JetBrains Mono", monospace',
                  }}>{d}</span>
                  {events.length > 0 && (
                    <div style={{ display: 'flex', gap: 2, marginTop: 'auto', paddingBottom: 2 }}>
                      {events.slice(0, 3).map((e, j) => {
                        const c = e.type === 'leave'    ? t.warn
                          : e.type === 'sick'           ? t.danger
                          : e.type === 'holiday'        ? t.accent
                          : e.type === 'deadline'       ? t.fg
                          : t.fgMuted;
                        return (
                          <span key={j} style={{
                            width: 4, height: 4, borderRadius: 999,
                            background: isToday ? t.accentFg : c,
                          }}/>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Legende */}
      <div style={{ padding: '12px 20px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {[
          { c: t.warn,   l: 'Urlaub'   },
          { c: t.danger, l: 'Krank'    },
          { c: t.accent, l: 'Feiertag' },
          { c: t.fg,     l: 'Deadline' },
        ].map((leg) => (
          <div key={leg.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: leg.c }}/>
            <span style={{ fontSize: 11, color: t.fgMuted, fontWeight: 500 }}>{leg.l}</span>
          </div>
        ))}
      </div>

      {/* Heute */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Heute · 5. Mai"/>
        <Card t={t}>
          {TODAY_SHIFTS.map((s, i) => {
            const e = empById(s.empId);
            return (
              <Row key={s.empId} t={t} last={i === TODAY_SHIFTS.length - 1}
                   onClick={() => nav.go('employee', { id: e.id })}>
                <Avatar emp={e} size={32}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{e.firstName} {e.lastName}</div>
                  <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>{s.role}</div>
                </div>
                <Num size={12} weight={600} style={{ color: t.fg }}>{s.start}–{s.end}</Num>
              </Row>
            );
          })}
          {/* Krankmeldung */}
          <Row t={t} last>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: t.dangerSoft, color: t.danger, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic.Sick width={16} height={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>Aylin Renner · krank</div>
              <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>AU bis 07.05.</div>
            </div>
          </Row>
        </Card>
      </div>

      {/* Bevorstehend */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Bevorstehend"/>
        <Card t={t}>
          {[
            { date: '10. Mai',      icon: Ic.Doc,      kind: 'fg',     title: 'Lohnsteuer-Anmeldung März', sub: 'Frist Finanzamt'            },
            { date: '14.–16. Mai', icon: Ic.Beach,    kind: 'warn',   title: 'Mert · Urlaub',             sub: '3 Tage · genehmigt'         },
            { date: '18. Mai',     icon: Ic.Calendar, kind: 'accent', title: 'Pfingsten',                  sub: 'Feiertag'                   },
            { date: '25.–29. Mai', icon: Ic.Beach,    kind: 'warn',   title: 'Elena · Urlaubsantrag',      sub: '5 Tage · zu genehmigen',    click: () => nav.go('leave-detail') },
            { date: '30. Mai',     icon: Ic.Euro,     kind: 'fg',     title: 'Lohnlauf Mai',               sub: 'fällig'                     },
          ].map((ev, i, arr) => {
            const I = ev.icon;
            const bg = ev.kind === 'warn'   ? t.warnSoft
              : ev.kind === 'accent'        ? t.accentSoft
              : t.surfaceAlt;
            const fg = ev.kind === 'warn'   ? t.warn
              : ev.kind === 'accent'        ? t.accent
              : t.fg;
            return (
              <Row key={i} t={t} last={i === arr.length - 1} onClick={ev.click}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <I width={16} height={16}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>{ev.sub}</div>
                </div>
                <Num size={11} weight={600} style={{ color: t.fgMuted }}>{ev.date}</Num>
              </Row>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
