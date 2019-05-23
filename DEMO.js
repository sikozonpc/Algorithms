function sum(n) {
	let output = 0;
	for (let i = 1; i <= n; i++) {
		output += i;
	}
	return output;
}

function charCount(string) {
	// Ouput is going to be an object with the value of each letter
	let output = {};
	// Lowercase the string for no conflcits
	const str = string.toLowerCase();
	// Traverse the string to count the chars
	// se output["t"] val++ , caso  add
	for (let l of str) {
		if (output[l] && /[a-z0-9]/.test(l)) {
			output[l] += 1;
		} else if (/[a-z0-9]/.test(l)) {
			output[l] = 1;
		}
	}

	return output;
}
//console.log( charCount("Tiago Taquelim Ferreira") );
// Naive Freqeuncy counter
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

// Frequency counter Solution O(n)
function same_refractor(arr1, arr2) {
	let freq1 = {};
	let freq2 = {};

	// Adding to the keys each value of the arr1
	// with the value being the frequency
	for (let i of arr1) {
		freq1[i] = freq1[i] ? freq1[i] + 1 : 1;
	}
	// Same before but squared
	console.log(freq1);
	for (let i of arr2) {
		freq2[i] = freq2[i] ? freq2[i] + 1 : 1;
	}
	console.log(freq2);

	// Check if the result match
	for (let key in freq1) {
		// 2**2 (4) exists in freq2?
		if (!freq2[key ** 2]) {
			return false;
		}
		// Check freq the count
		if (freq1[key] !== freq2[key ** 2]) {
			return false;
		}
	}
	return true;
}

//console.log( same_refractor( [1,2,2], [4,4,1] ) );

function validAnagram(str1, str2) {
	if (str1.length !== str2.length) return false;

	// Does the strings have the same chars and its counts
	// { a: 2, b: 1, r: 3, o: 5}
	let freq1 = {};
	let freq2 = {};

	// Iterate trough the strings and add the chars to the freq counters
	for (let i of str1) {
		freq1[i] = freq1[i] ? freq1[i] + 1 : 1;
	}
	for (let i of str2) {
		freq2[i] = freq2[i] ? freq2[i] + 1 : 1;
	}
	console.log(freq1, freq2);
	// Compare the strings and return bool
	for (let i in freq1) {
		if (!(i in freq2)) {
			return false;
		}
		// if the value of the key is diffrent
		if (freq1[i] !== freq2[i]) {
			return false;
		}
	}

	return true;
}

// console.log( validAnagram("cinema", "iceman" ) )

// Multiple Pointer Pattern
function sumZeroPar(arr) {
	let left = 0;
	let right = arr.length - 1;
	// Iterate trough the sorted array from the left
	// If sum = arr[left] + arr[right] === 0 -> return pair
	// If sum > 0 , right--
	while (left < right) {
		let sum = arr[left] + arr[right];

		if (sum === 0) {
			return [arr[left], arr[right]];
		}

		// the number is below if there is one
		if (sum > 0) {
			right--;
		}
		// the number on right is less so there isnt match for the left one
		if (sum < 0) {
			left++;
		}
	}
}

// console.log( sumZeroPar([-5,-4,-3,-2,0,2,3,8,100]) );

function countUniqueValuesFreq(arr) {
	let freq = {};
	let count = 0;

	for (let i of arr) {
		freq[i] = freq[i] ? freq[i] + 1 : 1;
	}
	console.log(freq);
	for (let num in freq) {
		if (freq[num] === 1) {
			count++;
		}
	}
	return count;
}

// console.log( countUniqueValuesFreq([-2,-1,-1,0,1]) )

// THIS WORKS because only the input is SORTED
function countUniqueValuesPointer(arr) {
	if (arr.length === 0) return 0;
	let left = 0;
	let right = 1;
	let count = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[left] !== arr[right]) {
			count++;
		}
		left++;
		right++;
	}
	return count;
}

// console.log( countUniqueValuesPointer([-2,-1,-1,0,1,1,1,1,2,2,3,5]) )

// Atempt to make a Slider window pattern
// Kinda O(n^2), but not really
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

//console.log( maxSubarraySum([1,2,5,2,8,1,5], 4) );

// 0(n)
//   8                 8-1+2
// -125-2815 then... 1-252-815 ...
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

// console.log( max_sum_refratored([1,2,5,2,8,1,5], 4) );

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
// console.log( anyOddNumber( [3142, 5798, 6550, 5914] ) );

function factorial(n) {
	if (n === 1) return 1;

	return n * factorial(n - 1);
}

// console.log( factorial(4) );

function deepEquals(obj1, obj2) {
	console.log(typeof obj1, typeof obj2);

	if (typeof obj1 === "object") {
		// Compare proeprties
		for (let prop of Object.keys(obj1)) {
			if (!(prop in obj2)) {
				return false;
			}
		}
		for (let prop of Object.keys(obj2)) {
			if (!(prop in obj1)) {
				return false;
			}
		}
		// Compare the values if the properties are equal
		for (let key in obj1) {
			if (obj2[key] !== obj1[key]) {
				return false;
			}
		}

		return true;
	} else {
		return obj1 === obj2;
	}
}

//const obj1 = {name: "Tiago",age:19};
//const obj2 = Object.create(null)
//console.log( deepEquals(obj1, obj2) )

