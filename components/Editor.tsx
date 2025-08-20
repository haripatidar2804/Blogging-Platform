"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Loader,
  ArrowDown,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type TiptapEditorProps = {
  onSave: (content: string) => Promise<void>;
  onPreview: Dispatch<SetStateAction<string>>;
  initialContent?: string;
  saveButtonLabel: string;
};

const TiptapEditor = ({
  onSave,
  onPreview,
  initialContent,
  saveButtonLabel,
}: TiptapEditorProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    immediatelyRender:false,
    extensions: [StarterKit],
    content: initialContent || "<p>Start writing...</p>",
    editorProps: {
      attributes: {
        class:
          "p-4 border rounded-lg min-h-[200px] focus:outline-none focus:border-sky-700 bg-background-900",
      },
    },
  });

  if (!editor) return null;

  const handleSave = async () => {
    setIsLoading(true);
    await onSave(editor.getHTML());
    setIsLoading(false);
  };

  const handlePreview = () => {
    onPreview(editor.getHTML());
  };

  return (
    <div className="border-foreground/30 bg-background-600 rounded-lg border p-4">
      <div className="mb-2 flex flex-wrap gap-2 text-black">
        {/* Headings */}
        {([1, 2, 3, 4] as const).map((level) => (
          <button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`cursor-pointer rounded-lg p-2 ${editor.isActive("heading", { level }) ? "bg-sky-700 text-white" : "bg-gray-300"}`}
          >
            {level === 1 && <Heading1 className="size-5" />}
            {level === 2 && <Heading2 className="size-5" />}
            {level === 3 && <Heading3 className="size-5" />}
            {level === 4 && <Heading4 className="size-5" />}
          </button>
        ))}

        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("bold") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Bold className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("italic") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Italic className="size-5" />
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("bulletList") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <List className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("orderedList") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <ListOrdered className="size-5" />
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("codeBlock") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Code className="size-5" />
        </button>

        <button
          onClick={() => {
            if (editor.isActive("codeBlock")) {
              editor.commands.exitCode();
              editor.chain().focus();
            } else {
              editor.commands.enter();
              editor.chain().focus().setParagraph().run();
            }
          }}
          className="cursor-pointer rounded-lg bg-sky-900 p-2 text-white"
        >
          <ArrowDown className="size-5" />
        </button>

        <button
          onClick={handlePreview}
          className="cursor-pointer rounded-lg bg-sky-900 p-2 text-white"
        >
          <Eye className="size-5" />
        </button>
      </div>

      <div className="max-h-[350px] min-h-[200px] overflow-auto">
        <EditorContent editor={editor} className="tiptap" />
      </div>

      <button
        disabled={isLoading}
        onClick={handleSave}
        className="mt-6 flex h-9 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-500 disabled:bg-gray-600"
      >
        {isLoading && <Loader className="size-4 animate-spin" />}{" "}
        {saveButtonLabel}
      </button>
    </div>
  );
};

export default TiptapEditor;
