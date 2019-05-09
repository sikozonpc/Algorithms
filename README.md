## Frequency Counters:

-   Uses sets to collect values/frequencies of values.;
-   Avoid the need for O(n^2);
-   Common problem is to know if 2 strings are Anagrams(same word arranged in diffrent ways).

```js
// Naive Freqeuncy counter O(n^2)
function same(arr1, arr2) {
	let output;

	if (arr1.length === arr2.length) {
		output = 0;
		for (let i of arr1) {
			for (let num of arr2)
				if (i ** 2 === num) {
					output++;
				}
		}
	} else return false;

	console.log(output);
	return output === arr1.length ? true : false;
}
console.log(same([1, 2, 1], [4, 4, 1]));
```

### Best solution with O(n):

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

-   Its good because storing it in objects and accesing from it is O(1) and all we need to do is check if the values of the frequencies objects match the criteria.

## Multiple Pointers Pattern:

-   Avoid the need for O(n^2);
-   Must be given a Sorted Array;
-   Works by traversing the array from 2 or more pointers, the default is 2, one from the left and one right.

```js
// [INPUT]: sortedArr of numbers
// [RETURN]: array of the first 2 pairs
function sumZeroPair(arr) {
	let left = 0; // left pointer
	let right = arr.length - 1; // right pointer
	// Traverse the array while there is valid comparions to do
	// While avoid colisions with the same number 0-0 = 0
	while (left < right) {
		let sum = arr[left] + arr[right];

		if (sum === 0) {
			return [arr[left], arr[right]];
		}
		// If the right pointer is bigger then its pair(if there is) is lower is the array
		if (sum > 0) {
			right--;
		}
		// Or if the right pointer is smaller then there is pair for that number and we move the left pointer
		if (sum < 0) {
			left--;
		}
	}
}
```

## Sliding Window Pattern:

-   This pattern involves creating a **window** which can either be an array or a number from one position to another ( from left to right is the common way ). Basicaly iterating subsets from a main big set.
-   Very Useful for keeping track of a subset of data in an array/string etc;
-   max Subarray Sum exercices are very common;

### Naive Solution O(n^2):

```js
function maxSubarraySum(arr, n) {
	if (n > arr.length) return null;

	let temp, sum;
	// Edge case for negative number arrays
	let maxSum = -Infinity;

	for (let i = 0; i < arr.length - n + 1; i++) {
		// Window pointer
		temp = i;
		sum = 0;
		// Sum the window
		for (let j = 0; j < n; j++) {
			sum += arr[temp];
			temp++;
		}
		if (sum > maxSum) {
			maxSum = sum;
		}
	}
	return maxSum;
}
```

### Best solution O(n):

-   Sliding Window mechanic is present here, as seen in the comments before the function.

```js
// 0(n)
//   8                 8-1+2=9        9-2+8=15
// -125-2815 then... 1-252-815 ... 12-528-15
// from which I substract the previous HEAD(1) and add the next
function max_sum_refratored(arr, n) {
	if (n > arr.length) return null;

	let maxSum = 0;
	let tempSum = 0;
	// Iterate one time to get the main "window"
	for (let i = 0; i < n; i++) {
		maxSum += arr[i];
	}
	// Starter window size
	tempSum = maxSum;
	// Sliding Window Algorithm "movement"
	for (let i = n; i < arr.length; i++) {
		tempSum = tempSum - arr[i - n] + arr[i];

		// Update maxSum
		if (tempSum > maxSum) {
			maxSum = tempSum;
		}
	}
	return maxSum;
}

console.log(max_sum_refratored([1, 2, 5, 2, 8, 1, 5], 4));
```

### Divide and Conquer

-   This pattern involves dividing a dataset into smaller chunks and then repeatign the process with a subset of data.

-   Tremendously decreases Time Complexity.

```js
// Naive solution for a search: Linear seach
function search(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1;
}
```

