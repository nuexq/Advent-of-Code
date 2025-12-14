use std::collections::HashSet;
use std::time::Instant;

const INPUT: &str = "
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
";

const DIRECTIONS: [[i32; 2]; 4] = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
];

fn main() {
    let grid: Vec<Vec<char>> = INPUT
        .trim()
        .lines()
        .map(|line| line.chars().collect())
        .collect();

    let mut trailheads: Vec<String> = Vec::new();

    let start = Instant::now();

    for (row_idx, row) in grid.iter().enumerate() {
        for (col_idx, &col) in row.iter().enumerate() {
            if col == '0' {
                hike(&grid, &format!("{row_idx} {col_idx}"), row_idx, col_idx, &mut trailheads);
            }
        }
    }

    let unique_trailheads: HashSet<_> = trailheads.iter().collect();

    println!("Unique trailheads count: {}", unique_trailheads.len());
    println!("Total trailheads count: {}", trailheads.len());
    println!("Time taken: {:?}", start.elapsed());
}

fn hike(grid: &Vec<Vec<char>>, origin: &str, x: usize, y: usize, trailheads: &mut Vec<String>) {
    if grid[x][y] == '9' {
        trailheads.push(format!("{origin} {x} {y}"));
    }

    for [dr, dc] in DIRECTIONS.iter() {
        let nx = x as i32 + dr;
        let ny = y as i32 + dc;

        if nx >= 0 && (nx as usize) < grid.len() && ny >= 0 && (ny as usize) < grid[0].len() {
            let (nx, ny) = (nx as usize, ny as usize);

            if grid[nx][ny] == (grid[x][y] as u8 + 1) as char {
                hike(grid, origin, nx, ny, trailheads);
            }
        }
    }
}

