---
layout: post
title: "<code>[WebGPU]</code> <br> WebGPU Fundamentals - Internal Object"
subtitle: 'WebGPU Fundamentals - Internal Object'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGPU
  - Internal Object
---

### **Internal Object**
WebGPU는 GPU 동작의 근본적인 구현내용을 포함하고 있는 내부 개체(Internal Object)가 있다. [WebGPU](https://gpuweb.github.io/gpuweb/)에서는 '[내부 개체(Internal Object)](https://gpuweb.github.io/gpuweb/#webgpu-internal-objects)는 개념적으로 외부로 노출이 되지 않는 개체(Object)이며, GPU 동작의 근원이 되는 구현내용을 포함하고 있고, 각 API 개체의 상태를 추적할 수 있다.' 라고 설명하고 있다. 

우리가 대표적으로 사용하는 Web Browser들은 GPU 동작의 근원이 되는 WebGPU의 구현을 별도의 project에서 진행하고 있다. 

Google의 Chrome은 [Dawn](https://dawn.googlesource.com/dawn)에서 WebGPU의 기능을 구현하고 있으며, Apple의 Safari는 [Webkit](https://github.com/WebKit/WebKit)에서, Mozila의 FireFox는 [wgpu](https://github.com/gfx-rs/wgpu), [wgpu-native](https://github.com/gfx-rs/wgpu-native)에서 진행하고 있다.

각 Browser는 해당 프로젝트의 구현 내용을 Browser에서 직접 노출하지 않는다. 대신, 캡슐화된 내부 개체인 [WebGPU Interface](https://gpuweb.github.io/gpuweb/#webgpu-interfaces)를 통해 GPU 동작 및 상태에 접근 할 수 있다.


---

### **Reference**
 - https://gpuweb.github.io/gpuweb/#webgpu-internal-objects
 - https://gpuweb.github.io/gpuweb/#webgpu-interfaces
 
---

> 이 글은 [WebGPU](https://gpuweb.github.io/gpuweb/)에 정의된 Spec을 바탕으로 작성되었다. 이 글을 작성하는 시점에 [WebGPU](https://gpuweb.github.io/gpuweb/)는 Draft문서로 아직 공식적으로 Publish되지는 않았다. 따라서 이 글을 읽는 시점에 WebGPU의 Spec이 변경되었을 수 있다. 또한 잘못된 이해로 정확하지 않은 내용이 포함되어 있을 수 있다.