// Author Name: Andy Duong, Gregory Pierot, Kris Swartzbaugh
// Author Email: aqduong@csu.fullerton.edu, pierotgregory@csu.fullerton.edu, kswartzb@csu.fullerton.edu
// Course: CPSC 335-03 M 7:00pm-9:45pm
// This File: draw_grid.js - function that draws grid (called on setup)

function draw_grid() {
    background(239, 204, 239);
    for (var x = 0; x < width; x += 800 / 40) {
        for (var y = 0; y < height; y += height / 40) {
            stroke(0);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    fill(216, 201, 216);
    rect(15*20, 0, 40, 800);
    rect(15*20*2+40, 0, 40, 800);
    rect(15*20*3+80, 0, 40, 800);

    var x=10;
    var y=10;
    var insertion = "Insertion Sort";
    var golds = "Gold's Poresort";
    var merge = "Mergesort";
    var quick = "Quicksort";

  	for (var i = 0; i < 15; i++) {
        fill(0);
        if (i < insertion.length) text(insertion[i], x - 1 + 20*i, y + 4);
        if (i<golds.length) text(golds[i], (x - 2 + 20*i+17*20*1), y + 4);
        if (i<merge.length) text(merge[i], (x - 3 + 20*i+17*20*2), y + 4);
        if (i<quick.length) text(quick[i], (x - 4 + 20*i+17*20*3), y + 4);
	}
}