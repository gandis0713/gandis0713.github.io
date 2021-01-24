import { vec3, mat4 } from 'gl-matrix';

export interface ILootAt {
  eye: vec3;
  up: vec3;
  target: vec3;
}

export interface IFrustum {
  left: number;
  right: number;
  top: number;
  bottom: number;
  near: number;
  far: number;
}

abstract class AbstractCamera {
  protected lookAt: ILootAt;
  protected frustum: IFrustum;

  protected wcvc: mat4;
  protected vcwc: mat4;
  protected vcpc: mat4;
  protected pcvc: mat4;
  protected wcpc: mat4;
  protected pcwc: mat4;

  constructor() {
    this.lookAt = {
      eye: vec3.create(),
      up: vec3.create(),
      target: vec3.create(),
    };
    this.lookAt.eye[0] = 0;
    this.lookAt.eye[1] = 0;
    this.lookAt.eye[2] = 1000;
    this.lookAt.up[0] = 0;
    this.lookAt.up[1] = 1;
    this.lookAt.up[2] = 0;

    this.frustum = {
      left: -250,
      right: 250,
      bottom: -250,
      top: 250,
      near: 1000,
      far: -1000,
    };

    this.wcvc = mat4.create();
    this.vcwc = mat4.create();
    this.vcpc = mat4.create();
    this.pcvc = mat4.create();
    this.wcpc = mat4.create();
    this.pcwc = mat4.create();

    this.initialize();
  }

  protected initialize(): void {
    mat4.lookAt(this.wcvc, this.lookAt.eye, this.lookAt.target, this.lookAt.up);
    mat4.invert(this.vcwc, this.wcvc);
  }

  protected abstract setProperty(): void;

  public setLootAt(lookAt: ILootAt): void {
    this.lookAt = lookAt;
  }

  public setSize(left: number, right: number, bottom: number, top: number): void {
    this.frustum.left = left;
    this.frustum.right = right;
    this.frustum.bottom = bottom;
    this.frustum.top = top;
  }

  public setHorizontalSize(left: number, right: number): void {
    this.frustum.left = left;
    this.frustum.right = right;
  }

  public setVerticalSize(bottom: number, top: number): void {
    this.frustum.bottom = bottom;
    this.frustum.top = top;
  }

  public setFrustum(frustum: IFrustum): void {
    this.frustum = frustum;
  }

  public getWCPC(): mat4 {
    return this.wcpc;
  }

  public getVCPC(): mat4 {
    return this.vcpc;
  }
}

export default AbstractCamera;

// export default function Camera() {

//   this._state = {
//     lookAt: {
//       eye: [0, 0, 0.0001],
//       up: [0, 1, 0],
//       target: [0, 0, 0]
//     },
//     frustum: {
//       left: -150,
//       right: 150,
//       bottom: -150,
//       top: 150,
//       near: -1000,
//       far: 1000
//     },
//     wcvc: mat4.create(),
//     vcwc: mat4.create(),
//     vcpc: mat4.create(),
//     pcvc: mat4.create(),
//     wcpc: mat4.create(),
//     pcwc: mat4.create()
//   }

//   this._initialize = () => {
//     mat4.lookAt(this._state.wcvc, this._state.lookAt.eye, this._state.lookAt.target, this._state.lookAt.up);
//     mat4.invert(this._state.vcwc, this._state.wcvc);
//     mat4.ortho(this._state.vcpc, this._state.frustum.left, this._state.frustum.right, this._state.frustum.bottom, this._state.frustum.top, this._state.frustum.near, this._state.frustum.far);
//     mat4.invert(this._state.pcvc, this._state.vcpc);
//     mat4.multiply(this._state.wcpc, this._state.vcpc, this._state.wcvc);
//     mat4.invert(this._state.pcwc, this._state.wcpc);
//   }

//   this.setLootAt = (eye, target, up) => {
//     this._state.lookAt.eye = eye;
//     this._state.lookAt.target = target;
//     this._state.lookAt.up = up;
//     mat4.lookAt(this._state.wcvc, this._state.lookAt.eye, this._state.lookAt.target, this._state.lookAt.up);
//     mat4.invert(this._state.vcwc, this._state.wcvc);
//     mat4.multiply(this._state.wcpc, this._state.vcpc, this._state.wcvc);
//     mat4.invert(this._state.pcwc, this._state.wcpc);
//   }

//   this.setFrustum = (left, right, bottom, top, near, far) => {
//     this._state.frustum.left = left;
//     this._state.frustum.right = right;
//     this._state.frustum.bottom = bottom;
//     this._state.frustum.top = top;
//     this._state.frustum.near = near;
//     this._state.frustum.far = far;

//     mat4.ortho(this._state.vcpc, left, right, bottom, top, near, far);
//     mat4.invert(this._state.pcvc, this._state.vcpc);
//     mat4.multiply(this._state.wcpc, this._state.vcpc, this._state.wcvc);
//     mat4.invert(this._state.pcwc, this._state.wcpc);
//   }

//   this.zoom = (rate) => {

//     this._state.frustum.left -= rate;
//     this._state.frustum.right += rate;
//     this._state.frustum.bottom -= rate;
//     this._state.frustum.top += rate;

//     const { left, right, bottom, top, near, far } = this._state.frustum;

//     mat4.ortho(this._state.vcpc, left, right, bottom, top, near, far);
//     mat4.invert(this._state.pcvc, this._state.vcpc);
//     mat4.multiply(this._state.wcpc, this._state.vcpc, this._state.wcvc);
//     mat4.invert(this._state.pcwc, this._state.wcpc);

//   }

//   this.pan = (x, y) => {

//   }

//   this.orbit = (x, y) => {
//     const screenNormal = [0, 0, 1];
//     const dir = [x, y, 0];
//     const axis = vec3.create();
//     vec3.cross(axis, dir, screenNormal);

//     vec3.normalize(axis, axis);

//     let dgreeX = vec3.dot(axis, [1, 0, 0]);
//     let dgreeY = vec3.dot(axis, [0, 1, 0]);

//     const degreeAmount = 3.5;
//     dgreeX = dgreeX * Math.PI / 180.0;
//     dgreeY = dgreeY * Math.PI / 180.0;
//     dgreeX *= degreeAmount;
//     dgreeY *= degreeAmount;

//     const { eye, target, up } = this._state.lookAt;

//     const camTarToEye = vec3.create();
//     vec3.subtract(camTarToEye, eye, target);
//     vec3.normalize(camTarToEye, camTarToEye);
//     const camRight = vec3.create();
//     vec3.cross(camRight, up, camTarToEye);
//     vec3.normalize(camRight, camRight);

//     const camPitch = mat4.create();
//     mat4.fromRotation(camPitch, dgreeX, camRight);
//     const camYaw = mat4.create();
//     mat4.fromRotation(camYaw, dgreeY, up);

//     vec3.transformMat4(eye, eye, camPitch);
//     vec3.transformMat4(eye, eye, camYaw);

//     vec3.subtract(camTarToEye, eye, target);
//     vec3.normalize(camTarToEye, camTarToEye);
//     vec3.cross(up, camTarToEye, camRight);
//     vec3.normalize(up, up);

//     vec3.cross(camRight, up, camTarToEye);
//     vec3.normalize(camRight, camRight);

//     this.setLootAt(eye, target, up);
//   }

//   this.getState = () => {
//     return { ...this._state };
//   }

//   this._initialize();
// }
