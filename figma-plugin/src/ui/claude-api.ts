import type { SelectionData, ReviewResult } from '../types';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001'; // Fast + cheap for interactive use

function buildPrompt(data: SelectionData): string {
  const textList = data.texts
    .map((t) => `  - [${t.parentName}] "${t.content}"`)
    .join('\n');

  const components = data.componentNames.slice(0, 30).join(', ') || 'Không xác định';

  return `Bạn là chuyên gia UX/UI và copy editor người Việt. Review thiết kế Figma dưới đây và trả về JSON thuần (không markdown, không code block).

## THÔNG TIN DESIGN
Frame/Screen: ${data.selectionNames.join(', ')}
Components sử dụng: ${components}

## TẤT CẢ TEXT TRONG DESIGN (${data.texts.length} items)
${textList || '  (Không có text)'}

## FORMAT TRẢ VỀ (JSON thuần, không thêm gì khác)
{
  "spelling": [
    {
      "original": "text gốc có lỗi chính tả",
      "correction": "text đúng",
      "location": "tên layer/component chứa text",
      "severity": "error"
    }
  ],
  "ux_copy": [
    {
      "current": "text hiện tại",
      "suggestion": "gợi ý cải thiện ngắn gọn và rõ ràng hơn",
      "location": "vị trí trong design",
      "reason": "lý do ngắn (1 câu)",
      "impact": "high"
    }
  ],
  "ux_suggestions": [
    {
      "category": "Navigation | CTA | Feedback | Accessibility | Visual Hierarchy | Flow",
      "issue": "mô tả vấn đề UX cụ thể",
      "suggestion": "hướng giải quyết cụ thể",
      "priority": "high"
    }
  ],
  "summary": "Đánh giá tổng thể 1-2 câu về chất lượng design và UX"
}

## QUY TẮC
- Kiểm tra chính tả tiếng Việt VÀ tiếng Anh (chỉ báo lỗi thực sự)
- UX copy: focus vào clarity, tone phù hợp, hiệu quả CTA
- UX suggestions: dựa trên mobile UX best practices
- Nếu không có vấn đề trong một category, trả về mảng rỗng []
- Severity: "error" = lỗi rõ ràng, "warning" = cần xem xét
- Impact/Priority: "high" = quan trọng, "medium" = nên fix, "low" = nice to have`;
}

export async function reviewWithClaude(
  apiKey: string,
  data: SelectionData
): Promise<ReviewResult> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: buildPrompt(data) }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
    const msg = err?.error?.message ?? `HTTP ${response.status}`;
    throw new Error(`Claude API lỗi: ${msg}`);
  }

  const result = await response.json() as { content: Array<{ text: string }> };
  const rawText = result.content?.[0]?.text ?? '';

  if (!rawText) throw new Error('Không nhận được phản hồi từ Claude.');

  // Extract JSON — Claude may sometimes wrap in markdown
  const jsonMatch =
    rawText.match(/```(?:json)?\n?([\s\S]*?)\n?```/) ??
    rawText.match(/(\{[\s\S]*\})/);
  const jsonStr = jsonMatch?.[1] ?? rawText;

  let parsed: Partial<ReviewResult>;
  try {
    parsed = JSON.parse(jsonStr) as Partial<ReviewResult>;
  } catch {
    throw new Error('Lỗi parse JSON từ Claude. Thử lại lần nữa.');
  }

  return {
    spelling: parsed.spelling ?? [],
    ux_copy: parsed.ux_copy ?? [],
    ux_suggestions: parsed.ux_suggestions ?? [],
    summary: parsed.summary ?? '',
  };
}
