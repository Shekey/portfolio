"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { SkateParkModel } from "./SkateParkModel";
import { SkateboardPhysics } from "./SkateboardPhysics";

export default function SkateParkScene() {
  const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
  const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";

  const SKATEBOARD_PROPS = {
    wheelTextureURL: DEFAULT_WHEEL_TEXTURE,
    wheelTextureURLs: [DEFAULT_WHEEL_TEXTURE],
    deckTextureURL: DEFAULT_DECK_TEXTURE,
    deckTextureURLs: [DEFAULT_DECK_TEXTURE],
    truckColor: "#6F6E6A",
    boltColor: "#6F6E6A",
    constantWheelSpin: false,
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas
        shadows
        gl={{ antialias: false, stencil: false, depth: true }}
        camera={{ position: [0, 5, 10], fov: 60 }}
      >
        <color attach="background" args={["#111"]} />

        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          position={[50, 80, 30]}
          intensity={1.5}
          castShadow
          shadow-bias={-0.0001}
        />
        <Environment preset="city" background={false} blur={0.8} />

        {/* GRAVITY: Normal feels better with Arcade Physics */}
        <Physics gravity={[0, -20, 0]} timeStep={1 / 60}>
          <Suspense fallback={<Html center>Loading...</Html>}>
            <SkateParkModel />

            <SkateboardPhysics {...SKATEBOARD_PROPS} />

            <EffectComposer multisampling={0}>
              <Bloom luminanceThreshold={0.9} intensity={0.3} mipmapBlur />
            </EffectComposer>
          </Suspense>
        </Physics>

        {/* IMPORTANT: NO OrbitControls here! They cause flickering. */}
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          color: "white",
          fontFamily: "monospace",
          opacity: 0.7,
        }}
      >
        ARCADE TURBO MODE <br />
        [WASD] Drive &nbsp; [SPACE] Jump &nbsp; [R] Reset
      </div>
    </div>
  );
}
