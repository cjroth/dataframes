const Vector = require('./lib/vector')
const DataFrame = require('./lib/DataFrame')

const v = Vector.of
const df = DataFrame.of

let df1 = df(
    v(1, 2, 3),
    v(4, 5, 6),
    v(7, 8, 9)
)
// 1 2 3
// 4 5 6
// 7 8 9
console.log(df1)
console.log(`width: ${df1.width}`, `height: ${df1.height}`)

let where = df1.where(x => x[1] == 5)
// [4, 5, 6]
console.log('where', where)

let column = df1.column(1)
// [2, 5, 8]
console.log(column)

let column2 = df1[2]
console.log(column2)

let row = df1.row(2)
// [7, 8, 9]
console.log(row)

let mean = df1.sum()
console.log(mean)
