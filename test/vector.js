const expect = require('chai').expect

const Vector = require('../lib/vector')
const v = Vector.of

describe('Vector', () => {
    describe('#of()', () => {
        it('should create a new vector', () => {
            let elements = [1, 2, 3]
            let vectorOf = Vector.of(...elements)
            let newVector = new Vector(...elements)
            expect(vectorOf).to.have.members(newVector)
        })
    })
    describe('#numbers()', () => {
        it('should return a new vector containing only numeric elements', () => {
            let notNumbers = [NaN, null, undefined, 'string', ['array'], {}, Infinity, -Infinity, "4"]
            let numbers = [-1, 0, 1, 2, 3.5]
            let vector = new Vector(...numbers, ...notNumbers)
            expect(vector.numbers()).to.have.members(numbers)
        })
    })
    describe('#sum()', () => {
        it('should return the sum of the numbers in a vector', () => {
            let vector = new Vector(1, 2, 3, 4, "5")
            expect(vector.sum()).to.equal(10)
        })
    })
    describe('#mean()', () => {
        it('should return the mean of the numbers in a vector', () => {
            let vector = new Vector(1, 2, 3, 4, "5")
            expect(vector.mean()).to.equal(2.5)
        })
    })
})
