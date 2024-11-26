import { LexicalNode, TextNode } from 'lexical';
import { CodeHighlightNode } from '../nodes/CodeHighlightNode';

export function getHighlightNodes(text: string, type: string): Array<LexicalNode> {
  const nodes: LexicalNode[] = [];
  const partials = text.split('\n');

  for (let i = 0; i < partials.length; i++) {
    const content = partials[i];
    if (content.length) {
      const node = new CodeHighlightNode(content);
      node.setFormat(type);
      nodes.push(node);
    }
  }

  return nodes;
}

export function $createHighlightNode(text: string, type: string = ''): CodeHighlightNode {
  return new CodeHighlightNode(text).setFormat(type);
}

export function $isHighlightNode(node: LexicalNode | null | undefined): node is CodeHighlightNode {
  return node instanceof CodeHighlightNode;
}