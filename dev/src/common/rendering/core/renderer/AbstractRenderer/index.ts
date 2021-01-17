import Camera from '../../camera/AbstractCamera';

class AbstractRenderer {
  private gl;
  private camera;

  constructor(gl) {
    this.gl = gl;
    this.camera = new Camera();
  }

  setCamera(camera) {
    this.camera = camera;
  }

  getCamera() {
    return this.camera;
  }
}

export default AbstractRenderer;
