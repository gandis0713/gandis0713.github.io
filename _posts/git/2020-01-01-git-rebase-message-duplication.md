---
layout: post
title: "git push후 rebase를 하면? commit message 중복 생성"
subtitle: 'git push후 rebase를 하면?'
author: "Gandis"
header-style: text
hidden: false
tags:
  - git
---
여러개발자들과 함께 Git Repository를 생성해서 개발하다보면, dev branch를 생성해서 개발하고, 개발이 완료되면 master branch에 dev branch를 병합하는 방식으로 개발한다.
이 때, 서로 다른 두 branch를 병합하는 방법으로는 **Merge**와 **Rebase**가 있다. 

**Merge**는 3-way-merge방식을 사용하기 때문에 **Merge**할 때 새로운 commit 기록을 생성하게 되고, 이는 때대로 불필요한 commit 기록을 남기게 된다. 반면 **Rebase**는 master branch에서 작업한 내용을 patch로 만들어 dev branch에 적용하기 때문에 추가적인 commit 기록를 생성하지 않고 병합을 할 수 있다. 이와 관련된 자세한 내용은 [Git Branching - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)를 참고한다.

하지만 Rebase는 위험성이 따르는 병합방법이다. [Git Branching - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)에서도 Rebase사용시에 주의할 점을 설명하고 있다. 이글에서는 Rebase의 위험성으로 인해 **<u>dev branch에서 작업한 내용을 dev branch에 push후, 다시 master branch를 dev branch에 rebase할 경우</u>** 어떻게 되는지 알아본다.

## **git push후 rebase를 하면 발생되는 문제 확인**

먼저 확인을 위해 git repository에는 아래의 3가지 branch가 있다고 가정한다.
- **master**
- **dev1** from **master**
- **dev2** from **master**

그리고 작업순서는 아래와 같이 진행하기로 한다.
1. **dev1**에서 workitem-1을 진행한다. 그리고 **dev1** branch에 commit 및 push를 한다. (여기서는 **master**에 merge 하지 않는다.)
2. **dev2**에서 workitem-2을 진행한다. 그리고 **dev2** branch에 commit 및 push를 한다. **dev2**의 내용을 **master**에 merge한다.
3. **master**의 내용이 변경되었으므로 **master**의 내용을 **dev1** branch에 rebase하고, **dev1** branch에 push를 한다.

이제 위 작업순대로 진행하면 어떤 문제가 발생되는지 확인해보자.
1. **dev1**에서 workitem-1을 진행한다. 그리고 **dev1** branch에 commit 및 push를 한다. (**master**에 merge 하지 않는다.)
~~~cmd
$ git add .
$ git commit -m "workitem-1" 
$ git push gandis dev1
~~~
![](/../../img/git/rebase-1.png)
`git 명령어를 보면, 'workitem-1'을 commit하고 dev1 branch에 push를 하였다. 이 동작의 commit 기록은 정상적으로 표시된다.`


2. **dev2**에서 workitem-2을 진행한다. 그리고 **dev2** branch에 commit 및 push를 한다. **dev2**의 내용을 **master**에 merge한다.
~~~cmd
$ git checkout dev2
$ git add .
$ git commit -m "workitem-2"
$ git push gandis dev2
$ git checkout master
$ git merge dev2
$ git push gandis master
~~~
![](/../../img/git/rebase-2.png)
`git 명령어를 보면, 'workitem-2'을 commit하고 dev2 branch에 push를 하였다. 그리고 master에 Merge를 하였는데, 이 동작역시 commit 기록은 정상적으로 표시된다.`

