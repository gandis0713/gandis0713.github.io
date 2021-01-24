import AbstractCamera from '../../camera/AbstractCamera';
import OrthoGraphicCamera from '../../camera/OrthoGraphicCamera';
import Shader from '../../Shader';
import { vec2 } from 'gl-matrix';

abstract class AbstractRenderer {
  protected gl;
  protected camera: AbstractCamera;
  protected shader: Shader;

  protected width;
  protected height;
  protected isDragging: boolean;
  protected mousePosition: any = [-100, -100];

  constructor(gl) {
    this.gl = gl;
    this.camera = new OrthoGraphicCamera();

    this.createShader();
  }

  public mouseDownEvent(viewPos): void {
    this.isDragging = true;
    this.mousePosition[0] = viewPos.x;
    this.mousePosition[1] = viewPos.y;
  }

  public mouseMoveEvent(viewPos): void {
    if (this.isDragging === true) {
      this.mousePosition[0] = viewPos.x;
      this.mousePosition[1] = viewPos.y;
    }
  }

  public mouseUpEvent(event): void {
    this.mousePosition[0] = -100;
    this.mousePosition[1] = -100;

    this.isDragging = false;
  }

  protected createShader(): void {
    this.shader = new Shader(this.gl);
  }

  public setSize(width: number, height: number): void {
    this.setViewport(0, 0, width, height);
    this.camera.setSize(-width / 2, width / 2, -height / 2, height / 2);
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
