import * as React from "react";

declare module "react-syntax-highlighter" {
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string | string[] | React.ReactNode;  // ✅ fix here
    [key: string]: any;
  }

  export class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
  export const Prism: typeof SyntaxHighlighter;
  export const Light: typeof SyntaxHighlighter;
}
