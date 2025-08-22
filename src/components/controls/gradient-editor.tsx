"use client";

import type { Gradient } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type GradientEditorProps = {
  gradient: Gradient;
  onUpdateGradient: (id: string, updates: Partial<Gradient>) => void;
};

export default function GradientEditor({ gradient, onUpdateGradient }: GradientEditorProps) {

  const handleSliderChange = (field: keyof Omit<Gradient, 'id' | 'type'>) => (value: number[]) => {
    onUpdateGradient(gradient.id, { [field]: value[0] });
  };
  
  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
          <div className="flex justify-between items-center">
              <Label htmlFor="intensity">Intensity</Label>
              <span className="text-sm text-muted-foreground w-[25%] text-right">{gradient.intensity.toFixed(2)}</span>
          </div>
        <Slider id="intensity" value={[gradient.intensity]} onValueChange={handleSliderChange('intensity')} max={1} step={0.01} />
      </div>
      <div className="space-y-2">
          <div className="flex justify-between items-center">
              <Label htmlFor="radius">Radius</Label>
              <span className="text-sm text-muted-foreground w-[25%] text-right">{gradient.radius.toFixed(3)}</span>
          </div>
        <Slider id="radius" value={[gradient.radius]} onValueChange={handleSliderChange('radius')} max={0.5} step={0.005} />
      </div>
      <div className="space-y-2">
          <div className="flex justify-between items-center">
              <Label htmlFor="rotation">Rotation</Label>
              <span className="text-sm text-muted-foreground w-[25%] text-right">{gradient.rotation.toFixed(0)}°</span>
          </div>
          <Slider id="rotation" value={[gradient.rotation]} onValueChange={handleSliderChange('rotation')} min={0} max={360} step={1} />
      </div>
      <div className="space-y-2">
           <div className="flex justify-between items-center">
              <Label htmlFor="scaleX">Scale X</Label>
              <span className="text-sm text-muted-foreground w-[25%] text-right">{gradient.scaleX.toFixed(2)}</span>
          </div>
        <Slider id="scaleX" value={[gradient.scaleX]} onValueChange={handleSliderChange('scaleX')} min={0.2} max={5} step={0.05} />
      </div>
      <div className="space-y-2">
          <div className="flex justify-between items-center">
              <Label htmlFor="scaleY">Scale Y</Label>
              <span className="text-sm text-muted-foreground w-[25%] text-right">{gradient.scaleY.toFixed(2)}</span>
          </div>
        <Slider id="scaleY" value={[gradient.scaleY]} onValueChange={handleSliderChange('scaleY')} min={0.2} max={5} step={0.05} />
      </div>
    </div>
  );
}
