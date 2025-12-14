import fs from "fs";

const input = fs
	.readFileSync("input.txt", "utf-8")
	.split("")
	.filter((char) => char !== "\n");

function p1(chars: string[]) {
	let map: (number | string)[] = [];
	let k = 0;
	let fileId = 0;

	for (const char of chars) {
		if (k % 2 === 0) {
			for (let j = 0; j < Number(char); j++) {
				map.push(fileId);
			}
			fileId++;
		} else {
			for (let j = 0; j < Number(char); j++) {
				map.push(".");
			}
		}
		k++;
	}

	let res: (number | string)[] = [];
	for (let i = 0; i < map.length; i++) {
		if (map[i] !== ".") {
			res.push(map[i]);
			map[i] = ".";
		} else {
			const rem = map.findLast((x) => x !== ".");
			if (rem !== undefined && typeof rem === "number") {
				res.push(rem);
				map[map.lastIndexOf(rem)] = ".";
			}
		}
	}

	const v = res.map((x) => (typeof x === "number" ? x : 0));

	let c1 = 0;
	for (let k = 0; k < v.length; k++) {
		c1 = c1 + k * v[k];
	}

  console.log("part 1: ", c1)
}

function p2(input) {
	let files: Record<number, [number, number]> = {};
	let blanks: [number, number][] = [];

	let fid = 0;
	let pos = 0;

	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		const x = parseInt(char);
		if (i % 2 === 0) {
			if (x === 0) {
				throw new Error("unexpected x=0 for file");
			}
			files[fid] = [pos, x];
			fid++;
		} else {
			if (x !== 0) {
				blanks.push([pos, x]);
			}
		}
		pos += x;
	}

	while (fid > 0) {
		fid--;
		const [startPos, size] = files[fid];
		for (let i = 0; i < blanks.length; i++) {
			const [blankStart, blankLength] = blanks[i];
			if (blankStart >= startPos) {
				blanks = blanks.slice(0, i);
				break;
			}
			if (size <= blankLength) {
				files[fid] = [blankStart, size];
				if (size === blankLength) {
					blanks.splice(i, 1);
				} else {
					blanks[i] = [blankStart + size, blankLength - size];
				}
				break;
			}
		}
	}

	let c2 = 0;

	for (const [fid, [startPos, size]] of Object.entries(files)) {
		const numFid = parseInt(fid);
		for (let x = startPos; x < startPos + size; x++) {
			c2 += numFid * x;
		}
	}

  console.log("part 2: ", c2)
}

p1(input);
p2(input)
