/**
 *  ISOVIEW
 * 
 *  3D Isometric viewer utility
 * 
 * 
 *  Author: Davide Quaroni - 2019
 *  
 *  rev. 2019.03.19
 */


/* constructor*/
function IsoView() {
	this.nodes = [];
	this.faces = [];
	this.objects = [];
	this.patterns = [];
	this.nodesProj = [];
	this.theta = 0;
	this.scale = 20;
	this.backgroundColor = '#ffffff';
	this.nodeColor = '#10aa20';
	this.edgeColor = '#1020cc';
	this.nodeSize = 4;
	this.matrix = null;
	this.canvas = null;
	this.svg1 = null;
	this.canvasCenterX = 0;
	this.canvasCenterY = 0;
	this.mainDiv = null;
	this.ctx = null;
	this.mouseDown1 = false;
	this.mouseDown2 = false;
	this.mouseDragged = false;
	this.prevMouseX = 0;
	this.prevMouseY = 0;
	this.panX = 0;
	this.panY = 0;
	this.renderPolys = true;
	this.renderEdges = true;
	this.renderNodes = false;
	var instance = this;

	this.setScale = function(s) {
		this.scale = s;
	}

	this.setPan = function(x, y) {
		this.panX = x;
		this.panY = y;
	}

	this.setCenter = function(x, y) {
		this.canvasCenterX = x;
		this.canvasCenterY = y;
	}

	this.setBackground = function(c) {
		this.backgroundColor = c;
	}

	this.setNodeColor = function(c) {
		this.nodeColor = c;
	}

	this.setEdgeColor = function(c) {
		this.edgeColor = c;
	}

	this.setRenderStyle = function(c) {
		this.renderPolys = false;
		this.renderEdges = false;
		this.renderNodes = false;

		if (c.includes("solid")) {
			this.renderPolys = true;
		}
		if (c.includes("edges")) {
			this.renderEdges = true;
		}
		if (c.includes("nodes")) {
			this.renderNodes = true;
		}
	}

	/* const value for sqrt(r) / 2 */
	var rad3m = 0.866;

	/* converts degree angle in rad and calculates sin */
	var sin = function(a) {
		a = a * 0.01745329252;
		return Math.sin(a);
	};
	
	/* converts degree angle in rad and calculates cos */
	var cos = function(a) {
		a = a * 0.01745329252;
		return Math.cos(a);
	};

	var findMin = function(array) {
		var min = array[0];

		for (var i = 1; i < array.length; i++) {
			if (array[i] < min) {
				min = array[i];
			}
		}
		return min;
	}

	var findMax = function(array) {
		var max = array[0];

		for (var i = 1; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
			}
		}
		return max;
	}

	var mouseMoveCanvas = function(event) {
		event.preventDefault();
		var src = event.srcElement.objectRef;
		if (src.mouseDown2) { // rotation function
			src.theta += event.x - src.prevMouseX;
			src.draw();
			src.mouseDragged = true;
		} else if (src.mouseDown1) { // pad function
			src.panX += event.x - src.prevMouseX;
			src.panY += event.y - src.prevMouseY;
			src.draw();
			src.mouseDragged = true;
		} else {
			src.mouseDragged = false;
		}
		src.prevMouseX = event.x;
		src.prevMouseY = event.y;

	};

	var mouseDownCanvas = function(event) {
		event.preventDefault();
		var src = event.srcElement.objectRef;
		if (event.button == 2) {
			src.mouseDown1 = false;
			src.mouseDown2 = true;
		} else if (event.button == 0) {
			src.mouseDown2 = false;
			src.mouseDown1 = true;
		}
		src.mouseDragged = false;
	};

	var mouseUpCanvas = function(event) {
		// display(faces);
		event.preventDefault();
		var src = event.srcElement.objectRef;
		src.mouseDown1 = false;
		src.mouseDown2 = false;
	};

	var mouseRightClickCanvas = function(event) {
		event.preventDefault();
	};

	var mouseWheelCanvas = function(event) {
		event.preventDefault();
		var src = event.srcElement.objectRef;
		if (event.deltaY < 0) {
			if (src.scale < 100) {
				if (src.scale < 2) {
					src.scale *= 2;
				} else {
					src.scale += 2;
				}
			}
		} else {
			if (src.scale > 2) {
				src.scale -= 2;
			} else {
				src.scale *= 0.5;
			}
		}
		src.draw();
	};
	
	/* projects the vertices with isometric projection */
	this.isoTransform = function() {
		this.nodesProj = [];
		for (var n = 0; n < this.nodes.length; n++) {
			var node = this.nodes[n];
			var nodeProj = [ 0, 0 ];
			var x = node[0] * cos(this.theta) - node[1] * sin(this.theta);
			var y = node[1] * cos(this.theta) + node[0] * sin(this.theta);
			var z = node[2];
			nodeProj[0] = (rad3m * x + rad3m * y) * this.scale;
			nodeProj[1] = (0.5 * x - 0.5 * y - z) * this.scale;
			this.nodesProj.push(nodeProj);
		}
	};

	/* rotates a vertex around the z axes */
	var rotate = function(node, angle) {
		return [ node[0] * cos(angle) - node[1] * sin(angle), node[1] * cos(angle) + node[0] * sin(angle) ];
	};

	/* performs a check point x, y. If the point is inside a polygon it returns the face it's inside and the object it belongs to. Otherwise it returns false */
	this.checkHit = function(x, y) {

		x = x - this.canvasCenterX - this.panX;
		y = y - this.canvasCenterY - this.panY;

		face = null;
		obj = null;
		// for every face:
		for (var i = this.faces.length - 1; i >= 0; i--) {
			var arrX = [];
			var arrY = [];
			// per ogni vertice della faccia ricavo bounding box:
			for (var a = 0; a < this.faces[i].nodes.length; a++) {
				arrX.push(this.nodesProj[this.faces[i].nodes[a]][0]);
				arrY.push(this.nodesProj[this.faces[i].nodes[a]][1]);
			}
			var minX = findMin(arrX);
			var minY = findMin(arrY);
			var maxX = findMax(arrX);
			var maxY = findMax(arrY);
			// if x and y are outside the bounding box steps to the next face:
			if (x <= minX || x >= maxX || y <= minY || y >= maxY) {
				continue;
			}
			var hit = 0;
			// for every vertex of the face:
			for (var a = 0; a < this.faces[i].nodes.length; a++) {
				// load segment from a to a+1:
				var vx1 = this.nodesProj[this.faces[i].nodes[a]][0];
				var vy1 = this.nodesProj[this.faces[i].nodes[a]][1];

				if (a < this.faces[i].nodes.length - 1) {
					var vx2 = this.nodesProj[this.faces[i].nodes[a + 1]][0];
					var vy2 = this.nodesProj[this.faces[i].nodes[a + 1]][1];
				} else {
					var vx2 = this.nodesProj[this.faces[i].nodes[0]][0];
					var vy2 = this.nodesProj[this.faces[i].nodes[0]][1];
				}
				// if the y of the 2 vertices aren't both < or both > the testing y:
				if ((vy1 < y) != (vy2 < y)) {
					// calculates slope of the line:
					var m = (vx2 - vx1) / (vy2 - vy1);
					// if substituing the testing y I have a x < testing x, decrease hit. Otherwise, increase it. 
					var xTest = m * (y - vy1) + vx1;

					if (xTest < x) {
						hit--;
					} else {
						hit++;
					}
				}
			}
			// if after all tests hit == 0, (x, y) is inside, otherwise it's outside.
			if (hit == 0) {
				face = this.faces[i];
				break;
			}
		}
		if (face == null) {
			return false;
		}
		// finds the relative object:
		for (var i = 0; i < this.objects.length; i++) {
			for (var a = 0; a < this.objects[i].faces.length; a++) {
				if (this.objects[i].faces[a] == face) {
					obj = this.objects[i];
					break;
				}
			}
		}

		return {
			'face' : face,
			'object' : obj
		};
	}

	// average point of a polygon.
	this.average = function(obj) {
		var n = obj.nodes.length;
		var x = 0;
		var y = 0;
		var z = 0;
		for (var i = 0; i < n; i++) {
			var p = rotate(this.nodes[obj.nodes[i]], this.theta - 45);
			x += p[0];
			y += p[1];
			z += this.nodes[obj.nodes[i]][2];
		}
		x /= n;
		y /= n;
		z /= n;
		return [ x, y, z ];
	};

	// custom compare function for sorting
	this.compare = function(a, b) {
		pa = instance.average(a);
		pb = instance.average(b);
		if (pa[1] < pb[1])
			return 1;
		if (pa[1] > pb[1])
			return -1;
		if (pa[0] < pb[0])
			return -1;
		if (pa[0] > pb[0])
			return 1;
		if (pa[2] < pb[2])
			return -1;
		if (pa[2] > pb[2])
			return 1;
		return 0;
	};

	/* debug feature */
	var display = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			var p = average(arr[i]);
			console.log(i + ": " + arr[i].id + " - [" + p[0] + " " + p[1] + " " + p[2] + "]");
		}
		console.log("---");
	};

	/* debug feature */
	var log = function(text) {
		logDiv.innerHTML += text + "<br/>";
	};

	/* returns the normal of a face calculating its signed area. Normal faces the screen if area is > 0 */
	this.normal = function(face) {
		var x1 = this.nodesProj[face.nodes[0]][0];
		var y1 = this.nodesProj[face.nodes[0]][1];
		var area = 0;
		for (var i = 1; i < face.nodes.length; i++) {
			var x2 = this.nodesProj[face.nodes[i]][0];
			var y2 = this.nodesProj[face.nodes[i]][1];
			area += (x1 * y2 - x2 * y1);
			x1 = x2;
			y1 = y2;
		}
		var x2 = this.nodesProj[face.nodes[0]][0];
		var y2 = this.nodesProj[face.nodes[0]][1];
		area += (x1 * y2 - x2 * y1);
		return (area > 0);
	};

	this.draw = function(n) {
		this.isoTransform();

		if (this.renderPolys) {
			this.faces.sort(this.compare);
		}

		if (n == undefined) {
			n = this.faces.length;
		}
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.ctx.strokeStyle = this.edgeColor;
		for (var i = 0; i < n; i++) {

			if (this.renderPolys && !this.normal(this.faces[i])) {
				continue;
			}

			if (this.renderPolys) {
				if (this.patterns[this.faces[i].color] != undefined) {
					this.patterns[this.faces[i].color].setTransform(this.matrix.scale(this.scale * this.patterns[this.faces[i].color].scale));
					this.ctx.fillStyle = this.patterns[this.faces[i].color];
				} else {
					this.ctx.fillStyle = this.faces[i].color;
				}
			}

			this.ctx.beginPath();
			this.ctx.moveTo(this.canvasCenterX + this.panX + this.nodesProj[this.faces[i].nodes[0]][0], this.canvasCenterY + this.panY
					+ this.nodesProj[this.faces[i].nodes[0]][1]);
			for (var a = 1; a < this.faces[i].nodes.length; a++) {
				this.ctx.lineTo(this.canvasCenterX + this.panX + this.nodesProj[this.faces[i].nodes[a]][0], this.canvasCenterY + this.panY
						+ this.nodesProj[this.faces[i].nodes[a]][1]);

			}
			this.ctx.closePath();

			if (this.renderPolys) {
				this.ctx.fill();
			}
			if (this.renderEdges) {
				this.ctx.stroke();
			}
		}

		/* TOP-DOWN (DEBUG): */

		// for (var i = 0; i < n; i++) {
		// ctx.beginPath();
		// var p = rotate(nodes[faces[i].nodes[0]], theta - 45);
		// ctx.moveTo(canvasCenterX + 600 + p[0] * scale, canvasCenterY + p[1] *
		// scale);
		// for (var a = 1; a < faces[i].nodes.length; a++) {
		// var p = rotate(nodes[faces[i].nodes[a]], theta - 45);
		// ctx.lineTo(canvasCenterX + 600 + p[0] * scale, canvasCenterY + p[1] *
		// scale);
		//
		// }
		// ctx.closePath();
		// ctx.stroke();
		// }
		
		/* NODES: */

		if (this.renderNodes) {
			this.ctx.fillStyle = this.nodeColor;
			for (var i = 0; i < this.nodes.length; i++) {
				this.ctx.beginPath();
				this.ctx.arc(this.canvasCenterX + this.panX + this.nodesProj[i][0], this.canvasCenterY + this.panY + this.nodesProj[i][1], this.nodeSize, 0, 2 * Math.PI);
				this.ctx.fill();
			}
		}

	};

	
	/* creates a pattern from a source image. the id of the created pattern can be specified in the 'color' field of a face to fill
	 * the polygon using the pattern instead of a solid color.
	 */
	this.createPattern = function(id, imgurl, scale) {
		var image = new Image();
		image.src = imgurl;
		var pattern;
		var instance = this;
		image.addEventListener("load", function(event) {
			pattern = instance.ctx.createPattern(this, "repeat");
			pattern.scale = scale;
			instance.patterns[id] = pattern;
			instance.draw();
		});
	};

	/* creates the canvas where all the graphics will be displayed. divId is the id of a div created in your html document.
	 * w and h are the width and height dimensions of the canvas.
	 */
	this.createCanvas = function(divId, w, h) {

		this.mainDiv = document.getElementById(divId);

		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute("id", "svgCanvas");
		this.canvas.setAttribute("width", w);
		this.canvas.setAttribute("height", h);
		this.canvas.objectRef = this;
		this.canvas.onmousemove = mouseMoveCanvas;
		this.canvas.oncontextmenu = mouseRightClickCanvas;
		this.canvas.onmousedown = mouseDownCanvas;
		this.canvas.onmouseup = mouseUpCanvas;
		this.canvas.onwheel = mouseWheelCanvas;

		this.svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.matrix = this.svg1.createSVGMatrix();
		this.mainDiv.appendChild(this.canvas);

		this.ctx = this.canvas.getContext("2d");
		this.canvasWidth = w;
		this.canvasHeight = h;
		this.canvasCenterX = Math.round(w / 2);
		this.canvasCenterY = Math.round(h / 2);

		this.draw();

	};

	
	/** adds a 3D object to the canvas.
	 * Format:
	 * obj = {  'origin' : [x, y, z], (coordinates of the relative origin of this object)
	 * 			'nodes' : [ [x, y, z], [x, y, z], [x, y, z], ... ] (array coordinates of the vertices of the object)
	 * 			'faces' : [ { 									(array of objects with the following fields)
	 * 							'id': string, 					(id of the face, for debug purposes only)
	 * 							'nodes': [ 0, 1, 2, 3 ], 		(array of nodes id forming the face, in clockwise order. 
	 * 															No need to specify the first node as last, the poly will be automatically closed)
	 * 							'color' : string 				(color of the face. It can be a HTML color or a pattern id (see createPattern)
	 * 						}, ... ]
	 * 	}
	 */
	this.addObject = function(obj) {
		var totalNodes = this.nodes.length;
		for (var i = 0; i < obj.nodes.length; i++) {
			obj.nodes[i][0] += obj.origin[0];
			obj.nodes[i][1] += obj.origin[1];
			obj.nodes[i][2] += obj.origin[2];
			this.nodes.push(obj.nodes[i]);
		}
		for (var i = 0; i < obj.faces.length; i++) {

			for (var a = 0; a < obj.faces[i].nodes.length; a++) {
				obj.faces[i].nodes[a] += totalNodes;
			}
			this.faces.push(obj.faces[i]);
		}
		this.objects.push(obj);
	};
}