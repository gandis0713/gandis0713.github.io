export default function Shader(gl,vertexShaderSourceURL, fragShaderSourceURL) {
  this.gl = gl;

  this.vertexShaderSourceURL = vertexShaderSourceURL;
  this.fragShaderSourceURL = fragShaderSourceURL;

  this.initialize = async function() {
    const vResponce = await fetch(this.vertexShaderSourceURL);
    const vertexShaderSource = await vResponce.text();
    const fResponce = await fetch(this.fragShaderSourceURL);
    const fragShaderSource = await fResponce.text();

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragShaderSource);
    this.createShaderProgram(vertexShader, fragmentShader);
  }

  this.createShader = function(shaderType, shaderSource) {
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);
  
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if(success) {
      console.log("Succeed to create shader.");
      return shader;
    }
  
    alert("Failed to create shader");
    console.log(this.gl.getShaderInfoLog(shader), shaderSource);
    this.gl.deleteShader(shader);
    return null;
  }
  
  this.createShaderProgram = function(vertexShader, fragmentShader) {
    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);
  
    const success = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
    if(success) {
      console.log("Succeed to create shader program.");
      return shaderProgram;
    }
  
    alert("Failed to create shader program.");
    console.log(this.gl.getProgramInfoLog(shaderProgram));
    this.gl.deleteProgram(shaderProgram);
  
    return null;
  }
}
