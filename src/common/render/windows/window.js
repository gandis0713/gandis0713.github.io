import Renderer from '../renderer.js';

export default class Window {

    #gl 
    #renderer

    constructor(gl) {
        this.gl = gl;
        this.renderer = new Renderer(this.gl);
        console.log("window")
    }

    setRenderer(renderer) {
        this.renderer = renderer;
    }

    getRenderer() {
        return this.renderer;
    }
}

export class ImageWindow extends Window{

    constructor(gl) {
        super(gl);
    }
}
