//d3.selectAll("h3").transition().style("font-size","28px").delay(2000).duration(2000);

////////
// DATA
////////
const graphOneData = [
    {region: "Upper West Side", price: 2353, x: 417, y: 138, r: 60, rgb: "rgb(245,170,164)", index:1},
    {region: "Upper East Side", price: 2231, x: 505, y: 239, r: 45, rgb: "rgb(245,170,164)", index:2},
    {region: "Midtown West", price: 2712, x: 419, y: 278, r: 24, rgb: "rgb(239,123,115)", index:3},
    {region: "Midtown East", price: 2530, x: 485, y: 329, r: 20, rgb: "rgb(239,123,115)", index:4},
    {region: "Chelsea", price: 3021, x: 383, y: 333, r: 28, rgb: "rgb(215,21,4)", index:5},
    {region: "Greenwich Viaage", price: 2988, x: 365, y: 396, r: 24, rgb: "rgb(215,21,4)", index:6},
    {region: "Soho", price: 3109, x: 383, y: 464, r: 17, rgb: "rgb(215,21,4)", index:7},
    {region: "East Village", price: 2250, x: 450, y: 420, r: 18, rgb: "rgb(245,170,164)", index:8},
    {region: "Lower East Side", price: 2207, x: 448, y: 476, r: 20, rgb: "rgb(245,170,164)", index:9},
    {region: "Financial District", price: 2566, x: 347, y: 516, r: 21, rgb: "rgb(239,123,115)", index:10},
    {region: "Long Island City", price: 2103, x: 539, y: 349, r: 30, rgb: "rgb(246,214,212)", index:11},
    {region: "Downtown Brooklyn", price: 2085, x: 411, y: 561, r: 30, rgb: "rgb(246,214,212)", index:12}
];

const graphTwoData = [9, 10, 12, 13, 13, 14, 15, 17, 18, 20, 19, 17, 18, 
                    20, 21, 23, 26, 28, 31, 33, 31, 28, 26, 22, 17, 12, 5];

const graphThreeData = [
    {region: "Upper West Side", oldPrice: 1936, newPrice: 2353, index:1},
    {region: "Upper East Side", oldPrice: 1899, newPrice: 2231, index:2},
    {region: "Midtown West", oldPrice: 2234, newPrice: 2712, index:3},
    {region: "Midtown East", oldPrice: 2177, newPrice: 2530, index:4},
    {region: "Chelsea", oldPrice: 2650, newPrice: 3021, index:5},
    {region: "Greenwich Viaage", oldPrice: 2604, newPrice: 2988, index:6},
    {region: "Soho", oldPrice: 2688, newPrice: 3109, index:7},
    {region: "East Village", oldPrice: 1893, newPrice: 2250, index:8},
    {region: "Lower East Side", oldPrice: 1884, newPrice: 2207, index:9},
    {region: "Financial District", oldPrice: 2043, newPrice: 2566, index:10},
    {region: "Long Island City", oldPrice: 1884, newPrice: 2103, index:11},
    {region: "Downtown Brooklyn", oldPrice: 1790, newPrice: 2085, index:12}
]

/////////////////////////////////////
// Functions for drawing first graph
/////////////////////////////////////
function onCircleEffect(d, i) {
    var circle = d3.select(this);
    circle
        .transition()
        .delay(100)
        .duration(300)
        .attr("r", function(d, i) {return (d.r)*1.1;})
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    svg.append("text")
        .attr("id", "circle" + i.index)
        .attr("x", (parseInt(circle.attr("cx")) + parseInt(circle.attr("r")) + 10).toString())
        .attr("y", (parseInt(circle.attr("cy")) + 4).toString())
        .attr("font-family", "Helvetica")
        .attr("font-size", "0px")
        .text([i.region, " $"+i.price]);

    d3.select("#circle" + i.index)
        .transition()
        .duration(300)
        .attr("font-size", "14px");
        
}

function offCircleEffect(d, i) {
    var circle = d3.select(this);
    var text = d3.select("#circle" + i.index);
    circle
        .transition()
        .duration(500)
        .attr("stroke", "none")
        .attr("r", function(d, i) {return d.r;});
    text
        .transition()
        .duration(300)
        .attr("font-size", "0px");
    setTimeout(() => { text.remove();}, 300);
    
}

