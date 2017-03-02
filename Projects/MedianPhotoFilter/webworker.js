self.onmessage = function(e) 
{ 

	var array  = e.data.image.data; 
	var height = e.data.image.height; 
	var width  = e.data.image.width; 
	var redColorArray   = []; 
	var greenColorArray = []; 
	var blueColorArray  = []; 
	var clampedArray    = new Uint8ClampedArray(((height-2)*(width-2))*4); 

	/*
	 * makes a three by three grid with the pixel thats color 
	 * that will be changed in the middle by the median filter.
	 */
	for(var rows=1;rows<=height-1;rows++)
	{

		for(var cols=1;cols<=width-1;cols++) 

		{

			var topLeft      = ((rows-1)*width+cols-1)*4; 
			var topMiddle    = ((rows-1)*width+cols)*4;   
			var topRight     = ((rows-1)*width+cols+1)*4; 
			var left         = (rows*width+(cols-1))*4; 
			var middle       = (rows*width+cols)*4;  
			var right        = (rows*width+(cols+1))*4; 
			var bottomLeft   = ((rows+1)*width+cols-1)*4; 
			var bottomMiddle = ((rows+1)*width+cols)*4; 
			var bottomRight  = ((rows+1)*width+cols+1)*4; 

			// gets all the red colors
			var topLeftRed      = array[topLeft];
			var topMiddleRed    = array[topMiddle];
			var topRightRed     = array[topRight];
			var leftRed         = array[left];
			var middleRed       = array[middle];
			var rightRed        = array[right];
			var bottomLeftRed   = array[bottomLeft];
			var bottomMiddleRed = array[bottomMiddle];
			var bottomRightRed  = array[bottomRight];
			//gets all the green colors
			var topLeftGreen      = array[topLeft+1];
			var topMiddleGreen    = array[topMiddle+1];
			var topRightGreen     = array[topRight+1];
			var leftGreen         = array[left+1];
			var middleGreen       = array[middle+1];
			var rightGreen        = array[right+1];
			var bottomLeftGreen   = array[bottomLeft+1];
			var bottomMiddleGreen = array[bottomMiddle+1];
			var bottomRightGreen  = array[bottomRight+1];
			//gets all the blue colors
			var topLeftBlue      = array[topLeft+2];
			var topMiddleBlue    = array[topMiddle+2];
			var topRightBlue     = array[topRight+2];
			var leftBlue         = array[left+2];
			var middleBlue       = array[middle+2];
			var rightBlue        = array[right+2];
			var bottomLeftBlue   = array[bottomLeft+2];
			var bottomMiddleBlue = array[bottomMiddle+2];
			var bottomRightBlue  = array[bottomRight+2];

			//puts all the red values into an array
			redColorArray.push(topLeftRed);
			redColorArray.push(topMiddleRed);
			redColorArray.push(topRightRed);
			redColorArray.push(leftRed);
			redColorArray.push(middleRed);
			redColorArray.push(rightRed);
			redColorArray.push(bottomLeftRed);
			redColorArray.push(bottomMiddleRed);
			redColorArray.push(bottomRightRed);
			redColorArray.sort();
			//gets the middle value from the array
			var redMedian = redColorArray[4];

			//puts all the green values into an array
			greenColorArray.push(topLeftGreen);
			greenColorArray.push(topMiddleGreen);
			greenColorArray.push(topRightGreen);
			greenColorArray.push(leftGreen);
			greenColorArray.push(middleGreen);
			greenColorArray.push(rightGreen);
			greenColorArray.push(bottomLeftGreen);
			greenColorArray.push(bottomMiddleGreen);
			greenColorArray.push(bottomRightGreen);
			greenColorArray.sort();
			//gets the middle value from the array
			var greenMedian=greenColorArray[4];

			//puts all the blue values into an array
			blueColorArray.push(topLeftBlue);
			blueColorArray.push(topMiddleBlue);
			blueColorArray.push(topRightBlue);
			blueColorArray.push(leftBlue);
			blueColorArray.push(middleBlue);
			blueColorArray.push(rightBlue);
			blueColorArray.push(bottomLeftBlue);
			blueColorArray.push(bottomMiddleBlue);
			blueColorArray.push(bottomRightBlue);
			blueColorArray.sort();
			//gets the middle value from the array
			var blueMedian=blueColorArray[4];
			function offSet(row,column,width)
			{

			return (row*width+column)*4;

			}
			//calculate index to place in img array
			var newIndex=offSet(rows-1,cols-1,width);

			//puts that new value into clamped array
			clampedArray[newIndex]=redMedian;
			clampedArray[newIndex+1]=greenMedian;
			clampedArray[newIndex+2]=blueMedian;
			clampedArray[newIndex+3]=255;

			//sets array back to an empty array
			redColorArray=[];
			greenColorArray=[];
			blueColorArray=[]; 
		}
	}
// Return the identified worker data
e.data.image.data.set(clampedArray);
self.postMessage(e.data);
}