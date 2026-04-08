from functools import reduce

dane = ["CQMQQQ", "AAAAAAAA", "AC", "AZ"]

# Here is the fixed version with initial value
for slowo in dane:
    # We want to know if all letters are within 10 of each other
    unique_sorted = sorted(list(set(slowo)))
    
    # Original problematic code logic:
    # if len > 1, it returns tuple. If len == 1, it returns str
    
    # Let's fix it by adding initializer
    fixed = reduce(lambda acc, c: (acc[0], acc[1] and (ord(c) - ord(acc[0]) <= 10)), unique_sorted, (unique_sorted[0], True))[1]
    
    print(f"{slowo}: {fixed}")
