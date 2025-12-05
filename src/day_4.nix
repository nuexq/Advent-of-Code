let
  lib = import <nixpkgs/lib>;
  elemAt = builtins.elemAt;
  inherit (lib) map genList;

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

  cleanedLines = builtins.filter (s: s != "")
    (map lib.strings.trim (lib.strings.splitString "\n" input));
  grid = map (line: lib.strings.stringToCharacters line) cleanedLines;

  colsNum = builtins.length (elemAt grid 0);
  rowsNum = builtins.length grid;

  inBounds = r: c: r >= 0 && r < rowsNum && c >= 0 && c < colsNum;
  get = r: c: if inBounds r c then elemAt (elemAt grid r) c else ".";

  allPositions = builtins.concatLists
    (genList (r: genList (c: { inherit r c; }) colsNum) rowsNum);

  part1 = builtins.length (builtins.concatMap ({ r, c }:
    let
      cell = get r c;
      neighbors = lib.count (x: x == "@") [
        (get (r - 1) (c - 1))
        (get (r - 1) c)
        (get (r - 1) (c + 1))
        (get r (c - 1))
        (get r (c + 1))
        (get (r + 1) (c - 1))
        (get (r + 1) c)
        (get (r + 1) (c + 1))
      ];
    in if cell == "@" && neighbors < 4 then [ 1 ] else [ ]) allPositions);
in builtins.trace "Part 1" part1

