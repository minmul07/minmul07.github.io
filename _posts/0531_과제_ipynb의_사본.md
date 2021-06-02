1. score=59일 때, score의 점수가 60점 이상이면 ‘합격’, 그렇지 않으면 ‘불합격’을 출력하는 프로그램을 작성하시오.


```python
score = 59
print("합격" if score >= 60 else "불합격")
```

    불합격
    

2. 신호등 불빛에 따라 건너는 신호등 시스템입니다. ‘R'을 입력받으면 신호등이 빨강이므로 ’ 기다립니다‘, ’G’이면 '건너가십시오‘를 출력하는 프로


```python
while True:
  string = input("입력: ")
  if string == "R":
    print("기다립니다")
  elif string == "G":
    print("건너가십시오")
    break
  else:
    pass
```

2. 수정

신호등의 신호는 R / G 2개이므로, R일 때에는 "기다립니다"를 출력하고, 그 외에는 "건너가십시오"를 출력하는 것이 더 효율적이다.


```python
while True:
  string = input("입력: ")
  if string == "R":
    print("기다립니다")
  else:
    print("건너가십시오")
```

3. color=‘pink’일 때, color의 값에 따라 보기와 같이 출력되는 프로그램을 작성하시오. pink : love, red : passion, 기타 : others


```python
color = "pink"
if color == "pink":
  print("love")
elif color == "red":
  print("passion")
else:
  print("others")
```

    love
    

4. 두 개의 정수를 입력받아서 두 수의 차를 계산하는 프로그램을 작성하시오. 단, 입력 순서에 상관없이 무조건 큰 수에서 작은 수를 뺀 결과를 출력한다. 같은 수는 입력되지 않는다


```python
num1, num2 = int(input("정수1: ")), int(input("정수2: "))
if num1 > num2:
  print(f"{num1} - {num2}은(는) {num1 - num2}입니다. ")
elif num1 < num2:
  print(f"{num2} - {num1}은(는) {num2 - num1}입니다. ")
else:
  pass
```

    정수1: 4
    정수2: 16
    16 - 4은(는) 12입니다. 
    

5. 나이를 입력받아 10\~19이면 ‘10대’, 20\~29이면 ’20대‘, 30~39이면 ’30대‘, 그 이외에는 ’ 기타‘라고 출력하는 프로그램을 작성하시오. 단, //연산자를 이용한다


```python
age = int(input("나이 입력: "))
if (age // 10) == 1:
  print("10대")
elif (age // 10) == 2:
  print("20대")
elif (age // 10) == 3:
  print("30대")
else:
  print("기타")
```

    나이 입력: 23
    20대
    

6. 단일문자를 입력받아 숫자인지, 영문자인지, 기타문자인지를 판단하는 프로그램을 작성하시오.


```python
data = input("입력: ")
if data.isdigit() == True:
  print("숫자")
elif data.islower() == True:
  print("소문자")
elif data.isupper() == True:
  print("대문자")
else:
  print("기타문자")
```

    입력: 23
    숫자
    
