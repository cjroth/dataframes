class Vector extends Array {
    inspect() {
        return `Vector <${this.join(' ')}>`
    }
    mean() {
        let numbers = this.numbers()
        return numbers.reduce((previous, current) => previous + current, 0) / numbers.length
    }
    sum() {
        return this.numbers().reduce((previous, current) => previous + current, 0)
    }
    numbers() {
        return this.filter(element => !isNaN(Number(element)))
    }
}

class DataFrame {
    constructor(...data) {
        this.data = Vector.of(...data.map(v => Vector.of(...v)))
        this.height = data.length
        this.width = data[0].length
        return new Proxy(this, {
            get: (target, property, receiver) => {
                if (/\d+/.test(property)) {
                    return this.column(property)
                } if (this[property]) {
                    return this[property]
                } else if (typeof Vector.prototype[property] === 'function') {
                    // todo: rewrite this as a simple .map() later
                    return function() {
                        let results = new Vector()
                        for (let i = 0; i < target.width; i++) {
                            let result = target.column(i)[property](...arguments)
                            results.push(result)
                        }
                        return results
                    }
                }
            }
        })
    }
    column(index) {
        return this.data.map(row => row[index])
    }
    row(index) {
        return this.data[index]
    }
    where(where) {
        return this.data.find(where)
    }
    inspect() {
        return this.data.map(row => row.join(' ')).join('\n')
    }
    valueOf() {
        return this.data
    }
    static of() {
        return new DataFrame(...arguments)
    }
}

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
