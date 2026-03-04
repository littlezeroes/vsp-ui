import React, { useState, useEffect } from 'react';
import type { SelectionData, ReviewResult, SpellingIssue, UXCopyIssue, UXSuggestion } from '../../types';
import { reviewWithClaude } from '../claude-api';

const API_KEY_STORAGE = 'vsp-claude-api-key';

export default function ReviewTab() {
  // API Key state
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Selection state
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  // Review state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Load saved API key
  useEffect(() => {
    const saved = localStorage.getItem(API_KEY_STORAGE);
    if (saved) {
      setApiKey(saved);
      setShowKeyInput(false);
    } else {
      setShowKeyInput(true);
    }
  }, []);

  // Listen for selection updates
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'get-selection' } }, '*');

    const handler = (event: MessageEvent<{ pluginMessage?: unknown }>) => {
      const msg = event.data?.pluginMessage as { type?: string; data?: SelectionData; error?: string } | undefined;
      if (!msg || msg.type !== 'selection-result') return;

      if (msg.error) {
        setSelectionError(msg.error);
        setSelection(null);
      } else if (msg.data) {
        setSelection(msg.data);
        setSelectionError(null);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const saveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;
    localStorage.setItem(API_KEY_STORAGE, trimmed);
    setApiKey(trimmed);
    setShowKeyInput(false);
    setApiKeyInput('');
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey('');
    setApiKeyInput('');
    setShowKeyInput(true);
  };

  const handleAnalyze = async () => {
    if (!selection || !apiKey || loading) return;
    setLoading(true);
    setResult(null);
    setReviewError(null);

    try {
      const res = await reviewWithClaude(apiKey, selection);
      setResult(res);
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    parent.postMessage({ pluginMessage: { type: 'get-selection' } }, '*');
  };

  const totalIssues = result
    ? result.spelling.length + result.ux_copy.length + result.ux_suggestions.length
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* API Key bar */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #f5f5f5', flexShrink: 0 }}>
        {showKeyInput ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              type="password"
              placeholder="Anthropic API Key (sk-ant-...)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveApiKey()}
              autoFocus
              style={inputStyle}
            />
            <button onClick={saveApiKey} style={primaryBtn} disabled={!apiKeyInput.trim()}>
              Lưu
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: '#888' }}>
              🔑 ••••••••{apiKey.slice(-4)}
            </span>
            <button onClick={clearApiKey} style={ghostBtn}>Đổi key</button>
          </div>
        )}
      </div>

      {/* Selection bar */}
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid #f5f5f5',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <span style={{ fontSize: 11, color: selectionError ? '#f5222d' : selection ? '#15803d' : '#aaa', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectionError
            ? `⚠ ${selectionError}`
            : selection
              ? `✓ ${selection.selectionNames.join(', ')} · ${selection.texts.length} text`
              : 'Chưa chọn frame'}
        </span>
        <button onClick={refresh} style={ghostBtn}>↻</button>
      </div>

      {/* Analyze button */}
      <div style={{ padding: '12px 16px', flexShrink: 0 }}>
        <button
          onClick={handleAnalyze}
          disabled={!selection || !apiKey || loading}
          style={{
            ...primaryBtn,
            width: '100%',
            padding: '10px 16px',
            fontSize: 13,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: (!selection || !apiKey || loading) ? 0.45 : 1,
            cursor: (!selection || !apiKey || loading) ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <span className="spin" style={{ fontSize: 14 }}>⟳</span>
              Claude đang phân tích...
            </>
          ) : (
            '✨ Phân tích với Claude AI'
          )}
        </button>
      </div>

      {/* Results area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>

        {reviewError && (
          <div className="fade-in" style={{
            padding: '10px 12px',
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            borderRadius: 8,
            fontSize: 12,
            color: '#cf1322',
            marginBottom: 12,
          }}>
            {reviewError}
          </div>
        )}

        {!loading && !result && !reviewError && (
          <EmptyState hasKey={!!apiKey} hasSelection={!!selection} />
        )}

        {result && (
          <div className="fade-in">
            {/* Summary bar */}
            <div style={{
              padding: '10px 12px',
              background: totalIssues === 0 ? '#f0fdf4' : '#fffbeb',
              border: `1px solid ${totalIssues === 0 ? '#bbf7d0' : '#fde68a'}`,
              borderRadius: 8,
              fontSize: 12,
              color: totalIssues === 0 ? '#15803d' : '#92400e',
              marginBottom: 14,
            }}>
              {totalIssues === 0 ? '✅ ' : '⚠️ '}
              {result.summary || (totalIssues === 0 ? 'Design trông ổn!' : `Tìm thấy ${totalIssues} điểm cần cải thiện`)}
            </div>

            <SpellingSection items={result.spelling} />
            <UXCopySection items={result.ux_copy} />
            <UXSuggestionsSection items={result.ux_suggestions} />

            {totalIssues === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#aaa' }}>
                <div style={{ fontSize: 28 }}>🎉</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>Không có vấn đề nào được phát hiện</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sections ─────────────────────────────────────────────────────────

function SpellingSection({ items }: { items: SpellingIssue[] }) {
  if (items.length === 0) return null;
  return (
    <CollapsibleSection
      emoji="🔤"
      title="Chính tả & Ngữ pháp"
      count={items.length}
      accentColor="#dc2626"
    >
      {items.map((item, i) => (
        <IssueCard key={i}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
            <Tag color="#fef2f2" text="#dc2626" line>{item.original}</Tag>
            <span style={{ color: '#ccc', fontSize: 10 }}>→</span>
            <Tag color="#f0fdf4" text="#16a34a" bold>{item.correction}</Tag>
            <SeverityBadge severity={item.severity} />
          </div>
          <Location>{item.location}</Location>
        </IssueCard>
      ))}
    </CollapsibleSection>
  );
}

function UXCopySection({ items }: { items: UXCopyIssue[] }) {
  if (items.length === 0) return null;
  return (
    <CollapsibleSection
      emoji="✏️"
      title="UX Copy"
      count={items.length}
      accentColor="#d97706"
    >
      {items.map((item, i) => (
        <IssueCard key={i}>
          <Row label="Hiện tại" value={`"${item.current}"`} muted />
          <Row label="Gợi ý" value={`"${item.suggestion}"`} bold />
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
            {item.reason}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
            <Location>{item.location}</Location>
            <ImpactBadge impact={item.impact} />
          </div>
        </IssueCard>
      ))}
    </CollapsibleSection>
  );
}

function UXSuggestionsSection({ items }: { items: UXSuggestion[] }) {
  if (items.length === 0) return null;
  return (
    <CollapsibleSection
      emoji="💡"
      title="Gợi ý UX"
      count={items.length}
      accentColor="#7c3aed"
    >
      {items.map((item, i) => (
        <IssueCard key={i}>
          <div style={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 600,
            color: '#7c3aed',
            background: '#f5f3ff',
            padding: '2px 7px',
            borderRadius: 100,
            marginBottom: 5,
          }}>
            {item.category}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
            {item.issue}
          </div>
          <div style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.5 }}>
            → {item.suggestion}
          </div>
          <div style={{ marginTop: 6 }}>
            <PriorityBadge priority={item.priority} />
          </div>
        </IssueCard>
      ))}
    </CollapsibleSection>
  );
}

