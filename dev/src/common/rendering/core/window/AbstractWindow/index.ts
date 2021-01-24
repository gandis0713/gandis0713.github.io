import AbstractRenderer from '../../renderer/AbstractRenderer';
abstract class AbstractWindow {
  protected container;
  protected canvas;
  protected renderer: AbstractRenderer;
  protected gl;

  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.gl = this.canvas.getContext('webgl');

    this.bind();

    this.container.addEventListener('mousedown', this.mouseDownEvent, false);
    this.container.addEventListener('mousemove', this.mouseMoveEvent, false);
    this.container.addEventListener('mouseup', this.mouseUpEvent, false);

    this.container.addEventListener('touchstart', this.touchStartEvent, false);
    this.container.addEventListener('touchmove', this.touchMoveEvent, false);
    this.container.addEventListener('touchend', this.touchEndEvent, false);
    this.container.addEventListener('touchcancel', this.touchCancelEvent, false);
  }

  protected bind(): void {
    this.mouseDownEvent = this.mouseDownEvent.bind(this);
    this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
    this.mouseUpEvent = this.mouseUpEvent.bind(this);

    this.touchStartEvent = this.touchStartEvent.bind(this);
    this.touchMoveEvent = this.touchMoveEvent.bind(this);
    this.touchEndEvent = this.touchEndEvent.bind(this);
    this.touchCancelEvent = this.touchCancelEvent.bind(this);
  }

  public initialize(width: number, height: number): void {
    this.createRenderer();
    this.setSize(width, height);
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

  protected touchStartEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
    alert('touchStartEvent');
    this.renderer.mouseDownEvent(event.touches[0]);
  }

  protected touchMoveEvent(event): void {
    this.renderer.mouseMoveEvent(event.touches[0]);
  }

  protected touchEndEvent(event): void {
    this.renderer.mouseUpEvent(event.touches[0]);
  }

  protected touchCancelEvent(event): void {
    this.renderer.mouseUpEvent(event.touches[0]);
  }

  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.renderer.setSize(width, height);
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
