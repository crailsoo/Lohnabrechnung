// Stroke-only line icons — 1.75 px stroke, currentColor, no fill.

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.75', strokeLinecap: 'round', strokeLinejoin: 'round' };

export function Home(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>; }
export function Team(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.7-3.4 3.4-5 6-5s5.3 1.6 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21 19c-.4-2.4-2-4-4-4"/></svg>; }
export function Clock(p)     { return <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>; }
export function Euro(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M18 6.5a7 7 0 1 0 0 11"/><path d="M4 10h9M4 14h9"/></svg>; }
export function Calendar(p)  { return <svg viewBox="0 0 24 24" {...S} {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>; }
export function ChevronR(p)  { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="m9 6 6 6-6 6"/></svg>; }
export function ChevronL(p)  { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="m15 6-6 6 6 6"/></svg>; }
export function ChevronD(p)  { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="m6 9 6 6 6-6"/></svg>; }
export function Plus(p)      { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="M12 5v14M5 12h14"/></svg>; }
export function Search(p)    { return <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>; }
export function Filter(p)    { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>; }
export function More(p)      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" {...p}><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></svg>; }
export function Check(p)     { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="m5 12 5 5 9-11"/></svg>; }
export function X(p)         { return <svg viewBox="0 0 24 24" {...S} strokeWidth="2" {...p}><path d="M6 6 18 18M18 6 6 18"/></svg>; }
export function Bell(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>; }
export function Doc(p)       { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>; }
export function Bank(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M3 10 12 4l9 6"/><path d="M5 10v8M19 10v8M9 10v8M15 10v8"/><path d="M3 21h18"/></svg>; }
export function Sick(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 4v16M4 12h16"/></svg>; }
export function Beach(p)     { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 21h16"/><path d="M12 21V8"/><path d="M12 8c-3 0-6 2-7 5h14c-1-3-4-5-7-5"/><circle cx="17" cy="5" r="2"/></svg>; }
export function Calc(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>; }
export function ArrowDown(p) { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 5v14M6 13l6 6 6-6"/></svg>; }
export function ArrowUp(p)   { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 19V5M6 11l6-6 6 6"/></svg>; }
export function Tip(p)       { return <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 10.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.3-1 1.7-3 2.2-3 .9-3 2.2S10.3 16 12 16s3-1.1 3-2.5"/></svg>; }
export function Phone(p)     { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>; }
export function Mail(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>; }
export function MapPin(p)    { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12"/><circle cx="12" cy="9" r="2.5"/></svg>; }
export function Settings(p)  { return <svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>; }
export function Trend(p)     { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M3 17 9 11l4 4 8-8"/><path d="M14 4h7v7"/></svg>; }
export function Cake(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M3 21h18M5 21V11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10M5 15h14M9 9V5l3-2 3 2v4"/></svg>; }
export function Play(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><path d="M6 4v16l14-8z" fill="currentColor"/></svg>; }
export function Lock(p)      { return <svg viewBox="0 0 24 24" {...S} {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>; }

// namespace object for convenience (mirrors prototype's Ic.*)
const Ic = {
  Home, Team, Clock, Euro, Calendar,
  ChevronR, ChevronL, ChevronD,
  Plus, Search, Filter, More,
  Check, X, Bell, Doc, Bank,
  Sick, Beach, Calc, ArrowDown, ArrowUp,
  Tip, Phone, Mail, MapPin, Settings, Trend, Cake, Play, Lock,
};

export default Ic;
