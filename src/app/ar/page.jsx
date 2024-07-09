'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HelloWebXR = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let xrSession = null;
    let xrRefSpace = null;
    let gl = null;
    let renderer = null;
    let camera = null;
    let scene = null;
    let cube = null;

    async function activateXR() {
      // Verificar si el navegador es compatible con WebXR
      if (navigator.xr) {
        try {
          const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
          if (!isSupported) {
            console.error('WebXR no es compatible en este navegador');
            return;
          }

          xrSession = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['local'],
            optionalFeatures: ['bounded-floor'],
          });

          xrSession.addEventListener('end', onXRSessionEnded);

          // Crear el contexto WebGL compatible con WebXR
          gl = canvasRef.current.getContext('webgl', { xrCompatible: true });

          // Configurar la capa WebGL para la sesión
          const glLayer = new XRWebGLLayer(xrSession, gl);
          xrSession.updateRenderState({ baseLayer: glLayer });

          // Crear el espacio de referencia
          xrRefSpace = await xrSession.requestReferenceSpace('local');

          // Inicializar la escena de Three.js
          initThreeJS();

          // Iniciar el loop de renderizado
          xrSession.requestAnimationFrame(onXRFrame);
        } catch (error) {
          console.error('Error al iniciar la sesión WebXR', error);
        }
      } else {
        console.error('WebXR no es compatible en este navegador');
      }
    }

    function initThreeJS() {
      scene = new THREE.Scene();

      // Crear la cámara
      camera = new THREE.PerspectiveCamera();
      camera.matrixAutoUpdate = false;

      // Crear el cubo
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      ];
      cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), materials);
      cube.position.set(1, 1, 1);
      scene.add(cube);

      // Crear el renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvasRef.current,
        context: gl,
      });
      renderer.autoClear = false;
    }

    function onXRFrame(time, frame) {
      xrSession.requestAnimationFrame(onXRFrame);

      const pose = frame.getViewerPose(xrRefSpace);
      if (pose) {
        const glLayer = xrSession.renderState.baseLayer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const view = pose.views[0];
        const viewport = glLayer.getViewport(view);
        renderer.setSize(viewport.width, viewport.height);

        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        renderer.render(scene, camera);
      }
    }

    function onXRSessionEnded() {
      xrSession = null;
      gl = null;
    }

    document.getElementById('startButton').addEventListener('click', activateXR);

    return () => {
      if (xrSession) {
        xrSession.end();
      }
    };
  }, []);

  return (
    <div>
      <h1>Hello WebXR</h1>
      <button id='startButton'>Start Hello WebXR</button>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default HelloWebXR;
