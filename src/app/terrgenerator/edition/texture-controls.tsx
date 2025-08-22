"use client";

import type { TextureParams } from "@/lib/terraintypes";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorRangesSelector from "./color-ramp-selector";

type TextureControlsProps = {
  params: TextureParams;
  onParamsChange: (params: Partial<TextureParams>) => void;
  onApplyTexture: () => void;
};

export default function TextureControls({ params, onParamsChange, onApplyTexture }: TextureControlsProps) {
  
  const handleColorRampChange = (newRamp: any) => {
    onParamsChange({ colorRamp: newRamp });
  };
  
  return (
    <div className="w-full items-center">
      <ColorRangesSelector
          colorRamp={params.colorRamp}
          onColorRampChange={handleColorRampChange}
          onApply={onApplyTexture}
      />
    </div>
  );
}
