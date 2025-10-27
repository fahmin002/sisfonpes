import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, Heading2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TiptapEditorProps {
    value: string;
    onChange: (html: string) => void;
    error?: string;
    label?: string;
}

export default function TiptapEditor({ value, onChange, error, label }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            Paragraph,
            Underline,
            Heading.configure({
                levels: [2, 3],
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert max-w-none focus:outline-none min-h-[250px] bg-background rounded-md p-3",
            },
        },
        parseOptions: {
            preserveWhitespace: "full",
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-md min-h-[400px] p-3 space-y-2">
            {label && <Label>{label}</Label>}

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-muted/40 mt-2">
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("bold") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <Bold className="w-4 h-4" />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("italic") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <Italic className="w-4 h-4" />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("heading", { level: 2 }) ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="w-4 h-4" />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive("bulletList") ? "default" : "outline"}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    <List className="w-4 h-4" />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                        const url = window.prompt("Masukkan URL gambar:");
                        if (url) editor?.chain().focus().setImage({ src: url }).run();
                    }}
                >
                    <ImagePlus className="w-4 h-4" />
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
