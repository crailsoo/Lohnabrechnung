import Ic from '../lib/icons.jsx';
import { Avatar, Chip, Card, SectionHead, Row, Num, TopBar, IconBtn, StatCard } from '../lib/ui.jsx';
import { RAPHIS_TEAM, TODAY_SHIFTS, OPEN_ACTIONS, empById } from '../data/employees.js';
import { TIPS_WEEK } from '../data/events.js';
import { fmtEUR, fmtH } from '../data/helpers.js';

export default function ScreenDashboard({ t, d, nav }) {
  const monthTotal = RAPHIS_TEAM.reduce((s, e) => s + e.hourlyRate * e.hoursThisMonth, 0);
  const hoursTotal = RAPHIS_TEAM.reduce((s, e) => s + e.hoursThisMonth, 0);

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar
        t={t} large
        subtitle="Dienstag · 5. Mai 2026"
        title="Guten Morgen, Raphi"
        trailing={<>
          <IconBtn icon={Ic.Bell}     t={t} badge onClick={() => nav.showNotif()}/>
          <IconBtn icon={Ic.Settings} t={t}       onClick={() => nav.go('settings')}/>
        </>}
      />

      {/* Lohnlauf-Fokuskarte */}
      <div style={{ padding: '8px 16px 0' }}>
        <div
          onClick={() => nav.go('payroll-run')}
          style={{
            background: t.fg, color: t.bg, borderRadius: 16,
            padding: 18, cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,250,235,0.55)' }}>
              Nächster Lohnlauf
            </div>
            <Chip t={{ ...t, chip: 'rgba(255,250,235,0.12)', fgMuted: 'rgba(255,250,235,0.85)' }}>
              Fällig 30.04.
            </Chip>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <Num size={32} weight={700} style={{ color: t.bg, letterSpacing: '-0.03em' }}>
              {fmtEUR(monthTotal)}
            </Num>
            <span style={{ fontSize: 16, color: 'rgba(255,250,235,0.6)', fontWeight: 500 }}>€ brutto</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,250,235,0.7)', marginBottom: 16 }}>
            April 2026 · 7 Mitarbeiter · {fmtH(hoursTotal)}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={(e) => { e.stopPropagation(); nav.go('payroll-run'); }}
              style={{
                flex: 1, height: 40, borderRadius: 10,
                background: t.bg, color: t.fg, border: 0,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Ic.Play width={14} height={14}/>
              Lohnlauf starten
            </button>
            <button style={{
              height: 40, padding: '0 14px', borderRadius: 10,
              background: 'transparent', color: t.bg,
              border: '0.5px solid rgba(255,250,235,0.25)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              Vorschau
            </button>
          </div>
        </div>
      </div>

      {/* KPI-Reihe */}
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 8 }}>
        <StatCard t={t} label="Heute im Dienst" value={`${TODAY_SHIFTS.length}`} sub={`von ${RAPHIS_TEAM.length}`}/>
        <StatCard t={t} label="Stunden Mai"     value={fmtH(hoursTotal).replace(' h', '')} sub="+4,2% vs. Vormonat" trend="up"/>
        <StatCard t={t} label="Trinkgeld KW18"  value={fmtEUR(TIPS_WEEK.total)} sub="zur Verteilung"/>
      </div>

      {/* Heute im Dienst */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Heute · 5. Mai" action={{ label: 'Schichtplan', onClick: () => nav.tab('calendar') }}/>
        <Card t={t}>
          {TODAY_SHIFTS.map((s, i) => {
            const e = empById(s.empId);
            return (
              <Row key={s.empId} t={t} last={i === TODAY_SHIFTS.length - 1}
                   onClick={() => nav.go('employee', { id: e.id })}>
                <Avatar emp={e} size={36}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.fg, letterSpacing: '-0.005em' }}>
                    {e.firstName} {e.lastName}
                  </div>
                  <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 1 }}>
                    {s.role} · {s.start}–{s.end}
                  </div>
                </div>
                {s.clockedIn ? (
                  <Chip t={t} tone="success">
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: t.success }}/>
                    {s.clockedIn}
                  </Chip>
                ) : (
                  <Chip t={t}>geplant</Chip>
                )}
              </Row>
            );
          })}
        </Card>
      </div>

      {/* Offene Aktionen */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Offene Aktionen"/>
        <Card t={t}>
          {OPEN_ACTIONS.map((a, i) => (
            <Row key={a.id} t={t} last={i === OPEN_ACTIONS.length - 1} onClick={() => {
              if (a.kind === 'payroll') nav.go('payroll-run');
              else if (a.kind === 'leave') nav.go('leave-detail');
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: a.urgent ? t.dangerSoft : t.accentSoft,
                color: a.urgent ? t.danger : t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {a.kind === 'payroll' && <Ic.Euro  width={16} height={16}/>}
                {a.kind === 'leave'   && <Ic.Beach width={16} height={16}/>}
                {a.kind === 'sick'    && <Ic.Sick  width={16} height={16}/>}
                {a.kind === 'tax'     && <Ic.Doc   width={16} height={16}/>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.fg, letterSpacing: '-0.005em' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 1 }}>{a.detail}</div>
              </div>
              <Ic.ChevronR width={16} height={16} style={{ color: t.fgFaint }}/>
            </Row>
          ))}
        </Card>
      </div>

      {/* Schnellzugriff */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Schnellzugriff"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { icon: Ic.Calc, label: 'Lohnrechner',           go: 'calc'         },
            { icon: Ic.Tip,  label: 'Trinkgeld verteilen',   go: 'tips'         },
            { icon: Ic.Doc,  label: 'Letzte Abrechnungen',   go: 'payslips'     },
            { icon: Ic.Plus, label: 'Mitarbeiter hinzufügen', go: 'add-employee' },
          ].map((q) => {
            const I = q.icon;
            return (
              <button key={q.label} onClick={() => nav.go(q.go)} style={{
                background: t.surface, border: `0.5px solid ${t.border}`,
                borderRadius: 12, padding: 14,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
                cursor: 'pointer', textAlign: 'left', color: t.fg,
              }}>
                <I width={20} height={20} style={{ color: t.accent }}/>
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>{q.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
