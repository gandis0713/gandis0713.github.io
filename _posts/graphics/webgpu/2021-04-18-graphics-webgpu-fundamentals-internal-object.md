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
 WebGPU는 GPU 동작의 근원이 되는 구현내용을 포함하고 있는 내부 개체(Internal Object가 있다. [WebGPU](https://gpuweb.github.io/gpuweb/)에서는 '[내부 개체(Internal Object)](https://gpuweb.github.io/gpuweb/#webgpu-internal-objects)는 개념적으로 외부로 노출이 되지 않는 개체(Object)이며, GPU 동작의 근원이 되는 구현내용을 포함하고 있고, 각 API 개체의 상태를 추적할 수 있다.' 라고 설명하고 있다. 이런 내부 개체의 상태는 직접적으로 외부로 노출이 되지 않지만, [WebGPU Interface](https://gpuweb.github.io/gpuweb/#webgpu-interfaces)를 통해 상태를 변경하고 확인 할 수 있다. 

---

### **Reference**
 - https://gpuweb.github.io/gpuweb/#webgpu-internal-objects
 - https://gpuweb.github.io/gpuweb/#webgpu-interfaces
 
---

 > 이 글은 [WebGPU](https://gpuweb.github.io/gpuweb/)에 정의된 내용을 바탕으로 작성되었다. 현재(2021.10.15) [WebGPU](https://gpuweb.github.io/gpuweb/)는 Draft문서이며, 읽는 시점에 변경된 내용이 있을 수 있다. 또한 번역의 오류로 정확하지 않은 내용이 포함되어 있을 수 있다.