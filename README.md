# Data Processing Library

Import:
```
# old syntax
const { Vector: v, DataFrame: df } = require('dataframes')

# new syntax
import { Vector as v, Dataframe as df } from 'dataframes'
```

Create a vector:
```
let vector = v([1, 2, 3])
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
let matrix = v([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
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
matrix.slice(0, 2)
// Vector<
//   Vector<1, 2, 3>,
//   Vector<4, 5, 6>
// >

matrix.slice(0, 2).slice(0, 2)
// Vector<
//   Vector<1, 2>,
//   Vector<4, 5>
// >

matrix['0:2']['0:2']
// Vector<
//   Vector<1, 2>,
//   Vector<4, 5>
// >

matrix['0:2,0:2']
// Vector<
//   Vector<1, 2>,
//   Vector<4, 5>
// >
```
