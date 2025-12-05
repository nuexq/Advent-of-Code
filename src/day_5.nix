let
  lib = import <nixpkgs/lib>;
  inherit (lib) count strings any;
  inherit (builtins) map filter elemAt fromJSON;

  input = ''
    3-5
    10-14
    16-20
    12-18

    1
    5
    8
    11
    17
    32
  '';

  cleanedLines = map (line: filter (s: s != "") (strings.splitString "\n" line))
    (lib.strings.splitString "\n\n" input);

  ranges = elemAt cleanedLines 0;
  avaible_ingredient = elemAt cleanedLines 1;

  result = count (x: x) (map (ing:
    let
      avaible = any (range:
        let list = strings.splitString "-" range;
        in if ((fromJSON (elemAt list 0)) <= (fromJSON ing)
          && (fromJSON (elemAt list 1)) >= (fromJSON ing)) then
          true
        else
          false) ranges;
    in avaible) avaible_ingredient);

in { part1 = result; }
