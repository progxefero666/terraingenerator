
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePenLine } from "lucide-react";

type PromptEditorProps = {
  currentPrompt: string;
  onSave: (newPrompt: string) => void;
};

export default function PromptEditor({ currentPrompt, onSave }: PromptEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState(currentPrompt);

  const handleSave = () => {
    onSave(prompt);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Reset local state to the most recent prop value when opening
      setPrompt(currentPrompt);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}>
          <FilePenLine className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[650px] h-[70vh] flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on click outside
      >
        <DialogHeader>
          <DialogTitle>AI Prompt Editor</DialogTitle>
          <DialogDescription>
            Craft a detailed prompt to guide the AI. Be specific for the best results.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 py-4 overflow-hidden">
            <ScrollArea className="h-full w-full">
                 <Textarea
                    placeholder="Type your detailed prompt here."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[98%] text-base"
                    rows={15}
                />
            </ScrollArea>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
