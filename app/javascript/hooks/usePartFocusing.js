import {usePage} from "@inertiajs/react";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useState} from "react";
import * as THREE from "three";

/**
 * Focuses the camera on the part
 * @param {THREE.Object3D} model
 * @param {THREE.Vector3} defaultCameraPosition
 * @param {THREE.Vector3} defaultTarget
 */
export default function usePartFocusing(model, defaultCameraPosition, defaultTarget) {
    const {part} = usePage().props
    const {camera, controls} = useThree()
    const [target, setTarget] = useState(defaultTarget)
    const [offset, setOffset] = useState(defaultCameraPosition)

    useFrame((_, delta) => {
        if(target && offset && controls && camera) {
            if(controls.target.distanceTo(target) > 0.01) {
                const smoothing = 1
                const step = smoothing * delta

                controls.target.lerp(target, step)
                camera.position.lerp(offset, step)

                const targetAngle = (offset.y > 10) ? Math.PI * 0.4 : Math.PI
                const angleStep = smoothing * 0.5 * delta
                controls.maxPolarAngle += (targetAngle - controls.maxPolarAngle) * angleStep

                controls.update()
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
            setOffset(defaultCameraPosition)
            setTarget(defaultTarget)
        }
    }, [part, camera, controls, model.scene, defaultTarget, defaultCameraPosition])
}
