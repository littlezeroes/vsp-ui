/// <reference types="@figma/plugin-typings" />

import type { TextInfo, SelectionData, PluginMessage } from './types';

figma.showUI(__html__, {
  width: 380,
  height: 580,
  title: 'VSP AI Review',
  themeColors: true,
});

figma.ui.onmessage = (msg: PluginMessage) => {
  switch (msg.type) {
    case 'get-selection':
      sendSelectionData();
      break;
    case 'close':
      figma.closePlugin();
      break;
  }
};

// Also send data whenever selection changes in Figma
figma.on('selectionchange', sendSelectionData);

function extractTextNodes(node: SceneNode, texts: TextInfo[], parentName?: string): void {
  if (node.type === 'TEXT') {
    const content = node.characters.trim();
    if (content) {
      texts.push({
        id: node.id,
        name: node.name,
        content,
        parentName: parentName ?? node.name,
      });
    }
    return;
  }

  if ('children' in node) {
    for (const child of node.children) {
      extractTextNodes(child, texts, parentName ?? node.name);
    }
  }
}

function collectComponentNames(node: SceneNode, names: Set<string>): void {
  if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    names.add(node.name);
  }
  if ('children' in node) {
    for (const child of node.children) {
      collectComponentNames(child, names);
    }
  }
}

function sendSelectionData(): void {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.ui.postMessage({ type: 'selection-result', error: 'Chưa chọn frame. Hãy chọn một frame hoặc component trong Figma.' });
    return;
  }

  const texts: TextInfo[] = [];
  const componentNameSet = new Set<string>();

  for (const node of selection) {
    extractTextNodes(node, texts);
    collectComponentNames(node, componentNameSet);
  }

  const data: SelectionData = {
    texts,
    componentNames: [...componentNameSet],
    selectionNames: selection.map((n) => n.name),
    frameCount: selection.length,
  };

  figma.ui.postMessage({ type: 'selection-result', data });
}