function binarySeach(arr, val) {
	let max = arr.length;
	let min = 0;
	let middle = Math.floor((max + min) / 2);
	// While having not found the element
	while (min <= max) {
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
/*console.log(
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
);*/

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
// console.log(stringSearch("lorie loled", "lol"));

function bubbleSort(arr) {
	let temp = 0,
		noSwaps = false;

	for (let i = arr.length; i > 0; i--) {
		noSwaps = true;
		for (let j = 0; j < i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap
				noSwaps = false;
				temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
			}
		}
		// if there were no swaps then there wont be and it means the arr was nearly sorted
		if (noSwaps) break;
	}

	return arr;
}
// console.log(bubbleSort([3, 5, 1, 76, 13, 1, 43, 100, 999, 32, 42, 246, 64, 5, 2, 87]));

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
/*console.log(
	selectionSort([1, 3, 5, 76, 13, 1, 43, 100, 999, 32, 42, 246, 64, 5, 2, 87])
);
*/
// Multiple pointer Pattern

function fizzBuzz() {
	let output = "";
	for (let i = 1; i <= 100; i++) {
		output = "";
		output += i;
		if (i % 3 === 0) output += "Fizz";
		if (i % 5 === 0) output += "Buzz";
		console.log(output);
	}
}

// Merge Sort

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
// console.log(merge([1, 10, 50, 100, 200, 300, 400, 450], [2, 14, 99, 100, 150, 190, 500]));

function mergeSort(arr) {
	if (arr.length <= 1) return arr;

	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	console.log(left, right);
	return merge(left, right);
}
// console.log(mergeSort([10, 24, 76, 73, 72, 1, 100, 3, 20]));

// SINGLY LINKED LISTS
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

// const list = new SinglyLinkedList();

// Palindrome check
function palindrome(str) {
	let reversedStr = str
		.toLowerCase()
		.split("")
		.reverse()
		.join("");
	return reversedStr === str;
}

// console.log(palindrome("racecar"));

function firstDuplicate(arr) {
	let freq = {};

	for (let val of arr) {
		if (freq[val]) {
			return val;
		} else freq[val] = 1;
	}
	return -1;
}
// console.log(firstDuplicate([2, 1, 3, 5, 3, 2]));

function hash(string, max) {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		hash += string.charCodeAt(i);
	}
	return hash % max;
}

class HashTable {
	constructor() {
		this.storageLimit = 4;
		this.storage = [];
	}

	print() {
		console.log(this.storage);
	}
	getHashCode(key) {
		const hashCode = hash(key, this.storageLimit);
		console.log(hash(key, this.storageLimit));
		return hashCode;
	}

	add(key, val) {
		const index = hash(key, this.storageLimit);

		// There isn't that index on storage add it
		if (!this.storage[index]) {
			this.storage[index] = [[key, val]];
		} else {
			let inserted = false;
			// Iterate the bucket
			for (let i = 0; i < this.storage[index].length; i++) {
				// If the key already exists update the value
				if (this.storage[index][i][0] === key) {
					this.storage[index][i][1] = val;
					inserted = true;
				}
			}
			if (inserted === false) {
				this.storage[index].push([key, val]);
			}
		}
	}
}

const person = {
	firstName: "John",
	lastName: "Doe",
	id: 5566,
	fullName: function() {
		// console.log(this);
		return this.firstName + " " + this.lastName;
	},
};
function testFunc() {
	const name = "Tiago";
}

//console.log(person.fullName());
//console.log(testFunc());

// Closures - inner function has access to outer var even when the function where it is
// instanced is not active
// Funcao interior tem acesso a uma variavel externa, mesmo quando esse scope exterior ja nao existe
const add = (function() {
	let counter = 0;
	return function() {
		counter++;
		return counter;
	};
})();

add();
add();
console.log(add());

// Create arrays from Iterable like arrays
// NOTE: Good to convert node lists to Arrays !!
const strExm = "Ola meu nome é tiago.";
// console.log(Array.from(strExm));

// ASYNC

function testFuncBrug() {
	// setTimeout is ASYNC so bbbb will be printed 1st
	setTimeout(() => console.log("aaaa"), 1000);
	console.log("bbbb");
}

//testFuncBrug();

// Find the maximum sub string in each string and return it.
// if there isnt return undefined
function alg(str1, str2) {
	let out = "";
	let arr = [];

	for (let l of str1) {
		let index = str1.indexOf(l);
		// If the chars are the same
		if (l === str2[index]) {
			out += l;
		} else {
			// if there is a substring add to arr
			if (out.length > 0) {
				arr.push(out);
			}
			out = "";
		}
	}
	console.log(arr);
	// Compare and return If there is sub strings
	let output = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (output.length > arr[i].length) output = arr[i];
	}
	if (output !== undefined) return output;

	return undefined;
}

// console.log(alg("ABCDEFGTIAGO", "ZADPODDTIAGO"));

function fizzBuzz12() {
	for (let i = 1; i <= 100; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			console.log("FizzBuzz");
		} else if (i % 3 === 0) {
			console.log("Fizz");
		} else if (i % 5 === 0) {
			console.log("Buzz");
		} else {
			console.log(i);
		}
	}
}
console.log("-----------");
// fizzBuzz12();
var removeDuplicates = function(nums) {
	let freq = [];

	for (let num of nums) {
		freq.includes(num) ? null : freq.push(num);
	}
	console.log(freq);
	return freq.length;
};

removeDuplicates([1, 1, 2]);
