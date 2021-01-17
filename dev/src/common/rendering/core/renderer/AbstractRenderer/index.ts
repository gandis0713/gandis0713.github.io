import AbstractCamera from '../../camera/AbstractCamera';
import OrthoGraphicCamera from '../../camera/OrthoGraphicCamera';
import Shader from '../../Shader';

abstract class AbstractRenderer {
  protected gl;
  protected camera: AbstractCamera;
  protected shader: Shader;

  protected width;
  protected height;
  protected isDragging: boolean;
  protected mousePosition: number[] = [0, 0];

  constructor(gl) {
    this.gl = gl;
    this.camera = new OrthoGraphicCamera();

    this.createShader();
  }

  public abstract mouseDownEvent(event): void;

  public abstract mouseMoveEvent(event): void;

  public abstract mouseUpEvent(event): void;

  protected createShader(): void {
    this.shader = new Shader(this.gl);
  }

  public setViewport(x: number, y: number, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.gl.viewport(x, y, width, height);
  }

  public setShaderParameter(): void {}

  public createBuffer(): void {}

  public abstract draw(): void;

  public setCamera(camera: AbstractCamera) {
    this.camera = camera;
  }

  public getCamera(): AbstractCamera {
    return this.camera;
  }
}

export default AbstractRenderer;
