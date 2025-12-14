{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      inherit (nixpkgs) lib;
      supportedSystems = lib.systems.flakeExposed;
      perSystem = lib.genAttrs supportedSystems;
      pkgsFor = nixpkgs.legacyPackages;
    in
    {
      formatter = perSystem (system: pkgsFor.${system}.nixfmt-rfc-style);

      inherit lib;

      devShells = perSystem (system: {
        default = pkgsFor.${system}.mkShellNoCC {
          packages = [
            self.formatter.${system}
            pkgsFor.${system}.nil
          ];
        };
      });
    };
}
