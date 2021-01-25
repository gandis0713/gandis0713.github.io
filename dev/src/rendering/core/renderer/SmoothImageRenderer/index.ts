import AbstractImageRenderer from '../AbstractImageRenderer';

import vertexShaderSource from './glsl/vs.glsl';
import fragShaderSource from './glsl/fs.glsl';

class SmoothImageRenderer extends AbstractImageRenderer {
  protected createShader(): void {
    super.createShader();
    this.shader.initialize(vertexShaderSource, fragShaderSource);
  }
}

export default SmoothImageRenderer;
