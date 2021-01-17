import AbstractWindow from '../AbstractWindow';

abstract class AbstractImageWindow extends AbstractWindow {
  constructor(gl) {
    super(gl);
  }

  protected mouseDownEvent(event): void {}

  protected mouseMoveEvent(event): void {}

  protected mouseUpEvent(event): void {}
}

export default AbstractImageWindow;
