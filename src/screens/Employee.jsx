import Ic from '../lib/icons.jsx';
import {
  Avatar, Chip, Card, Row, Num, TopBar, IconBtn,
  SectionHead, ProgressBar, SecondaryBtn,
} from '../lib/ui.jsx';
import { empById } from '../data/employees.js';
import { fmtEUR, fmtH, calcNetto } from '../data/helpers.js';

export default function ScreenEmployee({ t, d, nav, params }) {
  const e = empById(params.id);
  if (!e) return null;
  const isMinijob = e.type === 'Minijob';
  const brutto = e.monthlySalary || (e.hourlyRate * e.hoursThisMonth);
  const calc = calcNetto(brutto, e.taxClass, isMinijob);

  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar
        t={t}
        title="Mitarbeiter"
        leading={<IconBtn icon={Ic.ChevronL} t={t} onClick={() => nav.back()}/>}
        trailing={<IconBtn icon={Ic.More} t={t}/>}
      />

      {/* Profil-Header */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar emp={e} size={64}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.fg, letterSpacing: '-0.02em' }}>
            {e.firstName} {e.lastName}
          </h1>
          <div style={{ fontSize: 13, color: t.fgMuted, marginTop: 2 }}>{e.role}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <Chip t={t} tone="accent">{e.type}</Chip>
            <Chip t={t}>seit {e.started}</Chip>
          </div>
        </div>
      </div>

      {/* Kontakt-Schnellzugriff */}
      <div style={{ padding: '0 16px', display: 'flex', gap: 8 }}>
        <SecondaryBtn t={t} icon={Ic.Phone} style={{ flex: 1, justifyContent: 'center' }}>Anruf</SecondaryBtn>
        <SecondaryBtn t={t} icon={Ic.Mail}  style={{ flex: 1, justifyContent: 'center' }}>Mail</SecondaryBtn>
        <SecondaryBtn t={t} icon={Ic.Calc}  style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => nav.go('payslip', { id: e.id })}>Abrechnung</SecondaryBtn>
      </div>

      {/* Dieser Monat */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Dieser Monat · April 2026"/>
        <Card t={t} padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 500 }}>Stunden gearbeitet</span>
            <Num size={14} weight={600} style={{ color: t.fg }}>
              {fmtH(e.hoursThisMonth)}{' '}
              <span style={{ color: t.fgFaint, fontWeight: 500 }}>/ {fmtH(e.hoursTarget)}</span>
            </Num>
          </div>
          <ProgressBar value={e.hoursThisMonth} max={e.hoursTarget} t={t} color={e.color}/>
          <div style={{ height: 1, background: t.border, margin: '14px 0' }}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Brutto</div>
              <Num size={18} weight={700} style={{ color: t.fg }}>{fmtEUR(brutto)} €</Num>
            </div>
            <div>
              <div style={{ fontSize: 11, color: t.fgMuted, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Netto</div>
              <Num size={18} weight={700} style={{ color: t.success }}>{fmtEUR(calc.netto)} €</Num>
            </div>
          </div>
        </Card>
      </div>

      {/* Stammdaten */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Stammdaten"/>
        <Card t={t}>
          {[
            { l: 'Steuerklasse', v: e.taxClass,                 mono: true  },
            { l: 'SV-Nummer',    v: e.sv,                        mono: true  },
            { l: 'Stundensatz',  v: `${fmtEUR(e.hourlyRate)} €/h`, mono: true  },
            { l: 'IBAN',         v: e.iban,                      mono: true  },
            { l: 'Geburtstag',   v: e.birthday,                  mono: false },
            { l: 'Telefon',      v: e.phone,                     mono: false },
            { l: 'Adresse',      v: e.address,                   mono: false },
          ].map((row, i, arr) => (
            <Row key={row.l} t={t} last={i === arr.length - 1}>
              <span style={{ fontSize: 13, color: t.fgMuted, flex: 1 }}>{row.l}</span>
              {row.mono ? (
                <Num size={13} weight={500} style={{ color: t.fg }}>{row.v}</Num>
              ) : (
                <span style={{ fontSize: 13, color: t.fg, fontWeight: 500, textAlign: 'right' }}>{row.v}</span>
              )}
            </Row>
          ))}
        </Card>
      </div>

      {/* Letzte Abrechnungen */}
      <div style={{ padding: '20px 16px 0' }}>
        <SectionHead t={t} title="Abrechnungen" action={{ label: 'Alle' }}/>
        <Card t={t}>
          {['März 2026', 'Februar 2026', 'Januar 2026'].map((m, i, arr) => (
            <Row key={m} t={t} last={i === arr.length - 1}
                 onClick={() => nav.go('payslip', { id: e.id, month: m })}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: t.accentSoft, color: t.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ic.Doc width={16} height={16}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.fg }}>{m}</div>
                <div style={{ fontSize: 12, color: t.fgMuted, marginTop: 1 }}>PDF · gezahlt</div>
              </div>
              <Num size={14} weight={600} style={{ color: t.fg }}>
                {fmtEUR(brutto * (1 - 0.05 * i))} €
              </Num>
              <Ic.ChevronR width={16} height={16} style={{ color: t.fgFaint }}/>
            </Row>
          ))}
        </Card>
      </div>
    </div>
  );
}
