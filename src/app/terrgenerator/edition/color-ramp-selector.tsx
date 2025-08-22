"use client";

import type { ColorRamp } from "@/lib/terraintypes";
import { Button } from "@/components/ui/button";
import { SliderField } from "@/components/ui/slider";

type ColorRangesSelectorProps = {
    colorRamp: ColorRamp;
    onColorRampChange: (newRamp: ColorRamp) => void;
    onApply: () => void;
};

export default function ColorRangesSelector({ colorRamp, onColorRampChange, onApply }: ColorRangesSelectorProps) {

    const handleColorChange = (part: keyof ColorRamp) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onColorRampChange({ ...colorRamp, [part]: event.target.value });
    };

    const handleBiasChange = (value: number[]) => {
        onColorRampChange({ ...colorRamp, bias: value[0] });
    }

    return (
        <div className="flex items-center justify-start gap-4 w-full">
            {/* Color Pickers */}
            <div className="flex items-center justify-start gap-2">
                <div className="flex items-center gap-2 p-1 border rounded-md h-9">
                    <input
                        id="start-color"
                        type="color"
                        value={colorRamp.start}
                        onChange={handleColorChange('start')}
                        className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                        title="Start color"/>
                    <span className="text-xs font-mono text-muted-foreground">{colorRamp.start.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 p-1 border rounded-md h-9">
                    <input
                        id="middle-color"
                        type="color"
                        value={colorRamp.middle}
                        onChange={handleColorChange('middle')}
                        className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                        title="Middle color"/>
                    <span className="text-xs font-mono text-muted-foreground">{colorRamp.middle.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 p-1 border rounded-md h-9">
                    <input
                        id="end-color"
                        type="color"
                        value={colorRamp.end}
                        onChange={handleColorChange('end')}
                        className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
                        title="End color"/>
                    <span className="text-xs font-mono text-muted-foreground">{colorRamp.end.toUpperCase()}</span>
                </div>
            </div>

            {/* Bias Slider */}
            <div className="flex-1 flex items-center gap-3">
                <SliderField
                    id="bias"
                    label="Color Bias"
                    value={colorRamp.bias}
                    valueFormat={v => `${(v * 100).toFixed(0)}%`}
                    min={0.01}
                    max={0.99}
                    step={0.01}
                    onValueChange={handleBiasChange}
                    className="w-full" />
            </div>

            {/* Apply Button */}
            <Button onClick={onApply} size="sm" variant="outline" className="h-9 text-xs">
                Apply
            </Button>
        </div>
    );
}
