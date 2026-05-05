import { useState } from 'react';
import Ic from '../lib/icons.jsx';
import { Card, Row, Num, TopBar, IconBtn, SectionHead } from '../lib/ui.jsx';
import { fmtEUR, calcNetto } from '../data/helpers.js';

export default function ScreenCalc({ t, nav }) {
  const [hours, setHours]       = useState(160);
  const [rate, setRate]         = useState(15.50);
  const [taxClass, setTaxClass] = useState('I');
  const [type, setType]         = useState('regular');

  const isMinijob = type === 'minijob';
  const brutto = hours * rate;
  const calc = calcNetto(brutto, taxClass, isMinijob);

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} title="Brutto-Netto-Rechner"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}/>

      {/* Ergebnis-Hero */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{ background: t.fg, color: t.bg, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,250,235,0.55)' }}>
            Auszahlung netto
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <Num size={36} weight={700} style={{ color: t.bg, letterSpacing: '-0.03em' }}>
              {fmtEUR(calc.netto)}
            </Num>
            <span style={{ fontSize: 18, color: 'rgba(255,250,235,0.6)' }}>€</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '0.5px solid rgba(255,250,235,0.15)' }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,250,235,0.55)', fontWeight: 600 }}>Brutto</div>
              <Num size={15} weight={600} style={{ color: t.bg }}>{fmtEUR(brutto)} €</Num>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,250,235,0.55)', fontWeight: 600 }}>AG-Kosten</div>
              <Num size={15} weight={600} style={{ color: t.bg }}>{fmtEUR(brutto + calc.agAnteil)} €</Num>
            </div>
          </div>
        </div>
      </div>

      {/* Eingabe */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Eingabe"/>
        <Card t={t}>
          {/* Beschäftigungsart */}
          <div style={{ padding: 14, borderBottom: `0.5px solid ${t.border}` }}>
            <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
              Beschäftigungsart
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ v: 'regular', l: 'Regulär' }, { v: 'minijob', l: 'Minijob' }].map((o) => (
                <button key={o.v} onClick={() => setType(o.v)} style={{
                  flex: 1, height: 36, borderRadius: 8,
                  background: type === o.v ? t.fg : t.surfaceAlt,
                  color:      type === o.v ? t.bg : t.fg,
                  border: 0, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>{o.l}</button>
              ))}
            </div>
          </div>

          {/* Stunden */}
          <div style={{ padding: 14, borderBottom: `0.5px solid ${t.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600 }}>Stunden / Monat</span>
              <Num size={14} weight={600} style={{ color: t.fg }}>{hours}</Num>
            </div>
            <input type="range" min={0} max={200} value={hours}
              onChange={(e) => setHours(+e.target.value)}
              style={{ width: '100%', accentColor: t.accent }}/>
          </div>

          {/* Stundensatz */}
          <div style={{ padding: 14, borderBottom: !isMinijob ? `0.5px solid ${t.border}` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600 }}>Stundensatz</span>
              <Num size={14} weight={600} style={{ color: t.fg }}>{fmtEUR(rate)} €</Num>
            </div>
            <input type="range" min={12.82} max={30} step={0.10} value={rate}
              onChange={(e) => setRate(+e.target.value)}
              style={{ width: '100%', accentColor: t.accent }}/>
          </div>

          {/* Steuerklasse */}
          {!isMinijob && (
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600, marginBottom: 8 }}>
                Steuerklasse
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['I', 'II', 'III', 'IV', 'V', 'VI'].map((c) => (
                  <button key={c} onClick={() => setTaxClass(c)} style={{
                    flex: 1, height: 32, borderRadius: 6,
                    background: taxClass === c ? t.accent : t.surfaceAlt,
                    color:      taxClass === c ? t.accentFg : t.fg,
                    border: 0, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}>{c}</button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Aufschlüsselung */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Aufschlüsselung"/>
        <Card t={t}>
          {!isMinijob ? (
            [
              { l: 'Bruttolohn',         v: calc.brutto,      c: t.fg      },
              { l: 'Lohnsteuer',         v: -calc.lohnsteuer               },
              { l: 'Solidaritätszuschlag', v: -calc.soli                   },
              { l: 'KV-Beitrag',         v: -calc.kv                       },
              { l: 'RV-Beitrag',         v: -calc.rv                       },
              { l: 'AV-Beitrag',         v: -calc.av                       },
              { l: 'PV-Beitrag',         v: -calc.pv                       },
              { l: 'Nettoauszahlung',    v: calc.netto,       c: t.success, b: true },
            ].map((row, i, arr) => (
              <Row key={row.l} t={t} last={i === arr.length - 1}>
                <span style={{ fontSize: 13, color: t.fgMuted, fontWeight: row.b ? 600 : 400, flex: 1 }}>
                  {row.l}
                </span>
                <Num size={13} weight={row.b ? 700 : 500}
                     style={{ color: row.c || (row.v < 0 ? t.danger : t.fg) }}>
                  {row.v < 0 ? '–' : ''}{fmtEUR(Math.abs(row.v))} €
                </Num>
              </Row>
            ))
          ) : (
            [
              { l: 'Brutto = Netto (steuerfrei)', v: calc.netto,                c: t.success, b: true  },
              { l: 'AG-Pauschalabgaben',          v: calc.agAnteil,             c: t.fgMuted           },
              { l: 'AG-Gesamtkosten',             v: calc.brutto + calc.agAnteil, c: t.fg,   b: true  },
            ].map((row, i, arr) => (
              <Row key={row.l} t={t} last={i === arr.length - 1}>
                <span style={{ fontSize: 13, color: t.fgMuted, fontWeight: row.b ? 600 : 400, flex: 1 }}>
                  {row.l}
                </span>
                <Num size={13} weight={row.b ? 700 : 500} style={{ color: row.c }}>
                  {fmtEUR(row.v)} €
                </Num>
              </Row>
            ))
          )}
        </Card>
        <p style={{ fontSize: 11, color: t.fgFaint, padding: '10px 4px', lineHeight: 1.5, margin: 0 }}>
          Vereinfachte Berechnung. Echte Werte richten sich nach individuellen Faktoren
          (Kirchensteuer, Bundesland, Kinderfreibetrag etc.). Nicht für offizielle Zwecke.
        </p>
      </div>
    </div>
  );
}
