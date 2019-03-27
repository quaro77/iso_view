QUICKSTART GUIDE:

1. Create an HTML file including iso_view.js, your script file (my_js.js), and a div in which the canvas will be shown:

```
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>IsoView bridge example</title>
</head>
<body>
	<script type="text/javascript" src="./iso_view.js"></script>
	<script type="text/javascript" src="./my_js.js"></script>
	<div id='main' style='width: 800px; height: 600px; border: 1px solid black; margin: auto;'></div>
</body>
</html>
```

2. In your script file instantiate an IsoView object:
```
document.addEventListener("DOMContentLoaded", function(event) {
	iso1 = new IsoView();
}
```
3. Setup your canvas and global attributes:
```
	iso1.createCanvas("main", 800, 600);
	iso1.setRenderStyle("shaded,edges");
	iso1.setBackground("#56585d");
```
4. Add an object to your IsoView:
```	
	var shape = {
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
	
	iso1.addObject(base);
```	
5. Refresh your view:
```	
	iso1.draw();
```	
Methods documentation:

createCanvas(divId, width, height):
	Creates a canvas inside the div with id = divId, where the 3D view will be shown.
	The canvas will have dimensions width x height.
	This function should be called just once after the IsoView object is created.

setRenderStyle(style):
	Sets the style for objects rendering. Style is a single string. It is possible to specify different styles separated by commas
	Available options:
	"edges": the edges of all objects will be drawn.
	"solid": all the polygons will be filled with their own color or pattern, but with no shading.
	"shaded": all the polygons will be filled with their own color or pattern and a simple shading algorithm will lighten or darken 
	the polygons based on their rotation angle.
	"nodes": all the nodes will be shown as dots.
	Default style is "solid, edges".
	
setBackground(color):
	The background color will be applied to the canvas. HTML colors on the format "#rrggbb" are accepted.
		
setNodeColor(color):
	All nodes will be rendered with the specified color (if "nodes" option was set in setRenderStyle). HTML colors on the format "#rrggbb" are accepted.

setEdgeColor(color):
	All edges will be rendered with the specified color (if "nodes" option was set in setRenderStyle). HTML colors on the format "#rrggbb" are accepted.

addObject(object):
	A 3D shape will be added to the IsoView. 
	A shape is described by an array of nodes; each node is an array of float values indicating its x, y, z coordinates: [x, y, z].
	The shape objects has and an array of faces connecting the nodes.
	When declaring the array of nodes of a face, it is important to list them in clockwise order for correct display.
```	
	Object format:
	
	{
		'origin' : [ x, y, z ],
		'nodes' : [ [ x1, y1, z1 ], [ x2, y2, z2 ], etc... ],
		'faces' : [ {
			id : "f0",
			nodes : [ nodeIndex1, nodeIndex2, etc... ],
			color : "#rrggbb"
		}, etc... ]
	};
```	
	'origin': the starting coordinates of the object. All nodes will be translated by the amount specified here.
	This is very useful in case of multiple identical objects placed in different positions: there is no need to recalculate the position
	of each node, it is possible to just specify a different origin point.
	
	'nodes': an array of nodes that describe the object. There's no particular order for this array.
	'faces': an array of faces that describe the object, connecting the nodes declared above. There is no particular order for this array.
	
	Every face of the object is a sub-object with the following properties:
	'id': the id of the face; this is mainly for debug purposes, the id is not used for rendering.
	'nodes': an array of indexes of nodes, as declared in the main object 'nodes' array. These are the vertexes of the face and
	must be declared in clockwise order for correct display. Each face should have a minimum of 3 nodes. There is no maximum.
	'color': the color of the face; this can be both an html color in #rrggbb form, or a pattern id. (See createPattern())
	
	Please note that long faces can create z-fighting problems depending on their rotation, so please consider splitting long surfaces
	in smaller polygons.
	
createPattern(id, imageUrl, scale):
	a pattern will be created from the image file declared in the 'imageUrl' parameter.
	'id': the id of the pattern.
	'imageUrl': url of the image to be used.
	'scale': the image will be scaled by this amount.
	
	A face can be filled with a pattern instead of a solid color. The pattern id needs to be specified in the 'color' field of the face
	in place of the html color string.
	Please not that a pattern does not behave like a texture: it is not mapped and projected on faces, it is just displayed with 
	the same angle on each face.
