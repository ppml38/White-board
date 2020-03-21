
/*-------------------------------

control Variables

1. size of stroke in pixels

2. color of stroke in string

3. Erazer true/false

4. Board background color

-------------------------------*/

var stroke_size = 2;

var stroke_color = "#0000ff";

var eraser = false;

var board_background = "white";

/*-----------------------------*/


var is_mouse_button_down = false;

var prev_x = -1;
var prev_y = -1;

var prev_stroke_color;
var prev_stroke_size;

function draw ( event ) {
	
	if(eraser)
	{
		stroke_color = board_background;
	}
	
    if ( is_mouse_button_down )
    {
        x = event.clientX;
        y = event.clientY;

        if ( prev_x==-1 & prev_y ==-1 )
        {
            prev_x = x;
            prev_y = y;
        }
        else
        {
            var line = document.createElementNS ( 'http://www.w3.org/2000/svg','line' );
            line.setAttribute ( "x1", prev_x );
            line.setAttribute ( "y1", prev_y );
            line.setAttribute ( "x2", x );
            line.setAttribute ( "y2", y );

            line.setAttribute ( "stroke-linecap","round" );
            line.setAttribute ( "style","stroke:"+stroke_color+"; stroke-width:"+stroke_size );
            document.getElementById ( "board" ).appendChild ( line );
            prev_x = x;
            prev_y = y;
        }
    }
}

function put_a_dot ( event )
{
	if(eraser)
	{
		stroke_color = board_background;
	}
	
    var line = document.createElementNS ( 'http://www.w3.org/2000/svg','line' );
    line.setAttribute ( "x1", event.clientX );
    line.setAttribute ( "y1", event.clientY );
    line.setAttribute ( "x2", event.clientX+1 );
    line.setAttribute ( "y2", event.clientY+1 );

    line.setAttribute ( "stroke-linecap","round" );
    line.setAttribute ( "style","stroke:"+stroke_color+"; stroke-width:"+stroke_size );
    document.getElementById ( "board" ).appendChild ( line );
}

function set_mouse_button_down()
{is_mouse_button_down=true;}

function reset_mouse_button_down()
{
    is_mouse_button_down = false;
    prev_x=-1;
    prev_y=-1;
}

function set_eraser()
{
    eraser = eraser?false:true;

    if ( eraser )
    {
        prev_stroke_color = stroke_color;
        stroke_color = board_background;
        prev_stroke_size = stroke_size;
        stroke_size = 7;
		document.getElementById ( 'board' ).setAttribute('class','board_erase');
    }
    else
    {
        stroke_color = prev_stroke_color;
        stroke_size = prev_stroke_size;
        document.getElementById ( 'board' ).setAttribute('class','board');
    }
}

function save_image()
{
    var svgText = document.getElementById ( "board" ).outerHTML;
    var myCanvas = document.getElementById ( "canvas" );
    var ctxt = myCanvas.getContext ( "2d" );

var img = new Image();
img.src = svgText;
ctxt.drawImage(img, 0, 0);
	
        var a = document.createElement ( "a" );
        a.download = "fallback.png";
        a.href = canvas.toDataURL ( "image/png" );
        a.click();

}



function drawInlineSVG ( ctx, rawSVG, callback ) {

var svg = new Blob ( [rawSVG], {type:"image/svg+xml;charset=utf-8"} ),
    domURL = self.URL || self.webkitURL || self,
             url = domURL.createObjectURL ( svg ),
                  
				  img = new Image;

    img.onclick = function () {
        alert ( "drawing in canvas" );
        ctx.drawImage ( this, 0, 0 );
        domURL.revokeObjectURL ( url );
        callback ( this );
    };

    img.src = url;
    img.click();
}

function getPixel1()
{
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>I</em> like ' + 
             '<span style="color:white; text-shadow:0 0 2px blue;">' +
             'cheese</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';

var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = new Blob([data], {type: 'image/svg+xml'});
var url = DOMURL.createObjectURL(svg);

img.onload = function () {
alert("draeing");
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
}

img.src = url;

  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
  
var pixelData = canvas.getContext('2d').getImageData(10,10, 1, 1).data;
alert(pixelData);
}

function getPixel()
{
	var image2 = new Image();
	var element = document.getElementById('board');
var positionInfo = element.getBoundingClientRect();
image2.height = positionInfo.height;
image2.width = positionInfo.width;
image2.src = 'data:image/svg+xml,' + escape('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">'+document.getElementById('board').innerHTML+'</svg>');

//document.getElementById("toolbox").appendChild(image2);
//alert(document.getElementById('board').innerHTML);0
image2.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = image2.width;
    canvas.height = image2.height;
    var context = canvas.getContext('2d');
    //document.getElementById('toolbox').appendChild(canvas);
    context.drawImage(image2, 0, 0);
    //document.getElementById("toolbox").innerHTML = '';
	//alert('added');

//alert('added');

var a = document.createElement ( "a" );
        a.download = "Signature.png";
        a.href = canvas.toDataURL ( "image/png" );
        a.click();
}
}