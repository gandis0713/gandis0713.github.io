import AbstractImageRenderer from '../AbstractImageRenderer';

import vertexShaderSource from '../../../glsl/edge_detection/vs.glsl';
import fragShaderSource from '../../../glsl/edge_detection/fs.glsl';

class EdgeImageRenderer extends AbstractImageRenderer {
  protected u_MCPC;
  protected u_mousePosition;
  protected vertices;
  protected image;

  protected createShader(): void {
    super.createShader();
    console.log('vertexShaderSource : ', vertexShaderSource);
    this.shader.initialize(vertexShaderSource, fragShaderSource);
    this.callback = this.callback.bind(this);
  }

  public setShaderParameter(): void {
    const shaderProgram = this.shader.getShaderProgram();

    this.u_MCPC = this.gl.getUniformLocation(shaderProgram, 'u_MCPC');
    this.u_mousePosition = this.gl.getUniformLocation(shaderProgram, 'u_mousePosition');
  }

  public createBuffer(): void {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    this.vertices = [
      -halfWidth,
      halfHeight,
      5,
      halfWidth,
      halfHeight,
      5,
      -halfWidth,
      -halfHeight,
      5,
      -halfWidth,
      -halfHeight,
      5,
      halfWidth,
      halfHeight,
      5,
      halfWidth,
      -halfHeight,
      5,
    ];

    // initialize buffer
    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    // create texture
    this.textureBuffer = this.gl.createTexture();

    this.image = new Image();
    this.image.src = '../../../img/about-bg.jpg';
    this.image.addEventListener('load', this.callback);
  }

  public callback(): void {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBuffer);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.image
    );

    console.log('image : ', this.image);
    // this.gl.generateMipmap(this.gl.TEXTURE_2D); // TODO check

    this.draw();
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
    console.log('this.camera.getWCPC() : ', this.camera.getWCPC());
    this.gl.uniformMatrix4fv(this.u_MCPC, false, this.camera.getWCPC());
    this.gl.uniform2fv(this.u_mousePosition, this.mousePosition);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length / 3);
  }
}

export default EdgeImageRenderer;
