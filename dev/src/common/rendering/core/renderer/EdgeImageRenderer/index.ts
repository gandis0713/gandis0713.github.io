import AbstractImageRenderer from '../AbstractImageRenderer';

import vertexShaderSource from '../../../glsl/edge_detection/vs.glsl';
import fragShaderSource from '../../../glsl/edge_detection/fs.glsl';

class EdgeImageRenderer extends AbstractImageRenderer {
  protected u_MCPC;
  protected u_mousePosition;
  protected vertices;

  protected createShader(): void {
    super.createShader();
    this.shader.initialize(vertexShaderSource, fragShaderSource);
  }

  public setShaderParameter(): void {
    const shaderProgram = this.shader.getShaderProgram();

    this.u_MCPC = this.gl.getUniformLocation(shaderProgram, 'u_MCPC');
    this.u_mousePosition = this.gl.getUniformLocation(shaderProgram, 'u_mousePosition');
  }

  public createBuffer(): void {
    this.vertices = [-1, 1, 0, 1, 1, 0, -1, -1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0];

    // initialize buffer
    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, -1, -1, 0, 1, 1, 0, 1, -1, 0]),
      this.gl.STATIC_DRAW
    );

    // create texture
    this.textureBuffer = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBuffer);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
  }

  public mouseDownEvent(event): void {
    super.mouseDownEvent(event);

    this.draw();
  }

  public mouseMoveEvent(event): void {
    super.mouseMoveEvent(event);

    this.draw();
  }

  public mouseUpEvent(event): void {
    alert('end draw0');
    super.mouseUpEvent(event);

    alert('end draw1');
    this.draw();
    alert('end draw2');
  }

  public draw(): void {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    // this.gl.enable(this.gl.CULL_FACE);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const shaderProgram = this.shader.getShaderProgram();

    const vertexID = this.gl.getAttribLocation(shaderProgram, 'vs_VertexPosition');
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(vertexID, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(vertexID);

    this.gl.useProgram(shaderProgram);
    this.gl.uniformMatrix4fv(this.u_MCPC, false, this.camera.getWCPC());
    this.gl.uniform2fv(this.u_mousePosition, this.mousePosition);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length / 3);
  }
}

export default EdgeImageRenderer;