// ── Primitives ────────────────────────────────────────────────────────

function CollapsibleSection({
  emoji, title, count, accentColor, children,
}: {
  emoji: string;
  title: string;
  count: number;
  accentColor: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 0',
          marginBottom: open ? 8 : 0,
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 13 }}>{emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{title}</span>
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          color: '#fff',
          background: accentColor,
          borderRadius: 100,
          padding: '1px 6px',
          lineHeight: 1.6,
        }}>{count}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#ccc' }}>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && children}
    </div>
  );
}

function IssueCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: '10px 12px',
      background: '#fafafa',
      borderRadius: 8,
      marginBottom: 6,
      border: '1px solid #f0f0f0',
    }}>
      {children}
    </div>
  );
}

function Tag({ children, color, text, line, bold }: {
  children: React.ReactNode;
  color: string;
  text: string;
  line?: boolean;
  bold?: boolean;
}) {
  return (
    <span style={{
      background: color,
      color: text,
      padding: '2px 7px',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: bold ? 700 : 400,
      textDecoration: line ? 'line-through' : 'none',
      wordBreak: 'break-all',
    }}>
      {children}
    </span>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <span style={{ fontSize: 10, color: '#ccc', marginRight: 4 }}>{label}:</span>
      <span style={{ fontSize: 12, color: muted ? '#6b7280' : '#111', fontWeight: bold ? 600 : 400 }}>
        {value}
      </span>
    </div>
  );
}

function Location({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, color: '#bbb' }}>📍 {children}</span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span style={{
      fontSize: 9,
      fontWeight: 700,
      color: severity === 'error' ? '#dc2626' : '#d97706',
      background: severity === 'error' ? '#fef2f2' : '#fffbeb',
      padding: '2px 5px',
      borderRadius: 3,
      textTransform: 'uppercase',
    }}>
      {severity}
    </span>
  );
}

function ImpactBadge({ impact }: { impact: string }) {
  const map: Record<string, [string, string]> = {
    high: ['#fef2f2', '#dc2626'],
    medium: ['#fffbeb', '#d97706'],
    low: ['#f0fdf4', '#16a34a'],
  };
  const [bg, fg] = map[impact] ?? map.medium;
  return (
    <span style={{ fontSize: 9, fontWeight: 700, color: fg, background: bg, padding: '2px 5px', borderRadius: 3, textTransform: 'uppercase' }}>
      {impact}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, [string, string]> = {
    high: ['#fef2f2', '#dc2626'],
    medium: ['#fffbeb', '#d97706'],
    low: ['#f0fdf4', '#16a34a'],
  };
  const [bg, fg] = map[priority] ?? map.medium;
  return (
    <span style={{ fontSize: 9, fontWeight: 700, color: fg, background: bg, padding: '2px 5px', borderRadius: 3, textTransform: 'uppercase' }}>
      {priority}
    </span>
  );
}

function EmptyState({ hasKey, hasSelection }: { hasKey: boolean; hasSelection: boolean }) {
  const msg = !hasKey
    ? 'Nhập API Key của Anthropic để bắt đầu'
    : !hasSelection
      ? 'Chọn một frame trong Figma rồi nhấn Phân tích'
      : 'Nhấn "Phân tích với Claude AI" để review design';

  return (
    <div style={{ textAlign: 'center', padding: '40px 16px', color: '#ccc' }}>
      <div style={{ fontSize: 36 }}>✨</div>
      <div style={{ fontSize: 12, marginTop: 10, lineHeight: 1.6, color: '#aaa' }}>{msg}</div>
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '7px 10px',
  borderRadius: 7,
  border: '1px solid #e0e0e0',
  fontSize: 12,
  outline: 'none',
  minWidth: 0,
};

const primaryBtn: React.CSSProperties = {
  padding: '7px 12px',
  borderRadius: 7,
  border: 'none',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: 12,
  cursor: 'pointer',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const ghostBtn: React.CSSProperties = {
  fontSize: 11,
  color: '#999',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
  flexShrink: 0,
};
