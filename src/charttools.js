
/*
* Chart Tools: Copyright Zach Rosenfield (zrosenfield)
*/

var ChartTools = (function(X,Y,Config){
    //config
    var decimalFactor = -1;
    
    //variables
    var x = [];
    var y = [];
    var config = { 
        decimals: 2   //if 0 or higher, round to that nubmer.  -1 to not round
    };

    //constructor
    function init(X,Y,Config){
        x = X;
        y = Y;
        if(typeof Config !== "undefined") config=Config;
        decimalFactor = init_decimalFactor(config.decimals);
    }
    
    //decimals
    function init_decimalFactor(value){
        if(value===-1) return -1;
        var length = "1";
        for (var i=0; i<value; i++){
            length+="0";
        }
        return parseInt(length);
    }
    
    //rounds to the right decimals
    function RoundNumber(value){
        if(decimalFactor==-1) return value;
        return Math.round(decimalFactor*value)/decimalFactor;
    }
    
    ///Returns a trendline using least squares
    function GetTrend(){
        return findLineByLeastSquares(x,y);
    }
      
    //Gets diff for that X or Y point versus a particular X or Y. 
    function differenceFromPoint(array, point){
        var tArray=[];
        for( var i=0; i<array.length; i++ ){
            tArray.push( RoundNumber( (array[i] - array[point] )/ array[point] * 100.0 ) );
        }
        return tArray;
    }
    //X value
    function differenceFromPointX(point){
        return differenceFromPoint(x,point);
    }//Y value
    function differenceFromPointY(point){
        return differenceFromPoint(y,point);
    }
    
    //Least Squares internal calc
    function findLineByLeastSquares(values_x, values_y) {
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;

        //We'll use those variables for faster read/write access.
        var x = 0;
        var y = 0;
        var values_length = values_x.length;

        if (values_length != values_y.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }

        //Nothing to do.
        if (values_length === 0) {
            return [[], []];
        }

        // Calculate the sum for each of the parts necessary.
        for (var v=0; v < values_length; v++) {
            x = values_x[v];
            y = values_y[v];
            sum_x += x;
            sum_y += y;
            sum_xx += x * x;
            sum_xy += x * y;
            count++;
        }

        // Calculate m and b for the formular:
        // y = x * m + b
        var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
        var b = (sum_y / count) - (m * sum_x) / count;

        //We will make the x and y result line now
        var result_values_x = [];
        var result_values_y = [];

        for (v = 0; v < values_length; v++) {
            x = values_x[v];
            y = x * m + b;
            result_values_x.push(RoundNumber(x));
            result_values_y.push(RoundNumber(y));
        }

        return [result_values_x, result_values_y];
    }

    
    //Constructor  
    init(X,Y,Config);
      
    //Define public interface
    return {
        x: x,                                                   //XValues
        y: y,                                                   //YValues
        trend: GetTrend,                                        //Least Squares Trend Line
        differenceFromPointX: differenceFromPointX,             //Diff from X Value
        differenceFromPointY: differenceFromPointY              //Diff from Y Value
        
    };

});

if (typeof module !== 'undefined') {
    module.exports = ChartTools;
}

