import AbstractRenderer from '../AbstractRenderer';

abstract class AbstractImageRenderer extends AbstractRenderer {
  protected vertexBuffer;
  protected textureBuffer;

  public mouseDownEvent(event): void {
    this.isDragging = true;

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
    this.mousePosition[0] = event.offsetX;
    this.mousePosition[1] = this.height - event.offsetY;

    this.isDragging = false;
  }
}

export default AbstractImageRenderer;
