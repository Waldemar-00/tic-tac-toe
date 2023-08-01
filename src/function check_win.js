function check_win(board) {
    // Check rows
    for (let row of board) {
        if (new Set(row).size === 1 && row[0] !== 0) {
            return row[0];
        }
    }

    // Check columns
    for (let col = 0; col < board.length; col++) {
        if (new Set(board.map(row => row[col])).size === 1 && board[0][col] !== 0) {
            return board[0][col];
        }
    }

    // Check diagonals
    if (new Set(board.map((row, i) => row[i])).size === 1 && board[0][0] !== 0) {
        return board[0][0];
    }
    if (new Set(board.map((row, i) => row[board.length - i - 1])).size === 1 && board[0][board.length - 1] !== 0) {
        return board[0][board.length - 1];
    }

    // No winner
    return null;
}
//!Этот код проверяет выигрышные комбинации в строках, столбцах и диагоналях. Он использует функцию Set для проверки уникальности элементов в //
//!строках, столбцах и диагоналях.Если все элементы в строке, столбце или диагонали одинаковы и не равны нулю, то это выигрышная комбинация.Если //!нет выигрышной комбинации, то функция возвращает null. Надеюсь, это поможет! Есть ли что-то еще, что я могу сделать для вас?