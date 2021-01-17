import Renderer from '../../renderer/AbstractRenderer';

class AbstractWindow {

    private gl;
    private renderer;

    constructor(gl) {
        this.gl = gl;
        this.renderer = new Renderer(this.gl);
    }

    setRenderer(renderer) {
        this.renderer = renderer;
    }

    getRenderer() {
        return this.renderer;
    }
}

export default AbstractWindow;