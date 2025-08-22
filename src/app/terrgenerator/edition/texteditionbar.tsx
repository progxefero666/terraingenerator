
//src\components\texture-sidebar.tsx
"use client";

import { TextureParams } from "@/lib/terraintypes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SliderField } from "@/components/ui/slider";


import { Settings } from "lucide-react";
import { TerrEditionConfig } from "@/lib/terrainsconfig";


type TerrTextureEditionbarProps = {
    params: TextureParams;
    onParamsChange: (params: Partial<TextureParams>) => void;
};

export default function TerrTextureEditionbar({ params, onParamsChange }: TerrTextureEditionbarProps) {


    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b-2 border-border grid grid-cols-2 gap-2">
                <Button >Option A</Button>
                <Button >Option B</Button>
                <Button >Option C</Button>
                <Button >Option D</Button>
            </div>

            <div className="p-2 flex-1 overflow-y-auto">
                <div className="text-lg font-semibold px-2 py-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <span>Options</span>
                </div>
                <div className="px-2 pt-0 space-y-4">

                    <SliderField
                        id="sideImage"
                        label="Side Image"
                        value={params.sideImage}
                        valueFormat={v => `${v}px`}
                        min={TerrEditionConfig.SIZE_MIN}
                        max={TerrEditionConfig.SIZE_MAX}
                        step={TerrEditionConfig.SIZE_STEP}
                        onValueChange={(value) => onParamsChange({ sideImage: value[0] })}/>

                    <SliderField
                        id="scale"
                        label="Scale"
                        value={params.scale}
                        valueFormat={v => `${v.toFixed(1)}%`}
                        min={TerrEditionConfig.SCALE_MIN}
                        max={TerrEditionConfig.SCALE_MAX}
                        step={TerrEditionConfig.SCALE_STEP}
                        onValueChange={(value) => onParamsChange({ scale: value[0] })}/>

                </div>
            </div>
        </div>
    );
}//end

