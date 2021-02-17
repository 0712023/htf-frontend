<template>
  <div>
    <canvas id="three"></canvas>
    <button @click="zom()">sw</button>
  </div>
</template>
<script type="module">
import * as THREE from "../assets/js/three.module.js";
import * as OrbitControls from "../assets/js/OrbitControls.module.js";
// import grass from "@/assets/img/grasslight-big.jpg";
// import fontjson from "../assets/fonts/helvetiker_regular.typeface.json"

// import {STLLoader} from '../assets/js/STLLoader.js';
import { GLTFLoader } from "../assets/js/GLTFLoader.js";
// import house from "../assets/img/tower_house_design/scene.gltf";

export default {
  data: function () {
    return {
      controls: 1,
      objects: [],
      mchList: this.$cookie.get("mchList"),
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      const objects = [];
      let test = JSON.parse(this.mchList);
      console.log(test);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");

      const canvas = document.querySelector("#three");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.shadowMap.enabled = true;

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(400, 200, 0);

      const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemLight.position.set(0, 48, 0);
      scene.add(hemLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);

      dirLight.position.set(-10, 8, -5);

      dirLight.castShadow = true;
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      scene.add(dirLight);

      //   const gt = new THREE.TextureLoader().load("grasslight-big.jpg");
      // const gg = new THREE.PlaneGeometry(16000, 16000);
      // const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

      // const ground = new THREE.Mesh(gg, gm);
      // ground.rotation.x = -Math.PI / 2;
      // ground.material.map.repeat.set(64, 64);
      // ground.material.map.wrapS = THREE.RepeatWrapping;
      // ground.material.map.wrapT = THREE.RepeatWrapping;
      // ground.material.map.encoding = THREE.sRGBEncoding;
      // ground.receiveShadow = true;
      // scene.add(ground);
      // ground.url = null;
      // objects.push(ground);

      const controls = new OrbitControls.OrbitControls(
        camera,
        renderer.domElement
      );
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = true;
      controls.minDistance = 100;
      controls.maxDistance = 1000;
      controls.maxPolarAngle = Math.PI / 2;

      function textmaker(i, description) {
        const fontLoader = new THREE.FontLoader();
        fontLoader.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            let material = new THREE.MeshBasicMaterial({
              color: 0x006699,
              opacity: 0.8,
              transparent: true,
              side: THREE.DoubleSide,
              wireframe: false,
            });

            const message = description;

            const shapes = font.generateShapes(message, 20);

            const geometry = new THREE.ShapeGeometry(shapes);

            geometry.computeBoundingBox();

            const xMid =
              -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

            geometry.translate(xMid, 0, 0);

            let text = new THREE.Mesh(geometry, material);
            text.position.x = xmaker(i)
            text.position.y = 160;
            text.position.z = zmaker(i);
            scene.add(text);
            text.url =
          "http://127.0.0.1:8081/sensor/" +
          test[i].description +
          "/mchid/" +
          test[i].mchId;
            objects.push(text);
          }
        );
      }

      for (let i = 0; i < test.length; i++) {
        // const geometry1 = new THREE.BoxGeometry(25, 25, 25);
        // const material1 = new THREE.MeshBasicMaterial({
        //   color: 0x000000,
        //   wireframe: false,
        // });
        // const cube = new THREE.Mesh(geometry1, material1);
        // // cube.position.y = 100;
        // cube.url =
        //   "http://127.0.0.1:8081/sensor/" +
        //   test[i].description +
        //   "/mchid/" +
        //   test[i].mchId;
        // cube.position.z = -i * 100;
        // cube.position.y = 110;
        // cube.description = test[i].description;
        // scene.add(cube);
        // objects.push(cube);
        // textmaker(cube);
        const gltfLoader = new GLTFLoader();
          gltfLoader.load("raspberry_pi_3/scene.gltf", (gltf) => {
          let model = gltf.scene;
          // model.scale.set(20, 20, 20);
          model.scale.set(5, 5, 5);
           model.url =
          "http://127.0.0.1:8081/sensor/" +
          test[i].description +
          "/mchid/" +
          test[i].mchId;
          model.position.y = 130;
            model.position.z = zmaker(i);
            model.position.x = xmaker(i);  
        model.description = test[i].description;
          scene.add(model);
          // objects.push(model);
          textmaker(i, model.description);
        });
        
      
      }
      
      const size = 10000;
      const divisions = 100;
      const gridHelper = new THREE.GridHelper(size, divisions);
      scene.add(gridHelper);

      const gltfLoader1 = new GLTFLoader();
      gltfLoader1.load("apartment/scene.gltf", (gltf) => {
        let model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        // model.position.x = -500;
        // model.position.y = -350;
        // model.position.z = 300;
        scene.add(model);
      });

      // const loader = new STLLoader();
      // 	loader.load( 'assem.stl', function ( geometry ) {

      // 		const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
      // 		const mesh = new THREE.Mesh( geometry, material );

      // 		mesh.position.set( 0, - 0.25, 0.6 );
      // 		mesh.rotation.set( 0, - Math.PI / 2, 0 );
      // 		mesh.scale.set( 2, 2, 2 );

      // 		mesh.castShadow = true;
      // 		mesh.receiveShadow = true;

      // 		scene.add( mesh );

      // 	} );

      function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
      }
      document.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("click", onDocumentMouseDown);
      document.addEventListener("keydown", onDocumentKeyDown);
      animate();

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var canvasPixelWidth = canvas.width / window.devicePixelRatio;
        var canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1.1;
        raycaster.setFromCamera(mouse, camera);
        console.log(objects)
        for (let i = 0; i < objects.length; i++) {
          const intersects = raycaster.intersectObject(objects[i]);

          if (intersects.length > 0) {
            if (intersects[0].object.url != null) {
              console.log(intersects.length);
              window.location.href = intersects[0].object.url;
            }
          }
        }

        renderer.render(scene, camera);
      }

      function onDocumentMouseMove(event) {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
      this.controls = controls;
      function onDocumentKeyDown(event) {
        if (event.keyCode == 9) {
          if (controls.screenSpacePanning == true) {
            controls.screenSpacePanning = false;
          } else {
            controls.screenSpacePanning = true;
          }
        }
      }
      function xmaker(i){
        if(i == 0){
          return -90
        }else if(i == 1){
          return -90
        }else if(i == 2){
          return 100
        }else if(i == 3){
          return 0
        }else if(i == 4){
          return 150
        }
      }

      function zmaker(i){
        if(i == 0){
          return 50
        }else if(i == 1){
          return 185
        }else if(i == 2){
          return 70
        }else if(i == 3){
          return -100
        }else if(i == 4){
          return 30
        }
      }
    },
    zom: function () {
      if (this.controls.screenSpacePanning == true) {
        this.controls.screenSpacePanning = false;
      } else {
        this.controls.screenSpacePanning = true;
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  margin-top: 0%;
}
</style>)
