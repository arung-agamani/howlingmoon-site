import { useEffect, useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { createRoot, extend, events } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei/web/ScrollControls";
import { Model as CustomModel } from "../components/three-objects/Test1";

import {
    Mesh,
    MeshStandardMaterial,
    AmbientLight,
    SpotLight,
    PlaneGeometry,
    Group,
} from "three";

import "./playground.css";

extend({
    Mesh,
    MeshStandardMaterial,
    AmbientLight,
    SpotLight,
    PlaneGeometry,
    Group,
});

const Playground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const root = createRoot(canvasRef.current!);

        root.configure({ shadows: true, events });
        window.addEventListener("resize", () => {
            root.configure({
                size: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    top: 0,
                    left: 0,
                },
                shadows: true,
                events,
            });
        });
        window.dispatchEvent(new Event("resize"));
        root.render(
            <>
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
                            <h2 className="text-3xl text-white">~~Awoo~~</h2>
                        </section>
                    </Scroll>
                </ScrollControls>
            </>
        );
    }, []);
    return (
        <div id="canvas-container" className="w-full h-screen">
            <canvas id="three-canvas" ref={canvasRef} />
        </div>
    );
};

export const Route = createLazyFileRoute("/playground")({
    component: Playground,
});
