---
layout: post
title: "C++ 람다(Lambda)"
subtitle: 'C++ 람다(Lambda)'
author: "Gandis"
header-style: text
tags:
  - C
  - C++
---

## **람다(Lambda)**
람다(Lambda)는 프로그래밍 언어에서 익명 함수(Anomymous Functions)를 나타낸다. 즉, 람다의 성질은 함수 객체(Functor)와 동일하지만 몸체가 없는 이름 없는 함수이다.

### **람다 문법**
~~~cpp
[&](int a) -> bool { std::cout << "test" << std::endl; return true; }(10);
~~~
~~~
[captures](parameters) -> return type { body }(values of parameters)
~~~

**1. captures**
- captures는 외부 변수를 사용하기 위함이다. 람다 함수 블럭 외부에 있는 변수를 사용하기 위해 =, &를 사용해 변수를 복사 또는 참조 할 수 있다. 바로 capture를 이용해 상태를 저장할 수 있다.

**2. parameters**
- parameters는 전달할 parameter type을 정의한다.

**3. return type**
- 함수의 return type을 정의하는 것과 동일하다.

**4. body**
- 함수의 logic이 구현되는 곳이다. 실제 함수의 기능을 실행하는 코드가 구현된다.

**5. values of parameters**
- 실제로 람다 함수에 전달할 파라미터 값을 넣는 부분이다. 

### **람다는 왜 사용되는가?**
람다는 아래의 장점을 가지고 있다.
- 함수를 인라인화 할 수 있다.
- 상태를 가질 수 있다.

우리가 일반적으로 사용하는 함수 포인터는 인라인 함수는 될 수 있지만, 상태를 가질 수 없었다. 반면, [함수 객체(Functor)]({{site.url}}/2019/10/12/functor)는 인라인 함수로도 만들 수 있고, 상태를 가질 수도 있었다. 그러면 함수 객체를 쓰면 되지 왜 람다를 사용하는가?

함수 객체를 사용하면 class 또는 struct를 정의하고 함수 호출 연산자()를 오버로딩 해야 한다. 이렇게 되면 함수 하나 만들려고 하는데 class를 정의하고, class객체를 생성하고, 함수 객체(class 객체)를 파라미터로 넘겨 주어야 한다. 이렇게 되면 코드가 길어질 수 밖에 없다. 함수 포인터처럼 불필요한 class 또는 struct 생성 없이 함수만 생성하고, 함수 객체처럼 상태를 가질 수 있으며, 코드도 짧으면서 성능또한 함수 객체와 유사한 것이 바로 람다(lambda)이다.

우리는 함수 객체(Functor)에서 STL의 sort함수를 사용해 함수 포인터와 함수 객체의 성능 차이를 비교해보았다. 이번에는 람다와 함수객체의 성능 차이를 비교해 보자. 아래는 람다와 함수객체의 성능 비교를 위한 코드이다. 함수 포인터와 함수객체 성능 비교 코드에서 함수 포인터대신 람다를 사용했다.

### **함수객체와 람다 비교**
#### **테스트 코드**
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

    sort(num2, num2 + SIZE, [](int a, int b)->bool // Use lambda.
    {
        return a < b;
    });

    time = GetTickCount64() - time;

    cout << "Lambda : " << time << endl;

    return 0;
}
~~~

#### **테스트 결과**
~~~
Functor : 3573
Lambda : 3588
~~~

함수 객체와 람다의 성능차이가 거의 없어 보인다. 왜 그럴까?
아래 코드를 사용하여 람다를 사용했을 때 Jumping 오버헤드가 발생되는지 확인해보자.

### **람다 테스트**
####  **테스트 코드 1**
~~~cpp
template<typename T>
bool docomp(int a, int b, T fc)
{
    return fc(a, b);
}

void main()
{
    docomp(1, 2, [](int a, int b)->bool
    {
        return a < b;
    });
}
~~~

