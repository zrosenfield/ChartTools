
if (typeof module !== 'undefined') {
    var chai = require('chai');
    var ChartTools = require('../src/charttools.js');
}

var assert = chai.assert;
var ct=new ChartTools([1,2,3]);

//Start Tests
describe('ChartTools', function() {
    
    //Make sure data assignment worked
    it('Data Assignment', function() {
        assert.lengthOf(ct.data, 3);
        var temp = [1,4,6,7,2,4];
        ct.data = temp;
        assert.lengthOf(ct.data, temp.length);
    });
    
    
});