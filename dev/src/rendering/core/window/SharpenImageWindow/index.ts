import AbstractImageWindow from '../AbstractImageWindow';
import SharpenImageRenderer from '../../renderer/SharpenImageRenderer';

class SharpenImageWindow extends AbstractImageWindow {
  protected createRenderer(): void {
    this.renderer = new SharpenImageRenderer(this.gl);
  }
}

export default SharpenImageWindow;
