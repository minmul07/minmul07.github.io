```python
#1
x = "monkey"
print(type(x))
```

    <class 'str'>
    


```python
#2
y = 2.78
y = int(y)
print(y)
```

    2
    


```python
#3
input1 = float(input("입력: "))
input2 = float(input("입력: "))
result = (input1 * input2)
print(result)
```

    입력: 12.44
    입력: 4.99
    62.0756
    


```python
#4
int1 = float(input("입력: "))
int2 = float(input("입력: "))
result = int1 * int2 #소숫점 2번째 자리까지 출력
print(result)
```

    입력: 12.44
    입력: 4.99
    62.0756
    


```python
#5
int1, int2 = 0, 0
data = open("inputData.txt", "r")
int1 = float(data.readline())
int2 = float(data.readline())
print(int1 + int2)

#inpuData - 
12.44
4.99
```


    ---------------------------------------------------------------------------

    FileNotFoundError                         Traceback (most recent call last)

    <ipython-input-5-31135c58850f> in <module>
          1 #5
          2 int1, int2 = 0, 0
    ----> 3 data = open("inputData.txt", "r")
          4 int1 = float(data.readline())
          5 int2 = float(data.readline())
    

    FileNotFoundError: [Errno 2] No such file or directory: 'inputData.txt'



```python
data = ("inputData.txt", "w")
data.write("12.44\n4.99")
data.close()
```


    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    <ipython-input-8-88b9d609c810> in <module>
          1 data = ("inputData.txt", "w")
    ----> 2 data.write(str(12.44) + ("\n") + str(4.99))
          3 data.close()
    

    AttributeError: 'tuple' object has no attribute 'write'



```python

```