```js
// Best solution for a search: Binary Search O(logn)
function binarySeach(arr, val) {
	let max = arr.length;
	let min = 0;
	let middle = Math.floor((max + min) / 2);

	// While having not found the element
	while (mix <= max) {
		middle = Math.floor((max + min) / 2);
		let curElem = arr[middle];

		if (curElem > val) max = middle - 1;
		else if (curElem < val) min = middle + 1;
		else {
			return middle;
		}
	}
	return -1;
}
console.log(
	binarySeach(
		[
			1,
			3,
			5,
			7,
			8,
			9,
			11,
			12,
			42,
			67,
			94,
			100,
			200,
			300,
			500,
			1000,
			20000,
			999999,
		],
		300
	)
);
```

### Recursion

```js
// Recursion
function anyOddNumber(arr) {
	// Base case
	if (arr.length === 0) {
		return false;
	}
	if (arr[0] % 2 === 1) {
		return true;
	}
	console.log("arr:", arr);
	return anyOddNumber(arr.slice(1, arr.lenght));
}
console.log(anyOddNumber([3142, 5798, 6550, 5914]));
```

-   Tipical factorial example:

```js
function factorial(n) {
	if (n === 1) return 1;

	return n * factorial(n - 1);
}
```

-   Recursion helper function pattern:

```js
function outer(arr) {
    let result = [];

    function helper_rercursion(arr) {
        ... modify the result inside here ...
    }

    helper_recursion(arr);
    return result;
}
```

### String search algorithm

-   Searching for a pattern on a string.

#### Naive aproach

```js
//
// Return the number of ocurences the pattern happens inside the string
//
function stringSearch(str, pattern) {
	let counter = 0;
	let subCounter = 0;
	for (let i = 0; i < str.length; i++) {
		subCounter = 0;
		for (let j = 0; j < pattern.length; j++) {
			if (str[i + j] === pattern[j]) subCounter++;
			else break;
		}
		if (subCounter === pattern.length) counter++;
	}
	return counter;
}
console.log(stringSearch("lorie loled", "lol"));
```

#### Best solution

-   Using Regex would be a good solution. However in JS Regex slower to process

```js
```

# Sorting algorithms

## Bubble Sort O(n^2)

