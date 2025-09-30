import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function NoteViewer({ content }:{ content:string }) {
  const extensions = [
    StarterKit,
    Document,
    Paragraph,
    Text,
    Highlight.configure({ multicolor: true }),
  ];

  const editor = useEditor({
    editable: false,
    extensions,
    content,
  });

  if (!editor) return null;

  return (
    <div className=" w-full flex justify-end">
      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
