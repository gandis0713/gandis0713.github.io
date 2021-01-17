import AbstractImageWindow from '../AbstractImageWindow';
import EdgeImageRenderer from '../../renderer/EdgeImageRenderer';

class EdgeImageWindow extends AbstractImageWindow {
  protected createRenderer(): void {
    this.renderer = new EdgeImageRenderer(this.gl);
    this.renderer.setViewport(0, 0, this.canvas.width, this.canvas.height);
    this.renderer.setShaderParameter();
    this.renderer.createBuffer();
  }
}

export default EdgeImageWindow;
