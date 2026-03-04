export interface TextInfo {
  id: string;
  name: string;
  content: string;
  parentName: string;
}

export interface SelectionData {
  texts: TextInfo[];
  componentNames: string[];
  selectionNames: string[];
  frameCount: number;
}

// Claude API response types
export interface SpellingIssue {
  original: string;
  correction: string;
  location: string;
  severity: 'error' | 'warning';
}

export interface UXCopyIssue {
  current: string;
  suggestion: string;
  location: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
}

export interface UXSuggestion {
  category: string;
  issue: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ReviewResult {
  spelling: SpellingIssue[];
  ux_copy: UXCopyIssue[];
  ux_suggestions: UXSuggestion[];
  summary: string;
}

// Plugin messages
export type PluginMessage =
  | { type: 'get-selection' }
  | { type: 'close' };

export type UIMessage =
  | { type: 'selection-result'; data: SelectionData }
  | { type: 'selection-result'; error: string };
