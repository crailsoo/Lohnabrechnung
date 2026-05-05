import { useState } from 'react';
import Ic from '../lib/icons.jsx';
import { Avatar, Card, Row, Num, TopBar, IconBtn, SectionHead, StatCard, ProgressBar } from '../lib/ui.jsx';
import { empById } from '../data/employees.js';
import { SHOP_STATS } from '../data/stats.js';
import { fmtEUR } from '../data/helpers.js';

// ── SVG Sparkline ─────────────────────────────────────────────────────────────
function ProfitChart({ data, height = 120 }) {
  const H = height, W = 320, P = 8;
  const max = Math.max(...data.map((d) => d.profit)) * 1.15;
  const step = (W - P * 2) / (data.length - 1);
  const pts = data.map((d, i) => [P + i * step, H - P - (d.profit / max) * (H - P * 2)]);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${pts[pts.length - 1][0]},${H - P} L${pts[0][0]},${H - P} Z`;
  const accent = '#5FBE8E';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }}>
      <defs>
        <linearGradient id="grad-profit" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={accent} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#grad-profit)"/>
      <path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]}
          r={i === pts.length - 1 ? 4 : 2.5}
          fill="#14120C" stroke={accent} strokeWidth="2"/>
      ))}
      {data.map((d, i) => (
        <text key={i} x={pts[i][0]} y={H - 1} textAnchor="middle"
          style={{ fontSize: 9, fill: 'rgba(255,250,235,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          {d.m}
        </text>
      ))}
    </svg>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ScreenStats({ t, d, nav }) {
  const [period, setPeriod] = useState('M');
  const cur = SHOP_STATS.current;
  const months = SHOP_STATS.months;
  const eff = SHOP_STATS.efficiency;
  const maxRev = eff[0].revPerHour;

  const segs = [
    { l: 'Wareneinsatz', v: cur.cost,   c: '#9A4B1F' },
    { l: 'Löhne',        v: cur.wages,  c: '#3A4D7A' },
    { l: 'Fixkosten',    v: cur.fixed,  c: '#7A5A1F' },
    { l: 'Gewinn',       v: cur.profit, c: t.success },
  ];

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} large subtitle="April 2026" title="Statistiken"
        trailing={<>
          <IconBtn icon={Ic.Filter} t={t}/>
          <IconBtn icon={Ic.Doc}    t={t}/>
        </>}/>

      {/* Perioden-Switcher */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', gap: 4, padding: 3, background: t.surfaceAlt, borderRadius: 9 }}>
          {[
            { v: 'W', l: 'Woche'   },
            { v: 'M', l: 'Monat'   },
            { v: 'Q', l: 'Quartal' },
            { v: 'Y', l: 'Jahr'    },
          ].map(({ v, l }) => (
            <button key={v} onClick={() => setPeriod(v)} style={{
              flex: 1, height: 30, borderRadius: 7, border: 0,
              background: period === v ? t.surface : 'transparent',
              color: period === v ? t.fg : t.fgMuted,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Gewinn-Hero */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: t.fg, color: t.bg, borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,250,235,0.55)' }}>
              Gewinn April
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 6,
              background: 'rgba(95,190,142,0.18)', color: '#5FBE8E',
              fontSize: 11, fontWeight: 600,
            }}>
              <Ic.ArrowUp width={10} height={10}/>
              +{(cur.profitDelta * 100).toFixed(1)} %
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <Num size={32} weight={700} style={{ color: t.bg, letterSpacing: '-0.03em' }}>
              {fmtEUR(cur.profit, { maximumFractionDigits: 0 })}
            </Num>
            <span style={{ fontSize: 18, color: 'rgba(255,250,235,0.6)', fontWeight: 500 }}>€</span>
            <span style={{ fontSize: 13, color: 'rgba(255,250,235,0.5)', marginLeft: 6 }}>
              · {(cur.margin * 100).toFixed(1)} % Marge
            </span>
          </div>
          <div style={{ marginTop: 14, marginLeft: -8, marginRight: -8 }}>
            <ProfitChart data={months}/>
          </div>
        </div>
      </div>

      {/* KPI-Grid */}
      <div style={{ padding: '12px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <StatCard t={t} label="Umsatz"
          value={`${fmtEUR(cur.revenue, { maximumFractionDigits: 0 })} €`}
          sub={`+${(cur.revenueDelta * 100).toFixed(1)} % vs März`} trend="up"/>
        <StatCard t={t} label="Ø Bon"
          value={`${fmtEUR(cur.avgCheck)} €`}
          sub={`${cur.coversMonth} Gäste`}/>
        <StatCard t={t} label="Lohnquote"
          value={`${(cur.laborRatio * 100).toFixed(1)} %`}
          sub="Ziel ≤ 28 %"/>
        <StatCard t={t} label="Wareneinsatz"
          value={`${(cur.foodCost * 100).toFixed(1)} %`}
          sub="Ziel ≤ 32 %"/>
      </div>

      {/* Wo geht der Umsatz hin */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Wo geht der Umsatz hin"/>
        <Card t={t} padding={16}>
          {/* Stacked bar */}
          <div style={{ display: 'flex', height: 14, borderRadius: 4, overflow: 'hidden', background: t.chip }}>
            {segs.map((s) => (
              <div key={s.l} style={{ width: `${(s.v / cur.revenue) * 100}%`, background: s.c }}/>
            ))}
          </div>
          {/* Labels */}
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {segs.map((s) => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: t.fgMuted, fontWeight: 600 }}>{s.l}</div>
                  <Num size={12} weight={600} style={{ color: t.fg, display: 'block' }}>
                    {fmtEUR(s.v, { maximumFractionDigits: 0 })} €
                  </Num>
                </div>
                <Num size={11} weight={500} style={{ color: t.fgMuted }}>
                  {((s.v / cur.revenue) * 100).toFixed(0)} %
                </Num>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Effizienz-Ranking */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Effizienz pro Mitarbeiter"/>
        <Card t={t}>
          {eff.map((row, i) => {
            const e = empById(row.id);
            if (!e) return null;
            return (
              <Row key={row.id} t={t} last={i === eff.length - 1}
                   onClick={() => nav.go('employee', { id: row.id })}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: i === 0 ? t.accentSoft : t.surfaceAlt,
                  color: i === 0 ? t.accent : t.fgMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                  fontFamily: '"JetBrains Mono", monospace',
                }}>{i + 1}</div>
                <Avatar emp={e} size={32}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{e.firstName} {e.lastName}</div>
                  <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>
                    ★ {row.rating.toFixed(1)} · {row.covers} Gäste
                  </div>
                  <div style={{ marginTop: 5 }}>
                    <ProgressBar value={row.revPerHour} max={maxRev} t={t} color={e.color}/>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Num size={13} weight={700} style={{ color: t.fg }}>{row.revPerHour}</Num>
                  <div style={{ fontSize: 9, color: t.fgFaint, marginTop: 1, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>€/Std</div>
                </div>
              </Row>
            );
          })}
        </Card>
        <p style={{ fontSize: 11, color: t.fgFaint, padding: '8px 4px 0', lineHeight: 1.5, margin: 0 }}>
          Umsatz pro gearbeiteter Stunde · Service nach Tisch-Umsatz, Küche nach Cover-Anteil.
        </p>
      </div>

      {/* Empfehlung */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Empfehlung"/>
        <Card t={t} padding={14}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: t.accentSoft, color: t.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Ic.Trend width={16} height={16}/>
            </div>
            <div style={{ fontSize: 12, color: t.fg, lineHeight: 1.55 }}>
              <strong style={{ fontWeight: 600 }}>Stoßzeiten:</strong>
              <span style={{ color: t.fgMuted }}>
                {' '}Fr/Sa 19–21 Uhr fährt der Laden auf Vollast. Mo/Di um 13 Uhr ist eine
                zweite Servicekraft nicht notwendig — spart ca. 380 €/Monat.
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Monats-Vergleich */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Monats-Vergleich"/>
        <Card t={t}>
          {/* Header row */}
          <Row t={t}>
            <span style={{ flex: 1, fontSize: 10, color: t.fgFaint, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Monat</span>
            <span style={{ width: 60, textAlign: 'right', fontSize: 10, color: t.fgFaint, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Umsatz</span>
            <span style={{ width: 60, textAlign: 'right', fontSize: 10, color: t.fgFaint, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Gewinn</span>
            <span style={{ width: 38, textAlign: 'right', fontSize: 10, color: t.fgFaint, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Marge</span>
          </Row>
          {[...months].reverse().map((m, i, arr) => {
            const margin = m.profit / m.revenue;
            return (
              <Row key={m.m} t={t} last={i === arr.length - 1}>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: t.fg }}>{m.m}</span>
                <Num size={12} weight={500} style={{ color: t.fg, width: 60, textAlign: 'right' }}>
                  {(m.revenue / 1000).toFixed(1)}k
                </Num>
                <Num size={12} weight={600} style={{ color: t.success, width: 60, textAlign: 'right' }}>
                  {(m.profit / 1000).toFixed(1)}k
                </Num>
                <Num size={12} weight={500} style={{ color: t.fgMuted, width: 38, textAlign: 'right' }}>
                  {(margin * 100).toFixed(0)}%
                </Num>
              </Row>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
