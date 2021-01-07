---
layout: post
title: "[WIP] Volume Rendering 기초 1"
subtitle: '3차원 Volume 이란?'
author: "Gandis"
header-style: text
hidden: true
tags:
  - Volume Rendering
  - WebGL
  - OpenGL
---

Volume Rendering은 간단히 말해 3차원 Volume을 2차원 화면에 표시를 해주는 것을 말한다. 


## **3차원 Volume이란?**
> 일반적으로 3차원 Volume은 여러 2차원 단면 Image들의 그룹으로 이루어져 있으며 CT, MPI와 같이 우리가 일상생활에서 많이 들어본 영상들의 Data를 말한다.
이런 영상들은 2차원 Scalar Type의 Image Data로 구성되어 있으며, 이 Image들은 정규화된 패턴구조로 이루어져 있다.

Pixel은 Image를 구성하는 하나의 Data 요소를 말하며, 3차원 Volume에서는 Voxel이라고 불린다. 마찬가지로 3차원 Volume Data인 Voxel도 정규화된 패턴구조로 이루어져 있다.

Image들의 그룹으로 이루어진 3차원 Volume이 정규화된 패턴구조를 이루기 위해서는 Image들이 겹겹으로 층을 이루고 있으며, 이 층들은 정해진 위치(origin)에서 일정한 방향(Direction)으로 쌓여 나간다.

3차원 Volume의 형태는 아래와 같다.
**[Picture 1]**
<figure>
	<img src="/../../img/volume/volume-3d-array.png">
</figure>

### **Volume의 특성**
Volume의 정규화된 패턴은 아래의 특성으로 구조를 파악할 수 있다.
 - Dimension
 - Spacing
 - Direction
 - Origin

#### **Dimension**
3차원 Volume이 각각의 차원에 몇개의 Data들이 구성되어 있는지를 나타내며, Image의 2차원 Dimension과 Image들이 겹겹이 쌓여가는 차원을 더해 3차원 값으로 구성된다.

예 ) [300, 300, 300]

#### **Spacing**
Voxel들 사이의 간격을 의미한다. 

예 ) [0.5, 0.5, 0.5]

사실 Voxel은 공간상에서 크기를 가진 값은 아니다. [Picture 1]에서 Volume의 3차원 모습을 보여주기 위해 Voxel을 육면체로 표현했지만 실제로는 Voxel은 0차원의 점이며, 0차원의 점은 실제로는 크기가 없기 때문에 표현을 할수 없다. 하지만 이러한 Voxel로 구성되어 있는 3차원 Volume을 표현하기 위해 Voxel을 3차원 육면체처럼 나타내었다. 이렇듯 일반적으로 Voxel도 크기가 있는 것처럼 간주되며 Spacing을 Voxel의 크기로 보기도 한다. (실제 3차원 Volume을 Rendering할 때 Voxel을 육면체로 보지 않는다.)

#### **Direction**
Volume의 3차원 방향을 의미하며, 이 방향은 공간 좌표계에서의 방향을 나타낸다.

예 ) [1, 0, 0, 0, 1, 0, 0, 0, 1]

Direction은 3차원 Vector 3개로 구성된 3x3 Matrix로 구성되며, 이 3개의 Vector로 Image의 2차원 Data와 Image들이 겹겹이 층을 이루는 방향이 결정된다.

#### **Origin**
공간좌표계에서 Volume의 시작위치를 나타낸다. Volume의 시작 Data의 Index 자표가 [0, 0, 0]이라면, 이 시작 Data의 위치가 된다.

예 ) [0, 0, 0]

#### **(Extent)**
Volume Data의 범위를 나타낸다. 즉, Volume의 Dimension범위를 나타내며 초기 범위는 [0, Dimension[0] - 1, 0, Dimension[1] - 1, 0, Dimension[2] - 1]이 된다.

예 ) [0, 299, 0, 299, 0, 299]
#### **(Bounds)**
공간상의 좌표에서 Volume의 범위를 나타낸다. 이 값은 Extent에 공간상의 값인 Origin와 Voxel의 간격을 나타내는 Spacing으로 구할 수 있다.

예 ) [0, 149.5, 0, 149.5, 0, 149.5,]


### **Volume의 Data Type**
TODO
### **Volume의 Data Range**
TODO

