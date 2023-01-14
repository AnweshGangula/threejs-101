import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, cube, cylinder, circle, text_mesh
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.z = 2;
  camera.position.set(1, 1, 2);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#e5e5e5");

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const circle_geometry = new THREE.CircleGeometry(1, 16,0, Math.PI);
  const circle_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  circle = new THREE.Mesh(circle_geometry, circle_material);
  // circle.rotation.x = 0.5; // Math.PI / 2;
  scene.add(circle);

  const cylinder_geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
  const cylinder_material = new THREE.MeshLambertMaterial({ color: 0xff0000   });
  cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
  scene.add(cylinder);
  // cylinder.rotation.x += 0.3;

  var cylinder_edges = new THREE.EdgesGeometry(cylinder_geometry);
  const cylinder_lines = new THREE.LineSegments( cylinder_edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) );
  // cylinder_edges.material.linewidth = 2;
  cylinder.add(cylinder_lines);

  // camera.lookAt(cylinder.position);

  const color = 0xffffff;
  const intensity = 0.2;
  const light = new THREE.PointLight(color, intensity, 500);
  light.position.set(10, 0, 25);
  scene.add(light);

  const light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light2);

  var loader = new THREE.FontLoader();
  loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const text_geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 0.2,
		height: 0.01,
		curveSegments: 2,
		// bevelEnabled: true,
		// bevelThickness: 0.01,
		// bevelSize: 0.01,
		// bevelOffset: 0,
		// bevelSegments: 1
  } );
  text_geometry.center();
  var text_material = new THREE.MeshNormalMaterial();
  text_mesh = new THREE.Mesh( text_geometry, text_material );
  text_mesh.position.y = 0.25;
  text_mesh.position.z = 0.01;
  scene.add( text_mesh );
} );

  document.getElementById("submit_button").addEventListener("click", Update_Text);
  
var controls = new OrbitControls( camera, renderer.domElement );
}

function getTextMesh (text, material) {
  //Number
  var textgeometry = new THREE.TextBufferGeometry(
    text,
    Object.assign(
      {},
      {
        font: helvatiker,
        bevelEnabled: false,
        curveSegments: 8,
        bevelThickness: 1,
        bevelSize: 0,
        height: 0.7,
        size: 5
      }
    )
  );
  let numberMesh = new THREE.Mesh(textgeometry, material);
  // wireframe
  var geo = new THREE.EdgesGeometry(numberMesh.geometry); // or WireframeGeometry

  var wireframe = new THREE.LineSegments(geo, wireFrameMaterial);
  numberMesh.add(wireframe);

  // Translate to Center
  return numberMesh;
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  requestAnimationFrame(animate);
  // cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.001;

  renderer.render(scene, camera);
};

function Update_Text() {
  // window.alert("ABC");
  scene.remove(text_mesh);
  var user_input = document.getElementById('user_input').value

  var loader = new THREE.FontLoader();
  loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

    const text_geometry = new THREE.TextGeometry( user_input, {
      font: font,
      size: 0.2,
      height: 0.01,
      curveSegments: 2,
      // bevelEnabled: true,
      // bevelThickness: 0.01,
      // bevelSize: 0.01,
      // bevelOffset: 0,
      // bevelSegments: 1
    } );
    text_geometry.center();
    var text_material = new THREE.MeshNormalMaterial();
    text_mesh = new THREE.Mesh( text_geometry, text_material );
    text_mesh.position.y = 0.25;
    text_mesh.position.z = 0.01;
    scene.add( text_mesh );
  } );
}
window.addEventListener('resize', onWindowResize, false);

document.body.onmousemove = function (e) {
  cylinder.rotation.y = e.pageX / 1000;
  // cylinder.rotation.x = e.pageY / 100;
};

init();
animate();
