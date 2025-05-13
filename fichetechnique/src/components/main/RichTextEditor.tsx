import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import TextStyle from '@tiptap/extension-text-style';
// Emoji extension is not official, so we use a simple emoji picker

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;
  return (
    <div style={{ marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline" style={{ textDecoration: 'underline' }}>U</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike" style={{ textDecoration: 'line-through' }}>S</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffe066' }).run()} title="Highlight" style={{ background: '#ffe066' }}>H</button>
      <input
        type="color"
        title="Text Color"
        onChange={e => {
          const val = e.target.value;
          if (val && /^#([0-9A-Fa-f]{3}){1,2}$/.test(val)) {
            editor.chain().focus().setColor(val).run();
          }
        }}
        style={{ width: 24, height: 24, border: 'none', background: 'none' }}
      />
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left">⬅️</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center">⬆️</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right">➡️</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} title="Justify">🔳</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">• List</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">1. List</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">❝</button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">{'</>'}</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1">H1</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2">H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="H3">H3</button>
      <button type="button" onClick={() => {
        const url = window.prompt('Enter image URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} title="Insert Image">🖼️</button>
      <button type="button" onClick={() => {
        const url = window.prompt('Enter link URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }} title="Insert Link">🔗</button>
      <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} title="Remove Link">❌🔗</button>
      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Insert Table">📊</button>
      <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row">➕ Row</button>
      <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Col">➕ Col</button>
      <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table">🗑️ Table</button>
      {/* Emoji picker: just insert emoji via prompt for now */}
      <button type="button" onClick={() => {
        const emoji = window.prompt('Insert emoji');
        if (emoji) editor.chain().focus().insertContent(emoji).run();
      }} title="Insert Emoji">😊</button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Link,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <div>
      <MenuBar editor={editor} />
      <div style={{ border: '1px solid #ccc', borderRadius: 8, minHeight: 120, padding: 8 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;

function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}
