import Ic from '../lib/icons.jsx';
import { Card, Row, TopBar, IconBtn } from '../lib/ui.jsx';

function SettingsRow({ t, icon: Icon, iconKind = 'fg', label, value, last, onClick, destructive }) {
  const bg = iconKind === 'accent'  ? t.accentSoft
    : iconKind === 'warn'           ? t.warnSoft
    : iconKind === 'danger'         ? t.dangerSoft
    : t.surfaceAlt;
  const fg = iconKind === 'accent'  ? t.accent
    : iconKind === 'warn'           ? t.warn
    : iconKind === 'danger'         ? t.danger
    : t.fgMuted;
  return (
    <Row t={t} last={last} onClick={onClick}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon width={16} height={16}/>
      </div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: destructive ? t.danger : t.fg }}>{label}</div>
      {value && <div style={{ fontSize: 13, color: t.fgMuted, marginRight: 4 }}>{value}</div>}
      <Ic.ChevronR width={16} height={16} style={{ color: t.fgFaint }}/>
    </Row>
  );
}

function SectionLabel({ t, label }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: t.fgFaint, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px 18px 6px' }}>
      {label}
    </div>
  );
}

export default function ScreenSettings({ t, nav }) {
  return (
    <div style={{ paddingBottom: 40 }}>
      <TopBar t={t} title="Einstellungen"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}
      />

      {/* Restaurant */}
      <SectionLabel t={t} label="Betrieb"/>
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          <SettingsRow t={t} icon={Ic.MapPin}  iconKind="accent" label="Raphis Burger"         value="Musterstr. 12, Berlin"/>
          <SettingsRow t={t} icon={Ic.Doc}     iconKind="accent" label="Steuernummer"           value="27/234/56789"/>
          <SettingsRow t={t} icon={Ic.Bank}    iconKind="accent" label="SEPA-Gläubiger-ID"      value="DE98ZZZ09999999999" last/>
        </Card>
      </div>

      {/* Abrechnung */}
      <SectionLabel t={t} label="Lohnabrechnung"/>
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          <SettingsRow t={t} icon={Ic.Euro}    iconKind="accent" label="Abrechnungsperiode"     value="Monatlich"/>
          <SettingsRow t={t} icon={Ic.Calendar} iconKind="accent" label="Zahlungsziel"          value="Letzter Arbeitstag"/>
          <SettingsRow t={t} icon={Ic.Lock}    iconKind="warn"   label="Steuerklassen"          value="verwalten"/>
          <SettingsRow t={t} icon={Ic.Bank}    iconKind="accent" label="Bankkonto (SEPA)"       value="DE89 3704 …" last/>
        </Card>
      </div>

      {/* Benachrichtigungen */}
      <SectionLabel t={t} label="Benachrichtigungen"/>
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          <SettingsRow t={t} icon={Ic.Bell}    iconKind="accent" label="Lohnlauf-Erinnerung"    value="3 Tage vorher"/>
          <SettingsRow t={t} icon={Ic.Beach}   iconKind="warn"   label="Urlaubsanträge"         value="Sofort"/>
          <SettingsRow t={t} icon={Ic.Sick}    iconKind="danger" label="Krankmeldungen"         value="Sofort" last/>
        </Card>
      </div>

      {/* App */}
      <SectionLabel t={t} label="App"/>
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          <SettingsRow t={t} icon={Ic.Settings} iconKind="accent" label="Darstellung"           value="Anpassen"/>
          <SettingsRow t={t} icon={Ic.Doc}     iconKind="accent"  label="Datenschutz"/>
          <SettingsRow t={t} icon={Ic.Doc}     iconKind="accent"  label="Impressum" last/>
        </Card>
      </div>

      {/* Konto */}
      <SectionLabel t={t} label="Konto"/>
      <div style={{ padding: '0 16px' }}>
        <Card t={t}>
          <SettingsRow t={t} icon={Ic.Mail}    iconKind="accent" label="E-Mail"                value="raphi@burgerladen.de"/>
          <SettingsRow t={t} icon={Ic.Lock}    iconKind="accent" label="Passwort ändern"/>
          <SettingsRow t={t} icon={Ic.X}       iconKind="danger" label="Abmelden"               destructive last/>
        </Card>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: t.fgFaint }}>
        Lohnabrechnung v1.0.0 · Raphis Burger GmbH
      </div>
    </div>
  );
}
