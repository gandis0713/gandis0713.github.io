---
layout: post
title: "<code>[3D Graphics][기초][1]</code> <br> 3차원 컴퓨터 그래픽(3D Computer Graphics)란?"
subtitle: '3차원 컴퓨터 그래픽(3D Computer Graphics)란?'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGL
  - OpenGL
---
## **3차원 컴퓨터 그래픽(3D Computer Graphics)**

3차원 컴퓨터 그래픽은 간단히 말해 일상생활에 존재하는 3차원 물체를 2차원으로 표현하는 과정을 말한다. 즉, 3차원 공간좌표계에 존재하는 물체를 Computer에서 사용하는 데이터로 만들고, 모니터로 출력하는 과정을 말한다. 사실 3차원 물체를 2차원적으로 표현하는 것은 매우 복잡한 과정으로 이루어져 있다. 하지만 크게 분류해 보면 **3차원 모델링**과 **3차원 렌더링** 두가지로 분류할 수 있다.

---
### **3차원 모델링**
3차원 모델은 어떠한 물체를 컴퓨터 그래픽에서 사용할 수 있는 데이터로 구성하는 것을 말한다.

일반적으로 표현할 수 있는 기본적인 형태(Primitive)로는 0차원의 점, 1차원의 선, 2차원의 면이 있으며, 2차원의 면으로 이루어진 3차원 폴리곤(Polygon)이 있다. 보통 물체를 표현하기 위해서는 폴리곤(Polygon)을 사용하며, 폴리곤은 아래의 Polygon [1]그림과 같이 삼각형 또는 사각형들로 구성되어 있다.

 | Polygon [1] | Polygon [2] |
 |:---:|:---:|
 |![](/../../img/graphics/polygon-1.png) | ![](/../../img/graphics/polygon-2.png) |

이런 폴리곤은 삼각형 또는 사각형의 면적이 작고 많은 수록 더욱 정밀하게 물체를 표현할 수 있다. 위의 Polygon [2]는 Polygon [1]보다 Polygon을 구성하는 삼각형을 육안으로 확인하기 힘들정도로 매우 작게만들었다. Polygon [1]에서는 어떤 형태인지 알아보기 힘들었지만 Polygon [2]는 어떤 물체를 나타내는지 확인하기 쉽다. Polygon [2]처럼 물체를 정확하게 표현하기 위해서는 3차원 모델을 구성하는 삼각형의 양이 많이지게 되고 따라서 데이터는 커지게 된다. 

