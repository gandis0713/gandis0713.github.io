import AbstractCamera from '../AbstractCamera';
import { mat4 } from 'gl-matrix';

class OrthoGraphicCamera extends AbstractCamera {
  protected initialize(): void {
    super.initialize();

    mat4.ortho(
      this.vcpc,
      this.frustum.left,
      this.frustum.right,
      this.frustum.bottom,
      this.frustum.top,
      this.frustum.near,
      this.frustum.far
    );

    console.log('this.vcpc : ', this.vcpc);
    mat4.invert(this.pcvc, this.vcpc);
    mat4.multiply(this.wcpc, this.vcpc, this.wcvc);
    mat4.invert(this.pcwc, this.wcpc);
  }
}

export default OrthoGraphicCamera;
