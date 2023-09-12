import { Suspense, useEffect, useState } from "react"

import { Canvas } from "@react-three/fiber"

// importacion de helpers que ayudan a escribir en el canvas
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black"/>
      <pointLight intensity={1} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.3 : 0.75}
        position={isMobile ? [0, -1, -0.5] : [0, -2.60, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Agregamos un listener al tamaño de la ventana
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Establecemos el valor inicial de "isMobile"
    setIsMobile(mediaQuery.matches)

    // Definimos una funcion callback para controlar los cambios en la media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    // Agregamos la funcion callback como escuchador de cambios en la media query
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    // Removemos el escuchador cuando el componente esta desmontado
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas