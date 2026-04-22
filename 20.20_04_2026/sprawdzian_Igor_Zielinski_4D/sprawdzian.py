__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Igor Zieliński 4D"

from datetime import datetime
import json
from models import Teacher, Student, Subject, Grades
from year_grade import year_grade


def main(teachers: list[Teacher] = [], students: list[Student] = [], subjects: list[Subject] = [], grades: list[Grades] = []) -> None:
    with open("teachers.txt", "r") as teachers_file, open("students.txt", "r") as students_file, open("subjects.txt", "r") as subjects_file, open("grades.txt", "r") as grades_file:
        teachers, students, subjects, grades = (lambda t, s: (t, s, (subj := list(filter(lambda z: z.teacher is not None, map(lambda x: Subject(int((w := x.strip().split(" "))[0]), w[1], k[0] if (k := list(filter(lambda y: y._id == int(w[2]), t))) else None), subjects_file.readlines())))), list(map(lambda zg: zg[0] if list(map(lambda s_: zg[0].add_grade(int(s_)), zg[1].split(","))) else zg[0], map(lambda x: (Grades(list(filter(lambda y: y._id == int(w[0]), s))[0], list(filter(lambda y: y._id == int(w[1]), subj))[0]), w[2]) if (w := x.strip().split(" "))[0] else None, grades_file.readlines())))))(list(map(lambda x: Teacher(int((w := x.strip().split(" "))[0]), w[1], w[2]), teachers_file.readlines())), list(map(lambda x: Student(int((w := x.strip().split(" "))[0]), w[1], w[2], datetime.strptime(w[3], '%Y-%m-%d').date()), students_file.readlines())))

    print('Oceny i średnie poszczególnych uczniów')
    [print(f"    {s}:\n" + "".join([f"        {g.subject.name}:\n            Oceny: {', '.join(map(str, g.get_grades()))}\n            Średnia: {round(g.get_average(), 2)}\n            Ocena końcowa: {year_grade(g.get_average())}\n" for g in grades if g.student == s])) for s in students]
    with open("students.json", "w") as f: json.dump([{str(s): {g.subject.name: {"Oceny": ", ".join(map(str, g.get_grades())), "Srednia": round(g.get_average(), 2), "Ocena roczna": year_grade(g.get_average())} for g in grades if g.student == s}} for s in students], f, indent=4)
    print("=" * 50 + "\n")
    (lambda sb_grades: [print(f"{sb.name}:\n    Nauczyciel: {sb.teacher}\n    Oceny: {', '.join(map(str, sb_grades(sb)))}\n    Średnia: {round(sum(sb_grades(sb)) / len(sb_grades(sb)) if sb_grades(sb) else 0, 2)}\n") for sb in subjects])(lambda sb: sum([g.get_grades() for g in grades if g.subject == sb], []))
    with open("subjects.json", "w") as f: (lambda sb_grades: json.dump([{sb.name: {"Nauczyciel": str(sb.teacher), "Oceny": sb_grades(sb), "Srednia": round(sum(sb_grades(sb)) / len(sb_grades(sb)) if sb_grades(sb) else 0, 2)}} for sb in subjects], f, indent=4))(lambda sb: sum([g.get_grades() for g in grades if g.subject == sb], []))


(main() if __name__ == "__main__" else None)