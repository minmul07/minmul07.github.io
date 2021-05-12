1. a=7, b=3이 들어 있다. 두 수에 대한 덧셈, 뺄셈, 곱셈, 나눗셈 결과를 출력하는 프로그램을 작성하시오.


```python
a = 7
b = 3
print(f"7 + 3 = {a + b}")
print(f"7 - 3 = {a - b}")
print(f"7 * 3 = {a * b}")
print(f"7 / 3 = {a / b}")
```

    7 + 3 = 10
    7 - 3 = 4
    7 * 3 = 21
    7 / 3 = 2.3333333333333335
    

2. c=9, d=2가 들어 있다. 두 수에 대한 몫과 나머지를 구한 결과를 출력하는 프로그램을 작성하시오.


```python
c = 9
d = 2
print(f"9 // 2 = {c // d}")
print(f"9 % 2 = {c % d}")
```

    9 // 2 = 4
    9 % 2 = 1
    

3. a=2, b=3, c=‘fruit', d='Fruit' 일 때, a와 b가 같은지, c와 d는 같지 않은지 검사하는 프로그램을 작성하시오


```python
a = 2
b = 3
c = "fruit"
d = "Fruit"
print(a == b)
print(c != d)
```

    False
    True
    

4. a=2, b=3 일 때, a가 b 이상의 값인지 검사하는 프로그램을 작성하시오.


```python
a = 2
b = 3
print(a >= b)
```

    False
    

5. a='fruit', b='apple' 일 때 a의 값 fruit이고 b의 값이 orange인지 검사하는 프로그램을 작성하시오.


```python
a = "fruit"
b = "apple"
print(a == "fruit" and b == "orange")
```

    False
    

6. a=3 일 때 a의 값이 1~10의 범위에 포함되는지 검사하는 프로그램을 작성하시오.


```python
a = 3
print(a >= 1 and a <= 10 )
```

    True
    

6. 피드백 - 파이썬 문법으로도 표현해 보세요


```python
a = 3
print(1 <= a <= 10)
```

    True
    

7. a='monkey'가 들어 있을 때, a의 값이 'dog' 혹은 ‘cat'인지 검사하는 프로그램을 작성하시오.


```python
a = "monkey"
print(a == "dog" or a == "cat")
```

    False
    

8. a=55가 들어 있을 때, a의 값이 음수이거나 100이상의 값인지 검사하는 프로그램을 작성하시오.


```python
a = 55
print(a < 0 or a >= 100)
```

    False
    

8. 피드백 - and 와 not을 이용해서도 표현해 보세요~


```python
a = 55
print(a >= 100 and not a >= 0)
print(not (0 <= a and a < 100)) #선생님 정답
```

    False
    False
    


```python

```
