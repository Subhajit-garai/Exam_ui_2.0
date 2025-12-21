import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function NoteViewer({ content }: { content: string }) {
  const extensions = [
    StarterKit,
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
