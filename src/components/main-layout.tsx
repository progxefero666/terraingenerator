
"use client";

import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Gradient, TerrainParams, TextureParams } from "@/types";
import TerrGeneratorSidebar from "@/app/terrgenerator/generator/terrgeneratorbar";
import TerrTextureEditionbar from "@/app/terrgenerator/edition/texteditionbar";

import MainContent from "@/components/main-content";
import { useToast } from "@/hooks/use-toast";
import { generateGradients as generateGradientsAI } from "@/ai/flows/gradient";
import { generateTexture as generateTextureAI } from "@/ai/flows/texture";
import { generateTextureFromHeightmap } from "@/lib/functions/texture-utils";
import { dataURIToImageData, imageDataToDataURI } from "@/lib/functions/graphutils";
import { DEFAULT_TERRAIN_PARAMS, DEFAULT_TEXTURE_PARAMS, WATER_COLOR, HEIGHMAP_RESOLUTION } from "@/lib/terrainsconfig";

//import AdvancedSidebar from "@/components/advanced-sidebar";


const createDefaultGradients = (): Gradient[] => [
    { id: uuidv4(), type: 'circular', x: 0.5, y: 0.5, radius: 0.25, scaleX: 1, scaleY: 1, rotation: 0, intensity: 0.9 },
];

const showAppHeader = true;

