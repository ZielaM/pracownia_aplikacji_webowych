import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function greet(name) {
    console.log(`Hello, ${name}!`);
}

function validateName(name) {
    if (name.trim() === '') {
        console.log('Name cannot be empty. Please try again.');
        return false;
    }
    return true;
}

function askNameAsync() {
    return new Promise((resolve) => {
        rl.question('What is your name? ', resolve);
    });
}

async function main() {
    let name;
    do {
        name = await askNameAsync();
    } while (!validateName(name));
    greet(name);
    for (let i = 0; i < 3; i++) {
        console.log(i + 1);
    }
    rl.close();
    let v1 = 10;
    let v2 = 20;
    let v3 = 30;

    console.log(v1, v2, v3);
}

main();
