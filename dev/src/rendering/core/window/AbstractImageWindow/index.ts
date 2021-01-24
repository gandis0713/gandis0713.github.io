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
}

export default AbstractImageWindow;
