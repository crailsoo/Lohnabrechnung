import Ic from './icons.jsx';

// ─── Avatar ──────────────────────────────────────────────────────────────────
export function Avatar({ emp, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: emp.color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 600, fontSize: Math.round(size * 0.36),
      letterSpacing: '0.02em', flexShrink: 0,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>{emp.initials}</div>
  );
}

// ─── StatusDot ───────────────────────────────────────────────────────────────
export function StatusDot({ status, t, size = 8 }) {
  const c = status === 'on'    ? t.statusOn
    : status === 'sick'        ? t.statusSick
    : status === 'leave'       ? t.statusLeave
    : t.statusOff;
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      borderRadius: 999, background: c, flexShrink: 0,
    }}/>
  );
}

export const STATUS_LABEL = { on: 'Im Dienst', off: 'Nicht im Dienst', sick: 'Krank', leave: 'Urlaub' };

// ─── Chip ────────────────────────────────────────────────────────────────────
export function Chip({ children, t, tone = 'default', style = {} }) {
  const tones = {
    default: { bg: t.chip,        fg: t.fgMuted  },
    accent:  { bg: t.accentSoft,  fg: t.accent   },
    success: { bg: t.successSoft, fg: t.success  },
    danger:  { bg: t.dangerSoft,  fg: t.danger   },
    warn:    { bg: t.warnSoft,    fg: t.warn     },
  };
  const c = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 6,
      background: c.bg, color: c.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
      lineHeight: 1.4, whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, t, style = {}, padding }) {
  return (
    <div style={{
      background: t.surface, borderRadius: 14,
      border: `0.5px solid ${t.border}`,
      padding: padding != null ? padding : 0,
      overflow: 'hidden',
      ...style,
    }}>{children}</div>
  );
}

// ─── SectionHead ─────────────────────────────────────────────────────────────
export function SectionHead({ title, action, t, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 4px 8px', ...style,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: t.fgMuted,
      }}>{title}</div>
      {action && (
        <button onClick={action.onClick} style={{
          background: 'transparent', border: 0, padding: 0,
          color: t.accent, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', letterSpacing: '-0.005em',
        }}>{action.label}</button>
      )}
    </div>
  );
}

// ─── Row ─────────────────────────────────────────────────────────────────────
export function Row({ children, onClick, t, last, style = {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px',
        borderBottom: last ? 'none' : `0.5px solid ${t.border}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.1s',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = t.rowHover; }}
      onMouseLeave={(e) => { if (onClick) e.currentTarget.style.background = 'transparent'; }}
    >{children}</div>
  );
}

// ─── Num ─────────────────────────────────────────────────────────────────────
export function Num({ children, mono = true, weight = 600, size = 14, color, style = {} }) {
  return (
    <span style={{
      fontFamily: mono ? '"JetBrains Mono", ui-monospace, monospace' : 'Inter, system-ui',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: weight, fontSize: size, color,
      letterSpacing: mono ? '-0.01em' : 0,
      ...style,
    }}>{children}</span>
  );
}

// ─── TopBar ──────────────────────────────────────────────────────────────────
export function TopBar({ title, subtitle, leading, trailing, t, large = false }) {
  return (
    <div style={{
      padding: large ? '8px 20px 12px' : '10px 16px',
      display: 'flex', alignItems: large ? 'flex-end' : 'center',
      justifyContent: 'space-between', gap: 10,
      borderBottom: large ? 'none' : `0.5px solid ${t.border}`,
      background: t.bg,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        {leading}
        <div style={{ minWidth: 0 }}>
          {large ? (
            <>
              {subtitle && (
                <div style={{
                  fontSize: 12, fontWeight: 600, color: t.fgMuted,
                  letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2,
                }}>{subtitle}</div>
              )}
              <h1 style={{
                margin: 0, fontSize: 26, fontWeight: 700, color: t.fg,
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>{title}</h1>
            </>
          ) : (
            <div style={{
              fontSize: 16, fontWeight: 600, color: t.fg, letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{title}</div>
          )}
        </div>
      </div>
      {trailing && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {trailing}
        </div>
      )}
    </div>
  );
}

// ─── IconBtn ─────────────────────────────────────────────────────────────────
export function IconBtn({ icon: Icon, onClick, t, size = 32, badge }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 8,
      background: 'transparent', border: 0, padding: 0,
      color: t.fg, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <Icon width={20} height={20}/>
      {badge && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 8, height: 8, borderRadius: 999, background: t.danger,
        }}/>
      )}
    </button>
  );
}

// ─── TabBar ──────────────────────────────────────────────────────────────────
export function TabBar({ tabs, active, onChange, t }) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
      borderTop: `0.5px solid ${t.border}`,
      background: t.surface,
      paddingBottom: 18,
      paddingTop: 6,
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            background: 'transparent', border: 0, padding: '6px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? t.accent : t.fgFaint,
            cursor: 'pointer',
          }}>
            <Icon width={22} height={22}/>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.01em' }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── StatCard ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, trend, t }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: t.surface, borderRadius: 12,
      border: `0.5px solid ${t.border}`,
      padding: '14px 14px 12px',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: t.fgMuted, marginBottom: 8,
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <Num size={22} weight={700} style={{ color: t.fg }}>{value}</Num>
      </div>
      {sub && (
        <div style={{ marginTop: 4, fontSize: 11, color: t.fgMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
          {trend === 'up'   && <Ic.ArrowUp   width={11} height={11} style={{ color: t.success }}/>}
          {trend === 'down' && <Ic.ArrowDown width={11} height={11} style={{ color: t.danger  }}/>}
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── PrimaryBtn ──────────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onClick, t, icon, disabled, danger, style = {} }) {
  const Icon = icon;
  const bg = danger ? t.danger : t.accent;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', height: 48, borderRadius: 12,
      background: disabled ? t.chip : bg,
      color: disabled ? t.fgFaint : t.accentFg,
      border: 0, fontSize: 15, fontWeight: 600,
      letterSpacing: '-0.005em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      ...style,
    }}>
      {Icon && <Icon width={18} height={18}/>}
      {children}
    </button>
  );
}

// ─── SecondaryBtn ────────────────────────────────────────────────────────────
export function SecondaryBtn({ children, onClick, t, icon, style = {} }) {
  const Icon = icon;
  return (
    <button onClick={onClick} style={{
      height: 40, borderRadius: 10, padding: '0 14px',
      background: 'transparent', color: t.fg,
      border: `0.5px solid ${t.borderStrong}`,
      fontSize: 13, fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      ...style,
    }}>
      {Icon && <Icon width={15} height={15}/>}
      {children}
    </button>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, t, color, height = 4 }) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div style={{
      width: '100%', height, borderRadius: height,
      background: t.chip, overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct * 100}%`, height: '100%',
        background: color || t.accent,
        transition: 'width 0.3s',
      }}/>
    </div>
  );
}
