#!/usr/bin/env python3
"""ASCII wireframe renderer for V-Smart Pay screens.

Usage:
  python3 scripts/wireframe.py .claude/features/[name]/screens.md
  python3 scripts/wireframe.py --screen "Input Phone" --states empty,error,loading

Renders mobile wireframes (390px width) as ASCII art in terminal.
PO can review directly in CLI and discuss with team.
"""
import sys
import os

# Screen width in chars (simulates 390px mobile)
W = 44
BORDER = "│"
TOP = "┌" + "─" * W + "┐"
BOT = "└" + "─" * W + "┘"
SEP = "├" + "─" * W + "┤"

def center(text, width=W):
    return text.center(width)

def left(text, width=W, pad=2):
    return " " * pad + text.ljust(width - pad)

def render_header(variant="default", title="", large_title=""):
    lines = []
    if variant == "large-title":
        lines.append(f"{BORDER}{left('◀  ' + title)}{BORDER}")
        lines.append(f"{BORDER}{left('')}{BORDER}")
        lines.append(f"{BORDER}{left(large_title.upper(), pad=2)}{BORDER}")
    else:
        lines.append(f"{BORDER}{center('◀   ' + title + '   ')}{BORDER}")
    return lines

def render_textfield(label="Input", state="empty", error=""):
    lines = []
    lines.append(f"{BORDER}{left(label)}{BORDER}")
    if state == "empty":
        lines.append(f"{BORDER}  {'┌' + '─' * (W-6) + '┐'}  {BORDER}")
        lines.append(f"{BORDER}  {'│' + ' ' * (W-6) + '│'}  {BORDER}")
        lines.append(f"{BORDER}  {'└' + '─' * (W-6) + '┘'}  {BORDER}")
    elif state == "error":
        lines.append(f"{BORDER}  {'┌' + '─' * (W-6) + '┐'}  {BORDER}")
        lines.append(f"{BORDER}  {'│' + ' xxxxxxxxxx'.ljust(W-6) + '│'}  {BORDER}")
        lines.append(f"{BORDER}  {'└' + '─' * (W-6) + '┘'}  {BORDER}")
        lines.append(f"{BORDER}{left('⚠ ' + (error or 'Validation error'))}{BORDER}")
    elif state == "valid":
        lines.append(f"{BORDER}  {'┌' + '─' * (W-6) + '┐'}  {BORDER}")
        lines.append(f"{BORDER}  {'│' + ' 0912345678'.ljust(W-6) + '│'}  {BORDER}")
        lines.append(f"{BORDER}  {'└' + '─' * (W-6) + '┘'}  {BORDER}")
    elif state == "loading":
        lines.append(f"{BORDER}  {'┌' + '─' * (W-6) + '┐'}  {BORDER}")
        lines.append(f"{BORDER}  {'│' + ' ◌ loading...'.ljust(W-6) + '│'}  {BORDER}")
        lines.append(f"{BORDER}  {'└' + '─' * (W-6) + '┘'}  {BORDER}")
    return lines

def render_button(label="Continue", variant="primary", state="enabled"):
    lines = []
    if state == "disabled":
        btn = f"  [ {label} ]  "
        lines.append(f"{BORDER}{center(btn)}{BORDER}")
        lines.append(f"{BORDER}{center('(disabled)')}{BORDER}")
    elif state == "loading":
        btn = f"  [ ◌ ... ]  "
        lines.append(f"{BORDER}{center(btn)}{BORDER}")
    else:
        if variant == "primary":
            btn = f"  [■ {label} ■]  "
        else:
            btn = f"  [ {label} ]  "
        lines.append(f"{BORDER}{center(btn)}{BORDER}")
    return lines

def render_info_row(label, value):
    text = f"  {label}: {value}"
    return [f"{BORDER}{text.ljust(W)}{BORDER}"]

def render_feedback(variant="success"):
    lines = []
    lines.append(f"{BORDER}{left('')}{BORDER}")
    if variant == "success":
        lines.append(f"{BORDER}{center('✅')}{BORDER}")
        lines.append(f"{BORDER}{center('Thành công!')}{BORDER}")
    elif variant == "error":
        lines.append(f"{BORDER}{center('❌')}{BORDER}")
        lines.append(f"{BORDER}{center('Thất bại')}{BORDER}")
    elif variant == "processing":
        lines.append(f"{BORDER}{center('◌')}{BORDER}")
        lines.append(f"{BORDER}{center('Đang xử lý...')}{BORDER}")
    lines.append(f"{BORDER}{left('')}{BORDER}")
    return lines

