use std::collections::HashMap;
use std::time::Instant;

const INPUT: &str = "890 0 1 935698 68001 3441397 7221 27";

fn better_solution(input: &str, blinks: u32) {
    let rocks = input
        .split_whitespace()
        .map(|x| x.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();

    let mut rocks_map: HashMap<u64, u64> = HashMap::new();
    rocks.iter().for_each(|&x| {
        rocks_map.insert(x, 1);
    });

    let mut blinked = 0;
    while blinked < blinks {
        let cur: HashMap<u64, u64> = rocks_map.clone();
        rocks_map.clear();

        cur.iter().for_each(|(k, count)| {
            let rocks_string = k.to_string();
            if *k == 0 {
                rocks_map
                    .entry(1)
                    .and_modify(|v| *v += count)
                    .or_insert(*count);
            } else if rocks_string.len() % 2 == 0 {
                let half_length = (rocks_string.len() + 1) / 2;
                let (x1, x2) = rocks_string.split_at(half_length);
                rocks_map
                    .entry(x1.parse::<u64>().unwrap())
                    .and_modify(|v| *v += count)
                    .or_insert(*count);
                rocks_map
                    .entry(x2.parse::<u64>().unwrap())
                    .and_modify(|v| *v += count)
                    .or_insert(*count);
            } else {
                rocks_map
                    .entry(k * 2024)
                    .and_modify(|v| *v += count)
                    .or_insert(*count);
            }
        });
        blinked += 1;
    }

    let mut total = 0;
    rocks_map.iter().for_each(|(_, v)| {
        total += v;
    });
    println!("Total rocks after {} blinks: {}", blinked, total);
}

fn main() {
    let start = Instant::now();

    better_solution(INPUT, 75);

    println!("Time taken: {:?}", start.elapsed()); // printing time taken
}

// old solution - very slow on big blinks
fn p1(input: &str) -> usize {
    let mut rocks = input
        .split_whitespace()
        .map(|x| x.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();
    let mut blinked = 0;

    while blinked < 25 {
        let mut new_rocks: Vec<u64> = Vec::new();
        for rock in &rocks {
            let rock_string = rock.to_string();
            if *rock == 0 {
                new_rocks.push(1);
            } else if rock_string.len() % 2 == 0 {
                let half_length = (rock_string.len() + 1) / 2;
                let (x1, x2) = rock_string.split_at(half_length);
                new_rocks.push(x1.parse::<u64>().unwrap());
                new_rocks.push(x2.parse::<u64>().unwrap());
            } else {
                new_rocks.push(rock * 2024);
            }
        }
        rocks = new_rocks;
        blinked += 1;
    }

    println!("Total rocks after {} blinks: {}", blinked, rocks.len());
    rocks.len()
}
