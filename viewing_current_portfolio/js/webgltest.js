//have to use three.module specifically for import statement
import * as THREE from '../lib/three.module.js';

import { GLTFLoader } from '../lib/GLTFLoader.js';
import { Water } from '../lib/Water.js'
import { Sky } from '../lib/Sky.js'
import { OrbitControls } from '../lib/OrbitControls.js';


function main() {
    var container = document.getElementById('container')
  
    //scene and camera setup
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    camera.position.x = 0;
    camera.position.y = 0
    camera.position.z = 5;
    
    var water;

    var controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 1, 0 );
				controls.minDistance = 5.0;
				controls.maxDistance = 250.0;
				controls.update();

        //scene.background = new THREE.Color( 0x736775 );
   // scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
   scene.fog = new THREE.Fog( 0x040306, 10, 300 );


   var purpleTexture = new THREE.TextureLoader().load('/images/purpletexture.png')
   var petalTexture = new THREE.TextureLoader().load('/images/scaledpetal.png')
   var pinkTexture = new THREE.TextureLoader().load('/images/pinktexture.png')
   var sprite1 = new THREE.TextureLoader().load( '/images/spark1.png' );
    var sprite2 = new THREE.TextureLoader().load( '/images/bettercircle.png' );
  var sprite3 = new THREE.TextureLoader().load( '/images/monograd.png' );



/***************************lights*************** */
    var ambientLight1 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight1 );

    var directionLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    directionLight1.position.set( 1, 1, 5 );
				scene.add( directionLight1 );

				var directionLight2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
				directionLight2.position.set( 0, - 1, -100 );
        scene.add( directionLight2 );
        
        // var sphereLightGeo = new THREE.BoxBufferGeometry( 1, 0.33, 1 );
        // var sphereLightMat = new THREE.MeshPhysicalMaterial( { color: 0x196aa5, roughness: 0.7, metalness: 1, reflectivity: 0.5} );

        var sphereLightGeo = new THREE.ConeBufferGeometry(1, 1, 3, 4);
        var sphereLightMat = new THREE.MeshPhysicalMaterial( { color: 0x196aa5, roughness: 0.7, metalness: 1, reflectivity: 1, clearcoat: 0.84, wireframe: true, flatShading: false} );
				

				var pLight1 = new THREE.PointLight( 0x85f9ff, 4, 100, 2 );
				pLight1.add( new THREE.Mesh( sphereLightGeo, sphereLightMat) );
        scene.add( pLight1 );
        pLight1.position.setY(1.5)

        var pLight2 = new THREE.PointLight( 0x85f9ff, 2.5, 100, 2 );
				pLight2.add( new THREE.Mesh( sphereLightGeo, sphereLightMat) );
        scene.add( pLight2 );
        pLight2.position.setY(1.5)

/*********************end lights */

    //cube specifics
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var material = new THREE.MeshBasicMaterial( { map: purpleTexture } );
    var cube = new THREE.Mesh( geometry, material ); 
    scene.add(cube);
    //moves cube left, down and back
    //cube.position.set(-5, -5, -5);
    //this successfully moved further away
    cube.position.setZ(-5);
    //successfully moved cube up
    cube.position.setY(1.5);
    //succ moved cube to left
    cube.position.setX(-5)
    
    //sphere example specifics
    var sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    var sphereMat = new THREE.MeshBasicMaterial( { map: purpleTexture } );
    var sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere)
    sphere.position.setY(3);
    sphere.position.setZ(-5)

    
    //grey icos
    var icoGeo = new THREE.IcosahedronBufferGeometry( 0.5, 0 );
    var icoMat = new THREE.MeshPhysicalMaterial( { color: 0x353535, emissive: 0x111111, flatShading: true, vertexColors: THREE.NoColors, roughness: 0.5, metalness: 1, reflectivity: 1 } );
    var smallIco = new THREE.Mesh( icoGeo, icoMat );
    scene.add( smallIco );

  //pink icos
    var icoGeo2 = new THREE.IcosahedronBufferGeometry( 0.5, 2 );
    var icoMat2 = new THREE.MeshBasicMaterial( { map: pinkTexture } );
    var smallIco2 = new THREE.Mesh( icoGeo2, icoMat2 );
    scene.add( smallIco2 );
    smallIco2.position.setY(3);
    smallIco2.position.setX(5)

