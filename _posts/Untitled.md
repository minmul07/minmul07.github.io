```python
#1번 문제
start = "용인"
end = "군산"
hour = 8
minute = 20
print("%s에서 %s(으)로 가는 %d시%d분 고속버스입니다." %(start, end, hour, minute))
```


```python
#2번 문제
a, b, c = 0, 0, 0
print("변수 a=%d, b=%d, c=%d으로 초기화 되었습니다." %(a, b, c))
```


```python
#3번 문제
a, b = 68, 53
print("a=%d, b=%d의 값이 저장되어 있습니다." %(b, a))
```


```python
#4번 문제
male, female = 25, 15
print("남자:%d명, 여자:%d명, 합계:%d명" %(male, female, male+female))
```


```python
#5번 문제 - 잘못된 코드
std1, std2, std3 = "kim", "lee", "yun"
print("std1=\'%s\', std2\'%s\', std3=\'%s\'" %(std2, std3, std1))
```


```python
#5번 문제 수정
std1, std2, std3 = "kim", "lee", "yun"
std1, std2, std3 = std2, std3, std1 
print("std1=\'%s\', std2\'%s\', std3=\'%s\'" %(std1, std2, std3))
```