이런 3차원 모델은 사람이 직접 모델링 도구를 사용해 직접 데이터를 제작하기로 하지만, 기계를 사용해 물체를 스캐닝하여 폴리곤을 생성해 내기도 한다.일반적으로 게임에서 사용하는 모델은 이러한 폴리곤 형태의 데이터를 사용한다. 최근에는 수많은 점들로 물체를 표현하는 [포인트 클라우드(Point Cloud)](https://ko.wikipedia.org/wiki/%EC%A0%90%EA%B5%AC%EB%A6%84)형태도 있다.

아래의 Point Cloud그림은 수많은 포인트로 토끼의 형상을 나타낸 것이다.


 | Point Cloud | Point to Polygon |
 |:---:|:---:|
 |![](/../../img/graphics/pointcloud-1.png) | ![](/../../img/graphics/pointcloud-2.png) |

보통 Point Cloud는 스캐닝 방식으로 물체의 외각의 형태를 포인트 데이터로 얻으며, 물체를 표현하기위해 수많은 포인트를 그대로 화면에 표시하기도 한다. 반면, 각각의 Point를 삼각형 또는 사각형형태로 연결하여 Polygon으로 재구성한다음 사용하기도 한다. 위의 Point to Polygon그림은 Point Cloud의 토끼 형상을 Polygon으로 재구성한 모습이다.

이 외에 의료분야에서는 폴리곤처럼 외부형태만 존재하는 데이터를 사용하기는 힘들다. CT, MRI같이 사람몸의 내부를 관찰하기 위한 데이터는 몸안의 데이터가 필요하다. 이럴 때는 3차원 Volume으로 데이터를 구성해 사람내부의 데이터를 유지할 수 있도록 한다. 아래의 그림은 3차원 Volume(CT)를 Rendering한 모습으로 사람얼굴 내부에 있는 뼈를 관찰 할 수 있다.

![](/../../img/graphics/volume.jpg)

---
### **3차원 렌더링**
3차원 렌더링은 모델링으로 얻어진 3차원 데이터를 2차원 화면에 표현하는 과정을 말한다. 3차원 렌더링 과정을 렌더링 파이프라인(Rendering Pipeline)이라고 불리며, 크게 다섯가지 단계로 분류 될 수 있습니다.

**렌더링 파이프라인(Rendering Pipeline)**
1. 투영(Projection)
2. 클리핑(Clipping)
3. 은면처리(Hidden Surface)
4. 맵핑(Mapping)과 쉐이딩(Shading)

#### **투영(Projection)**
일반적으로 투영은 아래그림과 같이 3차원 물체를 2차원 평면에 맵핑시키는 것을 말한다.
![](/../../img/graphics/projection-1.png)

투영의 종류는 크게 평행투영(Parallel Projection)과 원근투영(Perspective Projection)으로 분류된다. 

평행투영(Parallel Projection)은 다시 직각투영(Orthographic Projection), 등축 투영(Axonometric Projection), 경사 투영(Oblique Projection)으로 나뉜다. 이중 직각투영(Orthographic Projection)은 3차원에서 2차원으로 변환하는 과정에 간단하기 때문에 가장 많이 사용되기도 한다. 따라서 평행투영과 원근투영 두가지로 분류된 경우는 직각투영(Orthographic Projection)과 원근투영(Perspective Projection)을 의미하는 경우가 대부분이다.

아래는 평행투영과 원근투영을 나타낸 그림이다.
![](/../../img/graphics/projection-2.png)
#### **클리핑(Clipping)**
3차원 물체를 2차원 평면에 투영할 때, 모든 3차원 물체가 2차원 평면에 투영되지는 않는다. 우리눈을 생각해보면, 눈에는 시야각안에 들어오는 물체들만 보이게 된다. 마찬가지로 클리핑으로 화면에 보여지는 영역을 결정하게 된다. 아래 그림을 보면 클리핑으로 인해 삼각형이 잘린 모습이다. 빨강색으로 보이는 클리핑 영역에 포함되지 않아 보이지 않으며, 녹색부분만 화면에 맺히게 된다.
![](/../../img/graphics/clipping.png)

#### **은면처리(Hidden Surface)**
은면처리는 2차원 평면에 표시를 할 때, 보이지 않는 부분을 제거하는 과정을 나타낸다. 보이지 않는 부분을 제거함으로써 불필요한 연산을 줄일 수 있습니다.
아래의 오른쪽그림은 은면처리를 한 결과를 2차원 평면에서 관찰한 모습이다. 우리가 모니터로 볼때의 모습으로 실제 주전자의 뒷면이 없어도 전혀 눈치를 챌 수가 없다. 반면 왼쪽 그림과 같이 실제로는 은면처리로 주전자의 뒷면이 없는 것을 확인 할 수 있다.

|:---:|:---:|
|![](/../../img/graphics/hiddensurface-1.png) | ![](/../../img/graphics/hiddensurface-2.png) |

#### **쉐이딩(Shading)과 맵핑(Mapping)**
**쉐이딩**과 **맵핑**과정을 따로 보는경우도 있지만 서로 밀접한 관련이 있기 때문에 하나의 과정으로 나타내었다. 

**쉐이딩**은 물체를 실제와 유사하게 표현하기 위한 기능을 말한다. 일반적으로 물체의 색깔 만으로는 3차원 물체를 입체적으로 표현을 할 수가 없다. 우리가 눈으로 물체를 구별할 수 있는 이유는 간단히 말해 조명이 물체를 비추고(입사광), 조명이 물체와의 상호작용을 통해 우리눈으로 들어온 빛(반사광)의 결과로 우리는 물체를 식별할 수가 있다. 하지만 이 과정은 컴퓨터로 계산하기 힘든 매우 복잡한 과정을 거친다. 그래서 대부분 물체를 실체와 유사하게 표현할 수 있으면서 복잡하지 않은 계산 방식을 사용하고 있으며, 조명의 위치, 밝기 그리고 물체의 기울기, 색깔, 질감 등을 고려하여 물체를 표현한다. 

쉐이딩종류는 매우 많지만 대표적으로 사용되는 쉐이딩 기법은 아래와 같다.

- **플랫 쉐이딩(Flat Shading)**
- **퐁 쉐이딩(Fhong Shading)**
- **고러드 쉐이딩(Gouraud Dhading)**

아래는 구체(Sphere)에 위의 3가지 쉐이딩 기법을 적용한 결과이다.
![](/../../img/graphics/shading.png)

**맵핑**은 보통 텍스처(Texture)를 사용하여 3차원 물체에 맵핑하는 과정으로, 3차원 모델에 Texture를 입힘으로써 보다 사실적으로 표현할 수 있게 된다. 아래 그림은 3차원 모델에 텍스처를 입힌 모습이다.
![](/../../img/graphics/texture-mapping.png)
단순한 구체에 텍스처를 맵핑하여 지구의 형상을 사실감있게 나타낼 수 있게되었다.

위의 맵핑과정을 보면 구체와 지구 모두 쉐이딩 효과가 들어간 것을 볼수가 있다. **맵핑**과 **쉐이딩**을 하나의 과정으로 나타낸 이유가 바로 3차원 물체에 텍스처를 입힐 때 일반적으로 텍스처의 색상정보와 조명정보를 사용해 쉐이딩효과를 적용하기 때문이다. 또한 여기서는 구체에 텍스처를 입히는 맵핑과정만을 나타내었지만, 노말맵핑(Normal Mapping), 환경맵핑(Environment Mapping) 등의 맵핑도 있으며 이 역시 쉐이딩과정과 땔수 없는 관계이다.


**Reference**
- https://ganghee-lee.tistory.com/50
- https://www.kaggle.com/c/2020mltermproject3dclassification
- https://m.blog.naver.com/jyh0841/220486354290
- https://parksh86.tistory.com/168
- https://www.quora.com/What-is-the-difference-between-orthographic-and-perspective-projections-in-engineering-drawing
- https://opengl-notes.readthedocs.io/en/latest/topics/lighting/shading.html
- https://eu.wikipedia.org/wiki/Fitxategi:Texture%2BMapping.jpg
