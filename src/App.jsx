import { useState } from 'react';
import { makeTheme, densities, ACCENT_OPTIONS } from './lib/theme.js';
import Ic from './lib/icons.jsx';
import { TabBar } from './lib/ui.jsx';
import IOSStatusBar from './components/IOSStatusBar.jsx';
import PhoneFrame from './components/PhoneFrame.jsx';
import {
  TweaksPanel, useTweaks,
  TweakSection, TweakToggle, TweakSelect, TweakRadio, TweakSlider,
} from './components/TweaksPanel.jsx';

// Screens (lazy: imported at module level, not lazy-loaded — bundle is small)
import ScreenDashboard  from './screens/Dashboard.jsx';
import ScreenTeam       from './screens/Team.jsx';
import ScreenEmployee   from './screens/Employee.jsx';
import ScreenStats      from './screens/Statistics.jsx';
import ScreenPayroll    from './screens/Payroll.jsx';
import ScreenPayrollRun from './screens/PayrollRun.jsx';
import ScreenPayslip    from './screens/Payslip.jsx';
import ScreenCalc       from './screens/Calculator.jsx';
import ScreenCalendar   from './screens/Calendar.jsx';
import ScreenLeaveDetail from './screens/LeaveDetail.jsx';
import ScreenTips       from './screens/Tips.jsx';
import ScreenTimes         from './screens/Times.jsx';
import ScreenNotifications from './screens/Notifications.jsx';
import ScreenSettings      from './screens/Settings.jsx';

const TWEAK_DEFAULTS = { dark: false, accent: '#3A4D7A', density: 'regular', fontScale: 1 };

const TABS = [
  { id: 'home',     label: 'Übersicht', icon: Ic.Home     },
  { id: 'team',     label: 'Team',      icon: Ic.Team     },
  { id: 'stats',    label: 'Statistik', icon: Ic.Trend    },
  { id: 'payroll',  label: 'Lohn',      icon: Ic.Euro     },
  { id: 'calendar', label: 'Kalender',  icon: Ic.Calendar },
];

export default function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const t = makeTheme(tw.dark, tw.accent);
  const d = densities[tw.density] || densities.regular;

  const [tab, setTab]         = useState('home');
  const [stack, setStack]     = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  const nav = {
    go:       (screen, params = {}) => setStack((s) => [...s, { screen, params }]),
    back:     ()                     => setStack((s) => s.slice(0, -1)),
    tab:      (id)                   => { setStack([]); setTab(id); },
    showNotif: ()                    => setNotifOpen(true),
  };

  const renderTab = () => {
    const props = { t, d, nav };
    if (tab === 'home')     return <ScreenDashboard  {...props}/>;
    if (tab === 'team')     return <ScreenTeam       {...props}/>;
    if (tab === 'times')    return <ScreenTimes      {...props}/>;
    if (tab === 'stats')    return <ScreenStats      {...props}/>;
    if (tab === 'payroll')  return <ScreenPayroll    {...props}/>;
    if (tab === 'calendar') return <ScreenCalendar   {...props}/>;
    return null;
  };

  const renderTop = () => {
    if (stack.length === 0) return renderTab();
    const top = stack[stack.length - 1];
    const props = { t, d, nav, params: top.params };
    if (top.screen === 'employee')    return <ScreenEmployee    {...props}/>;
    if (top.screen === 'payroll-run') return <ScreenPayrollRun {...props}/>;
    if (top.screen === 'payslip')     return <ScreenPayslip    {...props}/>;
    if (top.screen === 'calc')        return <ScreenCalc       {...props}/>;
    if (top.screen === 'leave-detail') return <ScreenLeaveDetail {...props}/>;
    if (top.screen === 'tips')         return <ScreenTips          {...props}/>;
    if (top.screen === 'notifications') return <ScreenNotifications {...props}/>;
    if (top.screen === 'settings')     return <ScreenSettings      {...props}/>;
    return renderTab();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      background: tw.dark ? '#1A1814' : '#E9E6DD',
      transition: 'background 0.2s',
      fontSize: `${tw.fontScale * 100}%`,
    }}>
      <PhoneFrame dark={tw.dark}>
        <div style={{
          height: '100%', display: 'flex', flexDirection: 'column',
          background: t.bg, color: t.fg, position: 'relative',
        }}>
          <IOSStatusBar dark={tw.dark}/>
          <div
            className="scr"
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
          >
            {renderTop()}
          </div>

          {stack.length === 0 && (
            <TabBar
              tabs={TABS}
              active={tab}
              onChange={(id) => { setStack([]); setTab(id); }}
              t={t}
            />
          )}

          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
            width: 134, height: 5, borderRadius: 999,
            background: tw.dark ? '#fff' : '#000', opacity: 0.85,
            pointerEvents: 'none',
          }}/>

          {/* Notification sheet overlay */}
          {notifOpen && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 300 }}>
              <div
                onClick={() => setNotifOpen(false)}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: t.bg,
                borderRadius: '20px 20px 0 0',
                maxHeight: '78%',
                overflowY: 'auto',
                boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
              }}>
                <ScreenNotifications t={t} onClose={() => setNotifOpen(false)} sheetMode/>
              </div>
            </div>
          )}
        </div>
      </PhoneFrame>

      <TweaksPanel>
        <TweakSection label="Erscheinungsbild"/>
        <TweakToggle  label="Dark Mode"    value={tw.dark}    onChange={(v) => setTweak('dark', v)}/>
        <TweakSelect  label="Akzentfarbe"  value={tw.accent}
          options={ACCENT_OPTIONS.map((o) => ({ value: o.v, label: o.l }))}
          onChange={(v) => setTweak('accent', v)}/>
        <TweakSection label="Dichte"/>
        <TweakRadio   label="Layout"       value={tw.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}/>
        <TweakSlider  label="Schriftgröße" value={tw.fontScale}
          min={0.9} max={1.15} step={0.05} unit="×"
          onChange={(v) => setTweak('fontScale', v)}/>
      </TweaksPanel>
    </div>
  );
}
