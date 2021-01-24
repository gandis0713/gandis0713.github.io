import AbstractImageRenderer from '../../renderer/AbstractImageRenderer';
import AbstractWindow from '../AbstractWindow';

abstract class AbstractImageWindow extends AbstractWindow {
  constructor(gl) {
    super(gl);
  }

  public setImage(image): void {
    const renderer = this.renderer as AbstractImageRenderer;
    renderer.setImage(image);
  }

  public initRenderer(width: number, height: number): void {
    this.renderer.setShaderParameter();
    this.renderer.createBuffer();
    this.renderer.setSize(width, height);
  }
}

export default AbstractImageWindow;
