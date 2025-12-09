"use client";

import * as THREE from "three";
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier"; // Import CuboidCollider

export const SkateParkModel = (props: any) => {
  const { nodes, materials } = useGLTF("/scene.gltf") as any;
  const GLOBAL_SCALE = 0.05;

  useEffect(() => {
    Object.values(materials).forEach((mat: any) => {
      if (mat) {
        mat.color.set("#ffffff");
        mat.emissive = new THREE.Color("#000");
        mat.envMapIntensity = 0.5;
        mat.needsUpdate = true;
      }
    });
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="urbnprkfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={GLOBAL_SCALE}
          >
            {/* PHYSICS WRAPPER */}
            <RigidBody
              type="fixed"
              colliders="trimesh"
              friction={1}
              restitution={0}
            >
              {/* --- 1. THE SAFETY NET (New) --- */}
              {/* This invisible box sits just below the visual floor (-20 units down) 
                  and is 100 units thick. Impossible to fall through. */}
              <CuboidCollider
                args={[10000, 50, 10000]}
                position={[0, -50, 0]}
              />

              <group name="RootNode">
                {/* --- 2. MAIN FLOOR & RAMPS --- */}
                <group
                  name="Plane"
                  position={[0, 0, 2700]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={2.5}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_Concrete_0.geometry}
                    material={materials.Concrete}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_Asphalt_0.geometry}
                    material={materials.Asphalt}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_Brick_0.geometry}
                    material={materials.Brick}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_Metalgrey_0.geometry}
                    material={materials.Metalgrey}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_wall_0.geometry}
                    material={materials.wall}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_BlueMetal_0.geometry}
                    material={materials.BlueMetal}
                  />
                </group>

                {/* --- 3. RAILS --- */}
                <group
                  name="Rail003"
                  position={[12.5, 523.6, -5573]}
                  rotation={[-Math.PI / 2, 0, -0.84]}
                  scale={2.5}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Rail003_Material_0.geometry}
                    material={materials.Material}
                  />
                </group>
                <group
                  name="Rail002"
                  position={[-2061, 523, 1386]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={2.5}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Rail002_Material_0.geometry}
                    material={materials.Material}
                  />
                </group>

                {/* Shops (Visuals) */}
                <group
                  name="Plane005"
                  position={[600, 0, 2700]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={2.5}
                >
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane005_RedCurb_0.geometry}
                    material={materials.RedCurb}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane005_wrekless_0.geometry}
                    material={materials.wrekless}
                  />
                </group>
              </group>
            </RigidBody>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/scene.gltf");
