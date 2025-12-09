"use client";

import * as THREE from "three";
import { useMemo, useRef, forwardRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

export type SkateboardProps = {
  wheelTextureURLs: string[];
  wheelTextureURL: string;
  deckTextureURLs: string[];
  deckTextureURL: string;
  truckColor: string;
  boltColor: string;
  physicsRef?: React.RefObject<RapierRigidBody | null>; // NEW: Access to physics
};

type GLTFResult = GLTF & {
  nodes: { [key: string]: THREE.Mesh };
  materials: object;
};

export const Skateboard = forwardRef<THREE.Group, SkateboardProps>(
  (
    {
      wheelTextureURL,
      wheelTextureURLs,
      deckTextureURL,
      deckTextureURLs,
      truckColor,
      boltColor,
      physicsRef,
    },
    ref
  ) => {
    const wheelRefs = useRef<THREE.Object3D[]>([]);
    const { nodes } = useGLTF("/skateboard.gltf") as unknown as GLTFResult;

    // --- TEXTURES & MATERIALS (Standard Setup) ---
    const wheelTextures = useTexture(wheelTextureURLs);
    wheelTextures.forEach((t) => {
      t.flipY = false;
      t.colorSpace = THREE.SRGBColorSpace;
    });
    const wheelTexture =
      wheelTextures[wheelTextureURLs.indexOf(wheelTextureURL)] ||
      wheelTextures[0];

    const deckTextures = useTexture(deckTextureURLs);
    deckTextures.forEach((t) => {
      t.flipY = false;
      t.colorSpace = THREE.SRGBColorSpace;
    });
    const deckTexture =
      deckTextures[deckTextureURLs.indexOf(deckTextureURL)] || deckTextures[0];

    const gripTapeDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
    const gripTapeRoughness = useTexture("/skateboard/griptape-roughness.webp");

    const gripTapeMaterial = useMemo(() => {
      const mat = new THREE.MeshStandardMaterial({
        map: gripTapeDiffuse,
        bumpMap: gripTapeRoughness,
        roughnessMap: gripTapeRoughness,
        bumpScale: 3.5,
        roughness: 0.8,
        color: "#555555",
      });
      if (gripTapeDiffuse) {
        gripTapeDiffuse.wrapS = gripTapeDiffuse.wrapT = THREE.RepeatWrapping;
        gripTapeDiffuse.repeat.set(9, 9);
        gripTapeRoughness.wrapS = gripTapeRoughness.wrapT =
          THREE.RepeatWrapping;
        gripTapeRoughness.repeat.set(9, 9);
      }
      return mat;
    }, [gripTapeDiffuse, gripTapeRoughness]);

    const boltMaterial = useMemo(
      () =>
        new THREE.MeshStandardMaterial({
          color: boltColor,
          metalness: 0.5,
          roughness: 0.3,
        }),
      [boltColor]
    );
    const metalNormal = useTexture("/skateboard/metal-normal.avif");
    metalNormal.wrapS = metalNormal.wrapT = THREE.RepeatWrapping;
    metalNormal.repeat.set(8, 8);
    const truckMaterial = useMemo(
      () =>
        new THREE.MeshStandardMaterial({
          color: truckColor,
          normalMap: metalNormal,
          normalScale: new THREE.Vector2(0.3, 0.3),
          metalness: 0.8,
          roughness: 0.25,
        }),
      [truckColor, metalNormal]
    );
    const deckMaterial = useMemo(
      () =>
        new THREE.MeshStandardMaterial({ map: deckTexture, roughness: 0.1 }),
      [deckTexture]
    );
    const wheelMaterial = useMemo(
      () =>
        new THREE.MeshStandardMaterial({ map: wheelTexture, roughness: 0.35 }),
      [wheelTexture]
    );

    // --- ANIMATION: REALISTIC WHEEL SPIN ---
    const addToWheelRefs = (el: THREE.Object3D | null) => {
      if (el && !wheelRefs.current.includes(el)) wheelRefs.current.push(el);
    };

    useFrame((state, delta) => {
      if (!physicsRef?.current) return;

      // 1. Get Velocity from Physics Body
      const vel = physicsRef.current.linvel();

      // 2. Calculate Speed (Magnitude)
      // We project velocity onto the board's forward direction for accuracy,
      // but simple magnitude works well enough for visual flair.
      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2);

      // 3. Determine Direction (Forward vs Backward) using Dot Product is better,
      // but let's stick to simple speed for now to avoid complexity.
      const rotationAmount = speed * delta * 5; // Multiplier for visual speed

      // 4. Spin Wheels
      wheelRefs.current.forEach((w) => {
        w.rotation.x += rotationAmount;
      });
    });

    return (
      <group ref={ref} dispose={null}>
        {/* Visual offset is handled by parent, so we keep this centered */}
        <group name="Scene" rotation={[0, Math.PI, 0]} position={[0, -0.05, 0]}>
          <mesh
            name="GripTape"
            castShadow
            receiveShadow
            geometry={nodes.GripTape.geometry}
            material={gripTapeMaterial}
            position={[0, 0.286, -0.002]}
          />
          <mesh
            name="Wheel1"
            castShadow
            receiveShadow
            geometry={nodes.Wheel1.geometry}
            material={wheelMaterial}
            position={[0.238, 0.086, 0.635]}
            ref={addToWheelRefs}
          />
          <mesh
            name="Wheel2"
            castShadow
            receiveShadow
            geometry={nodes.Wheel2.geometry}
            material={wheelMaterial}
            position={[-0.237, 0.086, 0.635]}
            ref={addToWheelRefs}
          />
          <mesh
            name="Deck"
            castShadow
            receiveShadow
            geometry={nodes.Deck.geometry}
            material={deckMaterial}
            position={[0, 0.271, -0.002]}
          />
          <mesh
            name="Wheel3"
            castShadow
            receiveShadow
            geometry={nodes.Wheel3.geometry}
            material={wheelMaterial}
            position={[0.237, 0.086, -0.635]}
            rotation={[Math.PI, 0, Math.PI]}
            ref={addToWheelRefs}
          />
          <mesh
            name="Wheel4"
            castShadow
            receiveShadow
            geometry={nodes.Wheel4.geometry}
            material={wheelMaterial}
            position={[-0.238, 0.086, -0.635]}
            rotation={[Math.PI, 0, Math.PI]}
            ref={addToWheelRefs}
          />
          <mesh
            name="Bolts"
            castShadow
            receiveShadow
            geometry={nodes.Bolts.geometry}
            material={boltMaterial}
            position={[0, 0.198, 0]}
            rotation={[Math.PI, 0, Math.PI]}
          />
          <mesh
            name="Baseplates"
            castShadow
            receiveShadow
            geometry={nodes.Baseplates.geometry}
            material={truckMaterial}
            position={[0, 0.211, 0]}
          />
          <mesh
            name="Truck1"
            castShadow
            receiveShadow
            geometry={nodes.Truck1.geometry}
            material={truckMaterial}
            position={[0, 0.101, -0.617]}
          />
          <mesh
            name="Truck2"
            castShadow
            receiveShadow
            geometry={nodes.Truck2.geometry}
            material={truckMaterial}
            position={[0, 0.101, 0.617]}
            rotation={[Math.PI, 0, Math.PI]}
          />
        </group>
      </group>
    );
  }
);

useGLTF.preload("/skateboard.gltf");
