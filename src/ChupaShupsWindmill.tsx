import React, {FC, useEffect, useRef} from "react";
import { Animation, Vector3 } from '@babylonjs/core'
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { useScene } from 'react-babylonjs'

type ArcSphereProps = {
    name: string;
    rotation: Vector3;
    diffuseColor?: Color3
}

function getSpinAnimation() {
    const keys = [
      {
        frame: 0,
        value: 0,
      },
      {
        frame: 30,
        value: 2 * Math.PI,
      },
    ]
  
    const animation = new Animation('animation', 'rotation.y', 30, 0, 1)
    animation.setKeys(keys)
  
    return [animation]
  }

const ChupaShupsWindmill: FC = () => {
    const groupRef = useRef(null)
    const scene = useScene()
    const position = Vector3.Zero()

    useEffect(() => {
        const playAnimation = () => {
            if (groupRef.current) {
                const group = groupRef.current
                const animations = getSpinAnimation()
                scene!.beginDirectAnimation(
                group,
                animations,
                0,
                30,
                true
                )
            }
        }
        playAnimation()
      }, [groupRef, scene])

    return (
        <>
            <transformNode
                name="group"
                ref={groupRef}
                position={position}
            >
                <ArcSphere
                    name="windmill1"
                    rotation={new Vector3(undefined, -Math.PI / 2, undefined)}
                    diffuseColor={Color3.Red()}
                />
                <ArcSphere
                    name="windmill2"
                    rotation={new Vector3(undefined, Math.PI / 2, undefined)}
                    diffuseColor={Color3.Yellow()}
                />
            </transformNode>
            <cylinder
                name="cylinder"
                height={4}
                diameterTop={0.1}
                diameterBottom={0.3}
            >
                <standardMaterial name="cylinder-material" specularPower={16}
                    diffuseColor={Color3.White()}
                />
            </cylinder>
        </>
    )

}

const ArcSphere = ({name, rotation, diffuseColor}: ArcSphereProps) => {
    return (
        <sphere
            name={name}
            arc={0.25}
            sideOrientation={2}
            position={new Vector3(undefined, 2.5, undefined)}
            rotation={rotation}
            >
            <standardMaterial name={`${name}-material`} specularPower={16}
                diffuseColor={diffuseColor}
            />
        </sphere>
    )
}

export default ChupaShupsWindmill;