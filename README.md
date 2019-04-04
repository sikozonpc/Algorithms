## Frequency Counters:

- Uses sets to collect values/frequencies of values.;
- Avoid the need for O(n^2);
- Common problem is to know if 2 strings are Anagrams(same word arranged in diffrent ways).

```js
// Naive Freqeuncy counter O(n^2)
function same( arr1, arr2 ) {
    let output;

    if(arr1.length === arr2.length){
        output = 0;
        for( let i of arr1 ){
            for( let num of arr2 )
                if( i**2 === num ) {
                  output++;  
            }
        }
    } else return false;

    console.log(output)
    return (output === arr1.length ?  true : false)
}
console.log( same( [1,2,1], [4,4,1] ) );
```

- Best solution with O(n)

```js
// Frequency counter Solution O(n)
function same_refractor( arr1, arr2 ) {
    if(arr1.length !=== arr2.length) return false;
    
    let freq1 = {};
    let freq2 = {};

    // Adding to the keys each value of the arr1
    // with the value being the frequency
    for( let i of arr1 ) {
        freq1[i] = freq1[i] ? freq1[i]+1 : 1;
    }
    console.log(freq1)
    // Same before but squared
    for( let i of arr2 ) {
        freq2[i] = freq2[i] ? freq2[i]+1 : 1;
    }
    console.log(freq2)

    // Check if the result match
    for( let key in freq1 ){
        // 2**2 (4) exists in freq2?
        if( !freq2[key**2] ) {
            return false;
        } 
        // Check freq the count, IMPORTANT
        if( freq1[key] !== freq2[key**2] ) {
            return false
        }
    } 
    return true;
}

console.log( same_refractor( [1,2,2], [4,4,1] ) );
```

- Its good because storing it in objects and accesing from it is O(1) and all we need to do is check if the values of the frequencies objects match the criteria.

## Multiple Pointers Pattern:

- Avoid the need for O(n^2);
- Must be given a Sorted Array;
- Works by traversing the array from 2 or more pointers, the default is 2, one from the left and one right.

```js
// [INPUT]: sortedArr of numbers
// [RETURN]: array of the first 2 pairs
function sumZeroPair( arr ) {
    let left = 0; // left pointer
    let right = arr.length-1; // right pointer
    // Traverse the array while there is valid comparions to do
    // While avoid colisions with the same number 0-0 = 0
    while(left < right) {
        let sum = arr[left] + arr[right];

        if( sum === 0 ) {
            return [ arr[left], arr[right] ];
        }
        // If the right pointer is bigger then its pair(if there is) is lower is the array
        if( sum > 0 ) {
            right--;
        }
        // Or if the right pointer is smaller then there is pair for that number and we move the left pointer 
        if(sum < 0 ) {
            left--;
        }
    }
}

```