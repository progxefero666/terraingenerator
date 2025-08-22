
"use client";

import { useState, useEffect } from "react";
import type { TextureParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wand2, Settings } from "lucide-react";
import PromptEditor from "./controls/prompt-editor";

const defaultPrompt = `You are provided with an image that serves as a structural mask. The blue areas in this image must remain COMPLETELY UNCHANGED. Replace only the non-blue areas with a photorealistic texture matching the following description: "A dense forest with palm trees as seen from above."`;

type TextureSidebarProps = {
  params: TextureParams;
  onParamsChange: (params: Partial<TextureParams>) => void;
  onAIGenerate: (prompt: string) => Promise<void>;
};

export default function TextureSidebar({ params, onParamsChange, onAIGenerate }: TextureSidebarProps) {
  const [aiPrompt, setAiPrompt] = useState(defaultPrompt);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedPrompt = sessionStorage.getItem('aiTexturePrompt');
    if (savedPrompt) {
      setAiPrompt(savedPrompt);
    }
  }, []);

  const handlePromptSave = (newPrompt: string) => {
    setAiPrompt(newPrompt);
    sessionStorage.setItem('aiTexturePrompt', newPrompt);
  };

  const handleAIGenerate = async () => {
    // Extract just the user's description part for the AI flow
    const userDescriptionMatch = aiPrompt.match(/"(.*?)"/);
    const userDescription = userDescriptionMatch ? userDescriptionMatch[1] : aiPrompt;
    
    setIsGenerating(true);
    await onAIGenerate(userDescription);
    setIsGenerating(false);
  };

  const truncatePrompt = (prompt: string, length = 200) => {
    if (prompt.length <= length) return prompt;
    return prompt.substring(0, length) + "...";
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-2 border-border grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-9 text-base">Option A</Button>
        <Button variant="outline" className="h-9 text-base">Option B</Button>
        <Button variant="outline" className="h-9 text-base">Option C</Button>
        <Button variant="outline" className="h-9 text-base">Option D</Button>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={['ai-services', 'options']} className="w-full">
          <AccordionItem value="ai-services">
            <div className="flex items-center w-full px-2 py-3">
                <AccordionTrigger className="text-lg font-semibold flex-1 text-left p-0 hover:no-underline">AI Services</AccordionTrigger>
                <div className="pl-2">
                    <PromptEditor
                        currentPrompt={aiPrompt}
                        onSave={handlePromptSave}
                    />
                </div>
            </div>
            <AccordionContent className="px-2 space-y-2">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                  {truncatePrompt(aiPrompt)}
              </p>
              <Button onClick={handleAIGenerate} disabled={isGenerating} className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="options">
            <AccordionTrigger className="text-lg font-semibold px-2 py-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Options</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-0 space-y-4">
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sideImage">Side Image</Label>
                   <span className="text-sm text-muted-foreground w-[25%] text-right">{params.sideImage}px</span>
                </div>
                <Slider
                  id="sideImage"
                  min={512}
                  max={4096}
                  step={256}
                  value={[params.sideImage]}
                  onValueChange={(value) => onParamsChange({ sideImage: value[0] })}
                />
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="scale">Scale</Label>
                  <span className="text-sm text-muted-foreground w-[25%] text-right">{params.scale.toFixed(1)}%</span>
                </div>
                <Slider
                  id="scale"
                  value={[params.scale]}
                  onValueChange={(value) => onParamsChange({ scale: value[0] })}
                  min={100}
                  max={120}
                  step={0.5}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
