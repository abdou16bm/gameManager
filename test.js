/*
let sudoku = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const checkLine = function (callback){
    let check = true;
    for (let i = 0; i < sudoku.length; i++){
        for(let val = 1; val < 10; val++){
            check = check && sudoku[i].includes(val)
        }
    }
    if(callback) callback(check)
    // return check;
}


const checkColone = function (callback){
    let check = true;
    let arrayCheck = []
    for (let i = 0; i < sudoku.length; i++){
        for (let j = 0; j < sudoku[i].length; j++){
            arrayCheck = []
            for(let val = 1; val < 10; val++){
                console.log(sudoku[i][j])
                arrayCheck.push(sudoku[i][j])
                // console.log(arrayCheck)
                console.log(arrayCheck.includes(val))
                check = check && arrayCheck.includes(val)
            }

        }
    }
    if(callback) callback(check)
    // return check;
}

const checkBlock = function (callback){
    let check = true;
    let arrayCheck = [];
    for (let i = 0; i < sudoku.length; i++){
        // console.log(sudoku[i])
        for(let j = 0; j<3; j++){
            for(let k = 0; k<3; k++){
                arrayCheck.push(sudoku[j][k])
            }
            // arrayCheck.push(sudoku[i][j])

        }

    }
    console.log(arrayCheck)
    if(callback) callback(check)
}



checkLine(function (result){
    console.log(result)

    checkColone(function (result1){
        console.log(result1)

        // checkBlock(function (result2){

        // console.log(result2)
        // })
    })

    // checkBlock(function (result2){

    // console.log(result2)
    // })
})


console.log('test',sudoku[0][1])
*/


const user_module = require('./generateApp/admin_app/lib/user')

let timeNow = new Date().getHours();

console.log(timeNow)
console.log(timeNow > 6)

let dateNow = new Date().toISOString().slice(0, 10).replace('T', ' ');

let toDay = new Date();
toDay.setDate(toDay.getDate() - 1);
let yesterday = toDay.toISOString().slice(0, 10).replace('T', ' ');


console.log("yesterday",toDay)
console.log("yesterday : ",toDay.toISOString())
console.log("yesterday",yesterday)
