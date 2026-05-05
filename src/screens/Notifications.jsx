import Ic from '../lib/icons.jsx';
import { Card, Row, TopBar, IconBtn } from '../lib/ui.jsx';

const GROUPS = [
  {
    label: 'Heute',
    items: [
      { id: 1, Icon: Ic.Beach,  kind: 'warn',   title: 'Urlaubsantrag: Elena Petrova', sub: '25.–29. Mai · 5 Tage · zu genehmigen', time: 'vor 1 Std', unread: true  },
      { id: 2, Icon: Ic.Euro,   kind: 'accent',  title: 'Lohnlauf April fällig',        sub: 'Frist: 30.04. – bitte starten',         time: 'vor 3 Std', unread: true  },
      { id: 3, Icon: Ic.Sick,   kind: 'danger',  title: 'Krankmeldung: Aylin Renner',   sub: 'AU bis 07.05.',                         time: 'vor 5 Std', unread: false },
    ],
  },
  {
    label: 'Gestern',
    items: [
      { id: 4, Icon: Ic.Doc,    kind: 'fg',      title: 'Lohnsteuer-Anmeldung März',    sub: 'Frist 10. Mai – Erinnerung',            time: '4. Mai',    unread: false },
      { id: 5, Icon: Ic.Check,  kind: 'success',  title: 'Lohnlauf März abgeschlossen', sub: '7 Mitarbeiter · 4.213 € ausbezahlt',    time: '4. Mai',    unread: false },
    ],
  },
  {
    label: 'Diese Woche',
    items: [
      { id: 6, Icon: Ic.Tip,    kind: 'accent',  title: 'Trinkgeld KW17 verteilt',      sub: '186 € an 5 Mitarbeiter',               time: '1. Mai',    unread: false },
      { id: 7, Icon: Ic.Doc,    kind: 'fg',      title: 'Gehaltszettel generiert',       sub: 'April 2026 · 7 Mitarbeiter',           time: '30. Apr',   unread: false },
    ],
  },
];

export default function ScreenNotifications({ t, nav }) {
  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar t={t} title="Benachrichtigungen"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}
        trailing={<IconBtn icon={Ic.Check} t={t}/>}
      />

      {GROUPS.map((g) => (
        <div key={g.label} style={{ padding: '12px 16px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.fgFaint, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, paddingLeft: 2 }}>
            {g.label}
          </div>
          <Card t={t}>
            {g.items.map((item, i) => {
              const bg = item.kind === 'warn'    ? t.warnSoft
                : item.kind === 'danger'         ? t.dangerSoft
                : item.kind === 'accent'         ? t.accentSoft
                : item.kind === 'success'        ? t.accentSoft
                : t.surfaceAlt;
              const fg = item.kind === 'warn'    ? t.warn
                : item.kind === 'danger'         ? t.danger
                : item.kind === 'accent'         ? t.accent
                : item.kind === 'success'        ? t.success
                : t.fg;
              return (
                <Row key={item.id} t={t} last={i === g.items.length - 1}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.Icon width={18} height={18}/>
                    </div>
                    {item.unread && (
                      <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 999, background: t.accent, border: `1.5px solid ${t.bg}` }}/>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: item.unread ? 700 : 600, color: t.fg, letterSpacing: '-0.005em' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: t.fgMuted, marginTop: 1 }}>{item.sub}</div>
                  </div>
                  <div style={{ fontSize: 10, color: t.fgFaint, fontWeight: 500, flexShrink: 0, textAlign: 'right' }}>{item.time}</div>
                </Row>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}
