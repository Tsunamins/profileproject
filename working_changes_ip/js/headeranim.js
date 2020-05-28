//have to use three.module specifically for import statement
import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';
import { Water } from '../lib/Water.js'
import { Sky } from '../lib/Sky.js'



function main() {
 
    //get element for resizing purposes
    const webgldiv = document.getElementById('webgl')
    
    //scene, clock and camera setup as well as device based sizing
    const clock = new THREE.Clock();
    var scene = new THREE.Scene();
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    const camera = new THREE.PerspectiveCamera(60, (window.innerWidth) / (window.innerHeight), 1, 20000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.setSize( window.innerWidth, window.innerHeight * 0.75);
    
    webgldiv.appendChild( renderer.domElement );
    const getCanvas = document.querySelector('canvas')
    console.log(getCanvas)
    getCanvas.style.width = '100%';
    getCanvas.style.borderRadius = '10px'
    // getCanvas.style.padding = '20px';
   
    

    // camera.position.x = 0;
    // camera.position.y = 1;
    // camera.position.z = 5;
   
     if (window.innerWidth < 1200){
      camera.position.x = 0;
      camera.position.y = 1;
      camera.position.z = 10;
      //webgldiv.style.margin = '10px'; 
        
     } else {
      camera.position.x = 0;
      camera.position.y = 1;
      camera.position.z = 5;
      //webgldiv.style.margin = '50px'; 
      
     }
    


    //add images effects and establish variables needed later
    //let, later re-assigned, let water defining first important
    let water

    scene.fog = new THREE.Fog( 0x040306, 10, 300 );

    const purpleTexture = new THREE.TextureLoader().load('./images/purpletexture.png')

    const pinkTexture = new THREE.TextureLoader().load('./images/pinktexture.png')
    const sprite1 = new THREE.TextureLoader().load( './images/spark1.png' );
    const sprite2 = new THREE.TextureLoader().load( './images/bettercircle.png' );
    const sprite3 = new THREE.TextureLoader().load( './images/monograd.png' );



/***************************lights*************** */
    const ambientLight1 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight1 );

    const directionLight1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    directionLight1.position.set( 1, 1, 5 );
    scene.add( directionLight1 );

    const directionLight2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    directionLight2.position.set( 0, - 1, -100 );
    scene.add( directionLight2 );
    
    const sphereLightGeo = new THREE.ConeBufferGeometry(1, 1, 3, 4);
    const sphereLightMat = new THREE.MeshPhysicalMaterial( { color: 0x196aa5, roughness: 0.7, metalness: 1, reflectivity: 1, clearcoat: 0.84, wireframe: true, flatShading: false} );
    

    const pLight1 = new THREE.PointLight( 0x85f9ff, 4, 100, 2 );
    pLight1.add( new THREE.Mesh( sphereLightGeo, sphereLightMat) );
    scene.add( pLight1 );
    pLight1.position.setY(1.5)

    const pLight2 = new THREE.PointLight( 0x85f9ff, 2.5, 100, 2 );
    pLight2.add( new THREE.Mesh( sphereLightGeo, sphereLightMat) );
    scene.add( pLight2 );
    pLight2.position.setY(1.5)

/*********************end lights */

    //cube specifics
    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const material = new THREE.MeshBasicMaterial( { map: purpleTexture } );
    const cube = new THREE.Mesh( geometry, material ); 
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
    const sphereGeo = new THREE.SphereBufferGeometry(0.5, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial( { map: purpleTexture } );
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere)
    sphere.position.setY(3);
    sphere.position.setZ(-5)

    
    //grey icos
    const icoGeo = new THREE.IcosahedronBufferGeometry( 0.5, 0 );
    const icoMat = new THREE.MeshPhysicalMaterial( { color: 0x353535, emissive: 0x111111, flatShading: true, vertexColors: THREE.NoColors, roughness: 0.5, metalness: 1, reflectivity: 1 } );
    const smallIco = new THREE.Mesh( icoGeo, icoMat );
    scene.add( smallIco );

    //pink icos
    const icoGeo2 = new THREE.IcosahedronBufferGeometry( 0.5, 2 );
    const icoMat2 = new THREE.MeshBasicMaterial( { map: pinkTexture } );
    const smallIco2 = new THREE.Mesh( icoGeo2, icoMat2 );
    scene.add( smallIco2 );
    smallIco2.position.setY(3);
    smallIco2.position.setX(5)

    //shiny sphere
    const sphereGeo2 = new THREE.SphereBufferGeometry(0.3, 32, 32);
    const sphereMat2 = new THREE.MeshPhongMaterial( { color: 0x6ee5ed, specular: 0x1c1c1c, shininess: 40, flatShading: false, vertexColors: THREE.NoColors, map: pinkTexture } );
    const sphere2 = new THREE.Mesh( sphereGeo2, sphereMat2 );
    sphere2.position.setY(1.0)
    sphere2.position.setZ(1.0)
    sphere2.position.setX(-0.25)
    scene.add( sphere2 );


    //for some reason also fixes the look of the particles
      sprite1.repeat.set(1,1)
      sprite2.repeat.set(1,1)
      const sphereGeo3 = new THREE.SphereBufferGeometry(0.1, 32, 32);
      const sphereMat3 = new THREE.MeshPhysicalMaterial( { color: 0x8e7d23, emissive: 0x728751, roughness: 0.5, reflectivity: 1, clearcoatRoughness: 1, vertexColors: THREE.NoColors, map: sprite2 } );
      const sphere3 = new THREE.Mesh( sphereGeo3, sphereMat3 );
      sphere3.position.setY(2)
      sphere3.position.setZ(1.0)
      sphere3.position.setX(-2)
      
      scene.add( sphere3 );
    
      //3d text
      const loaderGTLF = new GLTFLoader();
      loaderGTLF.load(
        // resource URL
        './threedmodels/Alisonnametext.glb',
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
      const materials = [];
      const particleGeo =  new THREE.BufferGeometry();
      const vertices = [];



      for ( let i = 0; i < 25; i ++ ) { 
        let x = Math.random() * (2000 - 1) + 1;
        let y = Math.random() * (2000 - 1) + 1;
        let z = Math.random() * (2000 - 1) + 1;
        
        vertices.push( x, y, z );
      }

      particleGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 1 ) );


      const parametersSprites = [
        [[ 298, 0.47, 0.57 ], sprite1, 2 ], ];

      for ( let i = 0; i < parametersSprites.length; i ++ ) {

        let color = parametersSprites[ i ][ 0 ];
        let sprite = parametersSprites[ i ][ 1 ];
        let size = parametersSprites[ i ][ 2 ];
                                                                                      //blending change to Normal to see diff - Multiply and Subtractive don't work in this context
        materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false} );
        materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );

        let particles = new THREE.Points( geometry, materials[ i ] );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6
        particles.rotation.z = Math.random() * 6;
        
        cube.add( particles );
        /********end particles*/


      /*start water*/
      //water variable defined at top let water;
  
      const lightWater = new THREE.DirectionalLight( 0xffffff, 0.8 )
      const waterGeo = new THREE.PlaneBufferGeometry(500, 500)
      water = new Water(waterGeo,
          {

            textureWidth: 512,
						textureHeight: 512,
						waterNormals: new THREE.TextureLoader().load( './images/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						alpha: 1.0,
						sunDirection: lightWater.position.clone().normalize(),
						sunColor: 0x7799ba,
						waterColor: 0x4d9e9e,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
				);

				water.rotation.x = - Math.PI / 2;
          water.position.setY(-1)
				scene.add( water );


        const sky = new Sky();

				const uniforms = sky.material.uniforms;

				uniforms[ 'turbidity' ].value = 10;
				uniforms[ 'rayleigh' ].value = 6;
				uniforms[ 'luminance' ].value = 1;
				uniforms[ 'mieCoefficient' ].value = 0.005;
				uniforms[ 'mieDirectionalG' ].value = 0.8;

				const parameters = {
					distance: 400,
					inclination: 0.49,
					azimuth: 0.10
				};

				const cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
				cubeCamera.renderTarget.texture.generateMipmaps = true;
				cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;

				scene.background = cubeCamera.renderTarget;

				function updateSun() {

					const theta = Math.PI * ( parameters.inclination - 0.5 );
					const phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

					lightWater.position.x = parameters.distance * Math.cos( phi );
					lightWater.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
					lightWater.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

					sky.material.uniforms[ 'sunPosition' ].value = lightWater.position.copy( lightWater.position );
					water.material.uniforms[ 'sunDirection' ].value.copy( lightWater.position ).normalize();

					cubeCamera.update( renderer, sky );

				}

        updateSun();
      
        window.addEventListener('resize', onWindowResize);   
}


  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight * 0.75 );

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
        let icoTimer = Date.now() * 0.003;
        let timer = Date.now() * 0.0009;
        let particleTime = Date.now() * 0.00005;
        let delta = clock.getDelta();

        let timeWater = performance.now() * 0.001
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        //original:
        //var timer = Date.now() * 0.01;
        
        //var d = 150;

        smallIco.position.z = Math.cos( icoTimer * 0.4 ) * 2
        smallIco.position.y = Math.sin( icoTimer * 0.3 ) * 4
        smallIco.position.x = Math.sin( icoTimer * 0.3 ) * 4
		    smallIco.rotation.y = ( Math.PI / 2 ) - timer * 0.1;
        smallIco.rotation.z = timer * 0.8;
        
        pLight1.position.x = Math.sin( timer * 0.7 ) * 5;
		    pLight1.position.z = Math.cos( timer * 0.3 ) * 5;
        pLight2.position.z = Math.sin( timer * 0.5 ) * 5;
        pLight2.position.x = Math.sin( timer * 0.7) * 5;
        
        for (let i = 0; i < scene.children.length; i ++) {
					let object = scene.children[ i ];						
					if (object instanceof THREE.Points) {
						object.rotation.y = particleTime * ( i < 4 ? i + 10 : - ( i + 10 ) );
					}
				}

		    for (let i = 0; i < materials.length; i ++) {
					let color = parametersSprites[ i ][ 0 ];
					let h = ( 360 * ( color[ 0 ] + particleTime ) % 200) / 200;
					materials[ i ].color.setHSL(h, color[ 1 ], color[ 2 ]);
				}                  
        renderer.render( scene, camera );
    }
    animate();
}

main();