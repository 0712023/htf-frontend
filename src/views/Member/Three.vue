<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>
<script type="module">
import * as THREE from "../../assets/js/three.module.js";
import * as OrbitControls from "../../assets/js/OrbitControls.module.js";
// import grass from "@/assets/img/grasslight-big.jpg";
// import fontjson from "../assets/fonts/helvetiker_regular.typeface.json"

// import {STLLoader} from '../assets/js/STLLoader.js';
import { GLTFLoader } from "../../assets/js/GLTFLoader.js";
// import house from "../assets/img/tower_house_design/scene.gltf";
import axios from 'axios';
export default {
  data: function () {
    return {
      controls: 1,
      objects: [],
      mchList: null
    };
  },
  mounted() {
    axios.post(`${this.$store.state.BACK_SERVER}/getMachineListByMemId`,{"memId":this.$cookies.get("memId")}, {headers: { Authorization: `Bearer ${this.$cookies.get("accesstoken")}`}})
    .then((res)=>{
      this.initThree(res.data);
    })
  },
  methods: {
    initThree(test) {
      let FRONT_SEVER = this.$store.state.FRONT_SERVER;
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      const objects = [];
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
            FRONT_SEVER + 
          "/sensor/" +
          test[i].description +
          "/mchid/" +
          test[i].mchId +
          "/type/" +
          test[i].type;
            objects.push(text);
          }
        );
      }

      for (let i = 0; i < test.length; i++) {
        const gltfLoader = new GLTFLoader();
          gltfLoader.load("raspberry_pi_3/scene.gltf", (gltf) => {
          let model = gltf.scene;
          model.scale.set(5, 5, 5);
           model.url =
            FRONT_SEVER + 
          "/sensor/" +
          test[i].description +
          "/mchid/" +
          test[i].mchId +
          "/type/" +
          test[i].type;
          model.position.y = 130;
            model.position.z = zmaker(i);
            model.position.x = xmaker(i);  
        model.description = test[i].description;
          scene.add(model);
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
        scene.add(model);
      });

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
