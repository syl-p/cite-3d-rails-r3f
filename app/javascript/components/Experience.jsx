import {OrbitControls, PerspectiveCamera, useGLTF, useTexture} from "@react-three/drei"
import * as THREE from "three"
import {usePage} from "@inertiajs/react";

import {useEffect, useState, useMemo, useRef} from "react"
import Spot from "./Spot.jsx";
import usePartFocusing from "@/hooks/usePartFocusing";
import useAppStore from "@/stores/useAppStore";
import {useControls} from "leva";
import {useThree} from "@react-three/fiber";
import Title from "@/components/Title.jsx";

export default function Experience() {
    const {parts} = usePage().props
    const model = useGLTF('/cite-carcassonne-export/cite-carcassonne.gltf')
    const alphaMap = useTexture('/alpha-map.png')
    const showSpots = useAppStore((s) => s.showSpots)
    const setShowSpots = useAppStore((s) => s.setShowSpots)


    const { immersivePosition, immersiveDefaultLookAt, fromSkyPosition } = useControls({
        immersivePosition: {
            value: { x: 41, y: 5.5, z: -2.5 },
            step: 0.1,
        },
        immersiveDefaultLookAt: {
            value: { x: -35.8, y: 11, z: -8.2 },
            step: 0.1,
        },
        fromSkyPosition: {
            value: { x: 0, y: 38, z: 50 },
            step: 0.1,
        }
    })

    const { camera, controls } = useThree()
    useEffect(() => {
        if(!camera || !controls) return
        // Initialisation AU MONTAGE (avant toute animation)
        camera.position.set(immersivePosition.x, immersivePosition.y, immersivePosition.z)
        controls.target.set(immersiveDefaultLookAt.x, immersiveDefaultLookAt.y, immersiveDefaultLookAt.z)
        controls.update()
    }, [])


    const alphaMaterial = useMemo(() => {
        const material = new THREE.MeshStandardMaterial({
            color: "#e2e2e2",
            flatShading: true
        });

        material.onBeforeCompile = (shader) => {
            shader.uniforms.alphaTexture = {
                value: alphaMap,
            };
            shader.vertexShader = `
            varying vec2 vUv;
            varying vec3 vPosition;
            ${shader.vertexShader}
        `.replace(
                `#include <uv_vertex>`,
                `#include <uv_vertex>
            vUv = uv;
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            `
            );

            shader.fragmentShader = `
                uniform sampler2D alphaTexture;
                varying vec3 vPosition;

            ${shader.fragmentShader}
            `.replace(
                `#include <dithering_fragment>`,
                `
                // Calcul des coordonnées de la texture alpha
                vec2 textureCoords = (vPosition.xz * 0.0115) + 0.5;
                vec4 textureColor = texture2D(alphaTexture, textureCoords);
                float alpha = textureColor.a;

                // Appliquer l'alpha de la texture externe sans toucher à la couleur ou à la texture
                gl_FragColor.a *= alpha;

                #include <dithering_fragment>
                `
            );
        };

        return material
    }, [alphaMap])

    const [matchedParts, setMatchedParts] = useState([])

    useEffect(() => {
        const matchedPartsTemp = []
        model.scene.traverse(el => {
            el.material = alphaMaterial;
            let targetedPosition = new THREE.Vector3();
            // set state
            const part = parts.find(p => p.object_name === el.name)

            if (part) {
                const {x, y, z} = el.getWorldPosition(targetedPosition)
                matchedPartsTemp.push({
                    part,
                    position: {x, y, z}
                })
            }
        })

        setMatchedParts(matchedPartsTemp)
        return () => {
            setMatchedParts([])
        }
    },[parts])

    const defaultCameraPosition = useMemo(() => {
        return showSpots ?
            new THREE.Vector3(
                fromSkyPosition.x,
                fromSkyPosition.y,
                fromSkyPosition.z
            ) :
            new THREE.Vector3(
                immersivePosition.x,
                immersivePosition.y,
                immersivePosition.z
            )
    }, [immersivePosition, fromSkyPosition, showSpots])

    const defaultTarget = useMemo(() => {
        return showSpots ?
            new THREE.Vector3() :
            new THREE.Vector3(
                immersiveDefaultLookAt.x,
                immersiveDefaultLookAt.y,
                immersiveDefaultLookAt.z
            )
    }, [immersiveDefaultLookAt, showSpots])

    usePartFocusing(model, defaultCameraPosition, defaultTarget)

    return <>
        <PerspectiveCamera makeDefault fov={40}
                           position={[immersivePosition.x, immersivePosition.y, immersivePosition.z]} />
        <OrbitControls makeDefault enableRotate={showSpots}/>
        <directionalLight position={[1, 20, 30]}/>
        <ambientLight />
        <primitive object={model.scene} scale={0.1}  onClick={() => setShowSpots(true)}/>
        {showSpots && matchedParts.map(p => (<Spot key={p.part.id} part={p.part} position={p.position}/>))}

        <Title />
    </>
}