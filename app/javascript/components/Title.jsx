import useAppStore from "@/stores/useAppStore.js";
import {useSpringValue} from "@react-spring/three";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {useEffect, useRef} from "react";
import {Text} from "@react-three/drei";

export default function Title() {
    const textRef = useRef(null)
    const showSpots = useAppStore((s) => s.showSpots)
    const textOpacity = useSpringValue(1)
    const {camera} = useThree()

    useEffect(() => {
        if(showSpots) {
            textOpacity.start({to: 0, duration: 600})
        } else {
            textOpacity.start({to: 1, duration: 1000})
        }
    }, [showSpots])

    useFrame(() => {
        if(textRef && textRef.current) {
            // Code billboard MANQUANT
            textRef.current.quaternion.copy(camera.quaternion)
            const vec = new THREE.Vector3(0, 5, -100)
            vec.applyQuaternion(camera.quaternion)
            vec.add(camera.position)
            textRef.current.position.copy(vec)
            textRef.current.material.opacity = textOpacity.get()
        }
    })

    return(
        <Text
            ref={textRef}
            fontSize={15}
            color="black"
            anchorX="center"
            anchorY="middle"
            onUpdate={(self) => {
                self.renderOrder = -999
                self.material.depthTest = true
                self.material.transparent = true
            }}
        >
            Carcassonne
        </Text>)
}