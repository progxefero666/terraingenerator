
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocFormats } from "@/lib/docformats";

type TextureEditorProps = {
    baseImage: ImageData | null;
    width: number;
    height: number;
    scale: number; // e.g., 100 for 100%, 120 for 120%
};




export default function TextureEditor({ baseImage, width, height, scale }: TextureEditorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [exportFormat, setExportFormat] = useState<string>(DocFormats.FORMAT_PNG.value);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure canvas dimensions are updated if props change
        canvas.width = width;
        canvas.height = height;

        if (baseImage) {
            // We need to create an intermediate canvas to draw the baseImage onto it
            // This makes it easier to use drawImage with source/destination rectangles
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = baseImage.width;
            tempCanvas.height = baseImage.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                tempCtx.putImageData(baseImage, 0, 0);

                // Calculate zoom
                const zoomFactor = scale / 100;
                const newWidth = tempCanvas.width / zoomFactor;
                const newHeight = tempCanvas.height / zoomFactor;
                const sx = (tempCanvas.width - newWidth) / 2;
                const sy = (tempCanvas.height - newHeight) / 2;

                // Clear the main canvas and draw the zoomed image
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(tempCanvas, sx, sy, newWidth, newHeight, 0, 0, width, height);
            }
        } else {
            // Set background to medium gray if no image
            ctx.fillStyle = "#808080";
            ctx.fillRect(0, 0, width, height);
        }

    }, [baseImage, width, height, scale]);

    const handleExport = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = width;
        exportCanvas.height = height;
        const ctx = exportCanvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(canvas, 0, 0);

        const dataUrl = exportCanvas.toDataURL(`image/${exportFormat}`, exportFormat === 'jpeg' ? 0.95 : undefined);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `texture.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="w-full h-full flex flex-col">
            
            <div className="flex items-center justify-between p-2 text-sm font-medium text-muted-foreground bg-card/80">
                <h2>Texture Editor</h2>
                <div className="flex items-center gap-2">
                    <Select value={exportFormat} onValueChange={(value: string) => setExportFormat(value)}>
                        <SelectTrigger className="w-[80px] h-8 text-xs">
                            <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPG</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleExport} size="sm" className="h-8 text-xs">Export</Button>
                </div>
            </div>

            <div className="flex-1 w-full h-full bg-card p-2 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="bg-gray-500 rounded-md"
                />
            </div>
        </div>
    );
}
