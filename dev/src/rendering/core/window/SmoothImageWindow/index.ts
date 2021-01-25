import AbstractImageWindow from '../AbstractImageWindow';
import SmoothImageRenderer from '../../renderer/SmoothImageRenderer';

class SmoothImageWindow extends AbstractImageWindow {
  protected createRenderer(): void {
    this.renderer = new SmoothImageRenderer(this.gl);
  }
}

export default SmoothImageWindow;
