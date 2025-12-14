import fs from "fs/promises";

async function main() {
	try {
		const input = await fs.readFile("input.txt", "utf8");
		const lines = input.split("\n").filter((line) => line.trim());

		const part1Result = part1(lines);
		console.log("Part 1", part1Result);

		const part2Result = part2(lines);
		console.log("Part 2", part2Result);
	} catch (err) {
		console.error("Error processing the file:", err);
	}
}

function isSafeReport(numbers) {
	let isIncreasing = null;

	for (let i = 0; i < numbers.length - 1; i++) {
		const diff = numbers[i + 1] - numbers[i];

		if (Math.abs(diff) === 0 || Math.abs(diff) > 3) {
			return false;
		}

		if (diff > 0) {
			if (isIncreasing === false) return false;
			isIncreasing = true;
		} else if (diff < 0) {
			if (isIncreasing === true) return false;
			isIncreasing = false;
		}
	}

	return true;
}

// Part 1
function part1(lines) {
	let safeCount = 0;

	for (const line of lines) {
		const numbers = line.split(" ").map(Number);

		if (isSafeReport(numbers)) {
			safeCount++;
		}
	}

	return safeCount;
}

// Part 2
function part2(lines) {
	let safeCount = 0;

	for (const line of lines) {
		const numbers = line.split(" ").map(Number);

		if (isSafeReport(numbers)) {
			safeCount++;
			continue;
		}

		for (let i = 0; i < numbers.length; i++) {
			const modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));

			if (isSafeReport(modifiedNumbers)) {
				safeCount++;
				break;
			}
		}
	}

	return safeCount;
}

main();
