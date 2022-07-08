import React from 'react'
// import { configure } from 'src/editor/storage/store';
// import {editable as e} from 'src/editor/components/editable'
// const bind = configure({
//   // Enables persistence in development so your edits aren't discarded when you close the browser window
//   enablePersistence: true,
//   // Useful if you use r3e in multiple projects
//   localStorageNamespace: "Example"
// });
import { Canvas } from '@react-three/fiber'
import { Editor } from 'src/editor/Editor'
import { EditorScene } from 'src/editor/EditorScene'
const ViewPort = () => {


  return (
    <div className="basis-5/6 border-2 border-black h-3/4">
      <Canvas
        colorManagement
        camera={{ position: [20, 20, 20] }}
        onCreated={({ gl }) => {
          gl.setClearColor('white');
        }}
        shadowMap
        pixelRatio={window.devicePixelRatio}
        onPointerMissed={() => setSelected(null)}
      >
      <EditorScene/>
      </Canvas>
  </div>
  )
}

export default ViewPort
