import Ic from '../lib/icons.jsx';
import { Avatar, Card, Row, Num, TopBar, IconBtn, SectionHead, ProgressBar, PrimaryBtn } from '../lib/ui.jsx';
import { empById } from '../data/employees.js';
import { TIPS_WEEK } from '../data/events.js';
import { fmtEUR } from '../data/helpers.js';

export default function ScreenTips({ t, nav }) {
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar t={t} title="Trinkgeld verteilen"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}/>

      {/* Pool-Hero */}
      <div style={{ padding: '12px 16px 0' }}>
        <Card t={t} padding={20}>
          <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            KW 18 · Pool
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <Num size={32} weight={700} style={{ color: t.fg, letterSpacing: '-0.02em' }}>
              {fmtEUR(TIPS_WEEK.total)}
            </Num>
            <span style={{ fontSize: 18, color: t.fgMuted }}>€</span>
          </div>
          <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 4 }}>
            Verteilung nach Service-Stunden
          </div>
        </Card>
      </div>

      {/* Anteile */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Anteile"/>
        <Card t={t}>
          {TIPS_WEEK.pool.filter((p) => p.share > 0).map((p, i, arr) => {
            const e = empById(p.empId);
            const pct = p.share / TIPS_WEEK.total;
            return (
              <Row key={p.empId} t={t} last={i === arr.length - 1}>
                <Avatar emp={e} size={32}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>
                    {e.firstName} {e.lastName}
                  </div>
                  <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>
                    {p.hours} Service-Std · {(pct * 100).toFixed(0)} %
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <ProgressBar value={p.share} max={TIPS_WEEK.total} t={t} color={e.color}/>
                  </div>
                </div>
                <Num size={14} weight={700} style={{ color: t.fg }}>{fmtEUR(p.share)} €</Num>
              </Row>
            );
          })}
        </Card>
      </div>

      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        padding: '12px 16px', background: t.bg,
        borderTop: `0.5px solid ${t.border}`,
      }}>
        <PrimaryBtn t={t} icon={Ic.Bank} onClick={() => nav.back()}>
          Auszahlen via SEPA
        </PrimaryBtn>
      </div>
    </div>
  );
}
