from functools import reduce

with open("sygnaly.txt", "r") as dane:
    slowa = [slowo for slowo in dane.read().splitlines() if ord(max(slowo)) - ord(min(slowo)) < 11]

print(f"Zad. 3.\n{'\n'.join(slowa)}")
with open("wyniki4.txt", "a") as wyniki: 
    wyniki.write(f"Zad. 3.\n{'\n'.join(slowa)}\n")