import AbstractImageWindow from '../AbstractImageWindow';
import MagnifierImageRenderer from '../../renderer/MagnifierImageRenderer';

class MagnifierImageWindow extends AbstractImageWindow {
  protected createRenderer(): void {
    this.renderer = new MagnifierImageRenderer(this.gl);
  }
}

export default MagnifierImageWindow;
