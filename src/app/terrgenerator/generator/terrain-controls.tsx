
"use client";

import type { TerrainParams } from "@/lib/terraintypes";
import { Label } from "@/components/ui/label";
import { SliderField } from "@/components/ui/slider";

type TerrainControlsProps = {
  params: TerrainParams;
  onParamsChange: (params: Partial<TerrainParams>) => void;
};

export default function TerrainControls({ params, onParamsChange }: TerrainControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-x-6 w-full items-center">
      <SliderField
        id="sideLength"
        label="Side Length"
        value={params.sideLength}
        valueFormat={v => v.toString()}
        min={100}
        max={2000}
        step={50}
        onValueChange={(value) => onParamsChange({ sideLength: value[0] })}
      />
      <SliderField
        id="subdivisions"
        label="Subdivisions"
        value={params.subdivisions}
        valueFormat={v => v.toString()}
        min={16}
        max={256}
        step={16}
        onValueChange={(value) => onParamsChange({ subdivisions: value[0] })}
      />
      <SliderField
        id="maxHeight"
        label="Max Height"
        value={params.maxHeight}
        valueFormat={v => v.toString()}
        min={50}
        max={1000}
        step={10}
        onValueChange={(value) => onParamsChange({ maxHeight: value[0] })}
      />
    </div>
  );
}