def render_empty_space(n=1):
    return [f"{BORDER}{' ' * W}{BORDER}"] * n

def render_home_indicator():
    indicator = "━━━━━━━━━━"
    return [f"{BORDER}{center(indicator)}{BORDER}"]

def render_separator():
    return [SEP]

# === DEMO: Form Input Screen ===
def demo_form_input(state="empty"):
    lines = [TOP]
    lines.append(f"{BORDER}{center(f'── State: {state} ──')}{BORDER}")
    lines += render_header("large-title", "", "Nhập số điện thoại")
    lines += render_empty_space(1)
    lines += render_textfield("Số điện thoại", state, "Số không hợp lệ")
    lines += render_empty_space(2)

    if state in ("empty", "error"):
        lines += render_button("Tiếp tục", "primary", "disabled")
    elif state == "valid":
        lines += render_button("Tiếp tục", "primary", "enabled")
    elif state == "loading":
        lines += render_button("Tiếp tục", "primary", "loading")

    lines += render_empty_space(2)
    lines += render_home_indicator()
    lines.append(BOT)
    return lines

def demo_confirm(state="ready"):
    lines = [TOP]
    lines.append(f"{BORDER}{center(f'── State: {state} ──')}{BORDER}")
    lines += render_header("default", "Xác nhận")
    lines += render_empty_space(1)

    if state == "loading":
        lines += render_feedback("processing")
    else:
        lines += render_info_row("Số điện thoại", "0912 345 678")
        lines += render_info_row("Ngân hàng", "BIDV")
        lines += render_info_row("Số tài khoản", "****1234")
        lines += render_empty_space(1)
        lines += render_separator()
        lines += render_info_row("Phí", "Miễn phí")

    lines += render_empty_space(2)
    lines += render_button("Xác nhận", "primary")
    lines += render_button("Huỷ", "secondary")
    lines += render_empty_space(1)
    lines += render_home_indicator()
    lines.append(BOT)
    return lines

def demo_result(state="success"):
    lines = [TOP]
    lines.append(f"{BORDER}{center(f'── State: {state} ──')}{BORDER}")
    lines += render_header("default", "Kết quả")
    lines += render_empty_space(1)
    lines += render_feedback(state)
    lines += render_empty_space(2)

    if state == "success":
        lines += render_button("Về trang chủ", "primary")
    elif state == "error":
        lines += render_button("Thử lại", "primary")
        lines += render_button("Về trang chủ", "secondary")
    elif state == "processing":
        lines += render_empty_space(1)

    lines += render_empty_space(1)
    lines += render_home_indicator()
    lines.append(BOT)
    return lines

def print_side_by_side(screens, gap=3):
    """Print multiple screens side by side."""
    max_lines = max(len(s) for s in screens)
    screen_width = W + 2  # border chars

    for i in range(max_lines):
        row = ""
        for j, screen in enumerate(screens):
            if i < len(screen):
                row += screen[i]
            else:
                row += " " * screen_width
            if j < len(screens) - 1:
                row += " " * gap
        print(row)

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--demo":
        print("\n🎨 V-Smart Pay — Wireframe Preview")
        print("=" * 60)

        print("\n📱 Screen 1: Nhập số điện thoại — ALL STATES\n")
        screens = [
            demo_form_input("empty"),
            demo_form_input("valid"),
            demo_form_input("error"),
        ]
        print_side_by_side(screens)

        print(f"\n{'─' * 140}")

        print("\n📱 Screen 2: Xác nhận — ALL STATES\n")
        screens = [
            demo_confirm("loading"),
            demo_confirm("ready"),
        ]
        print_side_by_side(screens)

        print(f"\n{'─' * 140}")

        print("\n📱 Screen 3: Kết quả — ALL STATES\n")
        screens = [
            demo_result("success"),
            demo_result("error"),
            demo_result("processing"),
        ]
        print_side_by_side(screens)

        print(f"\n{'=' * 60}")
        print("💡 Discuss: screens nào cần thay đổi? States nào thiếu?")
        print()
    else:
        print("Usage: python3 scripts/wireframe.py --demo")
        print("       (more modes coming: --from-screens, --interactive)")

if __name__ == "__main__":
    main()
