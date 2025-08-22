interface SliderFieldProps {
    id: string;
    label: string;
    value: number;
    valueFormat?: (value: number) => string;
    min: number;
    max: number;
    step?: number;
    onValueChange: (value: number[]) => void;
    className?: string;
}

export function SliderField({ id, label, value, valueFormat, min, max, step = 1, onValueChange, className }: SliderFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor={id}>{label}</Label>
                <span className="text-sm text-muted-foreground w-[25%] text-right">
                    {valueFormat ? valueFormat(value) : value}
                </span>
            </div>
            <Slider
                id={id}
                min={min}
                max={max}
                step={step}
                value={[value]}
                onValueChange={onValueChange}
                className={className}
            />
        </div>
    );
}
//src\components\ui\slider.tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"


import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"


interface SliderProps {
    id: string;
    min: number;
    max: number;
    step?: number;
    value: number[];
    onValueChange: (value: number[]) => void;
    className?: string;
}

export function Slider({ id, min, max, step = 1, value, onValueChange, className }: SliderProps) {
    return (
        <SliderPrimitive.Root
            id={id}
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={onValueChange}
            className={cn("relative flex w-full touch-none select-none items-center group", className)}>
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-primary group-data-[sidebar]:bg-sidebar-accent" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
        </SliderPrimitive.Root>
    );
}
