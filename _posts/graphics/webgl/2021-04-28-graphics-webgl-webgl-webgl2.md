---
layout: post
title: "<code>[WebGL]</code> <br>WebGL 1.0 vs WebGL 2.0"
subtitle: 'WebGL 1.0 vs WebGL 2.0'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGL
  - WebGL2
  - OpenGL
---

> 이 글은 WebGL 1.0과 WebGL 2.0의 기능적인 부분을 비교하기 보다,WebGL로 Web Service를 제공하고 있을 때 WebGL과 WebGL2중 어떤 것을 사용할 것인지를 결정하는데 도움이 되고자 정리하게 되었다.

## **WebGL 현황**
WebGL은 Web browser에서 3D 기술을 적용하기 위한 Web Graphics Library이다. WebGL은 HTML5가 출시되면서 사용할 수 있게 되었으며, HTML에서 3D 기술을 적용하기 위해 사용되었던 plug-in(Flash, SilverLight)을 대체하게 되었다. 이 때의 버전이 WebGL 1.0이다. 그리고 2017년 WebGL 1.0에서 새로운 기능들이 추가된 WebGL 2.0이 출시되었고, WebGL 2.0이 현재 출시되어있는 WebGL의 최신 버전이다. WebGL 2.0에서 새로 추가된 기능은 [WebGL2 새로운 기능](https://webgl2fundamentals.org/webgl/lessons/ko/webgl2-whats-new.html)에서 확인할 수 있다.

---

## **WebGL 1.0**
WebGL 1.0은 OpenGL ES 2.0을 기반으로 한다. 그렇기 때문에 OpenGL ES 2.0에서 제공하지 않는 기능은 마찬가지로 WebGL 1.0에서도 사용 할 수 없으며, OpenGL ES 2.0보다 기능이 제한된다. WebGL 1.0의 자세한 Spec은 [WebGL Specification](https://www.khronos.org/registry/webgl/specs/latest/1.0/)에서 확인할 수 있다.

## **WebGL 2.0**
WebGL 2.0은 WebGL 1.0에서 새로운 기능이 추가되면서 WebGL 1.0을 확장한 개념이지만, WebGL 1.0과 마찬가지로 OpenGL ES를 기반으로 하고 있으며, 기반이 되는 버전은 OpenGL ES 3.0이다. 그렇기 때문에 OpenGL ES 3.0에서 제공하는 기능을 제한적으로 사용할 수 있다. WebGL 2.0의 자세한 Spec은 [WebGL 2.0 Specification](https://www.khronos.org/registry/webgl/specs/latest/2.0/)에서 확인 할 수 있다.

## **WebGL 1.0 vs WebGL 2.0**
WebGL 2.0은 WebGL 1.0을 확장한 개념으로 WebGL 1.0에서 제공하는 기능을 WebGL 2.0에서도 제공한다. 그렇기 때문에 WebGL 2.0을 사용하면 좀더 편리하게 많은 기능들을 사용할 수 있으며, WebGL 1.0에서 제공하지 않은 3D Texture, DepthBuffer 등의 기능들도 사용할 수 있어 개인적으로는 좋았다. 

하지만 WebGL 2.0은 모든 Browser에서 제공하는 기능은 아니다. [WebGL 1.0](https://caniuse.com/webgl)과 [WebGL 2.0](https://caniuse.com/webgl2)을 지원하는 Browser를 확인해보면 WebGL 1.0의 경우 모든 Browser에서 거의 제공되는 반면, WebGL 2.0이 출시되었음에도 아직까지 지원하지 않는 Browser가 꾀 있다. 특히, Apple의 Safari는 WebGL 2.0을 공식적으로 지원하지 않는다. (Safari에서 WebGL 2.0을 사용할 수는 있다.) 

WebGL은 OpenGL ES를 기반으로 하지만 OpenGL ES를 단순 porting하는 것으로 볼 수 있는데, 이는 Apple이 최신 ios에서 OpenGL을 지원하지 않기 때문에 어찌보면 WebGL 2.0을 지원하지 않는 것은 당연한 결과 일수도 있어 보인다. 개인적으로 4대 Browser라고 생각했던 Chrome, Safari, FireFox, Edge의 한가지인 Safari에서 WebGL 2.0을 지원하지 않는 것은 나에게 필요한 새로운 기능이 추가되었다고 하더라도 WebGL 2.0을 적용하는데 큰 걸림돌이 될 수 밖에 없어 보인다. 

그렇기 때문에 개인적으로 모든 Browser에서 동일한 3D 기술을 서비스 하기 위해서는 WebGL 1.0을 사용해야 할것으로 보인다. 그렇다고 천만년 WebGL 1.0을 사용해야 하는 것을 아닐 것이다. 아직 공식적으로 출시가 되지는 않았지만 새로운 Modern Graphics API인 WebGPU가 곧 출시될 예정이다. 사실 이제와서 WebGL 2.0을 지금 지원하는 것보다 향후 [WebGPU](https://gandis0713.github.io/2020/04/17/webgpu-intro/) 지원하는 방향을 고려하는 것이 현명한 판단이 될 수도 있다. 그리고 많은 Web Graphics API에서는 이미 WebGPU를 반영하고 있다. 

**Reference**
- https://www.khronos.org/registry/webgl/specs/latest/1.0/
- https://www.khronos.org/registry/webgl/specs/latest/2.0/
- https://caniuse.com/webgl
- https://caniuse.com/webgl2
- https://webgl2fundamentals.org/webgl/lessons/ko/webgl2-whats-new.html