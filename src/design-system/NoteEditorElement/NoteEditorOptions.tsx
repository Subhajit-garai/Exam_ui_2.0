import { useCurrentEditor } from "@tiptap/react";
export const VarticalSaprater = ({ color }: { color: string }) => {
  return (
    <>
      <span className={`${color || " bg-white"} border-r-2`}></span>
    </>
  );
};

export const EditorOptions = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <>
      
    </>
  );
};

export const SlotbeforeOptions = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;
  return (
    <>
      
    </>
  );
};

export const BubbleMenuOptions = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;
  return (
    <>
      
    </>
  );
};
