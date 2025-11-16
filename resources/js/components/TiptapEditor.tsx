import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Iframe } from "@/lib/Iframe"; // buat embed
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImagePlus,
  SquarePlus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  error?: string;
}

export default function TiptapEditor({ value, onChange, label, error }: TiptapEditorProps) {
  let timeout: any;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      Iframe.configure({
        allowFullscreen: true,
        HTMLAttributes: { class: "w-full aspect-video rounded-lg border" },
      }),

    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[250px] bg-background rounded-md p-3",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Masukkan URL gambar:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addIframe = () => {
    const url = window.prompt("Masukkan URL embed (Maps, Spotify, YouTube, dll):");
    if (url) editor.chain().focus().setIframe({ src: url }).run();
  };

  return (
    <div className="border rounded-md min-h-[400px] p-3 space-y-2">
      {label && <Label>{label}</Label>}

      {/* Toolbar */}
      <div className="tiptap-toolbar flex flex-wrap gap-2 mt-2">
        <Button type="button" size="sm" variant={editor.isActive("bold") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("italic") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("underline") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("strike") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</Button>
        <Button type="button" size="sm" variant={editor.isActive("bulletList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("orderedList") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant={editor.isActive("blockquote") ? "default" : "outline"} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => {
          const url = window.prompt("Masukkan URL link:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}>
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={addImage}>
          <ImagePlus className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={addIframe}>
          <SquarePlus className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Area */}
      <div className="border rounded-md min-h-[250px] p-3 bg-background focus-within:ring-2 focus-within:ring-ring transition">
        <EditorContent editor={editor} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}


