"use client";

import type { Gradient } from "@/lib/terraintypes";
import { SliderField } from "@/components/ui/slider";

type GradientEditorProps = {
    gradient: Gradient;
    onUpdateGradient: (id: string, updates: Partial<Gradient>) => void;
};

export default function GradientEditor({ gradient, onUpdateGradient }: GradientEditorProps) {

    const handleSliderChange = (field: keyof Gradient) => (value: number[]) => {
        onUpdateGradient(gradient.id, { [field]: value[0] });
    };

    return (
        <div className="space-y-4 pt-2">

            <SliderField
                id="intensity"
                label="Intensity"
                value={gradient.intensity}
                valueFormat={v => v.toFixed(2)}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleSliderChange('intensity')}/>

            <SliderField
                id="radius"
                label="Radius"
                value={gradient.radius}
                valueFormat={v => v.toFixed(3)}
                min={0}
                max={0.5}
                step={0.005}
                onValueChange={handleSliderChange('radius')}/>

            <SliderField
                id="rotation"
                label="Rotation"
                value={gradient.rotation}
                valueFormat={v => `${v.toFixed(0)}°`}
                min={0}
                max={360}
                step={1}
                onValueChange={handleSliderChange('rotation')}/>

            <SliderField
                id="scaleX"
                label="Scale X"
                value={gradient.scaleX}
                valueFormat={v => v.toFixed(2)}
                min={0.2}
                max={5}
                step={0.05}
                onValueChange={handleSliderChange('scaleX')}/>

            <SliderField
                id="scaleY"
                label="Scale Y"
                value={gradient.scaleY}
                valueFormat={v => v.toFixed(2)}
                min={0.2}
                max={5}
                step={0.05}
                onValueChange={handleSliderChange('scaleY')}/>

        </div>
    );
}
