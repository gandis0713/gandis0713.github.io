---
layout: post
title: "C/C++에서 global 함수 및 변수, 그리고 extern에 대해."
subtitle: 'C/C++에서 global 함수 및 변수, 그리고 extern에 대해.'
author: "Gandis"
header-style: text
tags:
  - C
  - C++
---

C/C++로 개발을 하다보면 C Style의 global 함수 및 변수를 사용할 때가 있다. 하지만 이것들이 어떻게 정의되고 선언되어야 하는지도 제대로 모르고 써왔다. 지금까지 문제가 없었던게 참 신기할 정도이다. 아니면, 지금까지 문제가 발견되지 않았을 수도 있다. 앞으로 계속 global 함수 및 변수를 자주 사용하게 될텐데 더 이상 주먹구구 식으로 개발해서는 안될것 같다. 그래서 이번 기회에 이것들이 무엇인지 제대로 알아보고자 한다.

### **global 함수 및 변수**
global함수 및 변수는 해당 함수와 변수를 사용하고자 하는 내부 및 외부파일에서 모두 사용할 수 있으며, 프로그램이 시작될 때 생성되고 프로그램이 종료될 때 소멸된다.  

### **global 함수**
global 함수는 global 함수가 선언된 파일을 외부파일에서 include하여 사용할 수 있으며, 일반적으로 global 함수는 다음과 같이 선언하고 사용한다.

**define.h**
~~~cpp
#ifndef DEFINE_H
#define DEFINE_H

int get_number();

#endif
~~~

**define.cpp**
~~~cpp
#include "define.h"
#include <iostream>

int get_number()
{
    return 10;
}
~~~

**main.cpp**
~~~cpp
#include <iostream>
#include "define.h"

int main()
{
    get_number();
    return 0;
}
~~~
**Commands for compile and linking**
~~~
g++ -c define.cpp
g++ -c main.cpp
g++ -o main define.o main.o
~~~
main함수가 해당 source코드의 시작점이다. 'get_number'이라는 함수는 define.h에 선언하고, define.cpp에 정의를 한 다음, main.cpp에서 define.h를 include해서 'get_number' 함수를 호출하는 형태이다. global 함수는 위와같이 header파일에 선언을 하고, source 파일에서 정의를 한 다음 global함수를 사용하고 싶은 곳에서 header를 include해서 사용하면 된다. 그리고 cpp파일을 compile하여 기계어로 작성된 object파일을 생성하고, 각 object파일을 linking하여 최종적으로 실행파일을 만든다.

### **global 변수**
global 함수와 마찬가지로 global 변수도 위와 같은 방법으로 사용할 수 있을까? global 함수와 마찬가지로 global 변수를 추가해 보자.

**define.h**
~~~cpp
#ifndef DEFINE_H
#define DEFINE_H

int g_number;
int get_number();

#endif
~~~

**define.cpp**
~~~cpp
#include "define.h"
#include <iostream>

int get_number()
{
    return g_number;
}
~~~

**main.cpp**
~~~cpp
#include <iostream>
#include "define.h"

