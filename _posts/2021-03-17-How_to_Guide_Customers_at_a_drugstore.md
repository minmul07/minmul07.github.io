#3
import random
import os

while True:
  rand = random.randrange(1,10000)
  rand22 = random.randrange(1,4)
  input_ = str(input("이름을 입력하세요 / 고객 이름을 배정하려면 온점을 입력하세요"))
  os.system('cls' if os.name == 'nt' else 'clear')
  print(input_ + str(rand) + "님 " + str(rand22) + "번 창구로 오십시오.")
