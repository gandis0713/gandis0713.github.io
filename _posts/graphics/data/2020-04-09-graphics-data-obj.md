---
layout: post
title: "<code>[3D Model]</code> <br> OBJ geometry format"
subtitle: 'OBJ geometry format'
author: "Gandis"
header-style: text
hidden: false
tags:
  - Graphics
  - WebGL
  - OpenGL
  - Mesh
---
## **OBJ 란?**
3D 그래픽에서 기하학적인 데이터를 저장하는 포맷들은 STL, OBJ, FBX, DAE, 3DS, IGES, STEP, VRML/X3D, AMF 등 여러가지가 있다. OBJ는 이런 종류들중에 물체의 재질(Material)이나 질감(Texture)을 표현할 수 있는 정보를 포함하고 있어, 기하학적인 형태만을 표현하는 포맷들보다 좀더 자세하게 물체를 표현할 수 있다.

---
### **OBJ 파일 구성**
OBJ는 보통 3개의 파일로 구성이 된다. 

1. *.obj (*.mod)
2. *.mtl
3. *.bmp, jpg, png ..

*.obj는 ASCII 문자열 포맷이며, .mod는 Binary 포맷이다.*

***.obj**

obj파일은 폴리곤(Polygon)을 구성하는 정보뿐만아니라 재질, 질감의 대한 정보도 포함하고 있으며, 키워드로 각 정보들을 파악할 수 있다. 아래는 기본적으로 많이 사용되는 키워드만 정리하였다. obj파일의 자세한 내용은 [Object File](http://paulbourke.net/dataformats/obj/)를 참고한다.

- [v] - 4차원 vertex.

- [vn] - 3차원 vertex normal.

- [vt] - 3차원 texture vertex와 coordinates.

- [f] - 면(face)를 구성하는 정보.

- [mtllib] - 재질, 질감을 정의해 놓은 mtl 파일 정보.

- [usemtl] - mtl 파일에 정의된 재질 정보중에서 사용할 재질 정보. 

***.mtl**

mtl파일은 재질, 질감의 정보를 포함하고 있다. 여러 종류의 재질, 질감의 정보를 정의할 수 있고, 이 들중 하나를 선택해서 사용할 수 있다. 아래는 간단하게 재질을 표현하기 위한 키워드만 정리하였다. mtl파일의 자세한 정보는 [MTL File](http://paulbourke.net/dataformats/mtl/)를 참고한다.

- [newmtl] - 여러 종류의 재질들을 분리하기 위한 키워드.

- [Ka] - Ambient (RGB)

- [Kd] - Diffuse (RGB)

- [Ks] - Specular (RGB)

- [map_Kd] - Diffuse Texture Map

***.bmp...**

Polygon에 맴핑(Mapping)될 이미지 파일이다. bmp, jpg, png 등이 해당된다. 

---

### **OBJ 파일 사용법**
1. *.obj 파일을 파싱하여 다음의 정보를 얻는다.
- [v], [vt], [vn], [f]를 파싱해서 Polygon 정보를 얻는다. 
- [mtllib]으로 부터 mtl 파일의 정보를 얻는다. 
- [usemtl] 사용할 재질의 정보를 얻는다. 
3. *.mtl 파일을 파싱하여 재질 및 질감의 정보를 얻는다.
- [Ka], [Kd], [Ks]로 재질의 정보를 얻는다.
- [map_Kd]로 질감(Texture)의 정보를 얻는다.

---

**Reference**
 - http://paulbourke.net/dataformats/obj/
 - http://paulbourke.net/dataformats/mtl/
