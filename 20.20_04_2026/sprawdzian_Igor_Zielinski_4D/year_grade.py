__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Igor Zieliński 4D"

def year_grade(average: float) -> int:
    match average:
        case average if average >= 5.5:
            return 6
        case average if average >= 4.7:
            return 5
        case average if average >= 3.7:
            return 4
        case average if average >= 2.7:
            return 3
        case average if average >= 1.85:
            return 2
        case average if average < 1.85:
            return 1
        case _:
            raise ValueError("Average must be a number between 1 and 6")
