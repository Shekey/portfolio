"use client";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
  useRapier,
} from "@react-three/rapier";
import { Skateboard, SkateboardProps } from "./Skateboard";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "./useControls";

export function SkateboardPhysics(props: SkateboardProps) {
  const rigidBody = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const { forward, backward, left, right, jump, reset } = useControls();

  // --- TUNING ---
  const MAX_SPEED = 25;
  const ACCELERATION = 5.0;
  const TURN_SPEED = 3.5;
  const JUMP_FORCE = 10;

  // Camera Settings
  const CAM_DISTANCE = 8;
  const CAM_HEIGHT = 4;
  const CAM_SMOOTH = 2.0; // Lower is looser, Higher is tighter

  // State
  const currentSpeed = useRef(0);
  const cameraOffset = useRef(new THREE.Vector3(0, CAM_HEIGHT, CAM_DISTANCE));

  useFrame((state, delta) => {
    if (!rigidBody.current) return;

    // --- 1. GET DATA ---
    const velocity = rigidBody.current.linvel();
    const translation = rigidBody.current.translation();
    const rotation = rigidBody.current.rotation();
    const q = new THREE.Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );

    // Direction vectors
    const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    const upVec = new THREE.Vector3(0, 1, 0).applyQuaternion(q);

    // --- 2. MOVEMENT ---
    // Smoothly calculate target speed based on input
    const targetSpeed =
      (forward ? MAX_SPEED : 0) + (backward ? -MAX_SPEED * 0.5 : 0);
    const lerpFactor = 1 - Math.exp(-ACCELERATION * delta);
    currentSpeed.current = THREE.MathUtils.lerp(
      currentSpeed.current,
      targetSpeed,
      lerpFactor
    );

    // Apply Velocity directly (Arcade Style)
    // We blend the physics velocity.y (gravity) with our artificial forward speed
    rigidBody.current.setLinvel(
      {
        x: forwardVec.x * currentSpeed.current,
        y: velocity.y, // Preserve gravity/ramp verticality
        z: forwardVec.z * currentSpeed.current,
      },
      true
    );

    // --- 3. TURNING ---
    // We use Angular Velocity directly for snappy turns
    if (Math.abs(currentSpeed.current) > 0.1 || Math.abs(velocity.y) > 1) {
      const turnDir = (left ? 1 : 0) + (right ? -1 : 0);
      rigidBody.current.setAngvel(
        {
          x: 0,
          y: turnDir * TURN_SPEED,
          z: 0,
        },
        true
      );
    } else {
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }

    // --- 4. JUMP ---
    if (jump && Math.abs(velocity.y) < 0.5) {
      rigidBody.current.setLinvel(
        { x: velocity.x, y: JUMP_FORCE, z: velocity.z },
        true
      );
    }

    // --- 5. RESET ---
    if (reset) {
      rigidBody.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
      rigidBody.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      currentSpeed.current = 0;
    }

    // --- 6. PRO CAMERA FOLLOW ---
    // We want the camera to swing behind the player.
    // We calculate the ideal position relative to the BOARD'S facing direction.

    // Create an ideal offset based on board rotation
    const idealOffset = new THREE.Vector3(0, CAM_HEIGHT, CAM_DISTANCE);
    idealOffset.applyQuaternion(q);
    // Important: Flatten the Y offset rotation so camera doesn't dip into ground on ramps
    idealOffset.y = CAM_HEIGHT;

    const targetCamPos = new THREE.Vector3(
      translation.x,
      translation.y,
      translation.z
    ).add(idealOffset);

    // Smoothly move camera there (Time-Based Damping)
    const camLerp = 1 - Math.exp(-CAM_SMOOTH * delta);
    camera.position.lerp(targetCamPos, camLerp);

    // Look at the board
    const lookTarget = new THREE.Vector3(
      translation.x,
      translation.y + 1.0,
      translation.z
    );
    camera.lookAt(lookTarget);
  });

  return (
    <RigidBody
      ref={rigidBody}
      position={[0, 2, 0]}
      mass={50} // Heavy stability
      lockRotations // Keep upright (Arcade style)
      colliders={false}
      friction={0} // We handle movement manually
    >
      {/* COLLIDER TWEAK: 
        We use a slightly rounded shape (Capsule-like behavior) 
        by lifting the box 0.15m up. This acts like 'wheels' and 
        prevents the sharp front edge from catching on ramps.
      */}
      <CuboidCollider args={[0.15, 0.1, 0.4]} position={[0, 0.15, 0]} />

      <group position={[0, 0, 0]}>
        <Skateboard {...props} physicsRef={rigidBody} />
      </group>
    </RigidBody>
  );
}
