---
layout: post
title: "OpenGL 개발환경 (Ubuntu)"
subtitle: 'OpenGL 개발환경 (Ubuntu)'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Environment
---

OpenGL로 3D Graphics Engine을 개발하기 위한 환경을 구축하는 방법을 요약한다. OpenGL API를 호출할 수 있는 기본적인 환경만을 구성하는 것을 목표로 하고 GLU와 GLUT를 설치하는 것은 제외한다.


# 개발 환경
## OS
 - Ubuntu 18.04.3

## Graphics Card
 - GeForce GTX 1650


# 개발 환경 구축
## 1. Graphics Driver 설치
Graphics Driver를 설치하는 방법은 2가지가 있다.
 - Graphics Card 업체에서 제공하는 Proprietary graphics drivers 설치.
 - Open Source Graphics Driver 설치.
 
Proprietary graphics driver는 NVIDIA에서 제공하는 Graphics Driver를 설치하는 것이다. Proprietary graphics driver를 설치하기 위해서는 NVIDIA 홈페이지에서 자신의 Graphics Card에 맞는 Driver를 검색하여 설치하면 된다. GeForce GTX 1650은 435.21이 최신 버전의 드라이버로 검색된다. 설치는 직접 다운 받아 설치할 수 있으며, Package Manager를 이용해 CLI로 설치할 수 있다. CLI를 사용할 경우 아래같이 입력한다.

~~~
sudo apt-get install nvidia-driver-435
~~~

Open Source Graphics Driver는 [Nouveau](https://nouveau.freedesktop.org/wiki/)라 불리는 Mesa의 NVIDIA용 Driver가 있다. 

TOTO : Nouveau 설치 방법

Ubuntu에서는 'Software & Updates'를 사용해 설치할 Driver를 선택할 수 있다. 아래 그림은 'Software & Updates'창의 'Addtional Drivers' 탭이다. 화면에 보이는 'Proprietary' 항목들이 NVIDIA에서 제공하는 것이고 나머지는 Open Source이다.
<figure>
	<img src="/../../img/opengl_ubuntu/driver.png">
</figure>

## 2. GLEW 설치
GLEW는 'The OpenGL Extension Wrangler Library'의 약자이다. GLEW는 OpenGL의 Extension을 run-time에 ASCII 문자열로 쿼리해서 Function Pointer를 받아오는 cross-platform library이다. 사실 GLEW를 사용하지 않고 수동으로 OpenGL Extension의 Function Pointer를 run-time에 받아 올 수 있다. 사실 수동으로 불러오는 방법도 인터넷에서 많이 찾아 볼수 있다. 다만, 수동으로 지원하는 Extension을 확인하고 수동으로 불러오는 것이 만만치는 않다. 

GLEW를 사용하는 이유는, 기본적으로 OpenGL Function은 1.1 version에 정의되어있는 Function을 의미한다. gl.h은 OpenGL version 1.1에 정의된 header파일이며, version 1.1이후의 정의된 Function들은 Extention을 의미한다. 그렇기 때문에 gl.h함수를 include하여 사용할 경우는 버전 1.1에 해당하는 function들만 사용하는 것이며, 그 이후 버전의 function들을 사용하기 위해서는 glew.h를 include하거나, 수동으로 불러온 Extension함수들을 include하여 사용해야 한다.

GLEW를 설치하는 방법은 아래와 같다.

~~~
sudo apt-get install libglew-dev
~~~

### Reference
https://stackoverflow.com/questions/12383178/how-is-mesa-different-from-opengl-drivers
https://www.khronos.org/opengl/wiki/Load_OpenGL_Functions