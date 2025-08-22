
"use client";

import { Gradient, TerrainParams, TextureParams } from "@/types";
import TerrainControls from "@/components/controls/terrain-controls";
import TextureControls from "@/components/controls/texture-controls";
import TerrainViewer from "@/app/pageindex/terrain-viewer";
import HeightmapEditor from "@/app/terrgenerator/generator/heightmap-editor";
import TextureEditor from "@/app/terrgenerator/edition/texture-editor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

type MainContentProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
    terrainParams: TerrainParams;
    onTerrainParamsChange: (params: Partial<TerrainParams>) => void;
    textureParams: TextureParams;
    onTextureParamsChange: (params: Partial<TextureParams>) => void;
    heightmapData: ImageData | null;
    textureBaseData: ImageData | null;
    gradients: Gradient[];
    onGradientsChange: (gradients: Gradient[]) => void;
    selectedGradientId: string | null;
    onSelectGradient: (id: string | null) => void;
    onHeightmapUpdate: (imageData: ImageData) => void;
    onCreateTexture: (imageData: ImageData) => void;
    onApplyTexture: () => void;
    heightmapResolution: number;
}

export default function MainContent({
    activeTab,
    onTabChange,
    terrainParams,
    onTerrainParamsChange,
    textureParams,
    onTextureParamsChange,
    heightmapData,
    textureBaseData,
    gradients,
    onGradientsChange,
    selectedGradientId,
    onSelectGradient,
    onHeightmapUpdate,
    onCreateTexture,
    onApplyTexture,
    heightmapResolution
}: MainContentProps) {
    return (
        <div className="flex-1 w-full p-4 flex flex-col">
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                    <TabsTrigger value="terrain-3d">Terrain 3D</TabsTrigger>
                    <TabsTrigger value="texture">Texture</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                {/* Terrain 3D */}
                <TabsContent value="terrain-3d" className="flex-1 overflow-y-auto mt-4">

                    <div className="flex flex-col items-center justify-start space-y-4">
                        <div className="w-full max-w-4xl p-3 border-2 border-primary rounded-lg bg-card/80">
                            <TerrainControls
                                params={terrainParams}
                                onParamsChange={onTerrainParamsChange}/>
                        </div>

                        <Accordion type="single" collapsible className="w-full max-w-4xl" defaultValue="item-1">
                           <AccordionItem value="item-1" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline p-2 border-2 border-accent rounded-lg bg-card/80 flex justify-center items-center font-semibold text-sm text-accent-foreground/80">
                                    <span>Show 3D Viewer</span>
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                     <div className="border-2 border-accent">
                                         <TerrainViewer
                                            terrainParams={terrainParams}
                                            heightmapData={heightmapData}
                                            textureData={heightmapData}/>
                                     </div>
                                </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                        
                        <div className="w-full max-w-4xl border-2 border-primary">
                            <HeightmapEditor
                                gradients={gradients}
                                onGradientsChange={onGradientsChange}
                                selectedGradientId={selectedGradientId}
                                onSelectGradient={onSelectGradient}
                                onHeightmapUpdate={onHeightmapUpdate}
                                onCreateTexture={onCreateTexture}
                                width={heightmapResolution}
                                height={heightmapResolution}/>
                        </div>
                    </div>
                </TabsContent>

                {/* Texture Tab */}
                <TabsContent value="texture" className="flex-1 overflow-y-auto mt-4 h-full">
                     <div className="flex flex-col items-center justify-start space-y-4 h-full">
                        <div className="w-full max-w-4xl p-3 border-2 border-primary rounded-lg bg-card/80">
                            <TextureControls 
                                params={textureParams}
                                onParamsChange={onTextureParamsChange}
                                onApplyTexture={onApplyTexture}
                            />
                        </div>
                         <Accordion type="single" collapsible className="w-full max-w-4xl" defaultValue="item-1">
                           <AccordionItem value="item-1" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline p-2 border-2 border-accent rounded-lg bg-card/80 flex justify-center items-center font-semibold text-sm text-accent-foreground/80">
                                    <span>Show 2D Texture Editor</span>
                                    <ChevronDown className="h-4 w-4 ml-2" />
                                </AccordionTrigger>
                                <AccordionContent className="mt-4">
                                     <div className="border-2 border-accent">
                                        <TextureEditor 
                                            baseImage={textureBaseData}
                                            width={textureParams.sideImage}
                                            height={textureParams.sideImage}
                                            scale={textureParams.scale}
                                        />
                                     </div>
                                </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                        <div className="w-full max-w-4xl border-2 border-primary">
                            <TerrainViewer
                                terrainParams={terrainParams}
                                heightmapData={heightmapData}
                                textureData={textureBaseData}/>
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="advanced" className="flex-1 overflow-y-auto mt-4 h-full">
                     <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-muted-foreground">Advanced section coming soon...</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
