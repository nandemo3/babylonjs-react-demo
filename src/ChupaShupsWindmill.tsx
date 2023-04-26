import React, {FC, useEffect, useRef} from "react";
import { Animation, Vector3 } from '@babylonjs/core'
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { useScene } from 'react-babylonjs'

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
                <sphere
                    name="windmill1"
                    arc={0.25}
                    sideOrientation={2}
                    diameter={0.5}
                    segments={16}
                    position={new Vector3(undefined, 2.5, undefined)}
                    rotation={new Vector3(undefined, -Math.PI / 2, undefined)}
                >
                    <standardMaterial name="windmill1-material" specularPower={16}
                        diffuseColor={Color3.Red()}
                    />
                </sphere>
                <sphere
                    name="windmill2"
                    arc={0.25}
                    sideOrientation={2}
                    diameter={0.5}
                    segments={16}
                    position={new Vector3(undefined, 2.5, undefined)}
                    rotation={new Vector3(undefined, Math.PI / 2, undefined)}
                    >
                    <standardMaterial name="windmill2-material" specularPower={16}
                        diffuseColor={Color3.Yellow()}
                    />
                </sphere>
            </transformNode>
            <cylinder
                name="cylinder"
                height={4.5}
                diameterTop={0.05}
                diameterBottom={0.25}
            >
                <standardMaterial name="cylinder-material" specularPower={16}
                    diffuseColor={Color3.White()}
                />
            </cylinder>
        </>
    )

}

export default ChupaShupsWindmill;