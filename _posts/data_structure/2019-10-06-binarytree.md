---
layout: post
title: "이진트리(Binary Tree)"
subtitle: '이진트리(Binary Tree)'
author: "Gandis"
header-style: text
tags:
  - Data Structure
---

트리는 그래프 자료구조의 일종이다. 트리는 여러 노드가 하나의 노드를 가리킬 수 없는 구조이다. 

이진트리는 트리 자료구조의 일종으로 하나의 부모 노드가 최대 2개의 자식 노드를 가지는 자료구조를 이진트리라고 한다. 자식 노드를 가지고 있는 부모 노드는, 다른 부모 노드의 자식노드가 될 수 있다. 반대로 자식 노드는 다른 노드의 부모 노드가 될 수 있다.

## 이진트리의 종류

이진트리의 종류는 아래와 같이 4가지가 있다.

#### **Complete Binary Tree**
Complete Binary Tree는 최하위 노드가 왼쪽에 채워져 있는 트리를 Complete Binary Tree라고 한다. 만약 최하위 노드가 왼쪽은 비워져 있고 오른쪽만 채워져 있다면 Complete Binary Tree가 아니다. 반면, 왼쪽 노드는 채워져 있고, 오른쪽 노드는 채워져 있지 않아도 Complete Binary Tree가 된다. 왜 Complete용어를 쓰는지 모르겠다.

#### **Perpert Binary Tree**
Perpert Binary Tree는 최하위 노드가 왼쪽 오른쪽 모두 채워져 있으며, 최하위의 모든 노드 Level이 같은 경우를 말한다. 즉, 완벽한 대칭을 이루며 모든 노드가 꽉찬 상태를 말한다.

#### **Full Binary Tree**
Full Binary Tree는 최하위 노드가 왼쪽 오른쪽 모두 채워져 있으나, 최하위의 모든 노드의 Level이 같지는 않다. 즉, 자식 모드가 2개 채워져 있거나, 또는 아에 없는 경우를 말한다.

#### **Skewed Binary Tree**
Skewed Binary Tree는 최소 갯수의 노드를 가지며, 한쪽으로 노드가 치우쳐져 있는 상태를 말한다.


### **Reference**
##### - https://en.wikipedia.org/wiki/Binary_tree