3. **master**의 내용이 변경되었으므로  **master**의 내용을 **dev1** branch에 rebase하고, **dev1** branch에 push를 한다.
~~~cmd
$ git checkout dev1
$ git rebase gandis/master
First, rewinding head to replay your work on top of it...
Applying: workitem-1
$ git push gandis dev1
~~~
위 작업을 진행할 경우 아래의 git error가 발생한다.
```diff
To https://github.com/gandis0713/prototype.git
- ! [rejected]        dev1 -> dev1 (non-fast-forward)
- error: failed to push some refs to 'https://github.com/gandis0713/prototype.git'
! hint: Updates were rejected because the tip of your current branch is behind
! hint: its remote counterpart. Integrate the remote changes (e.g.
! hint: 'git pull ...') before pushing again.
! hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
`여기서 git error message가 추천한대로 'git pull'을 진행하면 문제가 발생하기 시작한다. 과연 어떤 문제가 발생되는지 git이 추천하는데로 계속 해보자.`
~~~cmd
$ git pull gandis dev1  
From https://github.com/gandis0713/prototype
 * branch            dev1       -> FETCH_HEAD
Merge made by the 'recursive' strategy.
$ git push gandis dev1
~~~
`뭔가 깔끔하게 pull이 되고 push마져 된것 같다. 그런데 commit 기록을 보면,`
![](/../../img/git/rebase-3.png)
`'workitem-1'기록이 두개가 보인다. 분명 'workitem-1' commit은 한번만 했는데 2개의 동일한 commit message가 생성되었다.` Stack Overflow의 [Git commits are duplicated in the same branch after doing a rebase](https://stackoverflow.com/questions/9264314/git-commits-are-duplicated-in-the-same-branch-after-doing-a-rebase)의 내용을 보면, `'workitem-1' commit은 현재 dev1에 존재하지 않으며, 그렇기 때문에 동일한 'workitem-1' commit을 새로 생성한다는 것이다. 결국 동일한 commit message가 중복으로 생성되는 것이다.`
**<u>이 현상을 방지하기 위해서는, branch에 push를 하고나서 rebase는 절대하지 말아야 하며, 대신 merge를 해야한다고 한다.</u>**


## **Rebase를 꼭 사용하고 싶은 경우**
**<u>rebase후에 발생되는 error message에서, git이 추천해주는 pull은 진행하지 않고 강제로 push를 진행하면 된다.**

**하지만 이 동작은 위험성이 매우크다. 함부로 강제 push를 진행하여 곤란한 상황이 발생하는 경우는 수도없이 많을 것이다. 따라서 왠만하면 강제 push를 진행하지 않는 것이 좋다. 내가 위 경우에서 강제로 Push를 진행하는 경우는, 작업중인 branch를 기반으로 새로운 branch가 생성되었을 가능성이 완전히 없을 경우에만 진행한다.</u>**

여기서는 강제 push를 하였을 경우, commit message가 어떻게 기록되는지 확인해 보자. 위의 작업순서 1,2번은 동일하게 진행하고 마지막 3번에서 pull을 진행하지 않고 강제 push를 진행하였다. 1,2번 결과는 동일하기 때문에 마지막 3번의 결과만 확인해 보자.
~~~cmd
$ git checkout dev1
$ git rebase gandis/master
First, rewinding head to replay your work on top of it...
Applying: workitem-1
$ git push gandis dev1
~~~
```diff
To https://github.com/gandis0713/prototype.git
- ! [rejected]        dev1 -> dev1 (non-fast-forward)
- error: failed to push some refs to 'https://github.com/gandis0713/prototype.git'
! hint: Updates were rejected because the tip of your current branch is behind
! hint: its remote counterpart. Integrate the remote changes (e.g.
! hint: 'git pull ...') before pushing again.
! hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
일반 push를 진행하면 이전에 발생되었던 것과 동일한 error가 발생된다. 반면, 강제로 push를 진행하면, (동일한 명령어세 '-f' option만 추가하면 된다.)
~~~cmd
$ git push gandis dev1 -f
~~~
~~~
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 340 bytes | 340.00 KiB/s, done.
Total 4 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
.....
~~~ 
위와 같이 push가 진행된다. 그리고 마지막으로 dev1 branch를 master branch에 merge하고, commit message가 중복으로 생성되는지 확인해 보자.
~~~cmd
$ git checkout master
$ git merge dev
$ git push gandis master 
~~~
![](/../../img/git/rebase-4.png)
위와 같이 commit message가 중복으로 생성되지 않을 것을 확인 할 수 있다. 추가적으로 Merge를 했다는 commit message도 생성되지 않는다.


**Reference**
- https://stackoverflow.com/questions/9264314/git-commits-are-duplicated-in-the-same-branch-after-doing-a-rebase
- https://git-scm.com/book/en/v2/Git-Branching-Rebasing

