import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useAppSelector } from '@/store/hook';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'mx-auto max-w-full',
      },
    }
  }
})

export function NoteViewer({ content }: { content: string }) {
  const { name, email } = useAppSelector((state) => state.user);

  const extensions = [
    StarterKit.configure({
      link: false,
      underline: false,
    }),
    CustomImage,
    Highlight.configure({ multicolor: true }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Youtube.configure({
      controls: false,
    }),
    Link.configure({
      openOnClick: true,
    }),
    Subscript,
    Superscript,
    Underline,
    Placeholder.configure({
      placeholder: 'Write something amazing...',
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Color,
  ]

  const editor = useEditor({
    editable: false,
    extensions,
    content,
  });

  if (!editor) return null;

  const watermarkText = `- ${name} --${email}`;
  const svgString = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <style>
        text { fill: #9ca3af; font-size: 18px; font-weight: bold; font-family: sans-serif; opacity: 0.2; }
      </style>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" transform="rotate(-45 150 150)">
        ${watermarkText}
      </text>
      <text x="30%" y="60%" text-anchor="middle" dominant-baseline="middle" transform="rotate(-45 150 150)">
        © exambuddys | ${new Date().getFullYear()}
      </text>
    </svg>
  `);
  const watermarkUrl = `data:image/svg+xml;charset=utf-8,${svgString}`;

  return (
    <div className="w-full flex justify-end relative">
      <div className="relative w-full">
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            backgroundImage: `url("${watermarkUrl}")`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        />
        <div className="tiptap-content relative z-10 p-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
