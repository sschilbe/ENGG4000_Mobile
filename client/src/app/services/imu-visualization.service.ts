import { Injectable, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

export class Visualization {
  public initialized: any;     // Has this visualization element been initialized
  canvasEl: ElementRef; // Dom object reference
  element: any;         // Defines an object for referencing the DOM element where the WebGL object will be rendered to
  scene: any;           // ThreeJS needs a scene to render a WebGL object - this will act as an object reference for handling that requirement
  camera: any;          // ThreeJS requires a camera for WebGL object generation - this will act as an object reference for handling that requirement
  renderer: any;        // ThreeJS requires a renderer for rendering the generated WebGL object to the page DOM element - this will act as an object reference for handling that requirement
  geometry: any;        // Define a Geometry object for subsequent object rendering
  material: any;        // Define a Material object for subsequent object rendering
  cylinder: any;        // Define a property for storing a reference to a polygon mesh object
  frame: any

  constructor(){}
};

@Injectable({
  providedIn: 'root'
})
export class ImuVisualizationService {

  constructor(){}

  /* Sets the canvas element, must be done before displaying */
  setCanvasElement( visualization : Visualization, element ) {
    visualization.canvasEl = element;
  }

  /**
  * Initialise the WebGL objecty to be generated using
  * selected ThreeJS methods and properties
  *
  * @public
  * @method initialiseWebGLObjectAndEnvironment
  * @return {none}
  */
  initialiseWebGLObjectAndEnvironment( visualization: Visualization ) : void
  {
    if( visualization.initialized ) {
      return;
    }

    visualization.initialized = true;
    // Reference the DOM element that the WebGL generated object
    // will be assigned to
    visualization.element = visualization.canvasEl.nativeElement;

    // Define a new ThreeJS scene
    visualization.scene = new THREE.Scene();
    visualization.scene.background = new THREE.Color( 0xffffff );
    
    // Define a new ThreeJS camera from the following types:
    /*
        1. CubeCamera				(Creates 6 cameras - one for each face of a cube)
        2. OrthographicCamera		(Creates a camera using orthographic projection - object size stays constant
                      regardless of distance from the camera)
        3. PerspectiveCamera		(Creates a camera using perspective projection - most common projection type
                      for 3D rendering [designed to mimic the way the human eye sees])
        4. StereoCamera			(Dual PerspectiveCameras - used for 3D effects such as parallax barrier)
    */
    visualization.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    visualization.camera.position.set( 0, -1, 0 );

    // Define an object to manage display of ThreeJS scene
    visualization.renderer = new THREE.WebGLRenderer();

    // Resizes the output canvas to match the supplied width/height parameters
    visualization.renderer.setSize( window.innerWidth, window.innerHeight );

    // Attach the canvas, where the renderer draws the scene, to the specified DOM element
    visualization.element.appendChild( visualization.renderer.domElement );

    // BoxGeometry class allows us to create a cube (with width, height and depth dimensions supplied as
    // parameters - default is 1 for these values)
    //visualization.geometry = new THREE.BoxGeometry( 1, 1, 1 );

    // CylinderGeometry class allows us to create a cylinder
    visualization.geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    
    // Define the material (and its appearance) for drawing the geometry to the scene
    visualization.material = new THREE.MeshNormalMaterial();

    // Use the Mesh class to define a polygon mesh based object with the supplied geometry and material objects
    visualization.cylinder = new THREE.Mesh( visualization.geometry, visualization.material );

    // Add the object to the scene
    visualization.scene.add( visualization.cylinder );

    // Define the depth position of the camera
    visualization.camera.position.z = 30;
  }

  /**
  * Define the animation properties for the WebGL object rendered in the DOM element, using the requestAnimationFrame
  * method to animate the object
  *
  * @private
  * @method animate
  * @return {none}
  */
  private _animate ( visualization : Visualization ) : void
  {
    visualization.frame = requestAnimationFrame(() =>
    {
        this._animate( visualization );
    });

    // Define rotation speeds on x and y axes - lower values means lower speeds
    visualization.cylinder.rotation.x += 0.15;
    visualization.cylinder.rotation.y += 0.15;

    // Render the scene (will be called using the requestAnimationFrame method to ensure the cube is constantly animated)
    visualization.renderer.render( visualization.scene, visualization.camera );
  };

  /**
  * Render the animation
  *
  * @public
  * @method _renderAnimation
  * @return {none}
  */
  renderAnimation( visualization: Visualization) : void
  {
    this._animate( visualization );
  }

  /**
   * Stop the animation
   * 
   * @public
   * @method _stopAnimation
   * @return {none}
   */
  stopAnimation( visualization: Visualization ) : void
  {
    cancelAnimationFrame( visualization.frame );
  }
}