int main()
{
    get_number();
    return 0;
}
~~~
define.h에 global 변수 'g_number'를 추가하였다. 그리고 define.cpp의 'get_number'함수에서 'g_number'변수를 반환하도록 수정하였다. 이 코드는 과연 정상적으로 build가 될까? 아마 최종 실행파일을 만드는 과정에서 아래와 같은 link error가 발생될 것이다.
~~~
main.o:(.bss+0x0): multiple definition of `g_number'
define.o:(.bss+0x0): first defined here
collect2: error: ld returned 1 exit status
~~~
위에서 linker가 뱉어낸 error는 'g_number'변수가 중복으로 정의되고 있음을 나타낸다. 그런데 global 함수에서는 발생되지 않는 error가 왜 발생되는 것일까? 

우선 global 함수의 경우는 header파일에 선언을 하고, source 파일에서 정의를 하였다. 반면, global 변수는 header파일에 추가만 하였다. 그러면 header파일의 global 변수는 선언과 정의가 함께 된 것일까? 

정답은 '맞다'이다. 우리가 위와 같이 global 변수를 선언하면 선언과 동시에 정의가 된다. 다만, 변수의 초기화가 되지 않았을 뿐이다. 그런데 왜 error가 발생되는 것일까?

위의 코드에서는 global 변수가 있는 define.h을 main.cpp와 define.cpp에서 include하고 있다. 바로 두개의 source파일에서 define.h를 include하고 있기 때문에 'g_number'가 중복으로 정의가 되었다는 error가 발생되는 것이다. 
그렇다면 선언은 중복이 허용되는가? 아래의 코드를 봐보자.
~~~cpp
#ifndef DEFINE_H
#define DEFINE_H

int g_number;
int g_number;
int get_number();

#endif
~~~
위 코드는 define.h에 g_number 변수를 중복으로 선언 및 정의를 하고 define.cpp를 compile하였다. 결과는 아래와 같은 error가 발생된다.
~~~cpp
define.h:5:5: error: redefinition of ‘int g_number’
 int g_number;
     ^~~~~~~~
define.h:4:5: note: ‘int g_number’ previously declared here
 int g_number;
     ^~~~~~~~
~~~
위 compile결과를 보면, 중복으로 정의한 내용은 error를 발생시키지만, 중복으로 선언한 경우는 error는 발생되지 않는다. 단순히 중복 선언을 알려주기만 할 뿐이다. 
그렇다면 global 함수와 마찬가지로 global 변수도 header파일에서 선언만하고, cpp파일에서 정의하는 방법을 알아보자.


### **extern 키워드**
'extern' 키워드는 함수 및 변수의 visibility를 확장하기 위해 사용된다고 한다 ([링크](https://www.geeksforgeeks.org/understanding-extern-keyword-in-c/)). 여기서 말하는 visibility가 정확히 어떠한 의미인지는 모르겠다. 하지만 'extern' 키워드를 함수 및 변수에 적용할 경우 외부에서 이것들을 사용할 수 있다. 이것이 visibility 화장을 의미하는 것으로 추측된다.

위 의미라면 define.h의 g_number는 외부에서 사용할 수 있는 global 변수가 아니었을까? 사실 g_number를 사용하기 위해 여러파일에서 define.h를 include할 경우, 중복으로 정의되었다는 error가 발생된다. 위 상황으로 봐서 g_number는 global 변수라고 말하기에는 무리가 있어 보인다. 

그렇다면 g_number 변수에 extern을 적용하면 어떻게 되는가? g_number 변수는 선언만을 하게 된다. extern이 없을 경우에는 선언과 동시에 정의가 되었지만, extern를 적용하면 선언만을 하게 된다. 따라서 아래와 같이 extern을 추가하고 build할 경우 link시 g_number가 정의되지 않았다는 error가 발생된다.
~~~cpp
#ifndef DEFINE_H
#define DEFINE_H

extern int g_number;
int get_number();

#endif
~~~
~~~
define.o: In function `get_number()':
define.cpp:(.text+0x6): undefined reference to `g_number'
collect2: error: ld returned 1 exit status
~~~
따라서 선언 이후에 정의를 하기 위해서는 extern 키워드를 제외한 g_number를 선언/정의를 해주면 된다. 아래와 같이 source파일에 g_number를 정의해주면 정상적으로 build가 된다.
~~~cpp
#include "define.h"

int g_number = 0;
int get_number()
{
    return g_number;
}
~~~

참고로 아래와 같이 extern이 적용된 변수를 선언함과 동시에 초기화 할 수 있다. 변수가 초기화가 되는 것은 정의가 된 것으로 간주할 수 있다. 그 이유는 선언시에는 해당 변수의 메모리가 allocated되지 않는다. 정의시에 메모리가 allocated된다. 그렇기 때문에 변수가 초기화 되었다는 것은 memory가 allocated된 것이므로 정의가 된것으로 간주 할 수 있다. 따라서 아래와 같은 방법으로 선언과 정의를 동시에 할 수 있다.
~~~cpp
#ifndef DEFINE_H
#define DEFINE_H

extern int g_number = 0;
int get_number();

#endif
~~~
하지만, header파일에서 위와 같이 초기화를 할 경우 정의가 된 변수로 간주되므로, 해당 header를 include하면 중복 정의 error가 발생될 것이다.

마지막으로 함수는 extern을 적용하지 않아도 잘 사용할 수 있었다. 함수는 default로 extern 키워드가 적용되고 있었기 때문이다. extern를 사용자가 직접 추가하지 않아도 기본적으로 적용되고 있는 것이다. 그렇기 때문에 사용자가 직접 'extern'을 선언/정의부에 추가할 경우 중복으로 extern이 적용된다. 반면, 변수는 기본적으로 extern이 적용되지 않는다.

### **요약**
**- 선언은 중복이 허용되지만, 정의는 허용되지 않는다.**
**- extern 키워드는 함수 및 변수의 visibility를 확장 시킨다.**
**- 변수에 extern 키워드를 적용하면, 변수를 선언만 하는 것이 된다. (정의 X)**
**- 함수에는 기본적으로 extern 키워드가 적용된다. 사용자가 extern 키워드를 추가할 경우 중복 적용된다.**
**- 변수에 extern 키워드 적용과 동시에 초기화를 진행하면 정의가 된 것으로 간주한다.**


**reference**
 - https://www.geeksforgeeks.org/understanding-extern-keyword-in-c/