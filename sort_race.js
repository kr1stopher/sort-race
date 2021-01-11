// Author Name: Kris Swartzbaugh
// This File: sort_race.js - contains the setup and draw function for p5.js
// along with implementations for each sorting algorithm


/************************************************
 *               INSERTION SORT
 ***********************************************/

function insertion_sort(input) {
    this.passes = 0;
    this.sorted = false;
    this.array = input;
    this.position = 1;
    this.perform_pass = insertion_pass;
}

function insertion_pass() {
    if (this.sorted == false) {
        var current = this.position;
        while (current > 0 && this.array[current - 1] > this.array[current]) {
            var temp = this.array[current];
            this.array[current] = this.array[current - 1];
            this.array[current - 1] = temp;
            current--;
        }
        this.position++;
        if (this.position == this.array.length) {
            this.sorted = true;
        }
        this.passes++;
    }
}


/************************************************
 *              GOLD'S PORESORT
 ***********************************************/

function pore_sort(input) {
    this.passes = 0;
    this.sorted = false;
    this.perform_pass = pore_pass;
    this.array = input;
    this.dirty_bit;
}

function pore_pass() {
    if (this.sorted == false) {
        this.dirty_bit = false;

        for (var i = 0; i < this.array.length - 1; i += 2) {
            if (this.array[i] > this.array[i + 1]) {
                var temp = this.array[i + 1];
                this.array[i + 1] = this.array[i];
                this.array[i] = temp;
                this.dirty_bit = true;
            }
        }
        for (var i = 1; i < this.array.length; i += 2) {
            if (this.array[i] > this.array[i + 1]) {
                var temp = this.array[i + 1];
                this.array[i + 1] = this.array[i];
                this.array[i] = temp;
                this.dirty_bit = true;
            }
        }
        if (this.dirty_bit == false) {
            this.sorted = true;
        }
        this.passes++;
    }
}


/************************************************
 *                  MERGE SORT
 ***********************************************/

function merge_sort(input) {
    this.passes = 0;
    this.sorted = false;
    this.perform_pass = merge_pass;
    this.array = input;  // holds the array that is outputted
    this.partitions = new Array(input.length);  // holds the array broken down into partitions (used for actual sorting)
    for (var i = 0; i < input.length; i++) {
        this.partitions[i] = new Array(input[i]);
    }
}

function merge_pass() {
    // creates appropriate number of partitions and merges partitions from previous pass
    if (this.passes == 0) {
        var temp = new Array(Math.trunc(this.partitions.length/2) + 1);
        temp[temp.length - 1] = this.partitions[this.partitions.length - 1];
        for (var i = 0; i < temp.length - 1; i++) {
            temp[i] = merge(this.partitions[2 * i], this.partitions[2 * i + 1]);
        }
    }
    else {
        var temp = new Array(Math.trunc(this.partitions.length/2));
        for (var i = 0; i < temp.length; i++) {
            temp[i] = merge(this.partitions[2 * i], this.partitions[2 * i + 1]);
        }
    }
    this.partitions = temp;
    this.passes++;
    // array is sorted when there is only one partition left (it will contain all array elements)
    if (this.partitions.length == 1) {
        this.sorted = true;
    }
    // Following code used for GUI only; not necessary for sorting (unless on last pass)
    // Rewrites partitions into single array
    var k = 0;
    for (var j = 0; j < this.partitions.length; j++) {
        for (var l = 0; l < this.partitions[j].length; l++) {
            this.array[k] = this.partitions[j][l];
            k++;
        }
    }
}

// merges two sorted arrays, result being sorted as well
function merge(partition1, partition2) {
    var result = new Array(partition1.length + partition2.length);
    var i = 0; j = 0; k = 0;
    while (i < partition1.length && j < partition2.length) {
        if (partition1[i] < partition2[j]) {
            result[k++] = partition1[i++];
        }
        else {
            result[k++] = partition2[j++];
        }
    }
    while (i < partition1.length) {
        result[k++] = partition1[i++];
    }
    while (j < partition2.length) {
        result[k++] = partition2[j++];
    }
    return result;
}


/************************************************
 *               QUICK SORT
 ***********************************************/

function quick_sort(input) {
    this.passes = 0;
    this.sorted = false;
    this.perform_pass = quick_pass;
    this.array = input; // holds array to be outputted
    this.partitions = [input]; // holds the array broken down into partitions (used for actual sorting)
}

