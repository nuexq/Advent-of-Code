const fs = require("fs").promises;

async function processAndCompareFile() {
	try {
		const input = await fs.readFile("input.txt", "utf8");

		const lines = input
			.split("\n")
			.filter((line) => line.trim())
			.map((line) => {
				const [left, right] = line.split(/\s+/);
				return [left, right];
			});

		const leftSide = lines.map(([left]) => Number(left));
		const rightSide = lines.map(([, right]) => Number(right));

		// Part 1
		const sortedLeft = leftSide.sort((a, b) => a - b);
		const sortedRight = rightSide.sort((a, b) => a - b);

		let distances = [];
		for (let i = 0; i < lines.length; i++) {
			const distance = Math.abs(sortedLeft[i] - sortedRight[i]);
			distances.push(distance);
		}

		const distanceResult = distances.reduce((a, b) => a + b, 0);
		console.log("Total Distance:", distanceResult);

		// Part 2
		let similarities = [];

		for (let i = 0; i < leftSide.length; i++) {
			let count = 0;
			for (let j = 0; j < rightSide.length; j++) {
				if (rightSide[j] === leftSide[i]) {
					count++;
				}
			}

			similarities.push(leftSide[i] * count || 0);
		}

		let similarityResult = similarities.reduce((a, b) => a + b, 0);
		console.log("Total Similarity:", similarityResult);
	} catch (err) {
		console.error("Error processing the file:", err);
	}
}

processAndCompareFile();
