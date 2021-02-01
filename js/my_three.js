const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectMatrix();
});

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// var cube_edges = new THREE.EdgesHelper(cube, 0x0000ff);
// cube_edges.material.linewidth = 2;
// cube.add(cube_edges);

const circle_geometry = new THREE.CircleGeometry(1, 32);
const circle_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const circle = new THREE.Mesh(circle_geometry, circle_material);
circle.rotation.x = 0.5; // Math.PI / 2;
scene.add(circle);

// var extrudedGeometry = new THREE.ExtrudeGeometry(circle, {
//   depth: 5,
//   bevelEnabled: false,
// });

// var extrudedMesh = new THREE.Mesh(
//   extrudedGeometry,
//   new THREE.MeshPhongMaterial({ color: 0xff0000 })
// );
// scene.add(extrudedMesh);

const cylinder_geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
const cylinder_material = new THREE.MeshLambertMaterial({ color: 0xff0000});
const cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
scene.add(cylinder);

var cylinder_edges = new THREE.EdgesHelper(cylinder, 0x0000ff);
cylinder_edges.material.linewidth = 2;
cylinder.add(cylinder_edges);

camera.position.z = 2;
// camera.position.set(0, 1, 2);

const color = 0xffffff;
const intensity = 0.2;
const light = new THREE.PointLight(color, intensity, 500);
light.position.set(10, 0, 25);
scene.add(light);

const light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light2);
// requestAnimationFrame(animate);

camera.lookAt(cylinder.position);

var animate = function () {
  requestAnimationFrame(animate);
  // cylinder.rotation.x += 0.01;
  // cylinder.rotation.z += 0.01;

  renderer.render(scene, camera);
};

document.body.onmousemove = function (e) {
  cylinder.rotation.y = e.pageX / 100;
  cylinder.rotation.x = e.pageY / 100;
};

animate();
