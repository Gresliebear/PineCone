import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  VFC,
  Suspense,
} from 'react';
import 'core-js/es/symbol'
import { Canvas, useThree } from 'react-three-fiber';
import { useEditorStore } from './storage/store';
import shallow from 'zustand/shallow';
import root from 'react-shadow';
import styles from '../index.css'
// import {
//   Button,
//   Heading,
//   Code,
//   PortalManager,
//   Modal,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   IdProvider,
// } from './elements';
import {EditorScene} from './EditorScene'
import PortalManager from './elements/PortalManage';
import Heading from './elements/Heading';
import Code from './elements/Code';
import Button from './elements/Button';
import { Modal } from './elements/Modal';
import { ModalHeader } from './elements/Modal';
import { ModalBody } from './elements/Modal';
import { ModalFooter } from './elements/Modal';

export const Editor = () => {
  const [
    sceneSnapshot,
    editorOpen,
    initialState,
    setEditorOpen,
    setSelected,
    createSnapshot,
    isPersistedStateDifferentThanInitial,
    applyPersistedState,
  ] = useEditorStore(
    (state) => [
      state.sceneSnapshot,
      state.editorOpen,
      state.initialState,
      state.setEditorOpen,
      state.setSelected,
      state.createSnapshot,
      state.isPersistedStateDifferentThanInitial,
      state.applyPersistedState,
    ],
    shallow
  );

  const [stateMismatch, setStateMismatch] = useState(false);

  useLayoutEffect(() => {
    if (initialState) {
      setStateMismatch(isPersistedStateDifferentThanInitial());
    } else {
      applyPersistedState();
    }
  }, [applyPersistedState, initialState, isPersistedStateDifferentThanInitial]);

  return (
    <root.div>
      <div id="react-three-editable-editor-root">
        <PortalManager>

            <div className="relative z-50">
              <div
                className={`fixed ${editorOpen ? 'block' : 'hidden'} inset-0`}
              >
                {sceneSnapshot ? (
                  <>
                    <div className="relative z-0 h-full">
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
                        <EditorScene />
                      </Canvas>
                    </div>

                  </>
                ) : (
                  <div className="flex justify-center items-center bg-white h-screen">
                    <div className="flex flex-col gap-5 items-center ">
                      <Heading className="text-2xl mb-4">
                        No canvas connected
                      </Heading>
                      <div>
                        Please use <Code>configure()</Code> and{' '}
                        <Code>bind()</Code> to connect a canvas to React Three
                        Editable.
                      </div>
                      <Code block>
              {`import React from 'react';
            import { Canvas } from 'react-three-fiber';
            import { configure, editable as e } from 'react-three-editable';
            const bind = configure({
              localStorageNamespace: "MyProject"
            });
            const MyComponent = () => (
              <Canvas onCreated={bind()}>
                <e.mesh uniqueName="My First Editable Object">
                  <sphereBufferGeometry />
                  <meshStandardMaterial color="rebeccapurple" />
                </e.mesh>
              </Canvas>
            );`}
            </Code>
                      <div>
                        For more details, please consult the{' '}
                        <a
                          className="rounded-md font-medium text-green-600 hover:text-green-500"
                          href="https://github.com/AndrewPrifer/react-three-editable"
                          rel="noreferrer"
                          target="_blank"
                        >
                          documentation
                        </a>
                        .
                      </div>
                      <Button
                        className=""
                        onClick={() => {
                          setEditorOpen(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              {editorOpen || (
                <Button
                  className="fixed bottom-5 left-5"
                  onClick={() => {
                    if (!sceneSnapshot) {
                      createSnapshot();
                    }
                    setEditorOpen(true);
                  }}
                >
                  Editor
                </Button>
              )}
            </div>
            <Modal visible={stateMismatch}>
              <ModalHeader>Saved state found</ModalHeader>
              <ModalBody>
                Would you like to use initial state or saved state?
              </ModalBody>
              <ModalFooter>
                <Button
                  className="flex-1"
                  onClick={() => {
                    applyPersistedState();
                    setStateMismatch(false);
                  }}
                >
                  Saved
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setStateMismatch(false);
                  }}
                >
                  Initial
                </Button>
              </ModalFooter>
            </Modal>
            <style type="text/css">{styles}</style>

        </PortalManager>
      </div>
    </root.div>
  );

}


