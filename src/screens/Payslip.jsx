import Ic from '../lib/icons.jsx';
import { Card, Num, TopBar, IconBtn, PrimaryBtn, SecondaryBtn } from '../lib/ui.jsx';
import { empById } from '../data/employees.js';
import { fmtEUR, fmtH, calcNetto } from '../data/helpers.js';

export default function ScreenPayslip({ t, nav, params }) {
  const e = empById(params.id);
  if (!e) return null;
  const isMinijob = e.type === 'Minijob';
  const brutto = e.monthlySalary || (e.hourlyRate * e.hoursThisMonth);
  const calc = calcNetto(brutto, e.taxClass, isMinijob);
  const month = params.month || 'April 2026';

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar t={t} title="Lohnabrechnung"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}
        trailing={<IconBtn icon={Ic.More} t={t}/>}/>

      <div style={{ padding: '8px 16px 0' }}>
        <Card t={t} padding={20}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                Raphis Burger GmbH
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: t.fg, marginTop: 4 }}>{e.firstName} {e.lastName}</div>
              <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 2 }}>{e.role} · {e.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600 }}>Abrechnungszeitraum</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.fg, marginTop: 2 }}>{month}</div>
            </div>
          </div>

          <div style={{ height: 1, background: t.border, margin: '12px 0' }}/>

          {/* Bezüge */}
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.fgMuted, marginBottom: 8 }}>
            Bezüge
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <span style={{ fontSize: 12, color: t.fg }}>
              {isMinijob || e.monthlySalary
                ? 'Festgehalt'
                : `Stundenlohn · ${fmtH(e.hoursThisMonth)} × ${fmtEUR(e.hourlyRate)} €`}
            </span>
            <Num size={12} weight={500} style={{ color: t.fg }}>{fmtEUR(brutto)} €</Num>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `0.5px solid ${t.border}`, marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>Gesamtbrutto</span>
            <Num size={13} weight={700} style={{ color: t.fg }}>{fmtEUR(brutto)} €</Num>
          </div>

          {/* Abzüge */}
          {!isMinijob && (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.fgMuted, margin: '14px 0 8px' }}>
                Abzüge
              </div>
              {[
                { l: `Lohnsteuer (StKl ${e.taxClass})`,   v: calc.lohnsteuer },
                { l: 'Solidaritätszuschlag',               v: calc.soli       },
                { l: 'Krankenversicherung 7,3 %',          v: calc.kv         },
                { l: 'Rentenversicherung 9,3 %',           v: calc.rv         },
                { l: 'Arbeitslosenversicherung 1,3 %',     v: calc.av         },
                { l: 'Pflegeversicherung 1,8 %',           v: calc.pv         },
              ].map((r) => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                  <span style={{ fontSize: 12, color: t.fgMuted }}>{r.l}</span>
                  <Num size={12} weight={500} style={{ color: t.danger }}>– {fmtEUR(r.v)} €</Num>
                </div>
              ))}
            </>
          )}
          {isMinijob && (
            <div style={{ marginTop: 12, padding: 10, background: t.surfaceAlt, borderRadius: 8, fontSize: 11, color: t.fgMuted, lineHeight: 1.5 }}>
              Minijob (538-€-Grenze): Pauschalabgaben in Höhe von {fmtEUR(calc.agAnteil)} € werden
              vom Arbeitgeber an die Minijob-Zentrale abgeführt.
            </div>
          )}

          {/* Auszahlung */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', borderTop: `1.5px solid ${t.fg}`, marginTop: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.fg }}>Auszahlung</span>
            <Num size={18} weight={700} style={{ color: t.success }}>{fmtEUR(calc.netto)} €</Num>
          </div>

          {/* IBAN */}
          <div style={{ marginTop: 14, padding: 10, background: t.surfaceAlt, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
              An Konto
            </div>
            <Num size={11} weight={500} style={{ color: t.fg }}>{e.iban}</Num>
          </div>
        </Card>
      </div>

      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        padding: '12px 16px', background: t.bg,
        borderTop: `0.5px solid ${t.border}`,
        display: 'flex', gap: 8,
      }}>
        <SecondaryBtn t={t} icon={Ic.Doc}   style={{ flex: 1, height: 48, justifyContent: 'center' }}>PDF teilen</SecondaryBtn>
        <PrimaryBtn   t={t} icon={Ic.Check} style={{ flex: 1 }}>Freigeben</PrimaryBtn>
      </div>
    </div>
  );
}
