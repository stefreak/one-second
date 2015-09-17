import $ from 'jquery'
import curriculum from 'curriculum'


var english = function(iters) {
    var bil = Math.pow(10, 9)
    var mil = Math.pow(10, 6)
    var thousand = 1000
    if (iters >= bil) {
        return Math.round(iters / bil) + " billion"
    } else if (iters >= mil) {
        return Math.round(iters / mil) + " million"
    } else if (iters >= thousand) {
        return Math.round(iters / thousand) + " thousand"
    } else {
        return iters
    }
}

var disp = function(benchmarks, name) {
    var benchmark_results = benchmarks[name]
    var code = benchmark_results["code"]
    var iters = benchmark_results["rounded_iters"]
    var exact_iters = benchmark_results["exact_iters"]
    iters = english(iters)

    var buttons1 = '<div class="btn-toolbar" role="toolbar"> <div class="btn-group" role="group"> <button type="button" class="btn btn-default">1</button> <button type="button" class="btn btn-default">10</button> <button type="button" class="btn btn-default">100</button> <button type="button" class="btn btn-default">1,000</button> <button type="button" class="btn btn-default">10,000</button> <button type="button" class="btn btn-default">100,000</button><button type="button" class="btn btn-default">1,000,000</button> </div>'
    var buttons2 = '<div class="btn-group" role="group"> <button type="button" class="btn btn-default">10,000,000</button> <button type="button" class="btn btn-default">100,000,000</button> <button type="button" class="btn btn-default">1,000,000,000</button></div></div>'
    var buttons = buttons1 + buttons2
    var code = "<pre>" + code + "</pre>" + "</div>"
    return "<div class = 'col-md-6'>" + "<h3>" + name + "</h3>" + "iters: " + iters +  ", exact iters:" + english(exact_iters) + buttons + code
}
var display = function(benchmarks) {
    var i;
    for (i = 0; i < curriculum.length; i++) {
        var programs = curriculum[i]['programs']
        var j;
        $("#code").append("<div class='row'>")

        $("#code").append("<p class='col-md-8 col-md-offset-2 jumbotron'>" + curriculum[i]['text'] + "</p>")
        for (j = 0; j < programs.length; j++) {
            name = programs[j]
            $("#code").append(disp(benchmarks, name))
        }
        $("#code").append("</div>")
    }
}
$.getJSON("/benchmarks.json", function(result) {
    var json = result
    console.log(result); // this will show the info it in firebug console
    display(result)
});
