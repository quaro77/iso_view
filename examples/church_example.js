// ESEMPIO:
document.addEventListener("DOMContentLoaded", function(event) {

	// logDiv = document.getElementById("log");

	iso1 = new IsoView();
	iso2 = new IsoView();

	iso1.createCanvas("main", 1200, 600);
	iso1.setRenderStyle("solid,edges");
	iso1.createPattern("roof", "../images/roof.jpg", 0.025);

	iso2.createCanvas("main2", 800, 600);
	iso2.setRenderStyle("edges");
	iso2.createPattern("roof", "../images/roof.jpg", 0.05);

	// esempio: edificio
	var obj = {
		'origin' : [ 0, 0, 0 ],
		'nodes' : [ [ -3.5, -4.5, 0 ], [ -3.5, -4.5, 3 ], [ 0, -4.5, 5 ], [ 3.5, -4.5, 3 ], [ 3.5, -4.5, 0 ], [ -3.5, 4.5, 3 ], [ -3.5, 4.5, 0 ],
				[ 3.5, 4.5, 3 ], [ 3.5, 4.5, 0 ], [ 0, 4.5, 5 ] ],
		'faces' : [

		{
			id : "par0",
			nodes : [ 0, 1, 2, 3, 4 ],
			color : "#edd594"
		}, {
			id : "par1",
			nodes : [ 4, 3, 7, 8 ],
			color : "#edd594"
		}, {
			id : "par1",
			nodes : [ 8, 7, 9, 5, 6 ],
			color : "#edd594"
		}, {
			id : "par3",
			nodes : [ 6, 5, 1, 0 ],
			color : "#edd594"
		}, {
			id : "floor0",
			nodes : [ 0, 4, 8, 6 ],
			color : "#edd594"
		}, {
			id : "roof0",
			nodes : [ 1, 5, 9, 2 ],
			color : "roof"
		}, {
			id : "roof1",
			nodes : [ 3, 2, 9, 7 ],
			color : "roof"
		}

		]
	};
	iso1.addObject(obj);

	// esempio: campanile
	var obj2 = {
		'origin' : [ 0, 0, 0 ],
		'nodes' : [ [ -1.5, 4.6, 0 ], [ 1.5, 4.6, 0 ], [ 1.5, 4.6, 8 ], [ -1.5, 4.6, 8 ], [ -1.5, 5.7, 0 ], [ 1.5, 5.7, 0 ], [ 1.5, 5.7, 8 ],
				[ -1.5, 5.7, 8 ] ],
		'faces' : [ {
			id : "camp_par0",
			nodes : [ 0, 3, 2, 1 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par1",
			nodes : [ 1, 2, 6, 5 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par2",
			nodes : [ 5, 6, 7, 4 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par3",
			nodes : [ 4, 7, 3, 0 ],
			color : "#e8e4cc"
		}, {
			id : "camp_roof0",
			nodes : [ 3, 7, 6, 2 ],
			color : "roof"
		}, {
			id : "camp_floor0",
			nodes : [ 0, 1, 5, 4 ],
			color : "#e8e4cc"
		} ]
	};

	iso1.addObject(obj2);

	// esempio: campanile
	var obj3 = {
		'origin' : [ 0, 0, 0 ],
		'nodes' : [ [ -1.5, 4.6, 0 ], [ 1.5, 4.6, 0 ], [ 1.5, 4.6, 8 ], [ -1.5, 4.6, 8 ], [ -1.5, 5.7, 0 ], [ 1.5, 5.7, 0 ], [ 1.5, 5.7, 8 ],
				[ -1.5, 5.7, 8 ] ],
		'faces' : [ {
			id : "camp_par0",
			nodes : [ 0, 3, 2, 1 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par1",
			nodes : [ 1, 2, 6, 5 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par2",
			nodes : [ 5, 6, 7, 4 ],
			color : "#e8e4cc"
		}, {
			id : "camp_par3",
			nodes : [ 4, 7, 3, 0 ],
			color : "#e8e4cc"
		}, {
			id : "camp_roof0",
			nodes : [ 3, 7, 6, 2 ],
			color : "roof"
		}, {
			id : "camp_floor0",
			nodes : [ 0, 1, 5, 4 ],
			color : "#e8e4cc"
		} ]
	};

	iso2.addObject(obj3);

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
