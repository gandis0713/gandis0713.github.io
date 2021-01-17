import Camera from './camera.js';

export default function Renderer(gl) {
    this.gl = gl;
    this.camera = null;

    this._initialize = function() {
        this.camera = new Camera();
    }

    this.setCamera= function(camera) {
        this.camera= camera;
    }

    this.getCamera= function() {
        return this.camera;
    }

    this._initialize();
}