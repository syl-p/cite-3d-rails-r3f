import {OrbitControls, PerspectiveCamera, useGLTF, useTexture} from "@react-three/drei"
import * as THREE from "three"
import {usePage} from "@inertiajs/react";

import {useEffect, useState, useMemo} from "react"
import Spot from "./Spot.jsx";
import usePartFocusing from "@/hooks/usePartFocusing";

export default function Experience() {
    const {parts} = usePage().props
    const model = useGLTF('/cite-carcassonne-export/cite-carcassonne.gltf')
    const alphaMap = useTexture('/alpha-map.png')

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
                vec2 textureCoords = (vPosition.xz * 0.01) + 0.5;
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

    usePartFocusing(model, new THREE.Vector3(0, 25, 50))

    return <>
        <PerspectiveCamera makeDefault position={[0, 25, 50]}/>
        <OrbitControls makeDefault maxPolarAngle={Math.PI * 0.4}/>
        <directionalLight position={[1, 20, 30]}/>
        <ambientLight />
        <primitive object={model.scene} scale={0.1}/>
        {matchedParts.map(p => (<Spot key={p.part.id} part={p.part} position={p.position}/>))}
    </>
}