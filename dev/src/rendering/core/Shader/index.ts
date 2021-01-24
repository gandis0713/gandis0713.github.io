class Shader {
  private gl;
  private vertexShader;
  private fragmentShader;
  private shaderProgram;

  constructor(gl) {
    this.gl = gl;
  }

  public initialize(vertexShaderSource, fragShaderSource) {
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragShaderSource);
    this.createShaderProgram(this.vertexShader, this.fragmentShader);
  }

  private createShader(shaderType, shaderSource) {
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);

    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    alert('Failed to create shader');
    console.log(this.gl.getShaderInfoLog(shader), shaderSource);
    this.gl.deleteShader(shader);
    return null;
  }

  private createShaderProgram(vertexShader, fragmentShader) {
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    const success = this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS);
    if (success) {
      return this.shaderProgram;
    }

    alert('Failed to create shader program.');
    console.log(this.gl.getProgramInfoLog(this.shaderProgram));
    this.gl.deleteProgram(this.shaderProgram);

    return null;
  }

  public getShaderProgram() {
    return this.shaderProgram;
  }
}

export default Shader;
