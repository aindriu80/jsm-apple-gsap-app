import React, { Suspense } from "react";
import { View, PerspectiveCamera } from "@react-three/drei";
import Lights from "./Lights";

interface ModelViewProps {
  index?: number;
  groupRef?: React.RefObject<unknown>;
  gsapType?: string;
  controlRef?: string;
  setRotationSize?: string;
  size?: string;
  item?: string;
}

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationSize,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-red-500 w-full h-full ${
        index === 2
      }?'right-[100%]:''`}
    >
      {/* Ambient Light  */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </View>
  );
};

export default ModelView;
