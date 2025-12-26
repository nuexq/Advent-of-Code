let
  lib = import <nixpkgs/lib>;
  inherit (lib) strings range;
  inherit (builtins) filter foldl' substring stringLength fromJSON;
  mod = a: b: let r = a - b * (a / b); in if r < 0 then r + b else r;
  CIRCLE_SIZE = 100;
  START = 50;

  input = ''
    L68
    L30
    R48
    L5
    R60
    L55
    L1
    L99
    R14
    L82
  '';

  rotations = filter (s: s != "") (strings.splitString "\n" input);

  parseRotation = rotation:
    let
      direction = substring 0 1 rotation;
      distanceStr = substring 1 (stringLength rotation - 1) rotation;
      distance = fromJSON distanceStr;
    in {
      direction = direction;
      distance = distance;
    };

  countZerosAtEnd = rotations: start:
    (foldl' (state: rotation:
      let
        parsed = parseRotation rotation;
        newPointer = mod (state.pointer + (if parsed.direction == "R" then
          parsed.distance
        else
          100 - parsed.distance)) 100;
      in {
        pointer = newPointer;
        zeroCount =
          if newPointer == 0 then state.zeroCount + 1 else state.zeroCount;
      }) {
        pointer = start;
        zeroCount = 0;
      } rotations).zeroCount;

  countZerosDuring = rotations: start:
    let
      stepZeroCount = state: rotation:
        let
          parsed = parseRotation rotation;
          step = if parsed.direction == "R" then 1 else -1;

          newState = foldl' (prev: _:
            let newPointer = mod (prev.pointer + step) CIRCLE_SIZE;
            in {
              pointer = newPointer;
              zeroCount =
                if newPointer == 0 then prev.zeroCount + 1 else prev.zeroCount;
            }) state (range 1 parsed.distance);
        in newState;

      initialState = {
        pointer = start;
        zeroCount = 0;
      };
    in (foldl' stepZeroCount initialState rotations).zeroCount;

in {
  part1 = (countZerosAtEnd rotations START);
  part2 = (countZerosDuring rotations START);
}
