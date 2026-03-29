import React, { useState, useEffect } from 'react';
import InspectTab from './tabs/InspectTab';
import ReviewTab from './tabs/ReviewTab';

type TabId = 'inspect' | 'review';

const TABS: { id: TabId; label: string }[] = [
  { id: 'inspect', label: '🔍 Inspect' },
  { id: 'review', label: '✨ AI Review' },
];

export default function App() {
  const [active, setActive] = useState<TabId>('review');
  const [screenName, setScreenName] = useState<string>('VSP AI Review');

  useEffect(() => {
    const handler = (event: MessageEvent<{ pluginMessage?: unknown }>) => {
      const msg = event.data?.pluginMessage as { type?: string; data?: { selectionNames?: string[] }; error?: string } | undefined;
      if (!msg || msg.type !== 'selection-result') return;
      if (msg.data?.selectionNames?.length) {
        setScreenName(msg.data.selectionNames.join(', '));
      } else {
        setScreenName('VSP AI Review');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px 0',
        borderBottom: '1px solid #f0f0f0',
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 10,
          letterSpacing: '-0.2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {screenName}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                flex: 1,
                padding: '8px 0',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: active === tab.id ? 600 : 400,
                color: active === tab.id ? '#1a1a1a' : '#999',
                borderBottom: active === tab.id
                  ? '2px solid #1a1a1a'
                  : '2px solid transparent',
                marginBottom: -1,
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {active === 'inspect' && <InspectTab />}
        {active === 'review' && <ReviewTab />}
      </div>
    </div>
  );
}
