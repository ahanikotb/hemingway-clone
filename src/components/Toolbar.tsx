import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
} from 'lucide-react';

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex items-center space-x-1 p-2">
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 hover:bg-gray-100 rounded"
        title="Undo"
      >
        <Undo className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 hover:bg-gray-100 rounded"
        title="Redo"
      >
        <Redo className="w-5 h-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-2" />
      
      <button
        onClick={() => formatText('bold')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('italic')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('underline')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Underline"
      >
        <Underline className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('strikethrough')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Strikethrough"
      >
        <Strikethrough className="w-5 h-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-2" />
      
      <button
        onClick={() => formatText('left')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Align Left"
      >
        <AlignLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('center')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Align Center"
      >
        <AlignCenter className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('right')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Align Right"
      >
        <AlignRight className="w-5 h-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-2" />
      
      <button
        onClick={() => formatText('h1')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Heading 1"
      >
        <Heading1 className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('h2')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Heading 2"
      >
        <Heading2 className="w-5 h-5" />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-2" />
      
      <button
        onClick={() => formatText('bullet')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Bullet List"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => formatText('number')}
        className="p-2 hover:bg-gray-100 rounded"
        title="Numbered List"
      >
        <ListOrdered className="w-5 h-5" />
      </button>
    </div>
  );
}