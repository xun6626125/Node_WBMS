var async = require('async');
/*
async.series([step1, step2, step3],
    function(err, values) {
        // do somethig with the err or values v1/v2/v3
    });

function step1(){
    console.log("1");
}

function step2(){
    console.log("2");

}
function step3(){
    console.log("3");

}*/
async.series([
    function(callback){
        console.log("1");
        callback(null, 1);
    },
    function(callback){
        console.log("2");
        callback(null, 2);
    }
],function(err, results) {
    console.log(results);
});