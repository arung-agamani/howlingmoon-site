import {
    MeshProps,
    MeshToonMaterialProps,
    TorusGeometryProps,
    useFrame,
} from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
interface Props extends MeshProps {
    torusProps?: TorusGeometryProps;
    materialProps?: MeshToonMaterialProps;
    rotateDir?: "x" | "y" | "z";
    rotateSpeed?: number;
}

export default function Torus(props: Props) {
    const ref = useRef<Mesh>(null!);
    useFrame((state, delta) => {
        if (props.rotateDir) {
            ref.current.rotation[props.rotateDir] +=
                delta * (props.rotateSpeed || 1);
        }
    });
    return (
        <mesh {...props} ref={ref}>
            <torusGeometry {...props.torusProps} />
            {/* <meshStandardMaterial /> */}
            <meshToonMaterial {...props.materialProps} />
        </mesh>
    );
}
