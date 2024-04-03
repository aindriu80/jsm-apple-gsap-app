import React, { Suspense, useEffect, useRef } from "react";
import { View, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import IPhone from "./iPhone";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Loader from "./Loader";

interface ModelViewProps {
  index?: number;
  groupRef?: React.RefObject<unknown>;
  gsapType?: string;
  controlRef?: string;
  setRotationState?: string;
  size?: string;
  item?: string;
}

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  const controls = useRef<OrbitControls>(null);

  // Ensure to access camera and renderer properly according to your application
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  useEffect(() => {
    // Append renderer to DOM element
    document.body.appendChild(renderer.domElement);

    // Set initial camera position
    camera.position.set(0, 0, 4);

    // Initialize OrbitControls
    controls.current = new OrbitControls(camera, renderer.domElement);
    controls.current.enableZoom = false;
    controls.current.enablePan = false;
    controls.current.rotateSpeed = 0.4;

    // Clean up function
    return () => {
      // Remove renderer from DOM element when unmounting
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light  */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      {controls.current && (
        <OrbitControls
          ref={controlRef}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controls.current.getAzimuthalAngle())}
        />
      )}

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
