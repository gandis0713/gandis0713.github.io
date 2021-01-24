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
  protected mousePosition: number[] = [-100, -100];

  constructor(gl) {
    this.gl = gl;
    this.camera = new OrthoGraphicCamera();

    this.createShader();
  }

  public mouseDownEvent(event): void {
    this.isDragging = true;

    alert('event.offsetX');
    alert(event.offsetX);
    this.mousePosition[0] = event.offsetX;
    this.mousePosition[1] = this.height - event.offsetY;
  }

  public mouseMoveEvent(event): void {
    if (this.isDragging === true) {
      this.mousePosition[0] = event.offsetX;
      this.mousePosition[1] = this.height - event.offsetY; // invert to rasterization in webgl Y axis.
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
