
"use client";

import type { TerrainParams } from "@/lib/terraintypes";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type TerrainControlsProps = {
  params: TerrainParams;
  onParamsChange: (params: Partial<TerrainParams>) => void;
};

export default function TerrainControls({ params, onParamsChange }: TerrainControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-x-6 w-full items-center">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="sideLength" className="text-xs font-semibold text-accent">Side Length</Label>
          <span className="text-xs text-muted-foreground">{params.sideLength}</span>
        </div>
        <Slider
          id="sideLength"
          min={100}
          max={2000}
          step={50}
          value={[params.sideLength]}
          onValueChange={(value) => onParamsChange({ sideLength: value[0] })}
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="subdivisions" className="text-xs font-semibold text-accent">Subdivisions</Label>
          <span className="text-xs text-muted-foreground">{params.subdivisions}</span>
        </div>
        <Slider
          id="subdivisions"
          min={16}
          max={256}
          step={16}
          value={[params.subdivisions]}
          onValueChange={(value) => onParamsChange({ subdivisions: value[0] })}
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="maxHeight" className="text-xs font-semibold text-accent">Max Height</Label>
          <span className="text-xs text-muted-foreground">{params.maxHeight}</span>
        </div>
        <Slider
          id="maxHeight"
          min={50}
          max={1000}
          step={10}
          value={[params.maxHeight]}
          onValueChange={(value) => onParamsChange({ maxHeight: value[0] })}
        />
      </div>
    </div>
  );
}
