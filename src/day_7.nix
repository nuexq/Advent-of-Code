let
  lib = import <nixpkgs/lib>;
  inherit (lib) strings range toInt lists;
  inherit (builtins)
    map filter length foldl' elemAt toString attrNames concatMap listToAttrs
    concatStringsSep;

  input = builtins.readFile ./input.txt;

  lines = filter (s: s != "") (strings.splitString "\n" input);
  grid = map strings.stringToCharacters lines;
  height = (length grid) - 1;

  SColPos = lists.findFirstIndex (c: c == "S") null (builtins.head grid);

  startPoint = "0-${toString SColPos}";

  simulate = foldl' (acc: i:
    let
      beams = attrNames acc.beams;
      newBeams = concatMap (beam:
        let
          beamPos = strings.splitString "-" beam;
          row = (toInt (elemAt beamPos 0)) + 1;
          col = toInt (elemAt beamPos 1);
          nextBeamPos = [ row col ];

          nextCell = elemAt (elemAt grid row) col;
        in if nextCell != "^" then
          [ (concatStringsSep "-" (map toString nextBeamPos)) ]
        else [
          "${toString row}-${toString (col - 1)}"
          "${toString row}-${toString (col + 1)}"
        ]) beams;

      newCount = (length newBeams) - (length beams);
      newBeamAttr = listToAttrs (map (x: {
        name = x;
        value = true;
      }) newBeams);
    in {
      beams = newBeamAttr;
      counter = acc.counter + newCount;
    }) {
      beams = { "${startPoint}" = true; };
      counter = 0;
    } (range 1 height);

  part1 = simulate.counter;

in { inherit part1; }
