module.exports = function solveSudoku(matrix) {
    let fillNumbers = [];
    fillNumbers = initFillNumbersMas(matrix, fillNumbers);

    matrix = fillSudoku(matrix, fillNumbers);

    return matrix;
};

let fillSudoku = (matrix, fillNumbers) => {
    for (let i = 0; i < fillNumbers.length; i++) {
        if (i < 0) {
            return false;
        }

        let findNumber = false;
        let row = fillNumbers[i][0];
        let col = fillNumbers[i][1];
        let number = matrix[row][col] + 1;

        for (let n = number; n < 10; n++) {
            if (matrix[row].includes(n) || checkCol(matrix, col, n) || checkSquare(matrix, row, col, n)) {
                continue;
            }

            findNumber = true;
            matrix[row][col] = n;
            break;
        }

        if (!findNumber) {
            matrix[row][col] = 0;
            i-=2;
        }
    }

    return matrix;
};

let checkCol = (matrix, col, number) => {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][col] === number) {
            return true;
        }
    }

    return false;
};

let checkSquare = (matrix, row, col, number) => {
    row = row % 3 === 0 ? row : row - (row % 3);
    col = col % 3 === 0 ? col : col - (col % 3);

    for (let i = row; i < row + 3; i++) {
        for (let k = col; k < col + 3; k++) {
            if (matrix[i][k] === number) {
                return true;
            }
        }
    }

    return false;
};

let initFillNumbersMas = (matrix, fillNumbers) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[i].length; k++) {
            if (matrix[i][k] === 0) {
                fillNumbers.push([i, k]);
            }
        }
    }

    return fillNumbers;
};


