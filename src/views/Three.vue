<template>
  <div>
    <canvas id="three"></canvas>
    <button>sse</button>
  </div>
</template>
<script type="module">
import * as THREE from "../assets/js/three.module.js";
import * as OrbitControls from "../assets/js/OrbitControls.module.js";
// import grass from "@/assets/img/grasslight-big.jpg";
// import fontjson from "../assets/fonts/helvetiker_regular.typeface.json"

// import Stats from '../assets/js/stats.module.js';
// import {GLTFLoader} from "../assets/js/GLTFLoader.js";
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
      text: null,
      group: null,
      ge1: null,
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      const objects = [];
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");
      //   scene.fog = new THREE.Fog('#eee', 20, 100)

      const canvas = document.querySelector("#three");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.shadowMap.enabled = true;

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 10;

      const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemLight.position.set(0, 48, 0);
      scene.add(hemLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      //光源等位置
      dirLight.position.set(-10, 8, -5);
      //可以产生阴影
      dirLight.castShadow = true;
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      scene.add(dirLight);

      let floorGeometry = new THREE.PlaneGeometry(8000, 8000);
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0x857ebb,
        shininess: 0,
      });

      let floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -0.5 * Math.PI;
      floor.receiveShadow = true;
      floor.position.y = -0.001;
      scene.add(floor);

      const controls = new OrbitControls.OrbitControls(
        camera,
        renderer.domElement
      );
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      controls.screenSpacePanning = true;

      controls.minDistance = 100;
      controls.maxDistance = 500;

      controls.maxPolarAngle = Math.PI / 2;

      const geometry1 = new THREE.BoxGeometry(50, 50, 50);
      const material1 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: false,
      });
      const cube = new THREE.Mesh(geometry1, material1);
      // cube.position.y = 100;
      cube.url = "http://127.0.0.1:8081/sensor/light1/mchid/4561a65s1f";

      scene.add(cube);
      objects.push(cube);
      // const loader = new THREE.FontLoader();
      // loader.load('./fonts/helvetiker_regular.typeface.json', function (font) {
      //   const color = 0x006699;

      //   const matLite = new THREE.MeshBasicMaterial({
      //     color: color,
      //     transparent: true,
      //     opacity: 0.4,
      //     side: THREE.DoubleSide,
      //   });

      // const message = "sensor";

      // const shapes = font.generateShapes(message, 20);

      // const geometry = new THREE.ShapeGeometry(shapes);

      // geometry.computeBoundingBox();

      // const xMid =
      //   -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

      // geometry.translate(xMid, 0, 0);

      //   // make shape ( N.B. edge view not visible )

      //   const text = new THREE.Mesh(geometry, matLite);
      //   text.position.x = cube.position.x;
      //   text.position.y = cube.position.y + 30;
      //   text.position.z = cube.position.z;

      //   scene.add(text);
      // });

      function textmaker(object) {
        const fontLoader = new THREE.FontLoader();
        fontLoader.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            let material = new THREE.MeshBasicMaterial({
              color: 0x000000,
              opacity: 0.8,
              transparent: true,
              side: THREE.DoubleSide,
              wireframe: false,
            });

            const message = "sensor1";

            const shapes = font.generateShapes(message, 20);

            const geometry = new THREE.ShapeGeometry(shapes);

            geometry.computeBoundingBox();

            const xMid =
              -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

            geometry.translate(xMid, 0, 0);

            let text = new THREE.Mesh(geometry, material);
            text.position.x = object.position.x;
            text.position.y = object.position.y + 30;
            text.position.z = object.position.z;
            scene.add(text);
          }
        );
      }
      textmaker(cube);

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
      document.addEventListener("click", click);
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

      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();

      function click(event) {
        event.preventDefault();

        mouse.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        for (let i = 0; i < objects.length; i++) {
          const intersects1 = raycaster.intersectObject(objects[i], true);
          if (intersects1.length > 0) {
            // console.log("애기: "+this.objects)
            const intersect = intersects1[0];
            window.location.href = intersect.object.url;
          }
        }

        renderer.render(scene, camera);
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
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
