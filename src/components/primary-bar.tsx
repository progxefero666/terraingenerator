
"use client";

import type { Gradient } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { Wand2, PlusCircle, Settings, Dices, RotateCcw, Table } from "lucide-react";
import GradientList from "./controls/gradient-list";
import GradientEditor from "./controls/gradient-editor";

type TerrainSidebarProps = {
  gradients: Gradient[];
  selectedGradientId: string | null;
  numGradientsToGenerate: number;
  onNumGradientsToGenerateChange: (value: number) => void;
  onSelectGradient: (id: string) => void;
  onUpdateGradient: (id: string, updates: Partial<Gradient>) => void;
  onGenerateGradients: () => void;
  onRemoveGradient: (id:string) => void;
  onAIGenerate: (prompt: string) => Promise<void>;
  onRandomize: () => void;
  onReset: () => void;
};

export default function TerrainSidebar(props: TerrainSidebarProps) {
  const [aiPrompt, setAiPrompt] = useState("A central mountain peak with surrounding foothills.");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    await props.onAIGenerate(aiPrompt);
    setIsGenerating(false);
  };
  
  const selectedGradient = props.gradients.find(g => g.id === props.selectedGradientId);

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b-2 border-border grid grid-cols-2 gap-2">
            <Button onClick={props.onGenerateGradients} className="h-9 text-base">
                <PlusCircle className="mr-2 h-5 w-5" />
                Generate
            </Button>
            <Button onClick={props.onRandomize} variant="outline" className="h-9 text-base">
                <Dices className="mr-2 h-5 w-5" />
                Aleatory
            </Button>
             <Button onClick={props.onReset} variant="outline" className="h-9 text-base">
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
            </Button>
             <Button variant="outline" className="h-9 text-base">
                <Table className="mr-2 h-5 w-5" />
                Data
            </Button>
        </div>

      <div className="p-2 flex-1 overflow-y-auto">
          <Accordion type="multiple" defaultValue={['options']} className="w-full">
            <AccordionItem value="ai-generation">
              <AccordionTrigger className="text-lg font-semibold px-2 py-3">AI Generation</AccordionTrigger>
              <AccordionContent className="px-2 space-y-2">
                <Textarea 
                  placeholder="Describe the terrain you want to create..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAIGenerate} disabled={isGenerating} className="w-full">
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gradients">
               <AccordionTrigger className="text-lg font-semibold px-2 py-3">Gradients</AccordionTrigger>
               <AccordionContent className="px-0">
                  <GradientList
                    gradients={props.gradients}
                    selectedGradientId={props.selectedGradientId}
                    onSelectGradient={props.onSelectGradient}
                    onRemoveGradient={props.onRemoveGradient}
                  />
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
                            <Label htmlFor="numGradients">Gradients to Generate</Label>
                            <span className="text-sm text-muted-foreground w-[25%] text-right">{props.numGradientsToGenerate}</span>
                        </div>
                        <Slider 
                            id="numGradients" 
                            value={[props.numGradientsToGenerate]} 
                            onValueChange={(value) => props.onNumGradientsToGenerateChange(value[0])} 
                            min={1} 
                            max={10} 
                            step={1} 
                        />
                    </div>
                    {selectedGradient && (
                        <GradientEditor
                            key={selectedGradient.id}
                            gradient={selectedGradient}
                            onUpdateGradient={props.onUpdateGradient}
                        />
                    )}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
      </div>
    </div>
  );
}
