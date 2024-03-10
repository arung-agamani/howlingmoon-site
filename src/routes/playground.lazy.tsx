import { createLazyFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import "./playground.css";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Model as CustomModel } from "../components/three-objects/Test1";
import { Vector2 } from "three";

const Playground = () => {
    return (
        <div id="canvas-container" className="w-full h-screen">
            <Suspense fallback={<span>Loading...</span>}>
                <Canvas shadows>
                    <group
                        rotation={[Math.PI * 0.2, Math.PI * 0.25, 0]}
                        position={[0, 0.3, 0]}
                        scale={[1.2, 1.2, 1.2]}
                    >
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.3}
                            penumbra={2}
                            decay={0.1}
                            intensity={10}
                            castShadow
                        />
                        <CustomModel position={[0, -4, 0]} />
                    </group>
                    <ScrollControls pages={1} damping={0}>
                        <Scroll html>
                            <section className="w-screen h-screen flex justify-center items-center">
                                <h2 className="text-3xl text-white">
                                    ~~Awoo~~
                                </h2>
                            </section>
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </Suspense>
        </div>
    );
};

export const Route = createLazyFileRoute("/playground")({
    component: Playground,
});