#### **코드 분석 1**
아래는 위의 람다 코드를 Disassembly한 결과이다.
~~~
$docomp@V<lambda_ca6a96d613d09eee921cd2a92a1fabfa>@@@@YA_NHHV<lambda_ca6a96d613d09eee921cd2a92a1fabfa>@@@Z (bool __cdecl docomp<class <lambda_ca6a96d613d09eee921cd2a92a1fabfa> >(int,int,class <lambda_ca6a96d613d09eee921cd2a92a1fabfa>)):
  0000000000000000: 3B CA              cmp         ecx,edx
  0000000000000002: 0F 9C C0           setl        al
  0000000000000005: C3                 ret

main:
  0000000000000000: 33 C0              xor         eax,eax
  0000000000000002: C3                 ret
~~~

위 코드에서는 docomp함수에 비교 연산 함수 파라미터로 람다를 전달하였다. 그리고 Disassembly한 결과를 보면 Jumping 오버헤드가 발생되지 않는다. 함수 포인터와 달리 람다는 docomp 함수가 inline 함수가 아니더라도 인라인 함수화 되기 때문이다. 

람다를 사용해 인라인 함수로 사용할 수 있지만, 이름없는 함수로 위의 코드와 같이 사용할 경우 재사용이 되지 않는다. 하지만 재사용이 불가능한 것이 아니다.

람다는 std::function<> 또는 auto로 type을 정의하여 재사용이 가능하다. 여기서는 auto를 사용해 재사용하는 방법을 나타낸다. std::function<>를 사용할 경우 RTTI에 의해 성능이 떨어진다고 한다. auto를 사용할 경우 적절한 type 변환으로 인해 인라인 함수처럼 사용할 수 있도록 해주는 것으로 보인다. (정확히 어떠한 변환으로 인라인 함수화를 해주는지는 모르겠다. 더 공부해야 함 ㅠㅠ)

아래는 auto 선언 지정자를 사용해 람다를 재사용한 코드이다.

#### **테스트 코드 2**
~~~cpp
auto cmpfunc =
        [](int a, int b)->bool
        {
            return a < b;
        };

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

#### **코드 분석 2**
~~~
??$docomp@V<lambda_4a666b6ea1017d659dfa4753bc3e97f3>@@@@YA_NHHV<lambda_4a666b6ea1017d659dfa4753bc3e97f3>@@@Z (bool __cdecl docomp<class <lambda_4a666b6ea1017d659dfa4753bc3e97f3> >(int,int,class <lambda_4a666b6ea1017d659dfa4753bc3e97f3>)):
  0000000000000000: 3B CA              cmp         ecx,edx
  0000000000000002: 0F 9C C0           setl        al
  0000000000000005: C3                 ret

main:
  0000000000000000: 33 C0              xor         eax,eax
  0000000000000002: C3                 ret
~~~

auto를 사용해서 type을 추론하여 변수로 저장하고, 해당 변수를 사용해 docomp함수를 호출해도 마찬가지로 inline 함수화 되는 것이 확인된다. 위와 같이 auto 선언 지정자를 사용해 람다를 재사용할 수 있다.


### **람다에 대한 생각**
사실 람다를 공부하면서 코드 길이가 짧아진다는 것 이외에는 함수 객체보다  좋은 점을 잘 모르겠다. 왜냐하면 람다 함수는 auto 선언 지정자 외에에 std::function<> 으로 정의된 변수에 저장한후 재사용하게 될 경우, 람다의 장점인 빠른 속도를 잃어버리게 된다. 빠른 속도를 유지하기 위하면서 재사용성을 높이기 위해서는 auto 선언 지정자로 변수를 생성해야만 한다. 그리고 람다를 자주 사용하게 되면 코드의 가독성이 떨어지는 것 같다.

내 개인적인 생각으로는 함수가 재사용하지 않고, 기능 구현 코드가 간결하며, 속도가 중요한 함수를 사용하는 곳에서만 람다를 사용할 것 같다.


**Reference**
- https://namu.wiki/w/%EB%9E%8C%EB%8B%A4%EC%8B%9D
- https://lunapiece.net/Article/27419
