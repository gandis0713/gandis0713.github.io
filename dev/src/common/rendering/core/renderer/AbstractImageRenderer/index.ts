import AbstractRenderer from '../AbstractRenderer';

abstract class AbstractImageRenderer extends AbstractRenderer {
  protected vertexBuffer;
  protected textureBuffer;
  protected image;

  public mouseDownEvent(event): void {
    super.mouseDownEvent(event);
  }

  public mouseMoveEvent(event): void {
    super.mouseMoveEvent(event);
  }

  public mouseUpEvent(event): void {
    super.mouseUpEvent(event);
  }

  public setImage(image): void {
    this.image = image;
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.image
    );

    // this.gl.generateMipmap(this.gl.TEXTURE_2D); // TODO check

    this.draw();
  }
}

export default AbstractImageRenderer;
