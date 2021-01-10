---
layout: post
title: "<code>[Volume Rendering][기초][1]</code> <br> Volume 이란?"
subtitle: 'Volume 이란?'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Volume Rendering
  - WebGL
  - OpenGL
---

Volume Rendering은 간단히 말해 3차원 Volume을 2차원 화면에 표시를 해주는 것을 말한다. Volume Rendering에 알아보기 전에 Volume이 무엇인지 먼저 알아본다.


## **Volume이란?**
2차원 Image는 Pixel이라고 불리는 Data가 2차원 Array로 구성된 것을 말한다. Volume은 2차원에서 1차원이 확장된 형태이며, Voxel이라고 불리는 Data가 3차원 Array형태로 구성된 것을 말한다. 아래그림은 Volume을 나타내는 3차원 Array Data의 모습이다. 

| 3차원 Volume Array Data |
|:---:|
|![](/../../img/volume/volume-3d-array.png)

위 그림의 3차원 Array Data는 일반적으로 CT, MPI와 같이 우리가 일상생활에서 많이 활용되는 영상들을 구성하는데 많이 사용된다. 이런 영상들은 일정한 규칙이 있는 Data 구조로 구성되며 *3차원 Volume Array Data* 그림과 같이 격자(Grid)형태를 띄고 있다. 이런 격자형태의 3차원 Array Data는 3차원 Volume의 특성을 사용해 정의된다. 여기서는 격자형태의 3차원 Array가 어떤 특성으로 표현되는지만 확인하고, Volume을 구성하는 Data Type은 추후에 알아본다.

### **Volume의 특성**
 - Dimension
 - Spacing
 - Direction
 - Origin
 - Extent
 - (Bounds)

#### **Dimension**
3차원 Volume이 각각의 차원에 몇개의 Data들이 구성되어 있는지를 나타내며, Image의 2차원 Dimension과 Image들이 겹겹이 쌓여가는 차원을 더해 3차원 값으로 구성된다.

예 ) [10, 10, 10]

#### **Spacing**
Voxel들 사이의 간격을 의미한다. 

예 ) [0.5, 0.5, 0.5]

사실 Voxel은 공간상에서 크기를 가진 값은 아니다. *3차원 Volume Array Data* 그림에서 Volume의 3차원 모습을 보여주기 위해 Voxel을 육면체로 표현했지만 실제로는 Voxel은 0차원의 점이며, 0차원의 점은 실제로는 크기가 없기 때문에 표현을 할수 없다. 하지만 이러한 Voxel로 구성되어 있는 3차원 Volume을 표현하기 위해 Voxel을 3차원 육면체처럼 나타내었다. 이렇듯 일반적으로 Voxel도 크기가 있는 것처럼 간주되며 육면체의 형태를 이루고 있는 것처럼 표현하기도 하며, 이때 Spacing은 Voxel의 크기를 나타낼때 사용된다.

#### **Direction**
Volume의 공간 좌표계에서의 방향을 나타낸다. Volume은 3차원 Array Data로 구성되었기 때문에 Direction역시 3차원 Vector 3개로 각 차원의 방향을 나타낼 수 있으며 3x3 Matrix로 구성된다. 

예 ) [1, 0.5, 0, 0, -0.5, 1, 0, 0, 1]

#### **Origin**
공간좌표계에서 Volume의 시작위치를 나타낸다. Volume의 시작 Data의 Index 자표가 [0, 0, 0]이라면, 이 시작 Data의 위치가 Origin이 된다.

예 ) [20, 10, 10]

#### **Extent**
Volume Data의 범위를 나타낸다. 즉, Volume의 Dimension범위를 나타내며 초기 범위는 [0, Dimension[0] - 1, 0, Dimension[1] - 1, 0, Dimension[2] - 1]이 된다. Extent는 Volume의 Dimension 범위를 나타내기 때문에 최대값은 Dimension보다 클 수 없으며, 최소값은 0보다 작을 수 없다.

예 ) [0, 9, 0, 9, 0, 9]
#### **(Bounds)**
공간상의 좌표에서 Volume의 범위를 나타낸다. 이 값은 Extent에 공간상의 값인 Origin와 Voxel의 간격을 나타내는 Spacing으로 구할 수 있다.

예 ) [0, 5, 0, 5, 0, 5]

---

| 3D Volume Array Data in world coordinate |
|:---:|
|![](/../../img/volume/volume-3d-array-in-world.png)

우 그림은 Volume의 특성을 사용해 공간좌표계에서 *3차원 Volume Array Data*가 어떻게 표현되는지를 나타낸 그림이다.

