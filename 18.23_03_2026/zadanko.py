import os
import shutil

class Student:
    def __init__(self, id: int, imie: str, nazwisko: str, wiek: int) -> None:
        self.id = id
        self.imie = imie
        self.nazwisko = nazwisko
        self.wiek = wiek
        self.kursy = []

    def __str__(self) -> str:
        return f"{self.imie} {self.nazwisko} ({self.wiek} lat): {', '.join(self.kursy)}"

    def wypisz_kursy(self) -> None:
        return f"Kursy:\n- {',\n- '.join(self.kursy)}"
    
class Kurs:
    def __init__(self, id_studenta: int, nazwa: str) -> None:
        self.id_studenta = id_studenta
        self.nazwa = nazwa


def main() -> None:
    with open("courses.txt", "r") as kursiki, open("students.txt", "r") as studenciki:
        kursiki = [Kurs(*kursik.strip().split(",")) for kursik in kursiki.readlines()]
        studenciki = [Student(*studencik.strip().split(",")) for studencik in studenciki.readlines()]

    for kursik in kursiki:
        for studencik in studenciki:
            if kursik.id_studenta == studencik.id:
                studencik.kursy.append(kursik.nazwa)

    for studencik in studenciki:
        print(studencik)

    if os.path.exists("studenci"):
        shutil.rmtree("studenci")
    os.mkdir("studenci")

    for studencik in studenciki:
        with open(f"./studenci/{studencik.imie}_{studencik.nazwisko}.txt", "w") as plik:
            plik.write(f"{studencik.wypisz_kursy()}\n")


if __name__ == "__main__":
    main()