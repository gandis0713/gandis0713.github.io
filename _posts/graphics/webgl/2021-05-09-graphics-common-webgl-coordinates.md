---
layout: post
title: "<code>[3D Graphics]</code> <br> WebGL(OpenGL) Coordinate Systems"
subtitle: 'WebGL(OpenGL) Coordinate Systems'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGL
  - OpenGL
  - Coordinates
  - Transform
---

> 이 글은 WebGL의 Coordinate System에 대해 학습한 내용을 정리한 글이며, WebGL을 기준으로 작성되었으나 WebGL과 OpenGL의 Coordinate Systems은 동일하다. 

## **WebGL Coordinate Systems**
WebGL Coordinate System은 Vertex, Normal Vector와 같은 기하학적 데이터가 WebGL의 파이프라인에서 사용되는 각종 Coordinates를 거쳐 화면에 표시되는 과정을 의미한다. WebGL의 Coordinate System은 아래와 같이 5가지로 분류할 수 있으며 아래 Coordinates 들은 순서대로 진행된다.

 1. **Object Coordinates**
 2. **Eye Coordinates**
 3. **Clip Coordinates**
 4. **NDC(Normalized Device Coordinates)**
 5. **Window Coordinates**

 위 Coordinates System을 설명하기 위한 좋은 그림이 있어 아래 첨부하였다.

 ![](/../../img/graphics/coordinates/coordinate_systems_1.png)

---

### **1. Object Coordinates**
Object Coordinates는 객체의 Local Coordinates이며, 어떠한 변환도 적용되지 않은 상태이다.

### **2. Eye Coordinates**
Eye Coordinates는 ModelView Matrix를 사용하여 변환하는 것을 말하며, ModelView Matrix는 Model과 View Matrix의 조합으로 이루어져 있다. Model Matrix는 Object를 Local Coordinate에서 World Coordinates로 변환하며, View Matrix는 World Coordinates를 Eye Coordinates로 변환한다.

**View Matrix는 World Coordinates를 기준으로 정의되며, World Coordinates의 $\boldsymbol{[0, \;0, \;0]}$위치에서 $\boldsymbol{-z}$축을 바라보는 방향으로 Object를 변환하는 것이 View Matrix의 역할이다.** 

그렇기 때문에 View Matrix($M_{view}$)는 Translation Matrix($M_T$)과 Rotation Matrix($M_R$)로 구성되며, Translation Matrix는 Object을 이동시키는 역할을 하고 Rotation Matrix는 Object의 회전시키는 역할을 한다. 

Translation Matrix($M_T$)는 View(Camera)의 위치를 World Coordinates의 $[0, \;0, \;0]$으로 이동시키는 변환을 나타낸다. 예를 들어 View(Camera)가 $[1, \;1, \;1]$에 위치해 있다면, 이 Camera를 $[0, 0, 0]$으로 이동시킨다.

Rotation Matrix($M_R$)는 $[0, \;0, \;0]$에서 Camera가 $-z$축을 바라보도록 회전시키는 변환을 나타낸다. 예를 들어 Camera가 $[0, \;0, \;0]$에서 $x$축을 바라보고 있다면, $y$회전축으로 90도로 회전시켜 $-z$축을 바라보게 한다.

결국 View Matrix($M_{view}$)는 Translation Matrix($T_M$)를 먼저 적용하여 Camera를 $[0, \;0, \;0]$으로 이동시킨 후, Rotation Matrix($R_M$)를 적용하여 Camera가 $-z$축을 바라보게 하는 과정이다. 이 변환과정을 Object에 적용시키면 Eye Coordinates에서의 Object의 위치와 회전상태를 알 수 있다.

$$\Large M_{view}=M_R M_T$$

