import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let container, camera, scene, renderer, cube, sphere, cone, group, controls;
init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;

  group = new THREE.Group();
  scene.add(group);

  // Cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cubeWireframeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  const cubeWireframe = new THREE.Mesh(cubeGeometry, cubeWireframeMaterial);
  group.add(cube);
  group.add(cubeWireframe);

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const sphereWireframeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const sphereWireframe = new THREE.Mesh(
    sphereGeometry,
    sphereWireframeMaterial
  );
  sphere.position.set(2, 0, 0);
  sphereWireframe.position.set(2, 0, 0);
  group.add(sphere);
  group.add(sphereWireframe);

  // Cone
  const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  const coneWireframeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
  });
  cone = new THREE.Mesh(coneGeometry, coneMaterial);
  const coneWireframe = new THREE.Mesh(coneGeometry, coneWireframeMaterial);
  cone.position.set(-2, 0, 0);
  coneWireframe.position.set(-2, 0, 0);
  group.add(cone);
  group.add(coneWireframe);

  // Camera
  camera.position.set(2, 2, 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Helpers
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 10, 10);
  scene.add(spotLight);
}

window.addEventListener("resize", resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // Rotation
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  group.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
