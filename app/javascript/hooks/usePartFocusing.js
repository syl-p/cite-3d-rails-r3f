import {usePage} from "@inertiajs/react";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useState} from "react";
import * as THREE from "three";

export default function usePartFocusing(model, initalCameraPosition) {
    const {part} = usePage().props
    const {camera, controls} = useThree()
    const [target, setTarget] = useState(new THREE.Vector3())
    const [offset, setOffset] = useState(new THREE.Vector3())

    useFrame(() => {
        if(target && offset && controls && camera) {
            if(controls.target.distanceTo(target) > 0.01) {
                controls.target.lerp(target, 0.1)
                camera.position.lerp(offset, 0.1)
            }
        }
    })

    useEffect(() => {
        if(part) {
            model.scene.traverse(el => {
                let targetedPosition = new THREE.Vector3();
                if (el.name === part.object_name) {
                    const position = el.getWorldPosition(targetedPosition)
                    setTarget(position)
                    setOffset(new THREE.Vector3(part.offset_x, part.offset_y, part.offset_z))
                }
            })
        } else if(controls) {
            setTarget(new THREE.Vector3())
            setOffset(initalCameraPosition)
        }
    }, [part, camera, controls, model.scene])
}