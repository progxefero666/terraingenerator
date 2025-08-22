
"use client";

import { TextureParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Settings } from "lucide-react";


type TextureSidebarProps = {
    params: TextureParams;
    onParamsChange: (params: Partial<TextureParams>) => void;
};

export default function TextureSidebar({ params, onParamsChange }: TextureSidebarProps) {


    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b-2 border-border grid grid-cols-2 gap-2">
                <Button >Option A</Button>
                <Button >Option B</Button>
                <Button >Option C</Button>
                <Button >Option D</Button>
            </div>

            <div className="p-2 flex-1 overflow-y-auto">
                <Accordion type="multiple" defaultValue={['options']} className="w-full">

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
                                    onValueChange={(value) => onParamsChange({ sideImage: value[0] })}/>
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
                                    step={0.5}/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}//end