function drawFirstGraph() {
    // get svg
    var svg = d3.select("#visual").select("svg");

    svg.append('svg:image')
        .attr("id", "nyc-map")
        .attr("width", width)
        .attr("opacity", 0)
        .attr('xlink:href', "images/nyc.png")
        .attr("alt", 
            "This is a picture of new york city map with 12 bubbles representing price increase in districts");
    d3.select("#nyc-map")
        .transition()
        .delay(500)
        .duration(800)
        .attr("opacity", 1);

    // add groups
    var g = svg.selectAll("g")
        .data(graphOneData)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0,0)";
        });

    // add circles
    g.append("circle")
        .classed("bubbles", true)
        .attr("cx", function(d, i) {return d.x;})
        .attr("cy", function(d, i) {return d.y;})
        .attr("r", function(d, i) {return 0;})
        .attr("opacity", 0)
        .attr("fill", function(d, i){return d.rgb;});

    svg.selectAll("circle")
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("opacity", 1)
        .attr("r", function(d, i) {return d.r;})
    
    // add event listener
    svg.selectAll("circle")
        .on("mouseover", onCircleEffect)
        .on("mouseout", offCircleEffect);

}

function removeFirstGraph() {
    var image = svg.select("image");
    var circles = svg.selectAll("circle");
    image
        .transition()
        .duration(1200)
        .attr("opacity", 0);
    circles
        .transition()
        .duration(1200)
        .attr("r", 0)
        .attr("cy", 0);
    
    setTimeout(() => {svg.selectAll('*').remove();}, 1200);
}

//////////////////////////////////////
// Functions for drawing second graph
//////////////////////////////////////
function drawSecondGraph() {
    // get svg
    var svg = d3.select("#visual").select("svg");

    var colorSequence = ["yellow", "red"];
    var l = 1447;

    // define color gradient
    var defs = svg.append("defs");
    var colorGradient = defs.append("linearGradient")
        .attr("id", "colorGradient")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", 1)
    var firstStop = colorGradient.append("stop")
        .classed("stops", true)
        .attr("offset", 0)
        .attr("stop-color", colorSequence[1]);
    var secondStop = colorGradient.append("stop")
        .classed("stops", true)
        .attr("offset", 1)
        .attr("stop-color", colorSequence[0]);

    // create scaler
    var x = d3.scaleLinear().domain([0,27]).range([50, 850]);
    var y = d3.scaleLinear().domain([5, 33]).range([100, 650]);

    // create line function
    var lineFunc = d3.line()
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d);})
      .curve(d3.curveNatural);
    
    // create path
    var path = svg
        .append("path")
        .attr("id", "graphTwoPath")
        .attr("d", lineFunc(graphTwoData))
        .attr("stroke", "none")
        .attr("fill", "none");
    path
        .attr("stroke-dasharray", l + " " + l)
        .attr("stroke-dashoffset", l)
    
    path
        .transition()
        .duration(4000)
        .attr("stroke", "url(#colorGradient)")
        .attr("stroke-width", "10")
        .attr("stroke-dashoffset", 0);
}

function removeSecondGraph() {
    var l = 1447;
    var path = svg.select("path");
    path
        .transition()
        .duration(1500)
        .attr("stroke-dashoffset", l)
    setTimeout(() => {svg.selectAll('*').remove();}, 1500);
}

/////////////////////////////////////
// Functions for drawing third graph
/////////////////////////////////////
function onBarEffect(d, i) {
    var bar = d3.select(this);
    var percentage = ((i.newPrice - i.oldPrice)/(parseFloat(i.newPrice))*100).toFixed(2).toString() + "%";

    svg.append("text")
        .attr("id", "percentageText" + i.index)
        .attr("x", parseInt(bar.attr("rightEndX")) + 10)
        .attr("y", parseInt(bar.attr("rightEndY")) + 18)
        .attr("font-family", "Helvetica")
        .attr("font-size", "0px")
        .text(percentage);

    d3.select("#percentageText" + i.index)
        .transition()
        .duration(300)
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("letter-spacing", "2");
}

function offBarEffect(d, i) {
    var bar = d3.select(this);
    var text = d3.select("#percentageText" + i.index);
    text
        .transition()
        .duration(300)
        .attr("font-size", "0px");
    setTimeout(() => { text.remove();}, 300);
}

