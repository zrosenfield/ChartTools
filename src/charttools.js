
/*
* Chart Tools: Copyright Zach Rosenfield (zrosenfield)
*/

var ChartTools = (function(Data){
        //private variables
      
        //public variables
        var data = [];
      
      //private functions
      function init(Data){
        data = Data;
      }
    
      //public functions
      function GetData(){
          if(Data!==undefined){
              this.data=Data;
          }
      }
      
      init(Data);
      
      //Define public interface
      return {
        data : data,  //actual chart data
        GetData: GetData
      };
  
});

 if (typeof module !== 'undefined') {
        module.exports = ChartTools;
    }