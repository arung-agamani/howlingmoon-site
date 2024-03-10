import { createLazyFileRoute } from "@tanstack/react-router";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "../components/three-objects/Box";

import "./playground.css";
import { Scroll, ScrollControls } from "@react-three/drei";
import Torus from "../components/three-objects/Torus";
import { Color } from "three";

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
                    {/* <Box position={[-1.2, 0, 0]} rotateDir="x" />
                    <Box position={[1.2, 0, 0]} rotateDir="x" />
                    <Box position={[0, 1, 0]} rotateDir="y" />
                    <Box position={[0, -1, 0]} rotateDir="y" /> */}
                    <Torus
                        torusProps={{ args: [5, 1, 4, 6] }}
                        rotateDir="z"
                        rotateSpeed={0.2}
                        materialProps={{
                            color: new Color(0x603cf0),
                        }}
                    />
                    <Torus
                        torusProps={{ args: [2, 0.4, 4, 5] }}
                        rotateDir="z"
                        rotateSpeed={-0.6}
                        materialProps={{
                            emissive: new Color(0x5a945c),
                            color: new Color(0x0fb815),
                        }}
                    />
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