function drawThirdGraph() {
    // get svg
    var svg = d3.select("#visual").select("svg");

    // define chart scale
    var barHeight = 25;
    var spaceBetweenBars = 8;
    var chartUpOffset = 100;
    var chartLeftOffset = 50;
    var scaleDown = 5;
    var leftBarColor = "rgb(183, 215, 238)";
    var rightBarColor = "rgb(134, 194, 237)";

    // create groups
    var g = svg.selectAll("g")
        .data(graphThreeData)
        .enter()
        .append("g")
        // .attr("x", chartLeftOffset)
        // .attr("y", function(d, i){
        //     return parseInt(barHeight*i)+spaceBetweenBars*i + chartUpOffset;
        // })
        .attr("transform", function(d, i) {
            return "translate(" 
                + chartLeftOffset.toString() + "," 
                + (parseInt(barHeight*i)+spaceBetweenBars*i + chartUpOffset).toString() + ")";
        });
    
    // create left bars
    g.append("rect")
        .classed("leftBars", true)
        .attr("id", function(d,i) {return "leftBar" + (i+1);})
        .attr("width", 0)
        .attr("height", barHeight)
        .attr("fill", leftBarColor);

    svg.selectAll(".leftBars")
        .transition()
        //.delay(500)
        .duration(1500)
        .attr("width", function(d, i) {return d.oldPrice/scaleDown;});

    // add texts
    g.append("text")
        .attr("id", function(d, i) {return "text" + (i+1)})
        .classed("labelText", true)
        .attr("transform", "translate(5, 16)")
        .attr("fill", "white")
        .attr("font-family", "Helvetica")
        .attr("font-size", "0px")
        .text(function(d,i) {return d.region;});

    setTimeout(() => {
        svg.selectAll(".labelText")
        .transition()
        .duration(800)
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("letter-spacing", "2")
    }, 2000);
    
    // create right bars
    g.append("rect")
        .classed("rightBars", true)
        .attr("id", function(d, i) {return "rightBar" + (i+1);})
        .attr("width", 0)
        .attr("height", barHeight)
        .attr("x", function(d, i){return d.oldPrice/scaleDown + 2;})
        .attr("y", 0)
        .attr("rightEndX", function(d, i){return chartLeftOffset + d.newPrice/scaleDown;})
        .attr("rightEndY", function(d, i){
            return parseInt(barHeight*i)+spaceBetweenBars*i + chartUpOffset;
        })
        // .attr("transform", function(d, i) {
        //     return "translate("
        //     + (d.oldPrice/scaleDown + 2).toString()
        //     + ", 0)";
        // })
        .attr("fill", rightBarColor);
    
    setTimeout(() => {
        svg.selectAll(".rightBars")
            .transition()
            .duration(2000)
            .attr("width", function(d, i) {return (d.newPrice - d.oldPrice)/scaleDown;});
    }, 3500);
    
    // add percentage text
    svg.selectAll(".rightBars")
        .on("mouseover", onBarEffect)
        .on("mouseout", offBarEffect);
}

function removeThirdGraph() {
    var bars = svg.selectAll("rect");
    var labels = svg.selectAll("text");
    
    labels
        .transition()
        .duration(500)
        .attr("font-size", "0px");
    
    setTimeout(() => {
        bars
        .transition()
        .duration(1200)
        .attr("width", 0);
    }, 500);

    setTimeout(() => { svg.selectAll('*').remove();}, 1700);
}

//////////////////////////////////////
// Functions for drawing fourth graph
//////////////////////////////////////
function drawFourthGraph() {
    // get svg
    var svg = d3.select("#visual").select("svg");

    // add gif
    svg.append('svg:image')
        .attr("id", "flooding")
        .attr("width", width*0.8)
        .attr("opacity", 0)
        .attr('xlink:href', "images/animation.gif")
        .attr("alt", "This is an animation of three people walking");
    d3.select("#flooding")
        .transition()
        .duration(800)
        .attr("opacity", 1);
}

function removeFourthGraph() {
    var floodingPic = svg.select("#flooding");
    floodingPic
        .transition()
        .duration(1000)
        .attr("opacity", 0);
    setTimeout(() => { svg.selectAll('*').remove();}, 1000);
}

/////////////////////////////////////
// Functions for drawing fifth graph
/////////////////////////////////////
function drawFifthGraph() {
    // get svg
    var svg = d3.select("#visual").select("svg");

    // add gif
    svg.append('svg:image')
        .attr("id", "future")
        .attr("width", width*0.6)
        .attr("x", 100)
        .attr("y", 80)
        .attr("opacity", 0)
        .attr('xlink:href', "images/future.webp")
        .attr("alt", "This is an illustration of a city");
    d3.select("#future")
        .transition()
        .duration(800)
        .attr("opacity", 1);
}

function removeFifthGraph() {
    var futurePic = svg.select("#future");
    futurePic
        .transition()
        .duration(1000)
        .attr("opacity", 0);
    setTimeout(() => { svg.selectAll('*').remove();}, 1000);
}



