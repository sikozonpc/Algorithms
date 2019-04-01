## Frequency Counters
- Uses sets to collect values/frequencies of values.;
- Avoid the need for O(n^2);

```js
// Naive Frequency counter O(n^2)
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