//shiny sphere
    var sphereGeo2 = new THREE.SphereBufferGeometry(0.3, 32, 32);
    var sphereMat2 = new THREE.MeshPhongMaterial( { color: 0x6ee5ed, specular: 0x1c1c1c, shininess: 40, flatShading: false, vertexColors: THREE.NoColors, map: pinkTexture } );
    var sphere2 = new THREE.Mesh( sphereGeo2, sphereMat2 );
    sphere2.position.setY(1.0)
    sphere2.position.setZ(1.0)
    sphere2.position.setX(-0.25)
    scene.add( sphere2 );


  //for some reason also fixes the look of the particles
    sprite1.repeat.set(1,1)
    sprite2.repeat.set(1,1)
    var sphereGeo3 = new THREE.SphereBufferGeometry(0.1, 32, 32);
    var sphereMat3 = new THREE.MeshPhysicalMaterial( { color: 0x8e7d23, emissive: 0x728751, roughness: 0.5, reflectivity: 1, clearcoatRoughness: 1, vertexColors: THREE.NoColors, map: sprite2 } );
    var sphere3 = new THREE.Mesh( sphereGeo3, sphereMat3 );
    sphere3.position.setY(2)
    sphere3.position.setZ(1.0)
    sphere3.position.setX(-2)
    
    scene.add( sphere3 );
    
//3d text
    var loaderGTLF = new GLTFLoader();
    loaderGTLF.load(
      // resource URL
      '/threedmodels/Alisonnametext.glb',
      // called when the resource is loaded
      function ( gltf ) {
        console.log(gltf)
        scene.add( gltf.scene );
        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Scene
        // gltf.scenes; // Array<THREE.Scene>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object   
      },
      // called while loading is progressing
      function ( xhr ) { 
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {  
        console.log( 'An error happened' );  
      }
    );

//particles:
var materials = [];
var particleGeo =  new THREE.BufferGeometry();
var vertices = [];



for ( var i = 0; i < 25; i ++ ) { //console.log(Math.random() * 2000-1000)
  // var x = Math.random()
  // var y = Math.random()
  // var z = Math.random()
  var x = Math.random() * (2000 - 1) + 1;
  var y = Math.random() * (2000 - 1) + 1;
  var z = Math.random() * (2000 - 1) + 1;
  
  vertices.push( x, y, z );
}

particleGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 1 ) );