export default function MainLayout() {
    const { toast } = useToast();

    const [terrainParams, setTerrainParams] = useState<TerrainParams>(DEFAULT_TERRAIN_PARAMS);
    const [textureParams, setTextureParams] = useState<TextureParams>(DEFAULT_TEXTURE_PARAMS);
    const [gradients, setGradients] = useState<Gradient[]>(createDefaultGradients);

    const [selectedGradientId, setSelectedGradientId] = useState<string | null>(gradients[0]?.id || null);
    const [heightmapData, setHeightmapData] = useState<ImageData | null>(null);
    const [textureBaseData, setTextureBaseData] = useState<ImageData | null>(null);
    const [numGradientsToGenerate, setNumGradientsToGenerate] = useState(1);
    
    const [activeTab, setActiveTab] = useState('terrain-3d');


    // Create a default texture base image on mount
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = textureParams.sideImage;
        canvas.height = textureParams.sideImage;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, textureParams.sideImage, textureParams.sideImage);
            setTextureBaseData(ctx.getImageData(0, 0, textureParams.sideImage, textureParams.sideImage));
        }
    }, [textureParams.sideImage]);


    const handleTerrainParamsChange = useCallback((params: Partial<TerrainParams>) => {
        setTerrainParams((prev) => ({ ...prev, ...params }));
    }, []);

    const handleTextureParamsChange = useCallback((params: Partial<TextureParams>) => {
        setTextureParams((prev) => ({ ...prev, ...params }));
    }, []);

    const handleGenerateGradients = useCallback(() => {
        const newGradients: Gradient[] = [];
        for (let i = 0; i < numGradientsToGenerate; i++) {
            const newId = uuidv4();
            const radius = Math.random() * 0.15 + 0.1; // 0.1 to 0.25
            const { x, y } = findSafeRandomPosition(radius);

            const newGradient: Gradient = {
                id: newId,
                type: 'circular',
                x,
                y,
                radius,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                intensity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
            };
            newGradients.push(newGradient);
        }

        setGradients((prev) => [...prev, ...newGradients]);
        setSelectedGradientId(newGradients[0]?.id || selectedGradientId);

    }, [numGradientsToGenerate, selectedGradientId]);

    const handleUpdateGradient = useCallback((id: string, updates: Partial<Gradient>) => {
        setGradients((prev) =>
            prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
        );
    }, []);

    const handleRemoveGradient = useCallback((id: string) => {
        setGradients(prev => {
            const remaining = prev.filter(g => g.id !== id);
            if (selectedGradientId === id) {
                setSelectedGradientId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
            }
            return remaining;
        });
    }, [selectedGradientId]);

    const handleAIGenerateGradients = useCallback(async (prompt: string) => {
        try {
            const result = await generateGradientsAI({ prompt });
            const newGradients: Gradient[] = result.map(g => ({ ...g, id: uuidv4() }));
            setGradients(newGradients);
            setSelectedGradientId(newGradients[0]?.id || null);
            toast({
                title: "AI Generation Successful",
                description: `Generated ${newGradients.length} new gradients.`,
            });
        } catch (error) {
            console.error("AI generation failed:", error);
            toast({
                variant: "destructive",
                title: "AI Generation Failed",
                description: "Could not generate gradients. Please try again.",
            });
        }
    }, [toast]);

    const handleGradientsChange = (newGradients: Gradient[]) => {
        setGradients(newGradients);
    };

    const handleRandomize = useCallback(() => {
        // Randomize number of gradients to generate
        setNumGradientsToGenerate(Math.floor(Math.random() * 5) + 1); // 1 to 5

        // Randomize selected gradient's properties, if one is selected
        if (selectedGradientId) {
            const randomUpdates: Partial<Gradient> = {
                intensity: Math.random(),
                radius: Math.random() * 0.45 + 0.05, // 0.05 to 0.5
                rotation: Math.random() * 360,
                scaleX: Math.random() * 4.8 + 0.2, // 0.2 to 5.0
                scaleY: Math.random() * 4.8 + 0.2, // 0.2 to 5.0
            };
            handleUpdateGradient(selectedGradientId, randomUpdates);
        }
    }, [selectedGradientId, handleUpdateGradient]);

    const handleCreateTexture = useCallback((imageData: ImageData) => {
        setTextureBaseData(imageData);
        setActiveTab('texture');
    }, []);

    const handleApplyTexture = useCallback(() => {
        if (!heightmapData) {
            toast({
                variant: "destructive",
                title: "No Heightmap Data",
                description: "Please generate a heightmap before creating a texture.",
            });
            return;
        }
        const newTexture = generateTextureFromHeightmap(heightmapData, textureParams.colorRamp, WATER_COLOR);
        setTextureBaseData(newTexture);
        toast({
            title: "Texture Applied",
            description: "The color ramp has been applied to the texture.",
        });

    }, [heightmapData, textureParams.colorRamp, toast]);

    const handleAIGenerateTexture = useCallback(async (prompt: string) => {
        if (!textureBaseData) {
            toast({
                variant: "destructive",
                title: "No Base Texture",
                description: "A base texture must exist before generating with AI.",
            });
            return;
        }

        try {
            const imageDataUri = imageDataToDataURI(textureBaseData);
            const result = await generateTextureAI({ prompt, imageDataUri });
            const newImageData = await dataURIToImageData(result.generatedDataUri);
            setTextureBaseData(newImageData!);
            toast({
                title: "AI Texture Generation Successful",
                description: "The AI has generated a new texture.",
            });
        } catch (error) {
            console.error("AI texture generation failed:", error);
            toast({
                variant: "destructive",
                title: "AI Generation Failed",
                description: "Could not generate the texture. Please check your API key and try again.",
            });
        }
    }, [textureBaseData, toast]);

    const handleReset = useCallback(() => {
        setTerrainParams(DEFAULT_TERRAIN_PARAMS);
        setTextureParams(DEFAULT_TEXTURE_PARAMS);
        const defaultGradients = createDefaultGradients();
        setGradients(defaultGradients);
        setSelectedGradientId(defaultGradients[0]?.id || null);
        setHeightmapData(null);
        setActiveTab('terrain-3d');
        // Re-create the default texture base image
        const canvas = document.createElement('canvas');
        canvas.width = DEFAULT_TEXTURE_PARAMS.sideImage;
        canvas.height = DEFAULT_TEXTURE_PARAMS.sideImage;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, DEFAULT_TEXTURE_PARAMS.sideImage, DEFAULT_TEXTURE_PARAMS.sideImage);
            setTextureBaseData(ctx.getImageData(0, 0, DEFAULT_TEXTURE_PARAMS.sideImage, DEFAULT_TEXTURE_PARAMS.sideImage));
        }
        toast({
            title: "Application Reset",
            description: "All settings have been reset to their default values.",
        });
    }, [toast]);


    const renderSidebar = () => {
        switch (activeTab) {
            case 'terrain-3d':
                return (
                    <TerrGeneratorSidebar
                        gradients={gradients}
                        selectedGradientId={selectedGradientId}
                        numGradientsToGenerate={numGradientsToGenerate}
                        onNumGradientsToGenerateChange={setNumGradientsToGenerate}
                        onSelectGradient={setSelectedGradientId}
                        onUpdateGradient={handleUpdateGradient}
                        onGenerateGradients={handleGenerateGradients}
                        onRemoveGradient={handleRemoveGradient}
                        onAIGenerate={handleAIGenerateGradients}
                        onRandomize={handleRandomize}
                        onReset={handleReset}/>
                );
            case 'texture':
                return (
                    <TerrTextureEditionbar
                        params={textureParams}
                        onParamsChange={handleTextureParamsChange}/>
                );
            case 'advanced':
            //return <AdvancedSidebar />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-background">
            {showAppHeader && (
                <h1 className="text-xl font-semibold">TerrainForge</h1>
            )}
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-1/4 flex-shrink-0 border-r-2 border-primary flex flex-col">
                    {renderSidebar()}
                </aside>
                <main className="w-3/4 flex-1 flex flex-col items-center overflow-auto">
                    <MainContent
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        terrainParams={terrainParams}
                        onTerrainParamsChange={handleTerrainParamsChange}
                        textureParams={textureParams}
                        onTextureParamsChange={handleTextureParamsChange}
                        heightmapData={heightmapData}
                        textureBaseData={textureBaseData}
                        gradients={gradients}
                        onGradientsChange={handleGradientsChange}
                        selectedGradientId={selectedGradientId}
                        onSelectGradient={setSelectedGradientId}
                        onHeightmapUpdate={setHeightmapData}
                        onCreateTexture={handleCreateTexture}
                        onApplyTexture={handleApplyTexture}
                        heightmapResolution={HEIGHMAP_RESOLUTION}/>

                </main>
            </div>
        </div>
    );
}
