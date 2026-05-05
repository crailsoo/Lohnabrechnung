import { useState } from 'react';
import Ic from '../lib/icons.jsx';
import { Avatar, StatusDot, Card, Row, Num, TopBar, IconBtn } from '../lib/ui.jsx';
import { RAPHIS_TEAM } from '../data/employees.js';
import { fmtEUR, fmtH } from '../data/helpers.js';

const FILTERS = ['Alle', 'Vollzeit', 'Teilzeit', 'Minijob', 'Aushilfe'];

export default function ScreenTeam({ t, d, nav }) {
  const [filter, setFilter] = useState('Alle');
  const list = filter === 'Alle' ? RAPHIS_TEAM : RAPHIS_TEAM.filter((e) => e.type === filter);

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar
        t={t} large
        subtitle={`${RAPHIS_TEAM.length} Mitarbeiter · Raphis Burger`}
        title="Team"
        trailing={<>
          <IconBtn icon={Ic.Search} t={t}/>
          <IconBtn icon={Ic.Plus}   t={t} onClick={() => nav.go('add-employee')}/>
        </>}
      />

      {/* Filter chips */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 12px', borderRadius: 8,
            background: filter === f ? t.fg  : t.surface,
            color:      filter === f ? t.bg  : t.fg,
            border:     filter === f ? 'none' : `0.5px solid ${t.border}`,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      {/* Liste */}
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          {list.map((e, i) => (
            <Row key={e.id} t={t} last={i === list.length - 1}
                 onClick={() => nav.go('employee', { id: e.id })}>
              <Avatar emp={e} size={40}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.fg, letterSpacing: '-0.005em' }}>
                    {e.firstName} {e.lastName}
                  </span>
                  <StatusDot status={e.status} t={t}/>
                </div>
                <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 2 }}>
                  {e.role} · {e.type}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Num size={13} weight={600} style={{ color: t.fg }}>{fmtH(e.hoursThisMonth)}</Num>
                <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 2 }}>
                  {fmtEUR(e.hourlyRate)} €/h
                </div>
              </div>
            </Row>
          ))}
        </Card>

        {/* Summary */}
        <div style={{ marginTop: 16, padding: '0 4px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Stunden gesamt
            </div>
            <Num size={18} weight={700} style={{ color: t.fg }}>
              {fmtH(list.reduce((s, e) => s + e.hoursThisMonth, 0))}
            </Num>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Lohnsumme
            </div>
            <Num size={18} weight={700} style={{ color: t.fg }}>
              {fmtEUR(list.reduce((s, e) => s + e.hourlyRate * e.hoursThisMonth, 0))} €
            </Num>
          </div>
        </div>
      </div>
    </div>
  );
}