var parametersSprites = [
  [[ 298, 0.47, 0.57 ], sprite1, 2 ],
  // [[ 199, 0.74, 0.37 ], sprite2, 2 ],
  // [[ 204, 0.97, 0.45 ], sprite3, 5 ],

 ];

 for ( var i = 0; i < parametersSprites.length; i ++ ) {

  var color = parametersSprites[ i ][ 0 ];
  var sprite = parametersSprites[ i ][ 1 ];
  var size = parametersSprites[ i ][ 2 ];
                                                                                //blending change to Normal to see diff - Multiply and Subtractive don't work in this context
  materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false} );
  materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
  console.log(materials[0])
  var particles = new THREE.Points( geometry, materials[ i ] );
  //console.log(particles)
  particles.rotation.x = Math.random() * 6;
  particles.rotation.y = Math.random() * 6
  particles.rotation.z = Math.random() * 6;
  
  //changing these chages kind of to a cylindrical rotation of all particles
  // particles.rotation.x += 0.01;
      // particles.rotation.y += 0.01;
  cube.add( particles );

  /********end particles*/


  /*start water*/
  var lightWater = new THREE.DirectionalLight( 0xffffff, 0.8 )
  var waterGeo = new THREE.PlaneBufferGeometry(500, 500)
  water = new Water(waterGeo,
    {

textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( '/images/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						alpha: 1.0,
						sunDirection: lightWater.position.clone().normalize(),
						sunColor: 0xffffff,
						waterColor: 0x4d9e9e,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;
          water.position.setY(-1)
				scene.add( water );


        var sky = new Sky();

				var uniforms = sky.material.uniforms;

				uniforms[ 'turbidity' ].value = 10;
				uniforms[ 'rayleigh' ].value = 2;
				uniforms[ 'luminance' ].value = 1;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;

				var parameters = {
					distance: 400,
					inclination: 0.49,
					azimuth: 0.10
				};

				var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
				cubeCamera.renderTarget.texture.generateMipmaps = true;
				cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;

				scene.background = cubeCamera.renderTarget;

				function updateSun() {

					var theta = Math.PI * ( parameters.inclination - 0.5 );
					var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

					lightWater.position.x = parameters.distance * Math.cos( phi );
					lightWater.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
					lightWater.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

					sky.material.uniforms[ 'sunPosition' ].value = lightWater.position.copy( lightWater.position );
					water.material.uniforms[ 'sunDirection' ].value.copy( lightWater.position ).normalize();

					cubeCamera.update( renderer, sky );

				}

				updateSun();


}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
    
    














    //animation specifics
    function animate() {
                
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        sphere.rotation.x += 0.01;
        //sphere.rotation.y += 0.01;

        sphere2.rotation.x += 0.01;
        sphere2.rotation.y += 0.01;

        smallIco2.rotation.x += 0.01;
        smallIco2.rotation.y += 0.01;
        var icoTimer = Date.now() * 0.003;
        var timer = Date.now() * 0.0009;
        var particleTime = Date.now() * 0.00005;
        var delta = clock.getDelta();

        var timeWater = performance.now() * 0.001
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        //original:
        //var timer = Date.now() * 0.01;
        
        //var d = 150;

        smallIco.position.z = Math.cos( icoTimer * 0.4 ) * 2
        smallIco.position.y = Math.sin( icoTimer * 0.3 ) * 4
        smallIco.position.x = Math.sin( icoTimer * 0.3 ) * 4

        
        
        //this succ acheives seemingly random movement, within relative bounds of screen
        //see https://threejs.org/examples/?q=point#webgl_lights_pointlights for all setup
        // Math.sin( icoTimer * 0.7 ) * 10,
				// Math.cos( icoTimer * 0.5 ) * 20,
				// Math.cos( icoTimer * 0.3 ) * 10
       
        //smallIco.position.set(
          // Math.sin( icoTimer * 0.7 ) * 10,
          // Math.cos( icoTimer * 0.5 ) * 20,
          // Math.cos( icoTimer * 0.2 ) * 10,

          //original:
        // Math.sin( icoTimer * 0.7 ) * 10,
				// Math.cos( icoTimer * 0.5 ) * 20,
				// Math.cos( icoTimer * 0.3 ) * 10
          
          //example using setX with setY above
          //Math.sin( timer * 0.7 ) * d


          //bounce and move around in smaller range
          // Math.cos( timer * 0.1 ) * 30,
          // Math.abs( Math.cos( timer * 0.2 ) ) * 5,
          // Math.sin( timer * 0.1 ) * 30
          
          //original with position.set
          // Math.cos( timer * 0.1 ) * 30,
					// Math.abs( Math.cos( timer * 0.2 ) ) * 20 + 5,
					// Math.sin( timer * 0.1 ) * 30
				//);
				smallIco.rotation.y = ( Math.PI / 2 ) - timer * 0.1;
        smallIco.rotation.z = timer * 0.8;
        
        controls.update(clock.getDelta());


				pLight1.position.x = Math.sin( timer * 0.7 ) * 5;
				//pLight1.position.y = Math.cos( timer * 0.5 ) * 20;
				pLight1.position.z = Math.cos( timer * 0.3 ) * 5;

        pLight2.position.z = Math.sin( timer * 0.5 ) * 5;
				//pLight1.position.y = Math.cos( timer * 0.5 ) * 20;
        pLight2.position.x = Math.sin( timer * 0.7) * 5;
        

        for ( var i = 0; i < scene.children.length; i ++ ) {

					var object = scene.children[ i ];
						
					if ( object instanceof THREE.Points ) {

						object.rotation.y = particleTime * ( i < 4 ? i + 10 : - ( i + 10 ) );

					}

				}

				for ( var i = 0; i < materials.length; i ++ ) {

					var color = parametersSprites[ i ][ 0 ];

					var h = ( 360 * ( color[ 0 ] + particleTime ) % 200) / 200;
					materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ] );

				}
			

                    
        renderer.render( scene, camera );

    }

    animate();

}

main();