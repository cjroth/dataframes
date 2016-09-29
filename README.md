# Data Processing Library

- Everything is a Vector.
- Vectors inherit from Arrays.
- Matrices are Vectors of Vectors.

Import:
```
# old syntax
const { Vector: v } = require('dataframes')

# new syntax
import { Vector as v } from 'dataframes'

v = Vector.of
```

Create a vector:
```
let vector = new Vector(1, 2, 3)
// Vector<1, 2, 3>

let vector2 = v(1, 2, 3)
// Vector<1, 2, 3>
```

Access a vector element:
```
vector[2]
// 2
```

Slice a vector:
```
vector.slice(1, 3)
// Vector<2, 3>

vector['1:3']
// Vector<2, 3>
```

Create a matrix:
```
let matrix = v(
    v(1, 2, 3),
    v(4, 5, 6),
    v(7, 8, 9)
)
// Vector<
//   Vector<1, 2, 3>,
//   Vector<4, 5, 6>,
//   Vector<7, 8, 9>
// >
```

Get the shape of a vector or matrix:
```
matrix.shape
// [3, 3]
```

Access a matrix element:
```
matrix[1][1]
// 5

matrix['1,1']
// 5
```

Slice a matrix:
```
matrix['0:2,0:2']
// Vector<
//   Vector<1, 2>,
//   Vector<4, 5>
// >
```

Update a matrix:
```
matrix[':,1'] = v(0, 0, 0)
// Vector<
//   Vector<1, 0, 3>,
//   Vector<4, 0, 6>,
//   Vector<7, 0, 9>
// >
```

```
matrix.rows(1,4) == matrix['1:4]']
matrix.d1(1, 4).d2(3, 6)
== matrix['1:4,3:6']
== matrix.rows(1, 4).cols(3, 6)
== matrix.get([1, 4], [3, 6])
== matrix.get('1:4', '3:6')

matrix[Vector<true, false, true>] -> gets the 1st and 3rd rows

matrix[',2'].equals(matrix[',1']) -> Vector<true, false, false> (returns a vector with boolean values where the 2nd and 3rd columns are compared)
```

Mean of each column:
```
matrix.mean()
// Vector<4, 5, 6>
```

Sum of each column:
```
matrix.sum()
// Vector<4, 5, 6>
```

Mean of entire matrix:
```
// matrix.mean().mean()
// 5
```

Add labels:
```
matrix.labels('one', 'two', 'three')
```

Access a column by a label:
```
matrix['one']
// Vector<1, 4, 7>
```

Load from CSV:
```
let petals = Vector.fromCSV('petals.csv', { delimiter: ',', header: 1 })
// Vector<
//   Vector<"Iris-setosa", 2, 3>,
//   Vector<"Iris-setosa", 5, 6>
// >
```
