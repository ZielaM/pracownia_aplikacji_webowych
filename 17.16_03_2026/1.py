with open("sygnaly.txt", "r") as dane:
    slowa = dane.read().splitlines()

slowo = [slowa[i][9] for i in range(39, len(slowa), 40)]

print(f"Zad. 1.\n{''.join(slowo)}")
with open("wyniki4.txt", "a") as wyniki:
    wyniki.write(f"Zad. 1.\n{''.join(slowo)}\n")
    