WebGL에는 별도의 View Matrix를 정의하고 있지 않다. 따라서 사용자가 View Matrix를 직접 정의해서 사용해야 한다. View Matrix는 우리가 흔히 사용하는 gl-matrix와 같은 라이브러리에서 lootAt API로 얻을 수 있다. View Matrix(lookAt API)에 대한 자세한 설명은 [OpenGL Camera](http://www.songho.ca/opengl/gl_camera.html#lookat)을 참고한다.


### **3. Clip Coordinates**
우리가 사용하는 모니터 화면은 2차원 표면이다. 3차원 Object를 2차원 모니터에 표시하기 위해서는 3차원 Object를 2차원 표면에 투영되어야 한다. 이 과정을 위해 사용되는 변환이 투영(Projection)변환이며, 투영변환과정에서 Eye Coordinates의 Object를 Clip Coordinates로 변환된다. 
투영 변환은 임의의 공간에 존재하는 Object를 화면으로 투명한다. 이때 임의의 공간을 클립 공간(Clip Space)이라고 하며, 클립 공간은 절두체(Frustum)으로 정의한다. 그리고 클립공간에서 투영변환이 이루어 지기 때문에 클립공간에 의해 Object는 잘리게 된다. 그렇기 때문에 Clip Coordinates라고 불린다.

클립공간에서 잘리게 되는 조건은 $\boldsymbol{-w'< x',\;y',\;z'< w}$ 이다. Eye Coordinate에서 $[x, \;y, \;z, \;w]$를 가진 vertex를 Projection Matrix로 연산 하면, $[x', \;y', \;z', \;w']$이 된다. 이때 $x', \;y', \;z'$이 $-w'\sim w'$사이에 값을 벗어날 경우 잘리게 된다. 

### **4. NDC(Normalized Device Coordinates)**
WebGL의 NDC의 범위는 $x,\;y,\;z$축 모두 -1.0 ~ 1.0 이다. 위의 Clip Coordinates에서 Projection Matrix 연산으로 구한 $[x', \;y', \;z', \;w']$의 vertex를 $[x'/w', \;y'/w', \;z'/w']$와 같이 $w'$로 나누어 주면 NDC 좌표로 변환된다.

> 우리가 투명변환에 사용하는 Projection Matrix는 WebGL의 NDC 범위인 -1.0 ~ 1.0을 기준으로 변환한다. 따라서 Projection Matrix로 구한 w'값으로 x', y', z'를 나누어 줄 경우 WebGL의 NDC 범위로 일반화 된다.

> NDC는 **왼손 좌표계**를 사용하지만, WebGL은 **오른손 좌표계**를 사용한다. 따라서 Projection Matrix는 **오른손 좌표계**의 클립 공간을 **왼손 좌표계**의 NDC 범위로 변환을 시킨다. 그리고 우리는 Projection Matrix를 생성할 때 parameter로 전달하는 [left, right, bottom, top, near, far]는 **왼손 좌표계**기준으로 전달한다.

### **5. Window Coordinates**
Window Coordinates$(wc)$는 NDC로 정규화된 좌표를 viewport API로 정의된 범위로 변환한다. viewport는 Screen의 왼쪽 하단이 기준점 $[0, 0]$이다. 

viewport를 정의하기 위해 전달받는 $(x,\;y,\;width,\;height)$를 parameter로 전달받으며, $x,\;y$ 는 Screen의 $x,\;y$ 위치이고 $width,\;height$ 는 $x,\;y$ 로부터의 넓이와 높이가 된다. 그리고 depth$(near,\;far)$에 대한 정의는 별도의 depthRange API로 정의를 한다. viewport와 depthRange로 window coordinate를 구하는 방법은 아래와 같다.

$$\large x_{wc}=\left(x+\frac{width}{2}\right)+\frac{width}{2}x_{ndc}$$

$$\large y_{wc}=\left(y+\frac{height}{2}\right)+\frac{height}{2}y_{ndc}$$

$$\large z_{wc}=\left(\frac{near+far}{2}\right)+\left(\frac{far-near}{2}\right)z_{ndc}$$

---

### **WebGL Coordinate Systems Diagram**

WebGL Coordinate Systems이 WebGL의 파이프라인의 어떤 부분의 적용되는지 알아보기 위한 그림이 있어 첨부하였다. 아래 그림은 OpenGL로 표시되었으나 WebGL과 동일하다.  

![](/../../img/graphics/coordinates/coordinate_systems_2.png)

위에서 설명한 WebGL의 coordiante systems은 Window Coordinates이 마지막 단계이다. 이 단계까지가 WebGL의 단계이고 위의 그림의 DC는 Window System에 속한다. 이는 Browser에서 화면을 표시해 주는 HTML Element로 비유할 수 있는데, HTML Element는 왼쪽 상단이 $[0, \;0]$ 기준점이 되고, $x$ 축은 오른쪽 방향을 향하고, $y$축은 아래방향을 향한다. 이는 WebGL의 viewport좌표와는 y축이 반대가 된다.

---

**Reference**
- http://www.songho.ca/opengl/gl_transform.html
- https://m.blog.naver.com/luku756/222056517453
