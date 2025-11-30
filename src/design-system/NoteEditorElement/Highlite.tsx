import { useCurrentEditor } from "@tiptap/react";
import { ColorContIcon, EditorIconCont } from "./EditorIconCont";
import {  Paintbrush, PaintBucket } from "lucide-react";

export const TextHighliter = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;
  return (
    <>
      <div className="control-group">
        <div className="button-group w-full flex gap-4">
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "is-active" : ""}
          >
            <EditorIconCont Icon={PaintBucket} text="Toggle highlight" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#ffc078" })
                ? "is-active"
                : ""
            }
          >
            <ColorContIcon
              Color={"#ffc078"}
              isCircle={true}
              BorderColor={"border-red-600"}
              text="Orange"
            />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#8ce99a" })
                ? "is-active"
                : ""
            }
          >
            <ColorContIcon
              Color={"#8ce99a"}
              isCircle={true}
              BorderColor={""}
              text="Green"
            />
            
          </button>

          <button
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            disabled={!editor.isActive("highlight")}
          >
            <EditorIconCont Icon={Paintbrush} text=" Unset highlight" />
          </button>
        </div>
      </div>
    </>
  );
};
