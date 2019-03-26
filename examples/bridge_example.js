/**
 * 
 */

var iso1;

function createObjects() {

	for (var i = -50; i < 50; i += 18.1) {

		var base = {
			'origin' : [ i, 0, 0 ],
			'nodes' : [ [ -2.2, -2.2, -2 ], [ -2.2, -2.2, 2 ], [ 2.2, -2.2, 2 ], [ 2.2, -2.2, -2 ], [ 2.2, 2.2, -2 ], [ 2.2, 2.2, 2 ],
					[ -2.2, 2.2, 2 ], [ -2.2, 2.2, -2 ] ],
			'faces' : [ {
				id : "f0",
				nodes : [ 0, 1, 2, 3 ],
				color : "terrain"
			}, {
				id : "f1",
				nodes : [ 3, 2, 5, 4 ],
				color : "terrain"
			}, {
				id : "f3",
				nodes : [ 4, 5, 6, 7 ],
				color : "terrain"
			}, {
				id : "f4",
				nodes : [ 7, 6, 1, 0 ],
				color : "terrain"
			}, {
				id : "f5",
				nodes : [ 1, 6, 5, 2 ],
				color : "terrain"
			} ]
		};

		var pila = {
			'origin' : [ i, 0, 0 ],
			'nodes' : [ [ -2, -2, 2.1 ], [ -2, -2, 6 ], [ 2, -2, 6 ], [ 2, -2, 2.1 ], [ 2, 2, 2.1 ], [ 2, 2, 6 ], [ -2, 2, 6 ], [ -2, 2, 2.1 ] ],
			'faces' : [ {
				id : "f0",
				nodes : [ 0, 1, 2, 3 ],
				color : "#cbcbcb"
			}, {
				id : "f1",
				nodes : [ 3, 2, 5, 4 ],
				color : "#cbcbcb"
			}, {
				id : "f3",
				nodes : [ 4, 5, 6, 7 ],
				color : "#cbcbcb"
			}, {
				id : "f4",
				nodes : [ 7, 6, 1, 0 ],
				color : "#cbcbcb"
			} ]
		};

		var arco = {
			'origin' : [ i, 0, 0 ],
			'nodes' : [ [ 2, -2, 6 ], [ -2, -2, 6 ], [ -3, -2, 8 ], [ -5, -2, 10 ], [ -7, -2, 11 ], [ -9, -2, 11 ], [ -9, -2, 13 ], [ -7, -2, 13 ],
					[ -5, -2, 13 ], [ -3, -2, 13 ], [ 3, -2, 13 ], [ 5, -2, 13 ], [ 7, -2, 13 ], [ 9, -2, 13 ], [ 9, -2, 11 ], [ 7, -2, 11 ],
					[ 5, -2, 10 ], [ 3, -2, 8 ], [ -2, 2, 6 ], [ 2, 2, 6 ], [ 3, 2, 8 ], [ 5, 2, 10 ], [ 7, 2, 11 ], [ 9, 2, 11 ], [ 9, 2, 13 ],
					[ 7, 2, 13 ], [ 5, 2, 13 ], [ 3, 2, 13 ], [ -3, 2, 13 ], [ -5, 2, 13 ], [ -7, 2, 13 ], [ -9, 2, 13 ], [ -9, 2, 11 ],
					[ -7, 2, 11 ], [ -5, 2, 10 ], [ -3, 2, 8 ] ],
			'faces' : [ {
				id : "par0l",
				nodes : [ 5, 6, 7, 4 ],
				color : "#b2b2b2"
			}, {
				id : "par1l",
				nodes : [ 4, 7, 8, 3 ],
				color : "#b2b2b2"
			}, {
				id : "par2l",
				nodes : [ 3, 8, 9, 2 ],
				color : "#b2b2b2"
			}, {
				id : "par3l",
				nodes : [ 1, 2, 9, 10, 17, 0 ],
				color : "#b2b2b2"
			}, {
				id : "par4l",
				nodes : [ 17, 10, 11, 16 ],
				color : "#b2b2b2"
			}, {
				id : "par5l",
				nodes : [ 16, 11, 12, 15 ],
				color : "#b2b2b2"
			}, {
				id : "par6l",
				nodes : [ 15, 12, 13, 14 ],
				color : "#b2b2b2"
			}, {
				id : "par0r",
				nodes : [ 23, 24, 25, 22 ],
				color : "#b2b2b2"
			}, {
				id : "par1r",
				nodes : [ 22, 25, 26, 21 ],
				color : "#b2b2b2"
			}, {
				id : "par2r",
				nodes : [ 21, 26, 27, 20 ],
				color : "#b2b2b2"
			}, {
				id : "par3r",
				nodes : [ 19, 20, 27, 28, 35, 18 ],
				color : "#b2b2b2"
			}, {
				id : "par4r",
				nodes : [ 35, 28, 29, 34 ],
				color : "#b2b2b2"
			}, {
				id : "par5r",
				nodes : [ 34, 29, 30, 33 ],
				color : "#b2b2b2"
			}, {
				id : "par6r",
				nodes : [ 33, 30, 31, 32 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 7, 6, 31, 30 ],
				color : "#b2b2b2"
			}, {
				id : "top2",
				nodes : [ 8, 7, 30, 29 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 9, 8, 29, 28 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 10, 9, 28, 27 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 11, 10, 27, 26 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 12, 11, 26, 25 ],
				color : "#b2b2b2"
			}, {
				id : "top1",
				nodes : [ 13, 12, 25, 24 ],
				color : "#b2b2b2"
			}, {
				id : "a0",
				nodes : [ 18, 35, 2, 1 ],
				color : "#b2b2b2"
			}, {
				id : "a1",
				nodes : [ 35, 34, 3, 2 ],
				color : "#b2b2b2"
			}, {
				id : "a2",
				nodes : [ 34, 33, 4, 3 ],
				color : "#b2b2b2"
			}, {
				id : "a3",
				nodes : [ 7, 6, 31, 30 ],
				color : "#b2b2b2"
			}, {
				id : "a4",
				nodes : [ 0, 17, 20, 19 ],
				color : "#b2b2b2"
			}, {
				id : "a5",
				nodes : [ 17, 16, 21, 20 ],
				color : "#b2b2b2"
			}, {
				id : "a6",
				nodes : [ 16, 15, 22, 21 ],
				color : "#b2b2b2"
			}, {
				id : "a7",
				nodes : [ 15, 14, 23, 22 ],
				color : "#b2b2b2"
			}, {
				id : "side0",
				nodes : [ 14, 13, 24, 23 ],
				color : "#b2b2b2"
			}, {
				id : "side0",
				nodes : [ 32, 31, 6, 5 ],
				color : "#b2b2b2"
			} ]
		};

		iso1.addObject(base);
		iso1.addObject(pila);
		iso1.addObject(arco);

	}

}

// ESEMPIO:
document.addEventListener("DOMContentLoaded", function(event) {

	// logDiv = document.getElementById("log");

	iso1 = new IsoView();

	iso1.createCanvas("main", 800, 600);
	iso1.setRenderStyle("solid,edges");
	iso1.setBackground("#56585d");
	iso1.createPattern("terrain", "../images/terrain_gray.jpg", 0.01);

	createObjects();

	iso1.canvas.onclick = function(event) {
		var hit = null;
		if (!iso1.mouseDragged) {
			hit = iso1.checkHit(event.offsetX, event.offsetY);
			if (hit) {
				iso1.clearSelected();
				iso1.addToSelected(hit.object);
				iso1.draw();
			} else {
				iso1.clearSelected();
				iso1.draw();
			}
		}
	}
});
