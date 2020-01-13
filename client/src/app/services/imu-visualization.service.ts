import { Injectable, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ImuVisualizationService {
  /**
  * @name canvasEl
  * @type {object}
  * @private
  * @description Dom object reference
  */
  canvasEl: ElementRef;

  /**
  * @name _ELEMENT
  * @type {object}
  * @private
  * @description      Defines an object for referencing the DOM element
            where the WebGL object will be rendered to
  */
  private _ELEMENT : any;

  /**
  * @name _SCENE
  * @type {object}
  * @private
  * @description      ThreeJS needs a scene to render a WebGL object - this
            will act as an object reference for handling that requirement
  */
  private _SCENE;

  /**
  * @name _CAMERA
  * @type {object}
  * @private
  * @description      ThreeJS requires a camera for WebGL object generation - this
            will act as an object reference for handling that requirement
  */
  private _CAMERA;

  /**
  * @name renderer
  * @type {object}
  * @public
  * @description      ThreeJS requires a renderer for rendering the generated WebGL
            object to the page DOM element - this will act as an object
            reference for handling that requirement
  */
  public renderer;

  /**
  * @name _GEOMETRY
  * @type {object}
  * @private
  * @description      Define a Geometry object for subsequent object rendering
  */
  private _GEOMETRY;

  /**
  * @name _MATERIAL
  * @type {object}
  * @private
  * @description      Define a Material object for subsequent object rendering
  */
  public _MATERIAL;

  /**
  * @name _CUBE
  * @type {object}
  * @private
  * @description      Define a property for storing a reference to a polygon mesh object
  */
  public _CUBE;

  /* Has this service been initialized or not */
  public initialized = false;


  public _FRAME;

  constructor(){}

  /* Sets the canvas element, must be done before displaying */
  setCanvasElement( element ) {
    this.canvasEl = element;
  }

  /**
  * Initialise the WebGL objecty to be generated using
  * selected ThreeJS methods and properties
  *
  * @public
  * @method initialiseWebGLObjectAndEnvironment
  * @return {none}
  */
  initialiseWebGLObjectAndEnvironment() : void
  {
    if( this.initialized ) {
      return;
    }

    this.initialized = true;
    // Reference the DOM element that the WebGL generated object
    // will be assigned to
    this._ELEMENT = this.canvasEl.nativeElement;

    // Define a new ThreeJS scene
    this._SCENE = new THREE.Scene();
    this._SCENE.background = new THREE.Color( 0xffffff );
    
    // Define a new ThreeJS camera from the following types:
    /*
        1. CubeCamera				(Creates 6 cameras - one for each face of a cube)
        2. OrthographicCamera		(Creates a camera using orthographic projection - object size stays constant
                      regardless of distance from the camera)
        3. PerspectiveCamera		(Creates a camera using perspective projection - most common projection type
                      for 3D rendering [designed to mimic the way the human eye sees])
        4. StereoCamera			(Dual PerspectiveCameras - used for 3D effects such as parallax barrier)
    */
    this._CAMERA = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this._CAMERA.position.set( 0, -1, 0 );

    // Define an object to manage display of ThreeJS scene
    this.renderer = new THREE.WebGLRenderer();

    // Resizes the output canvas to match the supplied width/height parameters
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    // Attach the canvas, where the renderer draws the scene, to the specified DOM element
    this._ELEMENT.appendChild( this.renderer.domElement );

    // BoxGeometry class allows us to create a cube (with width, height and depth dimensions supplied as
    // parameters - default is 1 for these values)
    this._GEOMETRY = new THREE.BoxGeometry( 1, 1, 1 );

    // Define the material (and its appearance) for drawing the geometry to the scene
    this._MATERIAL = new THREE.MeshNormalMaterial();

    // Use the Mesh class to define a polygon mesh based object with the supplied geometry and material objects
    this._CUBE = new THREE.Mesh( this._GEOMETRY, this._MATERIAL );

    // Add the object to the scene
    this._SCENE.add(this._CUBE);

    // Define the depth position of the camera
    this._CAMERA.position.z = 4;
  }

  /**
  * Define the animation properties for the WebGL object rendered in the DOM element, using the requestAnimationFrame
  * method to animate the object
  *
  * @private
  * @method animate
  * @return {none}
  */
  private _animate () : void
  {
    this._FRAME = requestAnimationFrame(() =>
    {
        this._animate();
    });

    // Define rotation speeds on x and y axes - lower values means lower speeds
    this._CUBE.rotation.x += 0.15;
    this._CUBE.rotation.y += 0.15;

    // Render the scene (will be called using the requestAnimationFrame method to ensure the cube is constantly animated)
    this.renderer.render(this._SCENE, this._CAMERA);
  };

  /**
  * Render the animation
  *
  * @public
  * @method _renderAnimation
  * @return {none}
  */
  renderAnimation() : void
  {
    this._animate();
  }

  /**
   * Stop the animation
   * 
   * @public
   * @method _stopAnimation
   * @return {none}
   */
  stopAnimation() : void
  {
    cancelAnimationFrame( this._FRAME );
  }
}
