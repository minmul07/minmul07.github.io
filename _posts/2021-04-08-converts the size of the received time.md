---
layout: single
title:  "입력받은 시간(초 단위)의 크기를 변환"
---

```python
def sectotime(s2t):
    if (int(s2t >= 86400) != 0):
        print(f"{int(s2t/86400)}일", end = " ")
    if (int(s2t/3600) != 0):
        print(f"{int(s2t%86400/3600)}시간", end = " ")
    if (int(s2t%3600/60) != 0):
        print(f"{int(s2t%3600/60)}분", end = " ")
    if (int(s2t%60) != 0):
        print(f"{int(s2t%60)}초", end = " ")

sectotime(int(input("입력: ")))
```

    입력: 92400
    1일 1시간 40분 

이와 같은 예시로, 입력받은 시간의 양(초 단위)를 일, 시간, 분, 초 단위로 환산한다.

단, 3600을 입력 받으면 "0일 1시간 0분 0초"라고 출력하는 것이 아닌, "1시간"이라고 출력한다.

이를 sectotime 함수로 선언하여 사용하기 편하게 한다.
