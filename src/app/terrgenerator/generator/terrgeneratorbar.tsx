//src\components\terrain-sidebar.tsx
"use client";

import type { Gradient } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, Settings, Dices, RotateCcw, Table } from "lucide-react";

import GradientList from "../../../components/controls/gradient-list";
import GradientEditor from "../../../components/controls/gradient-editor";

type TerrGeneratorSidebarProps = {
    gradients: Gradient[];
    selectedGradientId: string | null;
    numGradientsToGenerate: number;
    onNumGradientsToGenerateChange: (value: number) => void;
    onSelectGradient: (id: string) => void;
    onUpdateGradient: (id: string, updates: Partial<Gradient>) => void;
    onGenerateGradients: () => void;
    onRemoveGradient: (id: string) => void;
    onAIGenerate: (prompt: string) => Promise<void>;
    onRandomize: () => void;
    onReset: () => void;
};

export default function TerrGeneratorSidebar(props: TerrGeneratorSidebarProps) {


    const selectedGradient = props.gradients.find(g => g.id === props.selectedGradientId);

    return (
        <div className="flex flex-col h-full bg-sidebar">
            <div className="p-4 border-b-2 border-primary grid grid-cols-2 gap-2">
                <Button onClick={props.onGenerateGradients}>
                    <PlusCircle />
                    Generate
                </Button>
                <Button onClick={props.onRandomize} variant="accent">
                    <Dices />
                    Aleatory
                </Button>
                <Button onClick={props.onReset} variant="destructive">
                    <RotateCcw />
                    Reset
                </Button>
                <Button variant="secondary">
                    <Table />
                    Data
                </Button>
            </div>

            <div className="p-2 flex-1 overflow-y-auto">

                <div className="text-lg font-semibold px-2 py-3 text-sidebar-primary">Gradients</div>
                <div className="px-0">
                    <GradientList
                        gradients={props.gradients}
                        selectedGradientId={props.selectedGradientId}
                        onSelectGradient={props.onSelectGradient}
                        onRemoveGradient={props.onRemoveGradient}/>
                </div>

                <div className="text-lg font-semibold px-2 py-3 flex items-center gap-2 text-sidebar-primary">
                    <Settings className="w-5 h-5" />
                    <span>Options</span>
                </div>

                <div className="px-2 pt-0 space-y-4">
                    <div className="space-y-2 pt-2">

                        <div className="flex justify-between items-center">
                            <Label htmlFor="numGradients" className="text-sidebar-accent font-medium">Gradients to Generate</Label>
                            <span className="text-sm text-muted-foreground w-[25%] text-right">{props.numGradientsToGenerate}</span>
                        </div>
                        <Slider
                            id="numGradients"
                            value={[props.numGradientsToGenerate]}
                            onValueChange={(value) => props.onNumGradientsToGenerateChange(value[0])}
                            min={1}
                            max={10}
                            step={1}/>

                    </div>
                    {selectedGradient && (
                        <GradientEditor
                            key={selectedGradient.id}
                            gradient={selectedGradient}
                            onUpdateGradient={props.onUpdateGradient}/>
                    )}
                </div>
            </div>
        </div>
    );
}