function quick_pass() {
    var temp = [];
    var j = 0;

    for (var i = 0; i < this.partitions.length; i++) {
        if (this.partitions[i].length > 1) {
            var index = parseInt(quickPartition(this.partitions[i]));
            if (index != 0) {
                temp[j++] = this.partitions[i].slice(0, index);
            }
            temp[j++] = [this.partitions[i][index]];
            if (index != this.partitions[i].length - 1) {
                temp[j++] = this.partitions[i].slice(index + 1, this.partitions[i].length);
            }
        }
        else {
            temp[j++] = [this.partitions[i][0]];
        }
    }
    this.partitions = temp.slice();

    this.passes++;
    if (this.partitions.length == this.array.length) {
        this.sorted = true;
    }
    
    var k = 0;
    for (var i = 0; i < this.partitions.length; i++) {
        for (var l = 0; l < this.partitions[i].length; l++) {
            this.array[k] = this.partitions[i][l];
            k++;
        }
    }
}

// partition function used for each pass of quicksort
function quickPartition(qArray) {
    var pivot  = qArray[Math.floor(qArray.length / 2)];
    //choose middle element for pivot
    i = 0; //left pointer
    j = qArray.length - 1; //right pointer

    //move left and right pointers along until appropriate items are found
    while (i <= j) {
        while (qArray[i] < pivot) {
            i++;
        }
        while (qArray[j] > pivot) {
            j--;
        }
        //if i<=j need to swap elements & increment
        if (i <= j) {
            quickSwap(qArray, i, j);
            i++;
            j--;
        }
    }
    return i - 1;
}

// function used to swap elements of specified indices
function quickSwap(qArray, leftIndex, rightIndex){
    var temp = qArray[leftIndex];
    qArray[leftIndex] = qArray[rightIndex];
    qArray[rightIndex] = temp;
}


/************************************************
 *             Display Function
 ***********************************************/

function display(object, type) {
    let x = 10;
    let y = 10;
    fill(0);
    for (var i = 0; i < object.array.length; i++) {
        if (type == "insertion") {
            text(object.array[i], 20 * i + 7, object.passes * 20 + 35);
        }
        if (type == "pore") {
            text(object.array[i], 20 * i + 345, object.passes * 20 + 35);
        }
        if (type == "merge") {
            text(object.array[i], 20 * i + 687, object.passes * 20 + 35);
        }
        if (type == "quick") {
            text(object.array[i], 20 * i + 1024, object.passes * 20 + 35);
        }
    }
}

/************************************************
 *             "MAIN" STARTS HERE 
 ***********************************************/

// sample 15 character hexidecimal strings 
var sample_inputs = [
    "05CA627BC2B6F03",
    "065DE6671F040BA",
    "0684FB893D5754E",
    "07C9A2D183E4B65",
    "09F48E7862D2616",
    "1FAB3D47905C286",
    "286E1D0342D7859",
    "30E530C4786AF21",
    "328DE4765C10BA9",
    "34F2756F18E90BA",
    "D7859286E2D0342"
];

// String/Array Setup
var string = sample_inputs[Math.floor(Math.random() * 12)];
var array = string.split('');

// Sorting Objects Setup
var insertion_object = new insertion_sort(array);
var pore_object = new pore_sort(array);
var merge_object = new merge_sort(array);
var quick_object = new quick_sort(array);

var g_canvas = {cell_size: 20, wid: 66, hgt: 40};

// P5.JS Canvas Setup
function setup() {
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid * sz;
    let hight = g_canvas.hgt * sz;
    createCanvas(width, hight);
    draw_grid();
    frameRate(2); // used to control speed
    
    // display original arrays on canvas
    display(insertion_object, "insertion");
    display(pore_object, "pore");
    display(merge_object, "merge");
    display(quick_object, "quick");
}

var called = false;

function draw() {
    if (insertion_object.sorted == false) {
        insertion_object.perform_pass();
        display(insertion_object, "insertion");
    }
    if (pore_object.sorted == false) {
        pore_object.perform_pass();
        display(pore_object, "pore");
    }
    if (merge_object.sorted == false) {
        merge_object.perform_pass();
        display(merge_object, "merge");
    }
    if (quick_object.sorted == false) {
        quick_object.perform_pass();
        display(quick_object, "quick");
    }
    if (all_sorted() == true) {
        if (called == false) {
            setTimeout(restart, 5000); // change pause at end here
            called = true;
        }
    }
}

function all_sorted() {
    if (insertion_object.sorted = true &&
        pore_object.sorted == true &&
        merge_object.sorted == true && 
        quick_object.sorted == true) {
            return true;
    }
    else {
        return false;
    }
}

var times_sorted = 0;
function restart() {
    if (times_sorted < 15) {
        let placeholder = array[14];
        array.unshift(placeholder);
        array.pop();
        insertion_object = new insertion_sort(array);
        pore_object = new pore_sort(array);
        merge_object = new merge_sort(array);
        quick_object = new quick_sort(array);
        draw_grid()
        display(insertion_object, "insertion");
        display(pore_object, "pore");
        display(merge_object, "merge");
        display(quick_object, "quick");
        called = false;
    }
}
