def read_graph(filename: str) -> tuple[int, list[list[int]]]:
    with open(filename, 'r') as file:
        return int(file.readline().strip()), [list(map(int, x.split())) for x in file.read().splitlines()]


def write_neighbours_list(neighbours_list: list[int]) -> None:
    print(f"Sąsiadami wierzchołka {neighbours_list[0]} są: {', '.join(map(str, neighbours_list[1:]))}")


def list_to_matrix(neighbours_list: list[list[int]]) -> list[list[int]]:
    return [[1 if j in neighbours[1:] else 0 for j in range(0, len(neighbours_list))] for neighbours in neighbours_list]


def write_matrix(neighbours_matrix: list[list[int]]) -> None:
    print('\n'.join([' '.join(map(str, row)) for row in neighbours_matrix]))


def main(neighbours_lists: list[list[int]] = read_graph('graph.txt')[1]) -> None:
    tuple((print('Lista sąsiedztwa:\n') or '', *map(write_neighbours_list, neighbours_lists), print('\n========================\nMacierz sąsiedztwa:\n') or ''))
    write_matrix(list_to_matrix(neighbours_lists))


(main() if __name__ == '__main__' else None)