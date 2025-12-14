let
  lib = import <nixpkgs/lib>;
  inherit (lib) count;
  inherit (builtins) map filter length foldl' elemAt genList;

  input = ''
    ..@@.@@@@.
    @@@.@.@.@@
    @@@@@.@.@@
    @.@@@@..@.
    @@.@@@@.@@
    .@@@@@@@.@
    .@.@.@.@@@
    @.@@@.@@@@
    .@@@@@@@@.
    @.@.@@@.@.
  '';

  cleanedLines = filter (s: s != "")
    (map lib.strings.trim (lib.strings.splitString "\n" input));

  initialGrid = map (line: lib.strings.stringToCharacters line) cleanedLines;

  colsNum = length (elemAt initialGrid 0);
  rowsNum = length initialGrid;

  inBounds = r: c: r >= 0 && r < rowsNum && c >= 0 && c < colsNum;
  get = r: c: grid: if inBounds r c then elemAt (elemAt grid r) c else ".";

  solution = grid:
    let
      result = genList (r:
        genList (c:
          let
            cell = get r c grid;
            neighbors = count (x: x == "@") [
              (get (r - 1) (c - 1) grid)
              (get (r - 1) c grid)
              (get (r - 1) (c + 1) grid)
              (get r (c - 1) grid)
              (get r (c + 1) grid)
              (get (r + 1) (c - 1) grid)
              (get (r + 1) c grid)
              (get (r + 1) (c + 1) grid)
            ];
            died = cell == "@" && neighbors < 4;
            newCell = if died then "." else cell;
          in { inherit newCell died; }) colsNum) rowsNum;

      newGrid = map (row: map (x: x.newCell) row) result;

      deaths =
        foldl' (acc: row: acc + length (filter (x: x.died) row)) 0 result;

    in { inherit newGrid deaths; };

  totalDeaths = grid:
    let step = solution grid;
    in if grid == step.newGrid then
      step.deaths
    else
      step.deaths + (totalDeaths step.newGrid);

in {
  part1 = (solution initialGrid).deaths;
  part2 = totalDeaths initialGrid;
}

