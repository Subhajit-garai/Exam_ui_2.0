import { Light  as SyntaxHighlighterBase}  from "react-syntax-highlighter";
// import  SyntaxHighlighter  from "react-syntax-highlighter";
import {
  docco,
  dark,
  atomOneDarkReasonable,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type react_syntext_highliter_theme_type = {
  [key: string]: React.CSSProperties;
};

const SyntaxHighlighter = SyntaxHighlighterBase as unknown as React.FC<any>;
export const CodeBlock = ({
  codeString,
  language,
  style,
}: {
  codeString: string;
  language: string;
  style?: react_syntext_highliter_theme_type;
}) => {
  return (
    <div className=" w-full">
      <SyntaxHighlighter
        customStyle={{ width: "full", borderRadius: "8px", padding: "1rem" }}
        language={language}
        style={style ?? atomOneDarkReasonable}
        showLineNumbers
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
