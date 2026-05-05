import Ic from '../lib/icons.jsx';
import { Avatar, Chip, Card, Row, Num, TopBar, IconBtn, SectionHead, PrimaryBtn, SecondaryBtn } from '../lib/ui.jsx';
import { RAPHIS_TEAM, empById } from '../data/employees.js';

export default function ScreenLeaveDetail({ t, nav }) {
  const e = empById('el'); // Elena Petrova's leave request
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar t={t} title="Urlaubsantrag"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}/>

      <div style={{ padding: '12px 16px 0' }}>
        <Card t={t} padding={20}>
          {/* Mitarbeiter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar emp={e} size={48}/>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.fg }}>{e.firstName} {e.lastName}</div>
              <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 2 }}>{e.role}</div>
            </div>
          </div>
          <div style={{ height: 1, background: t.border, margin: '4px 0 16px' }}/>

          {/* Zeitraum */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: t.fgMuted, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Von</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: t.fg, marginTop: 4 }}>25. Mai</div>
              <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 2 }}>Montag</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.fgMuted, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Bis</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: t.fg, marginTop: 4 }}>29. Mai</div>
              <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 2 }}>Freitag</div>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginTop: 16, padding: 12, background: t.surfaceAlt, borderRadius: 10 }}>
            {[
              { l: 'Arbeitstage',                          v: '5 Tage'       },
              { l: 'Verbleibend nach Genehmigung',         v: '13 / 24 Tage' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: t.fgMuted }}>{row.l}</span>
                <Num size={12} weight={600} style={{ color: t.fg }}>{row.v}</Num>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: t.fgMuted }}>Konflikte</span>
              <Chip t={t} tone="success">Keine</Chip>
            </div>
          </div>
        </Card>
      </div>

      {/* Wer ist da */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Während des Zeitraums im Dienst"/>
        <Card t={t}>
          {RAPHIS_TEAM.filter((e2) => e2.id !== 'el' && e2.role.includes('Service')).map((e2, i, arr) => (
            <Row key={e2.id} t={t} last={i === arr.length - 1}>
              <Avatar emp={e2} size={32}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.fg }}>{e2.firstName} {e2.lastName}</div>
                <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>{e2.role}</div>
              </div>
              <Chip t={t} tone="success">verfügbar</Chip>
            </Row>
          ))}
        </Card>
      </div>

      {/* Aktionen */}
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0,
        padding: '12px 16px', background: t.bg,
        borderTop: `0.5px solid ${t.border}`,
        display: 'flex', gap: 8,
      }}>
        <SecondaryBtn t={t} icon={Ic.X} style={{ flex: 1, height: 48, justifyContent: 'center', color: t.danger, borderColor: t.border }}>
          Ablehnen
        </SecondaryBtn>
        <PrimaryBtn t={t} icon={Ic.Check} style={{ flex: 1 }} onClick={() => nav.back()}>
          Genehmigen
        </PrimaryBtn>
      </div>
    </div>
  );
}
