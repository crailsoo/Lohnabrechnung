import { useState } from 'react';
import Ic from '../lib/icons.jsx';
import { Avatar, Card, Row, Num, TopBar, IconBtn, SectionHead, PrimaryBtn, SecondaryBtn } from '../lib/ui.jsx';
import { RAPHIS_TEAM } from '../data/employees.js';
import { fmtEUR, fmtH, calcNetto } from '../data/helpers.js';

export default function ScreenPayrollRun({ t, nav }) {
  const [step, setStep] = useState(1);
  const monthTotal = RAPHIS_TEAM.reduce((s, e) => s + e.hourlyRate * e.hoursThisMonth, 0);
  const nettoTotal = monthTotal * 0.74;

  // ── Step 3: Erfolg ────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopBar t={t} title="Lohnlauf abgeschlossen"
          leading={<IconBtn icon={Ic.X} t={t} onClick={() => nav.back()}/>}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: t.successSoft, color: t.success,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }}>
            <Ic.Check width={36} height={36}/>
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.fg, letterSpacing: '-0.02em', textAlign: 'center' }}>
            Erfolgreich übermittelt
          </h2>
          <div style={{ fontSize: 14, color: t.fgMuted, marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>
            7 SEPA-Überweisungen wurden an deine Bank gesendet.<br/>
            Lohnsteuer-Anmeldung an ELSTER vorbereitet.
          </div>
          <div style={{ marginTop: 28, padding: 14, background: t.surface, border: `0.5px solid ${t.border}`, borderRadius: 12, width: '100%' }}>
            {[
              { l: 'Gesamtauszahlung',  v: nettoTotal            },
              { l: 'Lohnsteuer / Soli', v: monthTotal * 0.105    },
              { l: 'SV-Beiträge',       v: monthTotal * 0.40     },
            ].map((row, i, arr) => (
              <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < arr.length - 1 ? 10 : 0 }}>
                <span style={{ fontSize: 12, color: t.fgMuted }}>{row.l}</span>
                <Num size={13} weight={600} style={{ color: t.fg }}>{fmtEUR(row.v)} €</Num>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <PrimaryBtn t={t} onClick={() => { setStep(1); nav.tab('payroll'); }}>Fertig</PrimaryBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar t={t} title={`Lohnlauf · Schritt ${step}/2`}
        leading={<IconBtn icon={Ic.X} t={t} onClick={() => nav.back()}/>}/>

      {/* Stepper */}
      <div style={{ padding: '4px 16px 16px', display: 'flex', gap: 4 }}>
        {[1, 2].map((s) => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 999, background: s <= step ? t.accent : t.chip }}/>
        ))}
      </div>

      {/* ── Schritt 1: Prüfen ────────────────────────────────────────────────── */}
      {step === 1 && (
        <>
          <div style={{ padding: '0 16px' }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.fg, letterSpacing: '-0.02em' }}>
              Abrechnungen prüfen
            </h2>
            <p style={{ fontSize: 13, color: t.fgMuted, marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
              7 Mitarbeiter · April 2026. Tippe auf eine Zeile für Details.
            </p>
          </div>
          <div style={{ padding: '0 16px' }}>
            <Card t={t}>
              {RAPHIS_TEAM.map((e, i) => {
                const brutto = e.monthlySalary || (e.hourlyRate * e.hoursThisMonth);
                const calc = calcNetto(brutto, e.taxClass, e.type === 'Minijob');
                return (
                  <Row key={e.id} t={t} last={i === RAPHIS_TEAM.length - 1}
                       onClick={() => nav.go('payslip', { id: e.id })}>
                    <Avatar emp={e} size={36}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{e.firstName} {e.lastName}</div>
                      <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 2 }}>
                        {fmtH(e.hoursThisMonth)} · StKl {e.taxClass}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Num size={13} weight={600} style={{ color: t.fg }}>{fmtEUR(calc.netto)} €</Num>
                      <div style={{ fontSize: 10, color: t.fgFaint, marginTop: 2 }}>netto</div>
                    </div>
                    <Ic.ChevronR width={14} height={14} style={{ color: t.fgFaint }}/>
                  </Row>
                );
              })}
            </Card>
          </div>
          <div style={{ padding: '20px 16px 0' }}>
            <SectionHead t={t} title="Zusammenfassung"/>
            <Card t={t}>
              {[
                { l: 'Bruttosumme',                 v: monthTotal,         c: t.fg,      b: false },
                { l: 'Auszahlung netto',             v: nettoTotal,         c: t.success, b: true  },
                { l: 'Lohnsteuer + Soli (an FA)',    v: monthTotal * 0.105, c: t.fg,      b: false },
                { l: 'SV-Beiträge (an Krankenkasse)', v: monthTotal * 0.40, c: t.fg,     b: false },
              ].map((row, i, arr) => (
                <Row key={row.l} t={t} last={i === arr.length - 1}>
                  <span style={{ fontSize: 13, color: t.fgMuted, flex: 1, fontWeight: row.b ? 600 : 400 }}>{row.l}</span>
                  <Num size={14} weight={row.b ? 700 : 600} style={{ color: row.c }}>{fmtEUR(row.v)} €</Num>
                </Row>
              ))}
            </Card>
          </div>
        </>
      )}

      {/* ── Schritt 2: SEPA ──────────────────────────────────────────────────── */}
      {step === 2 && (
        <>
          <div style={{ padding: '0 16px' }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: t.fg, letterSpacing: '-0.02em' }}>
              SEPA-Überweisungen
            </h2>
            <p style={{ fontSize: 13, color: t.fgMuted, marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
              7 Lastschriften aus deinem Geschäftskonto.
            </p>
          </div>
          <div style={{ padding: '0 16px' }}>
            <Card t={t} padding={14} style={{ marginBottom: 12, background: t.accentSoft, border: `0.5px solid ${t.accent}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Ic.Bank width={18} height={18} style={{ color: t.accent, flexShrink: 0, marginTop: 1 }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>Geschäftskonto Sparkasse</div>
                  <Num size={11} weight={500} style={{ color: t.fgMuted }}>DE89 1003 0000 0023 4567 89</Num>
                </div>
              </div>
            </Card>
            <Card t={t}>
              {RAPHIS_TEAM.map((e, i) => {
                const brutto = e.monthlySalary || (e.hourlyRate * e.hoursThisMonth);
                const calc = calcNetto(brutto, e.taxClass, e.type === 'Minijob');
                return (
                  <Row key={e.id} t={t} last={i === RAPHIS_TEAM.length - 1}>
                    <Avatar emp={e} size={32}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{e.firstName} {e.lastName}</div>
                      <Num size={10} weight={500} style={{ color: t.fgFaint, marginTop: 2, display: 'block' }}>{e.iban}</Num>
                    </div>
                    <Num size={14} weight={600} style={{ color: t.success }}>{fmtEUR(calc.netto)} €</Num>
                  </Row>
                );
              })}
            </Card>
            <div style={{ marginTop: 12, padding: '12px 14px', background: t.warnSoft, borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Ic.Lock width={16} height={16} style={{ color: t.warn, flexShrink: 0, marginTop: 1 }}/>
              <div style={{ fontSize: 12, color: t.fg, lineHeight: 1.5 }}>
                Mit dem nächsten Schritt werden 7 SEPA-Aufträge an deine Bank gesendet. Bestätigung per Banking-App nötig.
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom action bar */}
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        padding: '12px 16px', background: t.bg,
        borderTop: `0.5px solid ${t.border}`,
        display: 'flex', gap: 8,
      }}>
        {step > 1 && (
          <SecondaryBtn t={t} onClick={() => setStep(step - 1)}
            style={{ height: 48, paddingLeft: 18, paddingRight: 18 }}>Zurück</SecondaryBtn>
        )}
        <PrimaryBtn t={t} onClick={() => setStep(step + 1)} style={{ flex: 1 }}>
          {step === 1 ? 'Weiter zu SEPA' : 'Übermitteln'}
        </PrimaryBtn>
      </div>
    </div>
  );
}
