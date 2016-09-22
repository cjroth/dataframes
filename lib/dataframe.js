const Vector = require('./vector')

module.exports = class DataFrame {
    constructor(...data) {
        this.data = Vector.of(...data.map(v => Vector.of(...v)))
        this.height = data.length
        this.width = data[0].length
        return new Proxy(this, {
            get: (target, property, receiver) => {
                if (/\d+/.test(property.toString())) {
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
