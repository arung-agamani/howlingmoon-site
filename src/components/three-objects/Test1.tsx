/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/test1.glb --types 
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { SoftShadows, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

type GLTFResult = GLTF & {
    nodes: {
        Plane: THREE.Mesh;
        Icosphere: THREE.Mesh;
    };
    materials: {
        ["Material.001"]: THREE.MeshStandardMaterial;
        ["Material.002"]: THREE.MeshStandardMaterial;
    };
    // animations: GLTFAction[]
};

type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Model(props: JSX.IntrinsicElements["group"]) {
    const ballRef = useRef<Mesh>(null!);
    const { nodes, materials } = useGLTF("/test1.glb") as GLTFResult;
    useFrame((state, delta) => {
        ballRef.current.rotation.y += delta;
    });
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Plane.geometry}
                material={materials["Material.001"]}
                scale={4.981}
                receiveShadow
                castShadow
            ></mesh>
            <mesh
                geometry={nodes.Icosphere.geometry}
                material={materials["Material.002"]}
                position={[0, 3.644, 0]}
                castShadow
                receiveShadow
                ref={ballRef}
            ></mesh>
            <mesh rotation={[0, 0, 0]}>
                <planeGeometry />
            </mesh>
        </group>
    );
}

useGLTF.preload("/test1.glb");
