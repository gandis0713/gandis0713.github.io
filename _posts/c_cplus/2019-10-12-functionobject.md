---
layout: post
title: "C++ 함수 객체(Function Object)"
subtitle: 'C++ 함수 객체(Function Object)'
author: "Gandis"
header-style: text
tags:
  - C
  - C++
---

함수 객체(Function Object)는 함수처럼 동작하는 객체로 Functor라고도 불린다. 함수 객체는 함수 호출 연산자인 ()를 class 또는 struct내부에서 오버로딩 한것이다.


### **함수 객체의 장점은 무엇인가?**
함수 객체의 장점은 아래의 두가지로 보인다.
#### 1. 인라인 함수로 만들 수 있다.
#### 2. 상태를 가질 수 있다.
인라인 함수에 대해서는 따로 언급을 하지는 않겠다. 

'상태를 가질 수 있다'는 함수포인터와 함수 객체의 가장 큰 차이점이라고 생각된다. 함수포인터의 함수 실행 결과는 전달받는 파라미터에 의존한다. 반면, 함수 객체는 함수 실행결과가 전달받는 파라미터는 매번 동일하더라도 결과가 다를 수 있다. 바로 함수 객체는 상태를 가질 수 있기 때문이다. 왜 그럴까? 

함수 객체는 class 또는 struct의 함수 호출 연산자 ()를 오버로딩 한것이라고 말했다. 함수 객체 자체가 class또는 struct 내부의 오버로딩 함수이기 때문에 멤버 변수를 오버로딩 함수 내에서 쓸 수 있다. 만약 함수 객체가 호출 될때 마다 멤버변수의 값이 변경된다면, 그 함수 결과는 매번 다르게 되는 것이다. 

### **함수 객체는 어디에, 왜 쓰이는가?**
우리는 라이브러리를 만들 때 범용성과 효율성을 고려해야 한다. 범용성은 사용성이 용이해야 하며, 효율성은 최적화가 잘 되어있어야 한다. 라이브러리에서 범용성을 높이기위한 한가지 방법으로 함수 포인터를 사용한다. 대표적인 예로 STL의 sort함수에서 함수 포인터를 사용할 수 있다. 하지만 함수 포인터를 사용하게 되면, 함수 포인터를 호출 할때 Jumping(Jmp) 오버헤드가 발생하게 된다. 

아래는 함수 포인터를 사용한 코드를 Disassemlby한 결과이다.

#### **Code**
~~~cpp
bool cmpfunc(int a, int b)
{
    return a < b;
}

template<typename T>
bool docomp(int a, int b, T func)
{
    return func(a, b);
}

void main()
{
    docomp(1, 2, cmpfunc);
}
~~~

#### **Disassembly**
~~~
??$docomp@P6A_NHH@Z@@YA_NHHP6A_NHH@Z@Z (bool __cdecl docomp<bool (__cdecl*)(int,int)>(int,int,bool (__cdecl*)(int,int))):
  0000000000000000: 49 FF E0           jmp         r8

?cmpfunc@@YA_NHH@Z (bool __cdecl cmpfunc(int,int)):
  0000000000000000: 3B CA              cmp         ecx,edx
  0000000000000002: 0F 9C C0           setl        al
  0000000000000005: C3                 ret

main:
  0000000000000000: 33 C0              xor         eax,eax
  0000000000000002: C3                 ret
~~~
위 코드에서 보는것과 같이 docomp함수에서 func함수를 호출 할 때, Jumping(jmp) 오버헤드가 발생되는 것을 확인 할 수 있다. 만약 docomp 함수를 인라인 함수로 만들면 docomp 함수 내용이 caller 함수 본체로 대체되기 때문에 Jumping 오버헤드를 피할 수 있다. 

아래는 docomp 함수를 inline 함수로 변경하고 disassembly한 결과이다. Jumping 오버헤드를 피할 수 있는 것이 확인된다.

#### **Code**
~~~cpp
...

template<typename T>
inline bool docomp(int a, int b, T func)
{
    return func(a, b);
}

...
~~~

#### **Disassembly**
~~~
?cmpfunc@@YA_NHH@Z (bool __cdecl cmpfunc(int,int)):
  0000000000000000: 3B CA              cmp         ecx,edx
  0000000000000002: 0F 9C C0           setl        al
  0000000000000005: C3                 ret

main:
  0000000000000000: 33 C0              xor         eax,eax
  0000000000000002: C3                 ret
~~~

하지만 우리가 주로 사용하는 STL의 함수 중 함수포인터를 인자로 받는 함수의 대부분 inline 함수로 되어있지 않다. 이럴 경우에 함수 포인터를 사용하면 오버헤드를 피할수가 없는데, 이때 함수 객체를 사용하면 오버헤드를 피할 수 있다. STL의 함수들은 대부분 함수 포인터와 함수 객체를 둘 다 사용할 수 있다. (다 확인 안해봐서 아닐 수도 있다.) 

그러면 STL의 sort함수에 함수포인터와 함수객체를 사용해서 sorting을 해보고 실행 시간을 비교해 보자.

#### **Code**
~~~cpp
#include <iostream>
#include <algorithm>
#include <Windows.h>

using namespace std;

class cmpclass
{
public:
    inline bool operator()(int a, int b)
    {
        return a < b;
    }
};


bool cmpfunc(int a, int b)
{
    return a < b;
}

int main()
{
    const int SIZE = 50000000;
    int *num1 = new int[SIZE];
    int *num2 = new int[SIZE];

    for(int i = 0; i < SIZE; i++)
    {
        num1[i] = rand();
        num2[i] = num1[i];
    }

    cmpclass cmpc;

    int time = GetTickCount64();

    sort(num1, num1 + SIZE, cmpc); // Use function object.

    time = GetTickCount64() - time;

    cout << "Function Object : " << time << endl;

    time = GetTickCount64();

    sort(num2, num2 + SIZE, cmpfunc); // Use function pointer.

    time = GetTickCount64() - time;

    cout << "Function Pointer : " << time << endl;

    return 0;
}
~~~

~~~
Function Object : 3526
Function Pointer : 5116
~~~

위 결과값을 보면 함수 포인터보다 함수 객체를 사용했을 때 더 빠른 sort결과를 얻는 것을 확인 할 수 있다. 바로 함수 객체는 오버헤드가 발생되지 않기 때문이다.


마지막으로 함수 객체를 사용 하였을 때, Jumping 오버헤드가 발생되지 않는지 확인해 보자. 
아래는 함수 객체를 사용한 코드를 Disassembly한 결과 이다.

#### **Code**
~~~cpp
class cmpclass
{
public:
    inline bool operator()(int a, int b)
    {
        return a < b;
    }
};

template<typename T>
bool docomp(int a, int b, T func)
{
    return func(a, b);
}

void main()
{
    cmpclass cmpc;
    docomp(1, 2, cmpc);
}
~~~

#### **Disassembly**
~~~
??$docomp@Vcmpclass@@@@YA_NHHVcmpclass@@@Z (bool __cdecl docomp<class cmpclass>(int,int,class cmpclass)):
  0000000000000000: 3B CA              cmp         ecx,edx
  0000000000000002: 0F 9C C0           setl        al
  0000000000000005: C3                 ret

main:
  0000000000000000: 33 C0              xor         eax,eax
  0000000000000002: C3                 ret
~~~

Jumping 오버헤드가 발생되지 않는다. 끝!