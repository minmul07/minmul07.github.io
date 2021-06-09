1. 사용자로부터 1부터 100사이의 수를 반복적으로 입력받아서 짝수일 경우 lst에 저장하는 프로그램을 작성하시오. 단, 반복문과 함께 continue를 사용하고 5개의 요소를 저장한다.


```python
lst = []
while len(lst) != 5:
  string = int(input("입력: "))
  if string % 2 != 0:
    continue
  lst.append(string)
print(lst)  
```

    입력: 1
    입력: 2
    입력: 3
    입력: 4
    입력: 5
    입력: 6
    입력: 7
    입력: 8
    입력: 9
    입력: 10
    [2, 4, 6, 8, 10]
    

2. 반복문과 continue를 이용하여 clst에 저장된 값에서 [‘red’, ‘pink’, ‘black’, ‘blue’, ‘red’]에서 ‘red’가 아닌 경우에 출력하는 프로그램을 작성하시오.


```python
clst =  ["red", "pink", "black", "blue", "red"]
for i in clst:
  if i == "red":
    continue
  print(i)
```

    pink
    black
    blue
    

3. 리스트 id에 저장된 값 ['strongkcs', 'lgh1215', 'sku12', 'sgi721', 'bravo7']에서 'sku12'를 검색할 때, 값이 발견되는 즉시 탐색을 멈추도록 반복문과 break를 이용하여 프로그램을 작성하시오.


```python
id = ['strongkcs', 'lgh1215', 'sku12', 'sgi721', 'bravo7']
for i in id:
  print(f"{i} 검사중")
  if i == "sku12":
    print("sku12 계정을 발견하였습니다.")
    break
```

    strongkcs 검사중
    lgh1215 검사중
    sku12 검사중
    sku12 계정을 발견하였습니다.
    

3. 수정

사유: ID를 입력받는지 몰랐음!


```python
id = ['strongkcs', 'lgh1215', 'sku12', 'sgi721', 'bravo7']
data = input("ID 입력: ")
for i in id:
  if i == data:
    print(f"{i} 계정을 발견하였습니다.")
    break
```

    ID 입력: werwer
    

4. 다음과 같이 숫자판이 출력되도록 다중 반복문을 사용하여 프로그래밍 해 보시오. 단, 리스트를 사용하지 않는다.



```
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0
0 0 0 0 1
```




```python
for x in range(1, 6):
  for y in range(1, 6):
    if x == y:
      print("1", end = "\n" if y == 5 else " ")
    else:
      print("0", end = "\n" if y == 5 else " ")
```

    1 0 0 0 0
    0 1 0 0 0
    0 0 1 0 0
    0 0 0 1 0
    0 0 0 0 1
    

5. 다음과 같이 숫자판이 출력되도록 다중 반복문을 사용하여 프로그래밍 해 보시오. 단, 리스트를 사용하지 않는다.

```
1 
2 3 
4 5 6 
7 8 9 10 
11 12 13 14 15 
```




```python
i = 0
for x in range(1, 6):
  for y in range(1, x + 1):
    i = i + 1
    print(i, end = "\n" if y == x else " ")
```

    1
    2 3
    4 5 6
    7 8 9 10
    11 12 13 14 15
    

6. 무한 반복문을 이용하여 'end' 값이 입력될 때까지 1~100 범위의 값을 입력받아 리스트 lst에 저장한 후 저장된 값을 모두 출력해 보시오. 단, 중복된 값은 출력하지 않는다.

6. 수정

중복된 값을 제거하였음


```python
lst = []
while True:
  string = input("value : ")
  if string == "end":
    print(set(lst))
    break
  lst.append(string)
```

    value : 1
    value : 1
    value : 2
    value : 2
    value : 3
    value : 3
    value : 4
    value : 4
    value : 5
    value : 5
    value : 6
    value : 6
    value : 7
    value : 7
    value : end
    {'7', '1', '5', '4', '3', '6', '2'}
    
