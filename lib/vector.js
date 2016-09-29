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
        let reducers = ['sum', 'mean', 'inspect', 'find', 'slice']
        let props = ['dimension']
        function getDimension(element, dimension = 1) {
            if (!(element instanceof Vector)) {
                return dimension
            }
            return getDimension(element[0], dimension + 1)
        }
        this.dimension = getDimension(args[0])
        let proxy = new Proxy(this, {
            get: (target, property, receiver) => {
                let slice
                if (reducers.indexOf(this[property]) !== -1) {
                    if (this.dimension === 1) {
                        return this[property]
                    } else {
                        return (...args) => {
                            return this.map(m => m[property](...args))[property](...args)
                        }
                    }
                } else if (/((\d*):(\d*)\,?)+/.test(property.toString())) {
                    let slices = property.toString().split(',').map(m => m.split(':'))
                    let getSlice = (v) => {
                        if (v.dimension > 1) {
                            let slice = slices[v.dimension - 1]
                            let start = parseInt(slice[0]) || undefined
                            let end = parseInt(slice[1]) || undefined
                            return getSlice(this.slice(start, end))
                        }
                        return v.map(m => getSlice(m))
                    }
                    return getSlice(this)
                    //
                    // return this.slice(slice[0][0], slice[0][1]).map(m => {
                    //     return m.slice(slice[1][0], slice[1][1])
                    // })
                    // let start = parseInt(slice[0][1]) || undefined
                    // let end = parseInt(slice[0][2]) || undefined
                    // return this.slice(start, end)
                } else {
                    return this[property]
                }
            }
        })
        return proxy
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
        return new Vector(...arguments)
        // return Vector.from(arguments)
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
