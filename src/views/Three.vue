<template>
    <div></div>
</template>
<script type="module">
import * as THREE from "../assets/js/three.module.js";
import * as OrbitControls from "../assets/js/OrbitControls.module.js" 
export default {
    data:function(){
        return{
            scene : null,
            camera : null,
            renderer: null
        }
    },
    created: function(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGL1Renderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.position.z = 5;
        window.addEventListener("resize", this.resize);
        new OrbitControls.OrbitControls(this.camera, this.renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color : 0xFFFFFF, wireframe: true});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        cube.rotation.x += 0.10;
        cube.rotation.y += 0.005;

        document.body.appendChild(this.renderer.domElement);
        this.animate();
    },
     destroyed:function(){
    document.body.removeChild(this.renderer.domElement);
    },
    methods:{
        animate:function () {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        },
        resize:function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }

    }
}
</script>

<style scoped>
body {
  margin: 0;
}

canvas {
  display: block;
}
</style>