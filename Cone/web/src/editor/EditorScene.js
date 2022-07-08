
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  VFC,
  Suspense,
} from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import ProxyManager from './ProxyManager';
import {useThree} from '@react-three/fiber'

import { useEditorStore } from './storage/store';
import shallow from 'zustand/shallow';
export const EditorScene = () => {
  const orbitControlsRef = useRef(<OrbitControls></OrbitControls>);
  const { camera } = useThree();

  const [
    selectedHdr,
    useHdrAsBackground,
    showGrid,
    showAxes,
    setOrbitControlsRef,
  ] = useEditorStore(
    (state) => [
      state.selectedHdr,
      state.useHdrAsBackground,
      state.showGrid,
      state.showAxes,
      state.setOrbitControlsRef,
    ],
    shallow
  );

  useEffect(() => {
    setOrbitControlsRef(orbitControlsRef);
  }, [camera, setOrbitControlsRef]);

  return (
    <>
      <Suspense fallback={null}>
        {selectedHdr && (
          <Environment
            // @ts-ignore
            files={selectedHdr}
            path=""
            background={useHdrAsBackground}
          />
        )}
      </Suspense>
      {showGrid && <gridHelper args={[1000, 1000, 0x444444, 0x888888]} />}
      {showAxes && <axesHelper args={[500]} />}
      <OrbitControls ref={orbitControlsRef} />
      <ProxyManager orbitControlsRef={orbitControlsRef} />
    </>
  );
};
