with open("sygnaly.txt", "r") as dane:
    slowa = dane.read().splitlines()
    maks = max([(slowo[0], len(set(slowo[1]))) for slowo in enumerate(slowa)], key=lambda x: x[1])

print(f"Zad. 2.\n{slowa[maks[0]]}: {maks[1]}")
with open("wyniki4.txt", "a") as wyniki:
    wyniki.write(f"Zad. 2.\n{slowa[maks[0]]}: {maks[1]}\n")
    