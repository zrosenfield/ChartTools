
if (typeof module !== 'undefined') {
    var chai = require('chai');
    var ChartTools = require('../src/charttools.js');
}

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

var yValues = [8, 10, 12, 22, 17, 8, 6, 8, 12, 18, 22, 17];
var xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i=0;i<xValues.length;i++){
        xValues[i] = getMonthFromString(xValues[i]);
    }
    function getMonthFromString(mon){
        return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1;
    }
    
var ct=new ChartTools(xValues, yValues);

//Start Tests
describe('ChartTools', function() {
    
    //Make sure data assignment worked
    it('Constructor Assignment', function() {
        assert.lengthOf(ct.x, 12);
    });
    
    it('Diff From Point X', function() {
        var diffs = ct.differenceFromPointY(0);
        expect(diffs[0]).to.equal(0);
        expect(diffs[1]).to.equal(25);
        expect(diffs[6]).to.equal(-25);
    });
    
    it('Trend Line', function() {
        var trend = ct.trend()[1];
        expect(trend[3]).to.equal(11.85);
    });  
    
    it('Forecast', function() {
        var forecast = ct.forecast([12,13,14,15]);
        expect(forecast[ct.x.length+1]).to.equal(17.2);
    });    
    
    it('JSON', function() {
        var json = ct.json();
        expect(typeof JSON.parse(json)).to.equal('object');
    });   
    
});