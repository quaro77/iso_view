# IsoView
## 3D Isometric viewer utility in Javascript / HTML 5

A simple, instantiable object that displays multiple 3D objects in isometric perspective with pan, zoom and rotation functions. It includes a hit function callable from a custom click event listener.

## Usage
Include the iso_view.js in your html file with at least 1 div:

`<script type="text/javascript" src="./iso_view.js"></script>`
`<div id='main' style='width: 1200px; height: 600px; border: 1px solid black; margin: auto;'></div>`

In your javascript code, istantiate an IsoView() object:

`iso = new IsoView();`

The main function will create a canvas object inside the selected div:

`iso.createCanvas('main', 1200, 600);`

You can now add 3D objects in the following format:

`var obj = {`

`'origin' : [ x, y, z ],`

`'nodes' : [ [ x0, y0, z0 ], [ x1, y1, z1 ], [ x2, y2, z2 ], etc. ],`

`'faces' : [`

`{ id : "face0", nodes : [ 0, 1, 2, 3, etc. ], color : "#edd594"}, 
{ id : "par1", nodes : [ 4, 5, 6, 7, etc.], color : "#edd594"},`

`etc.]`

`}`
 
 Using the following function:
 
 `iso.addObject(obj);`
 
 You can display the added objects with the draw function:
 
 `iso.draw();`
 
 The canvas will react to the following built-in functions:
 - PAN: mouse drag with left-button pressed.
 - ROTATE: mouse drag with right-button pressed.
 - ZOOM: mouse wheel.
 
 Some usage examples can be found in 'example.html'
