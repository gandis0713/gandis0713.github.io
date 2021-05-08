---
layout: post
title: "<code>[3D Graphics]</code> <br> OpenGL(WebGL) 변환(Transform)"
subtitle: 'OpenGL(WebGL) 변환(Transform)'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGL
  - OpenGL
  - Transform
---

## **OpenGL(WebGL) 변환(Transform)**
OpenGL 변환은 Vertex, Normal Vector와 같은 기하학적 데이터가 OpenGL의 파이프라인을 거쳐 화면에 표시되는 데이터로 변환되는 과정을 의미한다. OpenGL의 변환과정은 아래와 같이 5가지로 분류할 수 있으며 아래 변환과정은 순서대로 진행된다.

 1. **Object Coordinates**
 2. **Eye Coordinates**
 3. **Clip Coordinates**
 4. **Normalized Device Coordinates**
 5. **Window Coordinates**

---

### **1. Object Coordinates**
Object Coordinates는 객체의 Local Coordinates이며, 어떠한 변환도 적용되지 않은 상태이다.

### **2. Eye Coordinates**
Eye Coordinates는 ModelView Matrix를 사용하여 변환하는 것을 말하며, ModelView Matrix는 Model과 View Matrix의 조합을 나타낸다. Model Matrix는 Object를 Local Coordinate에서 World Coordinates로 변환하는 단계이며, View Matrix는 World Coordinates를 Eye Coordinates로 변환하는 단계이다. 

**따라서 View Matrix는 World Coordinates를 기준으로 정의되며, World Coordinates의 [0, 0, 0]위치에서 -z축을 바라보는 방향으로 Object를 변환하는 것이 View Matrix의 역할이다.**

View Matrix는 Translation, Rotation 두개의 변환으로 구성되며, Translation변환은 Object을 이동시키는 역할을 하고 Rotation변환은 Object의 회전시키는 역할을 한다. 

Translation 변환은 View(Camera)의 위치를 World Coordinates의 [0, 0, 0]으로 이동시키는 변환을 나타낸다. 예를 들어 View(Camera)가 [1, 1, 1]에 위치해 있다면, 이 Camera를 [0, 0, 0]으로 이동시킨다.

Rotation 변환은 [0, 0, 0]에서 Camera가 바라보는 방향이 -z축이 되도록 회전시키는 변환을 나타낸다. 예를 들어 Camera가 [0, 0, 0]에서 x축을 바라보고 있다면, y회전축으로 90도로 회전시켜 -z축을 바라보게 한다.

결국 View Matrix(VM)는 Object에 Translation Matrix(TM)를 먼저 적용하고, Rotation Matrix(RM)를 적용한 결과가 된다.

~~~
VM = RM * TM
~~~

OpenGL에는 별도의 View Matrix를 정의하고 있지 않다. 따라서 사용자가 View Matrix를 직접 정의해서 사용해야 한다. View Matrix는 우리가 흔히 사용하는 glm, glMatrix와 같은 라이브러리에서 lootAt API로 얻을 수 있다. View Matrix(lookAt API)에 대한 자세한 설명은 [OpenGL Camera](http://www.songho.ca/opengl/gl_camera.html#lookat)을 참고한다.


### **3. Clip Coordinates**
우리가 사용하는 모니터 화면은 2차원 표면이다. 3차원 Object를 2차원 모니터에 표시하기 위해서는 3차원 Object를 2차원 표면에 투영되어야 한다. 이 과정을 위해 사용되는 변환이 투영(Projection)변환이며, 투영변환과정에서 Eye Coordinates의 Object를 Clip Coordinates로 변환된다. 그렇다고 투영변환이 Eye Coordinates를 Clip Coordinates로 변환하는 것이 아니다.

**투영변환은 Clipping과 Normalized Device Coordinate변환이 포함되어 있다.** 


### **4. Normalized Device Coordinates**

### **5. Window Coordinates**
---

**Reference**
- https://ganghee-lee.tistory.com/50
- https://www.kaggle.com/c/2020mltermproject3dclassification
- https://m.blog.naver.com/jyh0841/220486354290
- https://parksh86.tistory.com/168
- https://www.quora.com/What-is-the-difference-between-orthographic-and-perspective-projections-in-engineering-drawing
- https://opengl-notes.readthedocs.io/en/latest/topics/lighting/shading.html
- https://eu.wikipedia.org/wiki/Fitxategi:Texture%2BMapping.jpg
