const fs = require('fs')

function return_word_list (word_length_string) {

    // Retrieve the list of words from the formatted file
    let data = fs.readFileSync(`../formatted_files/${word_length_string}_letter_words.txt`, 'utf8')
    let word_array = data.split('\n');
    for (let i = 0; i < word_array.length; i++) {
        word_array[i] = word_array[i].toUpperCase().trim();
    }
    return word_array;
}

function getUniqueSymbols (word_array) {
    let unique_symbols = new Set(word_array.join('').split(''));
    return Array.from(unique_symbols).sort();
}

let word_length = 'four'
let word_array = return_word_list(word_length);
let unique_symbols = getUniqueSymbols(word_array);

//
let stoi = {}
for (let i = 0; i < unique_symbols.length; i++) {
    stoi[unique_symbols[i]] = i + 1;
}
stoi['.'] = 0;
let itos = {}
for (let i = 0; i < unique_symbols.length; i++) {
    itos[i + 1] = unique_symbols[i];
}
itos[0] = '.';

let matrix = []
for (let i = 0; i < unique_symbols.length + 1; i++) {
    let row = []
    for (let j = 0; j < unique_symbols.length + 1; j++) {
        row.push(0)
    }
    matrix.push(row)
}
// console.log(matrix);

word_array.forEach(word => {
    chs = '.' + word + '.';
    for (let i = 0; i < chs.length - 1; i++) {
        ix1 = stoi[chs[i]]
        ix2 = stoi[chs[i + 1]]
        matrix[ix1][ix2] += 1
    }
});

matrix.forEach(row => {
    let sum = 0
    for (let i = 0; i < row.length; i++) {
        sum += row[i];
    }
    for (let i = 0; i < row.length; i++) {
        row[i] /= sum;
    }
});

console.log(matrix);