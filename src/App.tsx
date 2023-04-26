import React, { FC } from 'react';

import "@babylonjs/core/Physics/physicsEngineComponent"  // side-effect adds scene.enablePhysics function
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent"; // side-effect for shadow generator
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Scene, Engine } from 'react-babylonjs';
import ChupaShupsWindmill from './ChupaShupsWindmill';

const App: FC = () => {
  return (
    <div>
      <header>
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="canvas">
          <Scene>
            <freeCamera name="camera" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
            <hemisphericLight name="light" intensity={0.7} direction={Vector3.Up()} />
            <ChupaShupsWindmill />
          </Scene>
        </Engine>
      </header>
    </div>
  );
}
export default App;