////////////////////////////////////////////
// Functions for handling arrow up and down
////////////////////////////////////////////
function handleFirstPageDown(event) {
    removeFirstGraph();
    setTimeout(() => {drawSecondGraph();}, 1200);
    document.getElementById("currentPage").innerText = "2";
}

function handleSecondPageUp(event) {
    removeSecondGraph();
    setTimeout(() => {drawFirstGraph();}, 1500);   
    document.getElementById("currentPage").innerText = "1";
}

function handleSecondPageDown(event) {
    removeSecondGraph();
    setTimeout(() => {drawThirdGraph();}, 1500);
    document.getElementById("currentPage").innerText = "3";   
}

function handleThirdPageUp(event) {
    removeThirdGraph();
    setTimeout(() => {drawSecondGraph();}, 1700);  
    document.getElementById("currentPage").innerText = "2"; 
}

function handleThirdPageDown(event) {
    removeThirdGraph();
    setTimeout(() => {drawFourthGraph();}, 1700); 
    document.getElementById("currentPage").innerText = "4";
}

function handleFourthPageUp(event) {
    removeFourthGraph();
    setTimeout(() => {drawThirdGraph();}, 1000); 
    document.getElementById("currentPage").innerText = "3";
}

function handleFourthPageDown(event) {
    removeFourthGraph()
    setTimeout(() => {drawFifthGraph();}, 1000);
    document.getElementById("currentPage").innerText = "5";
}

function handleFifthPageUp(event) {
    removeFifthGraph();
    setTimeout(() => {drawFourthGraph();}, 1000);
    document.getElementById("currentPage").innerText = "4";
}


////////////////////////////////////////////////
// Functions for handling arrow key up and down
////////////////////////////////////////////////
function handleKeyDown(event) {
    var keyCode = event.keyCode;
    if(keyCode==40){
        var currentPage = document.getElementById("currentPage");
        switch(currentPage.innerText) {
            case "1":
                handleFirstPageDown();
                document.location.href="#secondPage";
                break;
            case "2":
                handleSecondPageDown();
                document.location.href="#thirdPage";
                break;
            case "3":
                handleThirdPageDown();
                document.location.href="#fourthPage";
                break;
            case "4":
                handleFourthPageDown();
                document.location.href="#fifthPage";
                break;
        }
    }
}

function handleKeyUp(event) {
    var keyCode = event.keyCode;
    if(keyCode==38){
        var currentPage = document.getElementById("currentPage");
        switch(currentPage.innerText) {
            case "2":
                handleSecondPageUp();
                document.location.href="#firstPage";
                break;
            case "3":
                handleThirdPageUp();
                document.location.href="#secondPage";
                break;
            case "4":
                handleFourthPageUp();
                document.location.href="#thirdPage";
                break;
            case "5":
                handleFifthPageUp();
                document.location.href="#fourthPage";
                break;
        }
    }
}



////////
// MAIN
////////
// create an svg
var width = 1000;     
var height = 800;   
var svg = d3
    .select("#visual")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// display initial page
//drawFirstGraph();
drawFirstGraph();

// add event handler for arrows
var firstPageArrowDown = document.getElementById("firstPageArrowDown");
firstPageArrowDown.addEventListener("click", handleFirstPageDown, false);

var secondPageArrowUp = document.getElementById("secondPageArrowUp");
secondPageArrowUp.addEventListener("click", handleSecondPageUp, false);

var secondPageArrowDown = document.getElementById("secondPageArrowDown");
secondPageArrowDown.addEventListener("click", handleSecondPageDown, false);

var thirdPageArrowUp = document.getElementById("thirdPageArrowUp");
thirdPageArrowUp.addEventListener("click", handleThirdPageUp, false);

var thirdPageArrowDown = document.getElementById("thirdPageArrowDown");
thirdPageArrowDown.addEventListener("click", handleThirdPageDown, false);

var fourthPageArrowUp = document.getElementById("fourthPageArrowUp");
fourthPageArrowUp.addEventListener("click", handleFourthPageUp, false);

var fourthPageArrowDown = document.getElementById("fourthPageArrowDown");
fourthPageArrowDown.addEventListener("click", handleFourthPageDown, false);

var fifthPageArrowUp = document.getElementById("fifthPageArrowUp");
fifthPageArrowUp.addEventListener("click", handleFifthPageUp, false);

// add event handler for arrow key up and down events
document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);






