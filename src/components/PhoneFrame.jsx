export default function PhoneFrame({ children, dark }) {
  return (
    <div style={{
      width: 390, height: 800, borderRadius: 54,
      padding: 12,
      background: dark ? '#0A0907' : '#1A1814',
      boxShadow: '0 30px 80px rgba(20,18,12,0.25), 0 8px 24px rgba(20,18,12,0.12)',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 42,
        overflow: 'hidden', position: 'relative',
        background: '#fff',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 124, height: 36, borderRadius: 999, background: '#000', zIndex: 100,
        }}/>
        {children}
      </div>
    </div>
  );
}
