// Formatting helpers + German payroll calculation (simplified demo)

export function fmtEUR(n, opts = {}) {
  if (n == null) return '–';
  const merged = { minimumFractionDigits: 2, maximumFractionDigits: 2, ...opts };
  // Prevent Intl crash when max < min
  if (merged.maximumFractionDigits < merged.minimumFractionDigits) {
    merged.minimumFractionDigits = merged.maximumFractionDigits;
  }
  return new Intl.NumberFormat('de-DE', merged).format(n);
}

export function fmtH(n) {
  if (n == null) return '–';
  return n.toFixed(1).replace('.', ',') + ' h';
}

// Simplified Brutto → Netto (2026 DE). Not for official use.
export function calcNetto(brutto, taxClass = 'I', isMinijob = false) {
  if (isMinijob) {
    return {
      brutto, lohnsteuer: 0, soli: 0, kv: 0, rv: 0, av: 0, pv: 0,
      netto: brutto,
      agAnteil: brutto * 0.30,
    };
  }
  const lohnsteuerRate = taxClass === 'V' ? 0.22 : taxClass === 'III' ? 0.04 : 0.13;
  const lohnsteuer = brutto * lohnsteuerRate;
  const soli = lohnsteuer * 0.055;
  const kv   = brutto * 0.073;
  const rv   = brutto * 0.093;
  const av   = brutto * 0.013;
  const pv   = brutto * 0.018;
  const netto = brutto - lohnsteuer - soli - kv - rv - av - pv;
  return { brutto, lohnsteuer, soli, kv, rv, av, pv, netto, agAnteil: kv + rv + av + pv };
}
