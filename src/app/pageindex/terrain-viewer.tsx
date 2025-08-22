
"use client";

import { useEffect, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { TerrainParams } from '@/types';
import { applyLaplacianSmoothing } from '@/lib/functions/mesh-utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type TerrainViewerProps = {
    terrainParams: TerrainParams;
    heightmapData: ImageData | null;
    textureData: ImageData | null;
};

export default function TerrainViewer({ terrainParams, heightmapData, textureData }: TerrainViewerProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const lightRef = useRef<THREE.DirectionalLight | null>(null);

    const [isWireframe, setIsWireframe] = useState(false);
    const [wireframeColor, setWireframeColor] = useState('#00ff00');

    const textureRef = useRef<THREE.CanvasTexture | null>(null);

    // Materials are created once and stored in refs to avoid re-creation on re-renders
    const solidMaterialRef = useRef(new THREE.MeshStandardMaterial({
        color: 0xffffff, // Start with white to not tint textures
        roughness: 0.8,
        metalness: 0.2,
        side: THREE.DoubleSide,
    }));
    const wireframeMaterialRef = useRef(new THREE.MeshBasicMaterial({
        color: new THREE.Color(wireframeColor),
        wireframe: true,
        transparent: true,
    }));

    const geometry = useMemo(() => {
        const { sideLength, subdivisions } = terrainParams;
        const geom = new THREE.PlaneGeometry(sideLength, sideLength, subdivisions, subdivisions);
        geom.rotateX(-Math.PI / 2);
        return geom;
    }, [terrainParams.sideLength, terrainParams.subdivisions]);

    // Initialize scene, camera, renderer, and controls
    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111); // Darker background
        scene.fog = new THREE.Fog(0x111111, terrainParams.sideLength, terrainParams.sideLength * 2.5);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 1, 5000);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controlsRef.current = controls;
        controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI / 2 - 0.05;
        controls.minDistance = 100;
        controls.maxDistance = terrainParams.sideLength * 1.5;
        controls.target.set(0, 0, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        lightRef.current = directionalLight;
        scene.add(directionalLight);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (rendererRef.current && cameraRef.current && mount) {
                cameraRef.current.aspect = mount.clientWidth / mount.clientHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(mount.clientWidth, mount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            controls.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { sideLength } = terrainParams;
        if (cameraRef.current) {
            cameraRef.current.position.set(sideLength * 0.8, sideLength * 0.6, sideLength * 0.8);
            cameraRef.current.lookAt(0, 0, 0);
        }
        if (controlsRef.current) {
            controlsRef.current.maxDistance = sideLength * 1.5;
            controlsRef.current.update();
        }
        if (sceneRef.current?.fog instanceof THREE.Fog) {
            sceneRef.current.fog.near = sideLength;
            sceneRef.current.fog.far = sideLength * 2.5;
        }
        if (lightRef.current) {
            lightRef.current.position.set(sideLength * 0.5, sideLength, sideLength * 0.5);
            const shadowCamSize = sideLength * 0.9;
            lightRef.current.shadow.camera.near = 10;
            lightRef.current.shadow.camera.far = sideLength * 3;
            lightRef.current.shadow.camera.left = -shadowCamSize;
            lightRef.current.shadow.camera.right = shadowCamSize;
            lightRef.current.shadow.camera.top = shadowCamSize;
            lightRef.current.shadow.camera.bottom = -shadowCamSize;
            lightRef.current.shadow.camera.updateProjectionMatrix();
        }
    }, [terrainParams.sideLength]);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        if (meshRef.current) {
            scene.remove(meshRef.current);
            meshRef.current.geometry.dispose();
        }

        const newMesh = new THREE.Mesh(geometry, isWireframe ? wireframeMaterialRef.current : solidMaterialRef.current);
        newMesh.receiveShadow = true;
        newMesh.castShadow = true;
        meshRef.current = newMesh;
        scene.add(newMesh);

    }, [geometry, isWireframe]);

    // Effect to switch material when isWireframe changes
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.material = isWireframe ? wireframeMaterialRef.current : solidMaterialRef.current;
        }
    }, [isWireframe]);

    // Effect to update wireframe color
    useEffect(() => {
        wireframeMaterialRef.current.color.set(wireframeColor);
    }, [wireframeColor]);

    // Effect to update texture
    useEffect(() => {
        const material = solidMaterialRef.current;
        if (textureData) {
            if (textureRef.current) {
                textureRef.current.dispose();
            }
            const canvasTexture = new THREE.CanvasTexture(textureData);
            canvasTexture.needsUpdate = true;
            material.map = canvasTexture;
            material.color.set(0xffffff); // Ensure material is white to not tint the texture
            textureRef.current = canvasTexture;
        } else {
            material.map = null; // No texture
            material.color.set(0xffffff); // Default gray color
        }
        material.needsUpdate = true;
    }, [textureData]);


    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const { position, uv } = mesh.geometry.attributes;

        if (!heightmapData) {
            for (let i = 0; i < position.count; i++) {
                position.setY(i, 0);
            }
        } else {
            const { maxHeight } = terrainParams;
            const { width, height, data } = heightmapData;

            for (let i = 0; i < position.count; i++) {
                const u = uv.getX(i);
                const v = 1 - uv.getY(i); // Invert v to match canvas coordinates

                const x = Math.floor(u * (width - 1));
                const y = Math.floor(v * (height - 1));

                // Black (0) is high, White (255) is low
                const R_INDEX = (y * width + x) * 4;
                const heightValue = (255 - data[R_INDEX]) / 255.0;
                const calculatedHeight = heightValue * maxHeight;

                position.setY(i, calculatedHeight);
            }
        }

        position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();

    }, [heightmapData, terrainParams.maxHeight, geometry]);

    return (
        <div className="w-full h-full flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between p-2 text-sm font-medium text-muted-foreground bg-card/80">
                <h2>3D Terrain Viewer</h2>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="wireframe-mode"
                        checked={isWireframe}
                        onCheckedChange={setIsWireframe}
                    />
                    <Label htmlFor="wireframe-mode">Wireframe</Label>
                    <input
                        type="color"
                        value={wireframeColor}
                        onChange={(e) => setWireframeColor(e.target.value)}
                        disabled={!isWireframe}
                        className={cn(
                            "w-6 h-6 p-0 border-none bg-transparent cursor-pointer",
                            "transition-opacity",
                            !isWireframe && "opacity-50 cursor-not-allowed"
                        )}
                        title="Wireframe color"
                    />
                </div>
            </div>
            <div ref={mountRef} className="w-full flex-1" />
        </div>
    );
}

