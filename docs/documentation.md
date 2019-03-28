# USER MANUAL

## QUICKSTART GUIDE:

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


## ADVANCED USE

### Handle mouse click
You can select one or multiple objects by clicking on them. In order to accomplish this task, just add a custom click listener to the
canvas object inside your IsoView instance:

```
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
```
In this example the checkHit() method is used to check if one of the 3D is drawn at the mouse location. If the test is positive, the object is returned and added to the Selected Objects array. The array is cleared eached time, but it is also possible to simply add more objects, allowing for multiple selection.
The mouseDragged boolean variable checks if the mouse was dragged while clicking, avoiding the selection in that case.


## METHODS DESCRIPTION:

### createCanvas(divId, width, height):
Creates a canvas inside the div with id = divId, where the 3D view will be shown.
The canvas will have dimensions width x height.
This function should be called just once after the IsoView object is created.

### setRenderStyle(style):
Sets the style for objects rendering. Style is a single string. It is possible to specify different styles separated by commas
Available options:
"edges": the edges of all objects will be drawn.
"solid": all the polygons will be filled with their own color or pattern, but with no shading.
"shaded": all the polygons will be filled with their own color or pattern and a simple shading algorithm will lighten or darken 
the polygons based on their rotation angle.
"nodes": all the nodes will be shown as dots.
Default style is "solid, edges".
	
### setBackground(color):
The background color will be applied to the canvas. HTML colors on the format "#rrggbb" are accepted.
		
### setNodeColor(color):
All nodes will be rendered with the specified color (if "nodes" option was set in setRenderStyle). HTML colors on the format "#rrggbb" are accepted.

### setEdgeColor(color):
All edges will be rendered with the specified color (if "nodes" option was set in setRenderStyle). HTML colors on the format "#rrggbb" are accepted.

### setCenter(x, y):
Sets the offset of the canvas center. Default values are (0, 0), and the center is calculated at half width and half height of the canvas. All rotation and zoom functions will be calculated based on this center point.

### setPan(x, y):
Sets the panning position of the rendered objects. Default values are (0, 0) and they are influenced by mouse dragging while pressing the left button.

### setScale(scale):
Sets the scale of the rendered object. Default value is 20, and it is influenced by mouse wheel actions. This method could be used to set a starting scale or to implement zoom buttons on screen.

### addObject(object):
A 3D shape will be added to the IsoView. 
A shape is described by an array of nodes; each node is an array of float values indicating its x, y, z coordinates: [x, y, z].
The shape objects has and an array of faces connecting the nodes.
When declaring the array of nodes of a face, it is important to list them in clockwise order for correct display.

Object format:
```	
{
	'origin' : [ x, y, z ],
	'nodes' : [ [ x1, y1, z1 ], [ x2, y2, z2 ], etc... ],
	'faces' : [ {
		'id' : "f0",
		'nodes' : [ nodeIndex1, nodeIndex2, etc... ],
		'color' : "#rrggbb"
	}, etc... ]
};
```

'origin': the starting coordinates of the object. All nodes will be translated by the amount specified here.
This is very useful in case of multiple identical objects placed in different positions: there is no need to recalculate the position of each node, it is possible to just specify a different origin point.
	
'nodes': an array of nodes that describe the object. There's no particular order for this array.
'faces': an array of faces that describe the object, connecting the nodes declared above. There is no particular order for this array.
	
Every face of the object is a sub-object with the following properties:
'id': the id of the face; this is mainly for debug purposes, the id is not used for rendering.
'nodes': an array of indexes of nodes, as declared in the main object 'nodes' array. These are the vertexes of the face and must be declared in clockwise order for correct display. Each face should have a minimum of 3 nodes. There is no maximum.
'color': the color of the face; this can be both an html color in #rrggbb form, or a pattern id. (See createPattern())
	
Please note that long faces can create z-fighting problems depending on their rotation, so please consider splitting long surfaces in smaller polygons.
	
### createPattern(id, imageUrl, scale):
A pattern will be created from the image file declared in the 'imageUrl' parameter.
'id': the id of the pattern.
'imageUrl': url of the image to be used.
'scale': the image will be scaled by this amount.
	
A face can be filled with a pattern instead of a solid color. The pattern id needs to be specified in the 'color' field of the face in place of the html color string.
Please not that a pattern does not behave like a texture: it is not mapped and projected on faces, it is just displayed with the same angle on each face.

### checkHit(x, y):
Checks if a face is drawn at the provided screen location. It returns false if no face was found, and a result object in case of positive result.
The result object has the following fields:
'face': the face object found.
'object': the 3d object to which the face belongs.

### addToSelected(object):
Adds the specified 3D object to the Selected array. All the objects in this array will be rendered with thicker, differently colored edges. 

### removeFromSelected(object):
Removes the selected object from the Selected array if it is present, does nothing in case it is not found.

### clearSelected():
Clears the Selected array, making it empty.
