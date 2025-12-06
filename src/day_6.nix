let
  lib = import <nixpkgs/lib>;
  inherit (lib) strings foldl' init last range;
  inherit (builtins) map filter length elemAt;

  input = ''
    123 328  51 64 
     45 64  387 23 
      6 98  215 314
    *   +   *   +  
  '';
  # input = builtins.readFile ./input.txt;

  cleanedInput = filter (x: x != "") (strings.splitString "\n" input);

  numbers = map (x: filter (y: y != "") (strings.splitString " " x))
    (init cleanedInput);
  operations =
    filter (x: x != "") (strings.splitString " " (last cleanedInput));

  problems = map (i:
    let
      col =
        map (j: (elemAt (elemAt numbers j) i)) (range 0 ((length numbers) - 1));
    in col) (range 0 ((length (elemAt numbers 0)) - 1));

  part1 = foldl' (total: idx:
    let
      numbers = elemAt problems idx;
      operation = elemAt operations idx;

      ints = map strings.toInt numbers;

      result = if operation == "+" then
        builtins.foldl' (a: b: a + b) 0 ints
      else
        builtins.foldl' (a: b: a * b) 1 ints;
    in total + result) 0 (range 0 (length problems - 1));

in { inherit part1; }
