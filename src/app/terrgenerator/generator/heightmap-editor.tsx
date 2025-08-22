//src\app\terrgenerator\generator\heightmap-editor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { Gradient } from "@/lib/terraintypes";
import { Button } from "@/components/ui/button";
import { SimpleSelect } from "@/components/ui/select";
import { Palette } from "lucide-react";
import { exportCanvasImage } from "@/lib/functions/graphutils";
import { TerrImages } from "@/lib/terrainsconfig";

type HeightmapEditorProps = {
    gradients: Gradient[];
    onGradientsChange: (gradients: Gradient[]) => void;
    selectedGradientId: string | null;
    onSelectGradient: (id: string | null) => void;
    onHeightmapUpdate: (imageData: ImageData) => void;
    width: number;
    height: number;
    onCreateTexture: (imageData: ImageData) => void;
};


export default function HeightmapEditor({
                            gradients,onGradientsChange,
                            selectedGradientId,onSelectGradient,
                            onHeightmapUpdate,width,height,onCreateTexture}: HeightmapEditorProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [draggingGradientId, setDraggingGradientId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [exportFormat, setExportFormat] = useState<string>(TerrImages.DEF_FORMAT);

    const drawHeightmap = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Set background to white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let maxIntensity = 0;
                for (const grad of gradients) {
                    const dx = (x - grad.x * width) / (grad.radius * width);
                    const dy = (y - grad.y * height) / (grad.radius * width);

                    const angle = -grad.rotation * (Math.PI / 180);
                    const cos = Math.cos(angle);
                    const sin = Math.sin(angle);

                    const tdx = (dx * cos - dy * sin) / grad.scaleX;
                    const tdy = (dx * sin + dy * cos) / grad.scaleY;

                    const distSq = tdx * tdx + tdy * tdy;

                    if (distSq < 1) {
                        const falloff = Math.exp(-distSq * 5);
                        const currentIntensity = grad.intensity * falloff;
                        maxIntensity = Math.max(maxIntensity, currentIntensity);
                    }
                }

                const finalIntensity = Math.min(maxIntensity, 1.0);
                // Mountains are black (0), ground is white (255)
                const color = 255 - Math.round(255 * finalIntensity);
                const index = (y * width + x) * 4;
                data[index] = color;
                data[index + 1] = color;
                data[index + 2] = color;
                data[index + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        onHeightmapUpdate(ctx.getImageData(0, 0, width, height));
    };

    useEffect(() => {
        drawHeightmap();
    });

    const getGradientAtPos = (x: number, y: number) => {
        for (let i = gradients.length - 1; i >= 0; i--) {
            const grad = gradients[i];
            const dx = x - grad.x * width;
            const dy = y - grad.y * height;
            const angle = -grad.rotation * (Math.PI / 180);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            const localX = (dx * cos - dy * sin) / grad.scaleX;
            const localY = (dx * sin + dy * cos) / grad.scaleY;

            const dist = Math.sqrt(localX * localX + localY * localY);

            if (dist < grad.radius * width) {
                return grad;
            }
        }
        return null;
    };//end

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const targetGradient = getGradientAtPos(x, y);

        if (targetGradient) {
            onSelectGradient(targetGradient.id);
            setDraggingGradientId(targetGradient.id);
            setDragOffset({
                x: x - targetGradient.x * width,
                y: y - targetGradient.y * height,
            });
        } else {
            onSelectGradient(null);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!draggingGradientId) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newGradients = gradients.map((grad) => {
            if (grad.id === draggingGradientId) {
                return {
                    ...grad,
                    x: (x - dragOffset.x) / width,
                    y: (y - dragOffset.y) / height,
                };
            }
            return grad;
        });
        onGradientsChange(newGradients);
    };

    const handleMouseUp = () => {
        setDraggingGradientId(null);
    };

    const handleCreateTextureClick = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const imageData = ctx.getImageData(0, 0, width, height);
        onCreateTexture(imageData);
    };

    const onValueChange = (value: string) => {
        setExportFormat(value);
    };

    return (
        <div className="w-full h-full flex flex-col min-h-[540px]">
            
            <div className="flex items-center justify-between p-2 text-sm font-medium text-muted-foreground bg-card/80">
                <h2>2D Heightmap Editor</h2>
                <div className="flex items-center gap-2">

                    <SimpleSelect
                        collection={["png", "jpeg"]}
                        value={exportFormat}
                        onValueChange={onValueChange}/>

                    <Button onClick={()=>exportCanvasImage(canvasRef.current,width,height,exportFormat)} 
                            size="sm" className="h-8 text-xs">
                        Export
                    </Button>

                    <Button onClick={handleCreateTextureClick} size="sm" variant="outline" className="h-8 text-xs">
                        <Palette className="mr-2 h-4 w-4" />
                        Create Texture
                    </Button>
                </div>
            </div>

            <div className="flex-1 w-full h-full bg-card p-2 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="bg-white cursor-grab active:cursor-grabbing rounded-md"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}/>
            </div>
        </div>
    );
}
