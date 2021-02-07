<template>
  <div></div>
</template>
<script type="module">
import * as THREE from "../assets/js/three.module.js";
import { GUI } from "../assets/js/dat.gui.module.js";
import * as OrbitControls from "../assets/js/OrbitControls.module.js";
import grass from "@/assets/img/grasslight-big.jpg";
// import * as GLTFLoader from "../assets/js/GLTFLoader.js";
// import house from "../assets/img/tower_house_design/scene.gltf";

export default {
  data: function () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      controls: null,
    };
  },
  created: function () {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(400, 200, 0);

    this.renderer = new THREE.WebGL1Renderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;
    window.addEventListener("resize", this.resize);
    this.controls = new OrbitControls.OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.screenSpacePanning = true;

    this.controls.minDistance = 100;
    this.controls.maxDistance = 500;

    this.controls.maxPolarAngle = Math.PI / 2;

    const gt = new THREE.TextureLoader().load(grass);
    const gg = new THREE.PlaneGeometry(16000, 16000);
    const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(64, 64);
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.encoding = THREE.sRGBEncoding;
    // note that because the ground does not cast a shadow, .castShadow is left false
    ground.receiveShadow = true;

    this.scene.add(ground);

    this.scene.add(new THREE.AmbientLight(0x222222));

    const light = new THREE.DirectionalLight(0xffffff, 2.25);
    light.position.set(200, 450, 500);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 512;

    light.shadow.camera.near = 100;
    light.shadow.camera.far = 1200;

    light.shadow.camera.left = -1000;
    light.shadow.camera.right = 1000;
    light.shadow.camera.top = 350;
    light.shadow.camera.bottom = -350;

    this.scene.add(light);


    // var loader = new THREE.GLTFLoader.GLTFLoader();
    //         loader.load(house,function(gltf){
    //             let house1 = gltf.scene.children[0];
    //             house1.scale.set(3,3,3)
    //             this.scene.add(gltf.this.scene);
    //             this.renderer.render(this.scene,this.camera);
    //     });


    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    const gui = new GUI();
    gui.add(this.controls, "screenSpacePanning");

    document.body.appendChild(this.renderer.domElement);
    this.animate();
  },
  destroyed: function () {
    document.body.removeChild(this.renderer.domElement);
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate);
      // this.update();
      this.renderer.render(this.scene, this.camera);
    },
    resize: function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    update: function () {
      this.cube.rotation.x += 0.1;
      this.cube.rotation.y += 0.005;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

canvas {
  display: block;
}
</style>