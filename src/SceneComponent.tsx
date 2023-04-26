import React, { FC } from 'react';

import "@babylonjs/core/Physics/physicsEngineComponent"  // side-effect adds scene.enablePhysics function
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent"; // side-effect for shadow generator
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';

import { Scene, Engine } from 'react-babylonjs';
import ChupaShupsWindmill from './ChupaShupsWindmill';

import * as CANNON from 'cannon';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const SceneComponent: FC = () => {

  return (
    <div>
      <header>
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
          <Scene enablePhysics={[gravityVector]}>
            <arcRotateCamera name="arc" target={new Vector3(0, 1, 0)}
              alpha={-Math.PI / 2} beta={(0.2 + (Math.PI / 4))} wheelPrecision={50}
              radius={14} minZ={0.001} lowerRadiusLimit={8} upperRadiusLimit={20} upperBetaLimit={Math.PI / 2} />
            <hemisphericLight name='hemi' direction={new Vector3(0, -1, 0)} intensity={0.8} />
            <directionalLight name="shadow-light" setDirectionToTarget={[Vector3.Zero()]} direction={Vector3.Zero()} position={new Vector3(-40, 30, -40)}
              intensity={0.4} shadowMinZ={1} shadowMaxZ={2500}>
            </directionalLight>
            <ChupaShupsWindmill />
            <ground name="ground1" width={24} height={24} subdivisions={2} receiveShadows={true}>
              <physicsImpostor type={PhysicsImpostor.BoxImpostor} _options={{ mass: 0, restitution: 0.9 }} />
            </ground>
          </Scene>
        </Engine>
      </header>
    </div>
  );
}
export default SceneComponent;