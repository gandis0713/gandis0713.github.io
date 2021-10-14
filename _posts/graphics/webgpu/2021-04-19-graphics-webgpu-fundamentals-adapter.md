---
layout: post
title: "<code>[WebGPU]</code> <br> WebGPU Fundamentals - Adapter"
subtitle: 'WebGPU Fundamentals - Adapter'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGPU
  - Adapter
---

### **Adapters**
 Adapter는 WebGPU의 두 가지 Core Internal Object(Adapter, Device)중 한 가지 이다. [Internal Object](https://gandis0713.github.io/2021/04/18/graphics-webgpu-fundamentals-internal-object/)의 내용을 확인해 보면 Internal Object는 'GPU 동작의 근원이 되는 구현내용을 포함하고 있다.'고 되어있다. Adapter는 Core Internal Object로 GPU 동작의 근원되는 구현내용중에 아래의 내용을 포함하고 있으며, 아래와 같은 역할을 담당하고 있다.
  - 브라우저의 기반이 되는 Platform(OS)에서 제공하는 컴퓨팅(computing), 렌더링(Rendering) 기능의 인스턴스(Instance)를 식별하고 접근한다.
  - 또한, 컴퓨팅, 렌더링 기능위에 WebGPU를 구현한 브라우저의 인스턴스를 식별하고 접근한다.

  즉, 각 OS(Apple, Linux, Windows)들은 GPU에 접근하기 위한 그래픽 API를 제공하는데, Adapter는 OS에서 제공하는 그래픽 API들을 식별하고, 해당 API들에 접근하는 역할을 한다.

---

### **Reference**
 - https://gpuweb.github.io/gpuweb/#adapters

---

> 이 글은 [WebGPU](https://gpuweb.github.io/gpuweb/)에 정의된 내용을 바탕으로 작성되었다. 현재(2021.10.15) [WebGPU](https://gpuweb.github.io/gpuweb/)는 Draft문서이며, 읽는 시점에 변경된 내용이 있을 수 있다. 또한 번역의 오류로 정확하지 않은 내용이 포함되어 있을 수 있다.