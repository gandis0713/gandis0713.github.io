---
layout: post
title: "C++ 함수 포인터(Function Pointer)"
subtitle: 'C++ 함수 포인터(Function Pointer)'
author: "Gandis"
header-style: text
tags:
  - C
  - C++
---

특정 변수의 메모리 주소를 가리키는 변수를 포인터 변수라고 한다. 마찬가지로 특정 함수의 메모리 주소를 가리키는 변수를 함수 포인터(Function Pointer)라고 부른다.

함수 포인터는 모양은 아래와 같은 모양으로 정의 할 수 있다. 

~~~
int (*Func)(int, int);
~~~

맨 앞의 int는 함수의 return type을 나타낸다. (*Func)는 함수의 이름을 나타내며, 이름앞에 *이 붙는다. 마지막으로 (int, int)는 전달 받을 파라미터를 나타낸다. (int, int)는 2개의 int type을 파라미터로 받고 있다. 만약, 전달 받을 파라미터가 없을 경우 ()로 나타낼 수 있다.

일반적으로 함수 포인터는 아래와 같이 사용할 수 있다.

#### **Code**
~~~
#include <iostream>

int (*Func)(int, int);

int add(int a, int b)
{
    return a + b;
}

void print_add(int a, int b, int (*Func)(int, int))
{
    std::cout << Func(a, b) << std::endl;
}

int main()
{
    cout<< "Func : " << Func << endl;
    cout<< "&Func : " << &Func << endl;
    cout<< "add : " << add << endl;
    cout<< "&add : " << &add << endl;

    Func = &add;
    print_add(3, 8, Func);

    cout<< "Func : " << Func << endl;
    cout<< "&Func : " << &Func << endl;

    return 0;
}
~~~

코드 실행 결과 
~~~
Func : 0000000000000000
&Func : 000000013F2650E0
add : 000000013F261290
&add : 000000013F261290
result : 11
Func : 000000013F261290
&Func : 000000013F2650E0
~~~

위 코드에서 전역 함수 포인터로 선언된 Func 포인터 변수의 주소는 000000013F5450E0이며, 포인터 변수가 가리키는 주소는 최초 0으로 초기화가 된다.

이후 Func 포인터 변수에 add 함수 주소를 대입하면, Func이 가리키는 주소는 add함수가 된다. 따라서 print_add 함수에서는 add함수를 실행하게 되어 a + b연산을 실행하게 된다.

위와 같이 print_add 함수에서 마지막 파라미터 변수를 함수 포인터의 형태를 그대로 사용할 수 있지만, 이런 코드가 파라미터 변수 뿐만 아니라, 함수 내부에서도 자주사용되면 코드가 복잡해져 가독성이 떨어 질수 있다. 그래서 typedef를 사용하여 간단하게 코드를 작성 할 수 있다. 


#### **Code**
~~~
#include <iostream>

typedef int (*Func)(int, int);

int add(int a, int b)
{
    return a + b;
}

void print_add(int a, int b, Func func)
{
    std::cout << func(a, b) << std::endl;
}

int main()
{
    Func func = &add;
    print_add(3, 8, func);

    return 0;
}
~~~

위의 코드에서는 print_add 함수의 마지막 파라미터 변수를 typedef로 선언한 별칭으로 사용해서 add 함수를 실행하였다. 비록 파라미터 변수만 변경되었기 때문에 크게 다른 것이 없어 보이지만, 지역 변수뿐만 아니라 멤버 변수에서 함수 포인터를 많이 사용될 경우 코드를 더욱 간결하게 구현 할 수 있다.

마지막으로 함수 typedef를 사용할 경우, 함수의 이름앞에 *를 선언하지 않을 수 있다.

대신, 함수 포인터는 Pointer type으로 초기화를 해야 한다.

아래는 함수 이름앞에 *를 사용하지 않고 함수 포인터 이름을 선언한 코드이다.

#### **Code**
~~~cpp
#include <iostream>

typedef int Func(int, int);

int add(int a, int b)
{
    return a + b;
}

void print_add(int a, int b, Func func)
{
    std::cout << func(a, b) << std::endl;
}

int main()
{
    Func *func = add;
    print_add(3, 8, func);

    return 0;
}
~~~

끝!



