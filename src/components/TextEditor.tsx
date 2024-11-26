import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createTextNode, TextNode, $isElementNode, $isTextNode } from 'lexical';
import nlp from 'compromise';
import { detectPassiveVoice, calculateReadability, findComplexWords } from '../utils/textAnalysis';
import Toolbar from './Toolbar';

const theme = {
  paragraph: 'mb-2',
  text: {
    base: 'text-gray-800',
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    highlight: '',
  },
};

interface TextStats {
  readability: string;
  adverbs: number;
  passiveVoices: number;
  complexWords: number;
}

interface TextEditorProps {
  onStatsUpdate: (stats: TextStats) => void;
}

function TextAnalyzer({ onStatsUpdate }: { onStatsUpdate: (stats: TextStats) => void }) {
  const [editor] = useLexicalComposerContext();
  
  const highlightWords = (words: string[], type: 'adverb' | 'passive' | 'complex') => {
    editor.update(() => {
      const root = $getRoot();
      const textNodes: TextNode[] = [];

      // Traverse all nodes to find text nodes
      root.getChildren().forEach((node) => {
        if ($isTextNode(node)) {
          textNodes.push(node);
        } else if ($isElementNode(node)) {
          node.getChildren().forEach((child) => {
            if ($isTextNode(child)) {
              textNodes.push(child);
            }
          });
        }
      });

      // Process each text node
      textNodes.forEach((textNode) => {
        let text = textNode.getTextContent();
        let newNodes: TextNode[] = [];
        let lastIndex = 0;

        words.forEach((word) => {
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          let match;

          while ((match = regex.exec(text)) !== null) {
            const start = match.index;
            const end = start + word.length;

            // Add text before the match
            if (start > lastIndex) {
              newNodes.push($createTextNode(text.slice(lastIndex, start)));
            }

            // Add highlighted text
            const highlightedNode = $createTextNode(text.slice(start, end));
            highlightedNode.setFormat(type);
            newNodes.push(highlightedNode);

            lastIndex = end;
          }
        });

        // Add remaining text
        if (lastIndex < text.length) {
          newNodes.push($createTextNode(text.slice(lastIndex)));
        }

        // Replace the original node with new nodes
        if (newNodes.length > 0) {
          textNode.replace(newNodes[0]);
          for (let i = 1; i < newNodes.length; i++) {
            newNodes[i - 1].insertAfter(newNodes[i]);
          }
        }
      });
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const unregister = editor.registerUpdateListener(({ editorState }) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        editorState.read(() => {
          const root = $getRoot();
          const text = root.getTextContent();
          
          if (!text.trim()) {
            onStatsUpdate({
              readability: 'Add content',
              adverbs: 0,
              passiveVoices: 0,
              complexWords: 0,
            });
            return;
          }

          const doc = nlp(text);
          const adverbs = doc.adverbs().out('array');
          const passiveVoices = detectPassiveVoice(text);
          const complexWords = findComplexWords(text);
          
          onStatsUpdate({
            readability: calculateReadability(text),
            adverbs: adverbs.length,
            passiveVoices: passiveVoices.length,
            complexWords: complexWords.length,
          });

          // Apply highlights for each category
          highlightWords(adverbs, 'adverb');
          highlightWords(passiveVoices.flatMap(s => s.split(/\s+/)), 'passive');
          highlightWords(complexWords, 'complex');
        });
      }, 500);
    });

    return () => {
      clearTimeout(timeoutId);
      unregister();
    };
  }, [editor, onStatsUpdate]);
  
  return null;
}

export default function TextEditor({ onStatsUpdate }: TextEditorProps) {
  const initialConfig = {
    namespace: 'HemingwayEditor',
    theme,
    onError: (error: Error) => {
      console.error('Editor Error:', error);
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="border-b border-gray-200">
          <Toolbar />
        </div>
        <div className="relative p-6">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[500px] outline-none prose max-w-none" />
            }
            placeholder={
              <div className="absolute top-6 left-6 text-gray-400 pointer-events-none">
                Start writing or paste your text...
              </div>
            }
          />
          <HistoryPlugin />
          <TextAnalyzer onStatsUpdate={onStatsUpdate} />
        </div>
      </LexicalComposer>
    </div>
  );
}