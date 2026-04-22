__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Igor Zieliński 4D"

from .Student import Student
from .Subject import Subject


class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.student = student
        self.subject = subject
        self.grades: list[int] = []

    def add_grade(self, grade: int) -> None:
        self.grades.append(grade) if 1 <= grade <= 6 else (_ for _ in ()).throw(ValueError("Grade must be between 1 and 6"))

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades) if self.grades else 0.0
