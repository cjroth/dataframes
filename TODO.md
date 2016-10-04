# To Do

- reverse columns/rows
- rotate (switch rows and columns)

- min
- max
- groupBy
- movingAverage (simple)
- movingAverage (exponential)
- mode
- product

- column names

- look into integrating with existing stats library

- fromCSV
- toCSV
- fromJSON
- toJSON

- type casting of columns

# Vector Math
```
require('operator-overloading')(function() {

    Array.prototype.__plus = function(left) {
        if (!(left instanceof Array)) {
            return left + this;
        }
        return this.map(function(m, i) {
            return m + left[i]
        })
    }

    console.log([1,2,3] + [4,5,6])

})()
```

# Long Term

- native d3 support
- native support of times (moment, moment-range, moment-timezone)
