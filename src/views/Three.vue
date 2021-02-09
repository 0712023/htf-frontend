<template>
  <div>
    <button @click="zom()">sw</button>
  </div>
</template>
<script type="module">
import * as THREE from "../assets/js/three.module.js";
import * as OrbitControls from "../assets/js/OrbitControls.module.js";
import grass from "@/assets/img/grasslight-big.jpg";
// import Stats from '../assets/js/stats.module.js';
// import * as GLTFLoader from "../assets/js/GLTFLoader.js";
// import house from "../assets/img/tower_house_design/scene.gltf";

export default {
  data: function () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      cube2: null,
      controls: null,
      raycaster: null,
      mouse: null,
      ground: null,
      sphere: null,
      objects2: null,
    };
  },
  created: function () {
    const objects = [];
    this.mouse = new THREE.Vector2(1, 1);
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

    //grass
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
    this.ground = ground;
    this.scene.add(ground);
    // objects.push(ground);

    //light
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

    //box
    const geometry1 = new THREE.BoxGeometry(50, 50, 50);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    this.cube = new THREE.Mesh(geometry1, material1);
    // this.cube.position.y = 100;
    this.scene.add(this.cube);
    this.cube.url = "http://127.0.0.1:8081/sensor/light1/mchid/4561a65s1f";
    objects.push(this.cube);

    this.cube2 = new THREE.Mesh(geometry1, material1);
    // this.cube2.position.y = 100;
    this.cube2.position.z = 100;
    this.scene.add(this.cube2);
    this.cube2.url = "http://127.0.0.1:8081/sensor/light2/mchid/7879awdd48";
    objects.push(this.cube2);

    // http://127.0.0.1:8081/sensor/light2/mchid/7879awdd48
    const geometry = new THREE.SphereGeometry(32, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = 100;
    this.sphere.position.y = 100;
    this.scene.add(this.sphere);
    // objects.push(this.sphere);
    this.sphere.url = "http://127.0.0.1:8081/sensor/light2/mchid/7879awdd48";
    // this.stats = new Stats();
    // document.body.appendChild( this.stats.dom );
    //event
    console.log(this.mouse);
    this.raycaster = new THREE.Raycaster();

    document.addEventListener("click", this.click);
    document.addEventListener("keydown", this.onDocumentKeyDown);
    document.addEventListener("keyup", this.onDocumentKeyUp);

    this.objects2 = objects;
    console.log(objects);
    document.body.appendChild(this.renderer.domElement);
    this.animate();
  },
  destroyed: function () {
    document.body.removeChild(this.renderer.domElement);
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    resize: function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    zom: function () {
      if (this.controls.screenSpacePanning == true) {
        this.controls.screenSpacePanning = false;
      } else {
        this.controls.screenSpacePanning = true;
      }
    },
    click: function (event) {
      event.preventDefault();

      this.mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      this.raycaster.setFromCamera(this.mouse, this.camera);
      for (let i = 0; i < this.objects2.length; i++) {
        const intersects1 = this.raycaster.intersectObject(this.objects2[i],true);
        if (intersects1.length > 0) {
          // console.log("애기: "+this.objects)
          const intersect = intersects1[0];
          window.location.href = intersect.object.url;
        }
      }

      this.renderer.render(this.scene, this.camera);
    },
    onDocumentKeyDown: function (event) {
      switch (event.keyCode) {
        case 16:
          this.isShiftDown = true;
          break;
      }
    },

    onDocumentKeyUp: function (event) {
      switch (event.keyCode) {
        case 16:
          this.isShiftDown = false;
          break;
      }
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
</style>)