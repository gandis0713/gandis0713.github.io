---
layout: post
title: "<code>[WebGPU]</code> <br> WebGPU 소개"
subtitle: 'WebGPU 소개'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGPU
  - WebGL
---
## **WebGPU**
WebGPU는 WebGL를 대체할 미래의 Web Grpahics API로 Google, Apple, Microsoft, Mozila 등으로 이루어진 [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)의 [GPU for the Web](https://www.w3.org/community/gpu/) Community Group에서 WebGPU의 Spec을 논의하며 정의하고 있다. (아직 공식적으로 출시가 되지는 않았다.- 2021년 04월 17일 기준)

---

### **WebGL**
WebGL은 Web browser에서 3D 기술을 적용하기 위한 Web Graphics Library이다. WebGL은 HTML5가 출시되면서 본격적으로 사용되었으며, HTML5가 출시 되기 전에는 별도의 plug-in(Flash, SilverLight)을 browser에 설치해 사용했다. HTML5가 출시 된 이후에는 별도의 plug-in 설치 없이 browser에서 3D 기술을 적용할 수 있게 되었다.

WebGL은 OpenGL ES 2.0을 기반(WebGL2는 OpenGL ES 3.0기반)으로 정의되어 있다. 이는 PC, Mobile에서 사용하는 browser에서 모두 사용하기 위함이다. 그렇다고 OpenGL ES에 정의된 모든 API를 사용할 수 있는 것은 아니다. OpenGL ES를 기반으로 WebGL이 새롭게 정의되어 있다. 물론 OpenGL ES와 대부분 비슷하다.

WebGL API는 HTML5에서 제공하는 Canvas Element를 통해 접근할 수 있다. WebGL을 사용하는 방법과 관련된 정보는 인터넷에 많이 찾아 볼 수 있다.

---

### **WebGL 현황**
현재 Web에서 동작하는 많은 3D Rendering은 아직도 WebGL을 많이 사용하고 있다. 그리고 Khronos Group은 OpenGL ES 3.0기반의 WebGL2를 2013년 부터 개발하기 시작하여 2017년 1월 출시를 하였다. 하지만 WebGL2가 발표된지 4년이 지난 현재, Apple은 공식적으로 WebGL2를 지원하지 않는다. (현재 WebGL은 지원하고 있으며, 실험적으로 WebGL2를 사용할 수도 있다.) 대신 2014년 출시한 Metal를 사용하고 있다. 

그렇다고 많은 browser가 WebGL2를 지원하지 않는 것은 아니다. 애플은 자체 Graphics API인 Metal를 적극 사용하기 위해 WebGL2를 지원하지는 않지만, 여전히 많은 browser들이 WebGL2를 지원한다. 각 browser의 WebGL2 지원여부는 [WebGL2 Support](https://caniuse.com/webgl2)에서 확인 할 수 있다.

---

### **WebGPU의 탄생**
WebGPU는 2016년 6월 WebGL Working Group에서 WebGL을 대체할 새로운 API라는 주제로 Google에 의해 최초로 아이디어가 제시되었다. 이후 2017년 W3C에 [GPU for the Web](https://www.w3.org/community/gpu/)이 출범하면서 공식적으로 논의가 시작되었고, 2018년 6년, Google의 chrome팀은 WebGPU 표준을 구현하겠다고 발표하였다.

---

### **WebGPU 현황**
WebGPU의 표준은 [gpuweb](https://github.com/gpuweb/gpuweb) Github Repository에서 정의되고 있다.
 - [WebGPU specification](https://gpuweb.github.io/gpuweb/)
 - [WGSL specification](https://gpuweb.github.io/gpuweb/wgsl/)

---

**Reference**
 - https://en.wikipedia.org/wiki/WebGPU
 - https://en.wikipedia.org/wiki/WebGL
