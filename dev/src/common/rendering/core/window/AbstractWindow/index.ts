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
    this.renderer.mouseDownEvent(this.getViewPosition(event));
  }

  protected mouseMoveEvent(event): void {
    this.renderer.mouseMoveEvent(this.getViewPosition(event));
  }

  protected mouseUpEvent(event): void {
    this.renderer.mouseUpEvent(this.getViewPosition(event));
  }

  protected touchStartEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.mouseDownEvent(this.getViewPosition(event));
  }

  protected touchMoveEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.mouseMoveEvent(this.getViewPosition(event));
  }

  protected touchEndEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.mouseUpEvent(this.getViewPosition(event));
  }

  protected touchCancelEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
    this.renderer.mouseUpEvent(this.getViewPosition(event));
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

  private getViewPosition(event): any {
    const bounds = this.container.getBoundingClientRect();
    alert('bounds');
    alert(bounds.width);
    const scaleX = this.canvas.width / bounds.width;
    const scaleY = this.canvas.height / bounds.height;
    alert('event.clientX');
    alert(event.clientX);
    const position = {
      x: scaleX * (event.clientX - bounds.left),
      y: scaleY * (bounds.height - event.clientY + bounds.top),
    };

    return position;
  }
}

export default AbstractWindow;
