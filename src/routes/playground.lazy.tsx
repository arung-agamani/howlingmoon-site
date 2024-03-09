import { createLazyFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "../components/three-objects/Box";

import "./playground.css";
import { Scroll, ScrollControls } from "@react-three/drei";

const Playground = () => {
    return (
        <div id="canvas-container" className="w-full h-screen">
            <Suspense fallback={<span>Loading...</span>}>
                <Canvas>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight
                        position={[20, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        decay={0}
                        intensity={Math.PI}
                    />
                    <pointLight
                        position={[-10, -10, -10]}
                        decay={0}
                        intensity={Math.PI}
                    />
                    <Box position={[-1.2, 0, 0]} rotateDir="x" />
                    <Box position={[1.2, 0, 0]} rotateDir="x" />
                    <Box position={[0, 1, 0]} rotateDir="y" />
                    <Box position={[0, -1, 0]} rotateDir="y" />
                    <ScrollControls pages={1} damping={0}>
                        <Scroll html>
                            <section className="w-screen h-screen flex justify-center items-center">
                                <h2 className="text-3xl">~~Awoo~~</h2>
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
