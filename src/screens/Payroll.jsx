import Ic from '../lib/icons.jsx';
import { Card, Row, Num, TopBar, SectionHead, Chip, PrimaryBtn } from '../lib/ui.jsx';
import { RAPHIS_TEAM, PAYROLL_HISTORY } from '../data/employees.js';
import { fmtEUR } from '../data/helpers.js';

export default function ScreenPayroll({ t, nav }) {
  const monthTotal = RAPHIS_TEAM.reduce((s, e) => s + e.hourlyRate * e.hoursThisMonth, 0);

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} large subtitle="April 2026 · noch nicht abgeschlossen" title="Lohn"/>

      {/* Aktueller Lohnlauf */}
      <div style={{ padding: '0 16px' }}>
        <Card t={t} padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Chip t={t} tone="warn">In Vorbereitung</Chip>
            <span style={{ fontSize: 11, color: t.fgMuted, fontWeight: 500 }}>fällig 30.04.2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Brutto gesamt</div>
              <Num size={20} weight={700} style={{ color: t.fg }}>{fmtEUR(monthTotal)} €</Num>
            </div>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Auszahlung netto</div>
              <Num size={20} weight={700} style={{ color: t.success }}>{fmtEUR(monthTotal * 0.74)} €</Num>
            </div>
          </div>
          <PrimaryBtn t={t} icon={Ic.Play} onClick={() => nav.go('payroll-run')}>
            Lohnlauf starten
          </PrimaryBtn>
        </Card>
      </div>

      {/* Aufschlüsselung */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Aufschlüsselung April"/>
        <Card t={t}>
          {[
            { l: 'Bruttolöhne',                  v: monthTotal,          k: 'brutto' },
            { l: 'Lohnsteuer',                    v: -monthTotal * 0.10,  k: 'minus'  },
            { l: 'Solidaritätszuschlag',           v: -monthTotal * 0.005, k: 'minus'  },
            { l: 'KV / RV / AV / PV (AN-Anteil)', v: -monthTotal * 0.197, k: 'minus'  },
          ].map((row, i, arr) => (
            <Row key={row.l} t={t} last={i === arr.length - 1}>
              <span style={{ fontSize: 13, color: t.fg, flex: 1 }}>{row.l}</span>
              <Num size={13} weight={500} style={{ color: row.k === 'minus' ? t.danger : t.fg }}>
                {row.v < 0 ? '–' : ''}{fmtEUR(Math.abs(row.v))} €
              </Num>
            </Row>
          ))}
        </Card>
        <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, color: t.fgMuted, fontWeight: 600 }}>AG-Anteile zusätzlich</span>
          <Num size={14} weight={600} style={{ color: t.fgMuted }}>+ {fmtEUR(monthTotal * 0.205)} €</Num>
        </div>
      </div>

      {/* Schnellzugriff */}
      <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { icon: Ic.Calc,  label: 'Brutto-Netto-Rechner', go: 'calc'     },
          { icon: Ic.Bank,  label: 'SEPA-Überweisungen',   go: 'sepa'     },
          { icon: Ic.Doc,   label: 'Lohnabrechnungen',     go: 'payslips' },
          { icon: Ic.Trend, label: 'Reports',              go: 'reports'  },
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
              <span style={{ fontSize: 13, fontWeight: 600 }}>{q.label}</span>
            </button>
          );
        })}
      </div>

      {/* Historie */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Historie"/>
        <Card t={t}>
          {PAYROLL_HISTORY.map((p, i) => (
            <Row key={p.month} t={t} last={i === PAYROLL_HISTORY.length - 1}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: t.successSoft, color: t.success,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ic.Check width={16} height={16}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.fg }}>{p.month}</div>
                <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 1 }}>{p.count} MA · gezahlt {p.date}</div>
              </div>
              <Num size={14} weight={600} style={{ color: t.fg }}>{fmtEUR(p.total)} €</Num>
              <Ic.ChevronR width={16} height={16} style={{ color: t.fgFaint }}/>
            </Row>
          ))}
        </Card>
      </div>
    </div>
  );
}
