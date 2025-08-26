export default function LoadingDots({ message = "Loading" }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
      <span style={{ fontSize: 22, fontWeight: 500, marginRight: 12 }}>{message}</span>
      <span className="dot-flashing" style={{ width: 40, display: 'inline-block', position: 'relative' }}>
        <span style={{
          animation: 'dotFlashing 1s infinite linear',
          background: '#2563eb',
          borderRadius: '50%',
          display: 'inline-block',
          height: 10,
          width: 10,
          margin: '0 2px',
          position: 'absolute',
          left: 0
        }} />
        <span style={{
          animation: 'dotFlashing 1s infinite linear',
          animationDelay: '0.2s',
          background: '#2563eb',
          borderRadius: '50%',
          display: 'inline-block',
          height: 10,
          width: 10,
          margin: '0 2px',
          position: 'absolute',
          left: 14
        }} />
        <span style={{
          animation: 'dotFlashing 1s infinite linear',
          animationDelay: '0.4s',
          background: '#2563eb',
          borderRadius: '50%',
          display: 'inline-block',
          height: 10,
          width: 10,
          margin: '0 2px',
          position: 'absolute',
          left: 28
        }} />
        <style>{`
          @keyframes dotFlashing {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}</style>
      </span>
    </div>
  );
}
