JSON.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}

module.exports = class Vector extends Array {
    constructor(...args) {
        super(...args)
        let reducers = ['sum', 'mean', 'inspect', 'find']
        return new Proxy(this, {
            get: (target, property, receiver) => {
                if (reducers.indexOf(this[property]) !== -1) {
                    if (this.every(m => !(m instanceof Vector))) {
                        return this[property]
                    } else {
                        return (...args) => {
                            return this.map(m => m[property](...args))[property](...args)
                        }
                    }
                } else {
                    return this[property]
                }
            }
        })
    }
    toString() {
        return this.join(' ')
    }
    inspect() {
        return this.join('\n')
    }
    mean() {
        let numbers = this.numbers()
        return numbers.reduce((previous, current) => previous + current, 0) / numbers.length
    }
    sum() {
        return this.numbers().reduce((previous, current) => previous + current, 0)
    }
    min() {
        return Math.min(...this.numbers())
    }
    max() {
        return Math.max(...this.numbers())
    }
    numbers() {
        return this.filter(m => typeof m === 'number' && !isNaN(m) && isFinite(m))
    }
    column(index) {
        return this.map(m => m[index])
    }
    row(index) {
        return this[index]
    }
    static of() {
        return Vector.from(arguments)
    }
    static fromJSON(data) {
        data = JSON.flatten(data)
        return new Vector(...data.map(item => {
            let row = new Vector()
            for (let key in item) {
                row.push(item[key])
            }
            return row
        }))
    }
}
