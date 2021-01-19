import AbstractRenderer from '../../renderer/AbstractRenderer';
abstract class AbstractWindow {
  protected canvas;
  protected renderer: AbstractRenderer;
  protected gl;

  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext('webgl');
    console.log('this.gl : ', this.gl);

    this.bind();

    this.canvas.addEventListener('mousedown', this.mouseDownEvent, false);
    this.canvas.addEventListener('mousemove', this.mouseMoveEvent, false);
    this.canvas.addEventListener('mouseup', this.mouseUpEvent, false);

    this.initialize();
  }

  protected bind(): void {
    this.mouseDownEvent = this.mouseDownEvent.bind(this);
    this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
    this.mouseUpEvent = this.mouseUpEvent.bind(this);
  }

  protected initialize(): void {
    this.createRenderer();
  }

  protected abstract createRenderer(): void;

  protected mouseDownEvent(event): void {
    this.renderer.mouseDownEvent(event);
  }

  protected mouseMoveEvent(event): void {
    this.renderer.mouseMoveEvent(event);
  }

  protected mouseUpEvent(event): void {
    this.renderer.mouseUpEvent(event);
  }

  public render(): void {
    this.renderer.draw();
  }

  public setRenderer(renderer): void {
    this.renderer = renderer;
  }

  public getRenderer(): AbstractRenderer {
    return this.renderer;
  }
}

export default AbstractWindow;
