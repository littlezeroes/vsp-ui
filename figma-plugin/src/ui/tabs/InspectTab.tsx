import React, { useState, useEffect } from 'react';
import type { SelectionData } from '../../types';

export default function InspectTab() {
  const [data, setData] = useState<SelectionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestSelection = () => {
    parent.postMessage({ pluginMessage: { type: 'get-selection' } }, '*');
  };

  useEffect(() => {
    requestSelection();

    const handler = (event: MessageEvent<{ pluginMessage?: unknown }>) => {
      const msg = event.data?.pluginMessage as { type?: string; data?: SelectionData; error?: string } | undefined;
      if (!msg || msg.type !== 'selection-result') return;

      if (msg.error) {
        setError(msg.error);
        setData(null);
      } else if (msg.data) {
        setData(msg.data);
        setError(null);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: 16 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
          Selection
        </span>
        <button onClick={requestSelection} style={secondaryBtn}>↻ Refresh</button>
      </div>

      {error && (
        <div style={emptyBox}>{error}</div>
      )}

      {data && (
        <div className="fade-in">
          {/* Frame names */}
          <SectionLabel>Frames ({data.frameCount})</SectionLabel>
          {data.selectionNames.map((name, i) => (
            <Pill key={i}>{name}</Pill>
          ))}

          {/* Components */}
          {data.componentNames.length > 0 && (
            <>
              <SectionLabel>Components ({data.componentNames.length})</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                {data.componentNames.map((c, i) => (
                  <span key={i} style={{
                    padding: '2px 8px',
                    background: '#f0f0f0',
                    borderRadius: 100,
                    fontSize: 11,
                    color: '#555',
                  }}>{c}</span>
                ))}
              </div>
            </>
          )}

          {/* Texts */}
          <SectionLabel>Text nodes ({data.texts.length})</SectionLabel>
          {data.texts.length === 0 ? (
            <div style={{ color: '#bbb', fontSize: 11, marginBottom: 8 }}>
              Không tìm thấy text
            </div>
          ) : (
            data.texts.map((t, i) => (
              <div key={i} style={{
                padding: '8px 10px',
                background: '#fafafa',
                borderRadius: 8,
                marginBottom: 5,
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ fontSize: 10, color: '#bbb', marginBottom: 2 }}>
                  {t.parentName}
                </div>
                <div style={{ fontSize: 12, color: '#1a1a1a', wordBreak: 'break-word' }}>
                  {t.content}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 600,
      color: '#aaa',
      textTransform: 'uppercase',
      letterSpacing: '0.6px',
      marginBottom: 7,
      marginTop: 4,
    }}>
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: '6px 10px',
      background: '#f5f5f5',
      borderRadius: 7,
      fontSize: 12,
      color: '#333',
      marginBottom: 5,
    }}>
      {children}
    </div>
  );
}

const emptyBox: React.CSSProperties = {
  color: '#aaa',
  fontSize: 12,
  padding: '32px 0',
  textAlign: 'center',
};

const secondaryBtn: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: 6,
  border: '1px solid #e0e0e0',
  background: '#fafafa',
  color: '#555',
  fontSize: 11,
  cursor: 'pointer',
  fontWeight: 500,
};