![](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

-   Probably the easiest to implement;
-   At each loop of comparisions the highest value will "bubble up" to the top.

```js
function bubbleSort(arr) {
	let temp = 0;

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap
				temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
			}
		}
	}

	return arr;
}
console.log(
	bubbleSort([3, 5, 1, 76, 13, 1, 43, 100, 999, 32, 42, 246, 64, 5, 2, 87])
);
```

-   However this version is "Dumber" version. It first loops trough all the values, even the sorted ones, and in the end it compares the highest with "undifined".

-   So with this a aproach we can improve the performance quite a bit for larger arrays of data and nearly sorted ones too.

```js
function bubbleSort(arr) {
	let temp = 0,
		noSwaps = false;

	// Number of iterations, also decreases as it sorts
	for (let i = arr.length; i > 0; i--) {
		noSwap = true;
		for (let j = 0; j < i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap
				noSwap = false;
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
		if (noSwaps) break;
	}
	return arr;
}
```

## Selection Sort O(n^2)

-   Similar to bubble sort but the sorted data, in this case the smaller values are placed in the beggining of the array.

-   Selects the minimum and stores it at the start, and next iteration the array is sorted.

![](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)

```js
function selectionSort(arr) {
	let min = 0;

	for (let i = 0; i < arr.length; i++) {
		min = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[min] >= arr[j]) min = j;
		}
		// Swap ES6 syntax, also only swaps if its not sorted already
		if (i !== min) [arr[i], arr[min]] = [arr[min], arr[i]];
	}
	return arr;
}
```

## Merge Sort O(n logn)

-   Divide and conquer aproach, it first divides into 1 sized arrays and then starts to **merge** them into one sorted.

![](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

```js
function mergeSort(arr) {
	if (arr.length <= 1) return arr;

	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));

	return merge(left, right);
}
console.log(mergeSort([10, 24, 76, 73, 72, 1, 100, 3]));

// accept 2 sorted arrays
function merge(arr1, arr2) {
	let output = [];
	let left = 0;
	let right = 0;
	let iterate = true;

	while (iterate) {
		if (arr1[left] === arr2[right]) {
			output.push(arr1[left], arr2[right]);
			right++;
			left++;
		}
		if (arr1[left] < arr2[right]) {
			output.push(arr1[left]);
			left++;
		} else {
			output.push(arr2[right]);
			right++;
		}
		if (!arr1[left]) {
			output.push(...arr2.slice(right, arr2.lenght));
			iterate = false;
		}
		if (!arr2[right]) {
			output.push(...arr1.slice(left, arr1.lenght));
			iterate = false;
		}
	}

	return output;
}
```

# DataStructures

## Singly Linked Lists

-   Contains **head, tail and length propety** .
-   Doesnt not keep track of each item, but only head and tail.
-   Consists of **Nodes** and each one has a **value** and a **pointer** to another node or null
-   O(1) best case for inserting, add, remove.
-   O(n) for searching and access.
-   Not the best data structure for searching.

![](https://codeforwin.org/wp-content/uploads/2015/09/Singly-linked-list.png)

-   Good for Adding and removing, since they dont have indexes.

```js
class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}

	push(value) {
		const node = new Node(value);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			// Updating the new tail;
			this.tail = node;
		}
		this.length++;
		return this;
	}

	traverse() {
		let curr = this.head;
		while (curr) {
			console.log(curr.value);
			curr = curr.next;
		}
	}

	pop() {
		if (!this.head) return undefined;

		let curr = this.head;
		let newTail = curr;
		while (curr.next !== null) {
			newTail = curr;
			curr = curr.next;
		}
		this.tail = newTail;
		this.tail.next = null;
		this.length--;
		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}
		return curr;
	}

	shift() {
		if (!this.head) return undefined;
		const oldHead = this.head;
		this.head = oldHead.next;
		this.length--;
		if (this.length === 0) {
			this.tail = null;
		}
		return oldHead;
	}
	unshift(value) {
		const newHead = new Node(value);
		if (!this.head) {
			this.head = newHead;
			this.tail = newHead;
		} else {
			const oldHead = this.head;
			this.head = newHead;
			this.head.next = oldHead;
		}
		this.length++;
		return this;
	}

	get(index) {
		if (this.length <= index || index < 0) return null;
		let counter = 0;
		let curr = this.head;
		for (let i = 0; i <= index; i++) {
			if (counter === index) return curr;
			counter++;
			curr = curr.next;
		}
		return null;
	}
	// Updates a value at specified index
	set(index, value) {
		if (index < 0 || !value) return false;

		let node = this.get(index);
		if (node) {
			node.value = value;
			return true;
		}
		return false;
	}
	// Inserts a value at the specified index, but not updating.
	insert(index, value) {
		if (index < 0 || index > this.length) return false;
		if (index === this.length) {
			this.push(value);
			return true;
		}
		if (index === 0) {
			this.unshift(value);
			return true;
		}

		const newNode = new Node(value);
		const prev = this.get(index - 1);
		const curr = this.get(index);
		newNode.next = curr;
		prev.next = newNode;
		this.length++;
		return true;
	}

	remove(index) {
		if (index > this.length || index < 0) return undefined;
		if (index === this.length - 1) {
			this.pop();
			return true;
		}
		if (index === 0) {
			this.shift();
			return true;
		}
		const pre = this.get(index - 1);
		const removed = pre.next;
		pre.next = removed.next;
		this.length--;
		return removed;
	}

	reverse() {
		let node = this.head;
		this.head = this.tail;
		this.tail = node;

		// Important for setting the new tail to null
		let pre = null;
		let next;
		// Loop trough length times the list
		for (let i = 0; i < this.length; i++) {
			next = node.next;
			// reverse
			node.next = pre;
			// move foward one
			pre = node;
			node = next;
		}
		return this;
	}
}
const list = new SinglyLinkedList();
```

## Others

### Palindrome check

```js
// Palindrome check
function palindrome(str) {
	let reversedStr = str
		.toLowerCase()
		.split("")
		.reverse()
		.join("");
	return reversedStr === str;
}
```

### First duplicate

```js
function firstDuplicate(arr) {
	let freq = {};

	for (let val of arr) {
		if (freq[val]) {
			return val;
		} else freq[val] = 1;
	}
	return -1;
}
```
