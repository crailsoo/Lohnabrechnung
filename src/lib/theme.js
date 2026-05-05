export const themes = {
  light: {
    bg: '#F7F6F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F2F0EA',
    border: 'rgba(20,18,12,0.08)',
    borderStrong: 'rgba(20,18,12,0.14)',
    fg: '#14120C',
    fgMuted: 'rgba(20,18,12,0.62)',
    fgFaint: 'rgba(20,18,12,0.44)',
    accent: '#3A4D7A',
    accentFg: '#FFFFFF',
    accentSoft: 'rgba(58,77,122,0.10)',
    danger: '#A33530',
    dangerSoft: 'rgba(163,53,48,0.10)',
    success: '#1F6D4A',
    successSoft: 'rgba(31,109,74,0.10)',
    warn: '#8A6112',
    warnSoft: 'rgba(138,97,18,0.12)',
    chip: '#ECEAE2',
    rowHover: 'rgba(20,18,12,0.04)',
    statusOn: '#1F6D4A',
    statusSick: '#A33530',
    statusLeave: '#8A6112',
    statusOff: 'rgba(20,18,12,0.32)',
  },
  dark: {
    bg: '#0F0E0B',
    surface: '#1A1814',
    surfaceAlt: '#221F1A',
    border: 'rgba(255,250,235,0.08)',
    borderStrong: 'rgba(255,250,235,0.14)',
    fg: '#F5F2E8',
    fgMuted: 'rgba(245,242,232,0.62)',
    fgFaint: 'rgba(245,242,232,0.40)',
    accent: '#8AA3D8',
    accentFg: '#0F0E0B',
    accentSoft: 'rgba(138,163,216,0.14)',
    danger: '#E8736E',
    dangerSoft: 'rgba(232,115,110,0.14)',
    success: '#5FBE8E',
    successSoft: 'rgba(95,190,142,0.14)',
    warn: '#D4A85A',
    warnSoft: 'rgba(212,168,90,0.14)',
    chip: '#2A2620',
    rowHover: 'rgba(255,250,235,0.04)',
    statusOn: '#5FBE8E',
    statusSick: '#E8736E',
    statusLeave: '#D4A85A',
    statusOff: 'rgba(245,242,232,0.30)',
  },
};

export function hexA(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((x) => x + x).join('') : h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

export function makeTheme(dark, accent) {
  const base = dark ? themes.dark : themes.light;
  if (!accent) return base;
  const soft = dark ? hexA(accent, 0.16) : hexA(accent, 0.10);
  return { ...base, accent, accentSoft: soft };
}

export const densities = {
  compact: { rowH: 48, pad: 12, gap: 8,  sectionGap: 16, cardPad: 14 },
  regular: { rowH: 56, pad: 14, gap: 10, sectionGap: 20, cardPad: 16 },
  comfy:   { rowH: 64, pad: 16, gap: 12, sectionGap: 24, cardPad: 20 },
};

export const ACCENT_OPTIONS = [
  { v: '#3A4D7A', l: 'Indigo' },
  { v: '#1F6D4A', l: 'Eichengrün' },
  { v: '#9A4B1F', l: 'Burger' },
  { v: '#7A2E2E', l: 'Bordeaux' },
];
