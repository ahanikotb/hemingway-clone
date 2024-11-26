import { TextNode } from 'lexical';

export class CodeHighlightNode extends TextNode {
  static getType(): string {
    return 'code-highlight';
  }

  static clone(node: CodeHighlightNode): CodeHighlightNode {
    return new CodeHighlightNode(node.__text, node.__key);
  }

  constructor(text: string, key?: string) {
    super(text, key);
  }

  createDOM(): HTMLElement {
    const dom = super.createDOM();
    dom.setAttribute('data-highlight', 'true');
    return dom;
  }

  updateDOM(prevNode: CodeHighlightNode, dom: HTMLElement): boolean {
    const isUpdated = super.updateDOM(prevNode, dom);
    return isUpdated;
  }
}