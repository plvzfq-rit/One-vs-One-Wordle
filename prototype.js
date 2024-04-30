// Dependencies: fs, readLine
const fs = require('fs')
const rl = require('readline-sync');

// Helper function to return a list of words of a certain length
function return_word_list (word_length_string) {

    // Retrieve the list of words from the formatted file
    let data = fs.readFileSync(`./formatted_files/${word_length_string}_letter_words.txt`, 'utf8')
    let word_array = data.split('\n');
    for (let i = 0; i < word_array.length; i++) {
        word_array[i] = word_array[i].toUpperCase().trim();
    }
    return word_array;
}

function gameLoop (word_length, ) {
    // Constants
    const tries = 6;
    const number = ['three', 'four', 'five', 'six']

    // Declarations
    let word_length_string = number[word_length - 3];
    let word_array = return_word_list(word_length_string);
    let word_array_length = word_array.length;
    let random_word = word_array[Math.floor(Math.random() * word_array_length)];
    let solved = false;
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Game loop
    for (let i = 0; i < tries; i++) {
        console.log(`You have ${tries - i} tries left.`);
        console.log(alphabet.join(''));
        let guess = rl.question(`Enter a ${word_length} letter word: `).toUpperCase().trim();
        while (true) {
            if (guess.length !== word_length) {
                console.log('Please enter a valid word length.');
            } else if (word_array.indexOf(guess) === -1) {
                console.log('Please enter a valid word.');
            } else {
                break;
            }
            guess = rl.question(`Enter a ${word_length} letter word: `).toUpperCase().trim();
        }
        if (guess === random_word) {
            console.log('You guessed the word correctly!');
            solved = true;
            break;
        } else {
            let markers = [];
            let random_word_copy = random_word.split('');
            for (let j = 0; j < guess.length; j++) {
                markers.push('.');
            }
            for (let j = 0; j < guess.length; j++) {
                alphabet[alphabet.indexOf(guess[j])] = '.';
                if (guess[j] === random_word[j]) {
                    markers[j] = 'O';
                    random_word_copy[j] = '.';
                }
            }
            for (let j = 0; j < guess.length; j++) {
                if (markers[j] === 'O') {
                    continue;
                }
                else if (random_word_copy.indexOf(guess[j]) === -1) {
                    markers[j] = 'X';
                } else {
                    markers[j] = 'o';
                    random_word_copy[random_word_copy.indexOf(guess[j])] = '.';
                }
            }
            console.log(markers.join(''));
        }
    }
    if (!solved) {
        console.log('You did not guess the word correctly.');
        console.log(`The word was ${random_word}.`);
    }
}

let halt = false;
while (!halt) {
    console.log('Welcome to the word guessing game!');
    let word_length = rl.question('Please enter the length of the word you would like to guess (3-6): ');
    while (true) {
        if (parseInt(word_length) < 3 || parseInt(word_length) > 6) {
            console.log('Please enter a valid word length.');
        } else {
            break;
        }
        word_length = rl.question('Please enter the length of the word you would like to guess (3-6): ');
    }
    gameLoop(parseInt(word_length));
    let response = rl.question('Would you like to play again? (Y/N): ').toUpperCase();
    while (true) {
        if (response === 'Y' || response === 'N') {
            break;
        } else {
            console.log('Please enter a valid response.');
        }
        response = rl.question('Would you like to play again? (Y/N): ');
    }
    if (response === 'N') {
        halt = true;
    }
}

