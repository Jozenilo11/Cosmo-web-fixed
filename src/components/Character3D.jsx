import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Html,
} from "@react-three/drei";

function Model({ src }) {
  const { scene } = useGLTF(src);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-black/60 px-5 py-3 text-sm text-white/70 backdrop-blur-md">
        Cargando personaje...
      </div>
    </Html>
  );
}

export default function Character3D({ model }) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#111020] md:h-[650px]">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1.2} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <directionalLight
            position={[-5, 2, -3]}
            intensity={1}
          />

          <Environment preset="city" />

          <Model src={model} />

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={8}
            blur={2}
            far={4}
          />

          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={7}
            enableDamping
            dampingFactor={0.08}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}