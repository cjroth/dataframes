module.exports = class Vector extends Array {
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
        return this.filter(element =>  typeof element === 'number' && !isNaN(element) && isFinite(element))
    }
}
