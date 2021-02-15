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
// import {GLTFLoader} from "../assets/js/GLTFLoader.js";
// import house from "../assets/img/tower_house_design/scene.gltf";

export default {
  data: function () {
    return {
      controls: 1,
      objects: [],
      mchList : this.$cookie.get("mchList"),
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      const objects=[]
      let test = JSON.parse(this.mchList)
      console.log(test)
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

      const gt = new THREE.TextureLoader().load("grasslight-big.jpg");
    const gg = new THREE.PlaneGeometry(16000, 16000);
    const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(64, 64);
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.encoding = THREE.sRGBEncoding;
    ground.receiveShadow = true;
    scene.add(ground);

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
    function textmaker(object) {
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

            const message = object.description;

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

      for(let i = 0; i< test.length;i++){
        const geometry1 = new THREE.BoxGeometry(50, 50, 50);
        const material1 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: false,
      });
      const cube = new THREE.Mesh(geometry1, material1);
      // cube.position.y = 100;
      cube.url = "http://127.0.0.1:8081/sensor/"+test[i].description+"/mchid/"+test[i].mchid;
      cube.position.z = -i*100;
      cube.description = test[i].description;
      scene.add(cube);
      objects.push(cube);
      textmaker(cube);
      }
     


      
      

      // const gltfLoader = new GLTFLoader()
      // gltfLoader.load('ancient_chinese_courtyard_park/scene.gltf', (gltf) => {
      //   let model = gltf.scene
      //  model.scale.set(10,10,10)
      //  model.position.y = 20;
      //   scene.add(model)
      // })

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
        console.log(objects)
        raycaster.setFromCamera(mouse, camera);
        for (let i = 0; i < objects.length; i++) {
          const intersects1 = raycaster.intersectObject(objects[i], true);
          if (intersects1.length > 0) {
            console.log("애기: "+objects)
            const intersect = intersects1[0];
            window.location.href = intersect.object.url;
          }
        }

        renderer.render(scene, camera);
      }
      this.controls = controls;
    },
    zom: function () {
      if (this.controls.screenSpacePanning == true) {
          this.controls.screenSpacePanning = false;
        } else {
          this.controls.screenSpacePanning = true;
        }
    }
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
  margin-top: 5%;
}
</style>)
