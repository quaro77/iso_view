



function sphere(radius, center, sectors){
	
	var horDegrees = 360 / sectors;
	var verDegrees = 90 / (sectors / 2);
	var previousParallelTop = [];
	var previousParallelBot = [];
	var n=0;
	var nfaces=0;
	var nodes  =[];
	var faces = [];
	for(var j=0;j<(sectors/2);j++){ // vertical cycle
		var parallelTop = [];
		var parallelBot = [];
		
		for(var i=0;i<sectors;i++){ // horizontal cycle
			coeff=1;
			//top node
			nodes.push([coeff * (center[0] + radius * iso2.cos(i * horDegrees) * iso2.cos(j * verDegrees)), 
						center[1] + radius * iso2.sin(i * horDegrees) * iso2.cos(j * verDegrees),
						coeff * (center[2] + radius * iso2.sin(j * verDegrees))]);
			parallelTop.push(n++);
			//bottom node
			coeff = -1;
			nodes.push([coeff * (center[0] + radius * iso2.cos(i * horDegrees) * iso2.cos(j * verDegrees)), 
						center[1] + radius * iso2.sin(i * horDegrees) * iso2.cos(j * verDegrees),
						coeff * (center[2] + radius * iso2.sin(j * verDegrees))]);
			parallelBot.push(n++);
		}
		if(previousParallelTop.length >0){
			for(var i=0;i<sectors;i++){ // horizontal cycle	
				faces.push({
					id: "face_top_" + i + "_" + j,
					color: "#e8e4cc",
					nodes: [
						previousParallelTop[i % sectors],
						parallelTop[i % sectors],
						parallelTop[(i + 1) % sectors],
						previousParallelTop[(i +1) % sectors]
					]
				});
				faces.push({
					id: "face_bot_" + i + "_" + j,
					color: "#e8e4cc",
					nodes: [
						previousParallelBot[i % sectors],
						parallelBot[i % sectors],
						parallelBot[(i + 1) % sectors],
						previousParallelBot[(i +1) % sectors]
					]
				});
			}
		}
		previousParallelTop = parallelTop;
		previousParallelBot = parallelBot;
	}
	//vertex
	coeff=1;
	nodes.push([center[0], center[1], coeff * (center[2] + radius)]);
	n++;
	coeff=-1;
	nodes.push([center[0], center[1], coeff * (center[2] + radius)]);
	n++;
	
	//top and bottom triangular faces
	for(var i=0;i<sectors;i++){ // horizontal cycle
		faces.push({
			id: "face_top_triangular" + i,
			color: "#e8e4cc",
			nodes: [
				previousParallelTop[i % sectors],
				n-2,
				previousParallelTop[(i+1) % sectors]				
			]
		})
		faces.push({
			id: "face_bottom_triangular" + i,
			color: "#e8e4cc",
			nodes: [
				previousParallelBot[i % sectors],
				n-1,
				previousParallelBot[(i+1) % sectors]
			]
		});
	}
	
	var obj={
		'origin' : center,
		'nodes': nodes,
		'faces': faces
	};
	return obj;
}


document.addEventListener("DOMContentLoaded", function(event) {

	// logDiv = document.getElementById("log");

	iso1 = new IsoView();
	iso2 = new IsoView();

	iso1.createCanvas("main", 1200, 600);
	iso1.setRenderStyle("shaded,edges");
	iso1.createPattern("roof", "../images/roof.jpg", 0.025);

	iso2.createCanvas("main2", 800, 600);
	iso2.setRenderStyle("edges");
	iso2.createPattern("roof", "../images/roof.jpg", 0.05);

	var r = 8;
	var centro = [0, 0, 0];
	var sezioni = 20; 
	
	var complete=sphere(r,centro,sezioni);
	iso1.addObject(complete);
	
	
	
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
