
var years = ["1890","1880","1870","1860"];
var censuses = ["2015", "2015", "2016", "2016"];


var sideEnds = {
  "1860":0

};

var chart = function() {

  var pillTypes = [
    {func:oneColor, opts: {colors:["#A8B2A5"]}, id:"1001", name:"Forbes Ave & Market Square"},
    {func:oneColor, opts: {colors:["#D4AB80"]}, id:"1045", name:"S 27th St & Sidney St"},
    {func:twoColor, opts: {colors:["#E9D19E","#C0B295"]}, id:"1010", name:"10th St & Penn Ave"},
    {func:twoColor, opts: {colors:["#B7AA8B","#807F5B"]}, id:"1000", name:"Liberty Ave & Stanwix St"},
    {func:twoColorVert, opts: {colors:["#A6906D","#D5A97C"]}, id:"1017", name:"21st St & Penn Ave"},
    {func:oneColor, opts: {colors:["#D5AC92"]}, id:"1013", name:"Isabella St & Federal St"},
    {func:oneColor, opts: {colors:["#A6906D"]}, id:"1012", name:"North Shore Trail & Ft Duquesne Bridge"},
    {func:twoColorDiag, opts: {colors:["#D6AA7D","#C0B395"]}, id:"1049", name:"S 12th St & E Carson St"},
    {func:oneColor, opts: {colors:["#AAB5A7"]}, id:"1041", name:"Fifth Ave & S Bouquet St"},
    {func:midStripe, opts: {colors:["#E7CE98","#D5AD94"], width:0.5}, id:"1019", name:"42nd St & Butler St"},
    {func:midStripe, opts: {colors:["#787658","#C28D5E"], width:0.3}, id:"1033", name:"Ivy St & Walnut St"},
    {func:twoColor, opts: {colors:["#A6AEA3","#C79063"]}, id:"1016", name:"17th St & Penn Ave"},
    {func:oneColor, opts: {colors:["#7A7957"]}, id:"1048", name:"S 18th St & Sidney St"},
    {func:littleSquares, opts: {colors:["#C09364", "#7E949A"]}, id:"1018", name:"37th St & Butler St"},
    {func:oneColor, opts: {colors:["#9D9385"]}, id:"1011", name:"Fort Duquesne Blvd & 7th"},
    {func:longStripe, opts: {colors:["#A8906B", "#ACB4A1"], width:0.6, edge:false}, id:"1036", name:"Schenley Dr at Schenley Plaza"},
    {func:bigTri, opts: {colors:["#BFB395", "#E2CB8D"]}, id:"1015", name:"Federal St & E North Ave"},
    {func:twoColorVert, opts: {colors:["#D6B094", "#A48D6D"]}, id:"1004", name:"First Ave & B St"},
    {func:midFlag, opts: {colors:["#ABB5A5", "#E5C98F"], width:0.25, skew:6}, id:"1006", name:"Ross St & Sixth Ave"},
    {func:twoColor, opts: {colors:["#82815C","#C99562"]}, id:"1046", name:"S 25th St & E Carson St"},
    {func:twoColorVert, opts: {colors:["#D1A577","#A7916E"]}, id:"1005", name:"Forbes Ave & Grant St"},
    {func:oneColor, opts: {colors:["#C1B496"]}, id:"1047", name:"S 22nd St & E Carson St"},
    {func:twoColor, opts: {colors:["#AA9570","#D3AE99"]}, id:"1009", name:"12th St & Penn Ave"},
    {func:twoColorVert, opts: {colors:["#D5A87B","#BAAD91"]}, id:"1040", name:"Bigelow Blvd & Fifth Ave"},
    {func:oneColor, opts: {colors:["#E6CC90"]}, id:"1029", name:"Alder St & S Higland Ave"},
    {func:oneColor, opts: {colors:["#D6AB90"]}, id:"1002", name:"Third Ave & Wood St"},
    {func:twoColorDiag, opts: {colors:["#9C9385","#D6AA7A"]}, id:"1034", name:"Ellsworth Ave & N Neville St"},
    {func:doubleStripe, opts: {colors:["#D1A575","#A8AD86"], width:0.08, dist:0.08}, id:"1023", name:"Liberty Ave & Baum Blvd"},
    {func:bigTriInverted, opts: {colors:["#A7B2A4", "#E7C991"]}, id:"1003", name:"First Ave & Smithfield St"},
    {func:twoColorDiag, opts: {colors:["#A6A87E","#998F82"]}, id:"1038", name:"Boulevard of the Allies & Parkview Ave"},
    {func:twoHooks, opts: {colors:["#C3B79B","#A78659"], width:0.1}, id:"1007", name:"Stevenson St & Forbes Ave"},
    {func:midStripe, opts: {colors:["#D2A375","#A3AEA0"], width:0.5}, id:"1035", name:"Fifth Ave & S Dithridge St"},
    {func:midStripe, opts: {colors:["#D7AB97","#A0AB9D"], width:0.2, offset:8}, id:"1039", name:"Atwood St & Bates"},
    {func:bigTri, opts: {colors:["#808F7B", "#D4AC92"]}, id:"1014", name:"Ridge Ave & Brighton Rd"},
    {func:oneColor, opts: {colors:["#BAAD8F"]}, id:"1021", name:"Taylor St & Liberty Ave"},
    {func:doubleStripe, opts: {colors:["#E3C78D","#D2A98F"], width:0.15, dist:0.0}, id:"1032", name:"Walnut St & College St"},
    {func:midStripe, opts: {colors:["#B7AA8C","#A2A67E"], width:0.3} , id:"1028", name:"Penn Ave & Putnam St"},
    {func:midFlag, opts: {colors:["#E4C88D", "#928C7D"], width:0.27, skew:6}, id:"1022", name:"Liberty Ave & S Millvale"},
    {func:doubleFlag, opts: {colors:["#948E81", "#D6A772"], width:0.08, dist:0.3}, id:"1020", name:"42nd St & Penn Ave"},
    {func:twoColorVert, opts: {colors:["#A8B4A7","#D6AA8F"]}, id:"1024", name:"S Negley Ave & Baum Blvd"},
    {func:oneColor, opts: {colors:["#E6CA90"]}, id:"1044", name:"Zulema St & Coltart Ave"},
    {func:doubleStripe, opts: {colors:["#A38D6A","#9FADA0"], width:0.15, dist:-0.07}, id:"1031", name:"Maryland Ave & Ellsworth Ave"},
    {func:oneColor, opts: {colors:["#7C7B5A"]}, id:"1026", name:"Penn Ave & S Whitfield St"},
    {func:doubleStripe, opts: {colors:["#948E81","#E0C68C"], width:0.15, dist:0.2}, id:"1043", name:"Coltart Ave & Forbes Ave"},
    {func:candyStripe, opts: {colors:["#A0ADA0","#948E81"], width:0.20, dist:0.2}, id:"1025", name:"Penn Ave & N Fairmount St"}, //TODO
    {func:twoColor, opts: {colors:["#BAB28E","#C3905F"]}, id:"1008", name:"Centre Ave & PPG Paints Arena"},
    {func:oneColor, opts: {colors:["#A89270"]}, id:"1030", name:"S Euclid Ave & Centre Ave"},
    {func:twoColorDiag, opts: {colors:["#D2AC91","#D3A878"]}, id:"1027", name:"Shady Ave & Ellsworth Ave"},
    {func:midStripe, opts: {colors:["#9DA89A","#6A828A"], width:0.18, offset:0}, id:"1037", name:"Frew St & Schenley Dr"},
    {func:midFlag, opts: {colors:["#CFA675", "#A3A67E"], width:0.24, skew:6}, id:"1042", name:"Centre Ave & Kirkpatrick St"},
    ];

  var pillMap = d3.map(pillTypes, function(d) { return d.id; });
  var pillWidth = 100;
  var pillHeight = pillWidth / 7;
  var pillSpace = 10;
  var yearSpace = 60;
  var data = [];
  var aspect = 0;
  var margin = {top: 50, right: 50, bottom: 20, left: 100};
  var width;
  var height;
  var orgWidth;
  var orgHeight;
  var svg = null;
  var g = null;
  var defs = null;

  var zooming = false;

  function pillPath(width, height, padding) {

    var edge = width / 10;
    var halfHeight = height / 2;

    var path = "M 0," + halfHeight;
    path += " l " + edge + "," + (-1 * halfHeight);
    path += " l " + (width - (edge * 2)) + ",0";
    path += " l " + edge + "," + halfHeight;
    path += " l " + (-1 * edge) + "," + halfHeight;
    path += " l " + (-1 * (width - (edge * 2))) + ",0";
    path += " Z";

    return path;
  }

//--------------- ***** Start pill drawing ***** ------------------//

  function oneColor(selection, width, height, opts) {
    selection.selectAll("rect")
      .data([opts.colors[0]]).enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", function(d) { return d; });
  }

  function twoColor(selection, width, height, opts) {
    selection.selectAll("rect")
      .data(opts.colors).enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d,i) { return (i * height / 2); })
      .attr("width", width)
      .attr("height", height / 2)
      .attr("fill", function(d) { return d; });
  }

  function twoColorVert(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var skew = opts.skew || 0;

    selection
      .append("path")
      .attr("d", function() {
        var path = "M " + ((width / 2) - (skew / 2)) + "," + 0;
        path += " l" + ((width / 2) + (skew / 2)) + "," + 0;
        path += " l" + 0 + "," + height;
        path += " l" + (-1 * ((width / 2) - (skew / 2))) + "," + 0;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function twoColorDiag(selection, width, height, opts) {
    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + ",0";
        path += " l " + (-1 * width) + "," + height;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[0]);

    selection.append("path")
      .attr("d", function() {
        var path = "M 0," + height;
        path += " l " + width + ",0";
        path += " l " + 0 + "," + (-1 * height);
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function twoColorDiagRev(selection, width, height, opts) {
    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + "," + height;
        path += " l " + (-1 * width) + ",0";
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[0]);

    selection.append("path")
      .attr("d", function() {
        var path = "M 0,0";
        path += " l " + width + ",0";
        path += " l " + 0 + "," + height;
        path += " z";
        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function midStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;
    var offset = 0;
    if(opts.offset) {
      offset = opts.offset;
    }

    selection.append("rect")
      .attr("x", ((width / 2) - offset) - (stripeWidth / 2))
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
  }

  function doubleStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;
    var halfWidth = width / 2;

    if(opts.colors.length > 2) {
      selection.append("rect")
        .attr("x", ((halfWidth / 2) + (halfWidth * opts.dist)))
        .attr("y", 0)
        .attr("width", stripeWidth * 2)
        .attr("height", height)
        .attr("fill", opts.colors[2]);
    }

    selection.selectAll(".stripe")
      .data([0,1]).enter()
      .append("rect")
      .attr("class", "stripe")
      .attr("x", function(d,i) {
        var dist = i === 0 ? (halfWidth * opts.dist) : (halfWidth * opts.dist * -1);
        return (((halfWidth / 2) + dist) - (stripeWidth / 2)) + (halfWidth * i);
      })
      .attr("y", 0)
      .attr("width", stripeWidth)
      .attr("height", height)
      .attr("fill", opts.colors[1]);
  }

  function candyStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * 0.34;
    var skew = 10;
    var edge = width / 10;

    // var stripeWidth = width * opts.width;
    var halfWidth = width / 2;

    selection.selectAll(".stripe")
      .data([0,1]).enter()
      .append("path")
      .attr("class", "stripe")
      .attr("d", function(d,i) {
        var startX = (i === 0) ? edge : edge + (stripeWidth * 2);
        var path = "M " + startX + "," + 0;
        path += " l" + stripeWidth + "," + 0;
        path += " l" + skew + "," + height;
        path += " l" + (-1 * stripeWidth) + "," + 0;
        path += " z";

        return path;
      })
      .attr("fill", opts.colors[1]);
  }

  function longStripe(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;

    var edge = opts.edge ?  width / 10 : -40;
    var offset = opts.offset || 0;

    selection
      .append("path")
      .attr("d", function(d,i) {
        var path = "M " + (edge) + "," + height ;
        path += " l" + (width - (((edge) * 2) + stripeWidth)) + "," + (-1 * height);
        path += " l" + stripeWidth + "," + 0;
        path += " l" + (-1 * (width - (((edge) * 2) + stripeWidth))) + "," + (height);
        path += " z";

        return path;
      })
      .attr("transform", opts.rev ? "translate(100, 0) scale(-1, 1)" : "")
      .attr("fill", opts.colors[1]);
  }

  function doubleStripeIn(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var stripeWidth = width * opts.width;

    var edge = width / 10;

    selection.selectAll(".flag")
      .data([0,1]).enter()
      .append("path")
      .attr("d", function(d,i) {
        var path = "M " + edge + "," + height ;
        path += " l" + ((width / 2) - ((edge * 2) + stripeWidth)) + "," + (-1 * height);
        path += " l" + stripeWidth + "," + 0;
        path += " l" + (-1 * ((width / 2) - ((edge * 2) + stripeWidth))) + "," + (height);
        path += " z";

        return path;
      })
      .attr("transform", function(d,i) {  return i == 1 ? "translate(100, 0) scale(-1, 1)" : ""; })
      .attr("fill", opts.colors[1]);
  }

  function doubleFlag(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var flagWidth = width * opts.width;
    var halfWidth = width / 2;
    var skew = 6;

    selection.selectAll(".flag")
      .data([0,1]).enter()
      .append("path")
      .attr("class", "flag")
      .attr("fill", opts.colors[1])
      .attr("d", function(d,i) {
        var dist = i === 0 ? (halfWidth * opts.dist) : (halfWidth * opts.dist * -1);
        var path = "M " + ((((halfWidth / 2) + dist ) - ((flagWidth / 2) + (skew / 2))) + (halfWidth * i)) + "," + height;
        path += " l " + (skew) + "," + (-1 * height);
        path += " l " + flagWidth  + "," + 0;
        path += " l " + (-1 * skew)  + "," + ( height);
        path += " z";
        return path;
      });
  }

  function bigTri(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + height;
        path += " l " + ((width / 2) - edge) + "," + (-1 * height);
        path += " l " + ((width / 2) - edge)  + "," + height;
        path += " z";
        return path;
      });
  }

  function theTeeth(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 8;
    var toothWidth = (width - (edge * 2)) / 2;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + 0;
        path += " l " + (toothWidth / 2) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " z";
        return path;
      });

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + toothWidth) + "," + 0;
        path += " l " + (toothWidth / 2) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " z";
        return path;
      });

    var lastCol = opts.colors.length > 2 ? opts.colors[2] : opts.colors[0];

    selection.append("path")
      .attr("fill", lastCol)
      .attr("d", function() {
        var path = "M " + (edge + (toothWidth / 2)) + "," + height;
        path += " l " + (toothWidth / 2) + "," + (-1 * height);
        path += " l " + (toothWidth / 2) + "," + (height);
        path += " z";
        return path;
      });
  }

  function bigX(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;
    var xWidth = width * opts.width;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + (width - xWidth)) + "," + 0;
        path += " l " + ((width / 2) - (edge + (width - xWidth) )) + "," + (height / 2);
        path += " l " + ((width / 2) - ((width - xWidth) + edge)) + "," + (-1 * (height / 2));
        path += " z";
        return path;
      });

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + (edge + (width - xWidth)) + "," + height;
        path += " l " + ((width / 2) - (edge + (width - xWidth))) + "," + (-1 * (height / 2));
        path += " l " + ((width / 2) - ((width - xWidth) + edge)) + "," + ((height / 2));
        path += " z";
        return path;
      });
  }

  function bigTriInverted(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var edge = width / 10;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + edge + "," + 0;
        path += " l " + ((width / 2) - edge) + "," + (height);
        path += " l " + ((width / 2) - edge)  + "," + (-1 * height);
        path += " z";
        return path;
      });
  }

  function littleSquares(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);
    var squares = [true,false,true,false,true];
    var squarePad = width / 10;
    var squareWidth = (width - (squarePad * 2)) / squares.length;
    var squareHeight = height / 2;
    selection.selectAll(".little-square")
      .data(squares).enter()
      .append("rect")
      .attr("class", "little-square")
      .attr("fill", opts.colors[1])
      .attr("width", squareWidth)
      .attr("height", squareHeight)
      .attr("x", function(d,i) { return squarePad + (squareWidth * i); })
      .attr("y", function(d,i) { return d ? squareHeight : 0; });
  }

  function midFlag(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var flagWidth = width * opts.width;
    var skew = opts.skew;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + ((width / 2) - ((flagWidth / 2) + (skew / 2))) + "," + height;
        path += " l " + (skew) + "," + (-1 * height);
        path += " l " + flagWidth  + "," + 0;
        path += " l " + (-1 * skew)  + "," + ( height);
        path += " z";
        return path;
      });
  }

  function twoHooks(selection, width, height, opts) {
    selection.call(oneColor, width, height, opts);

    var hookEdge = width * opts.width;

    selection.append("path")
      .attr("fill", opts.colors[1])
      .attr("d", function() {
        var path = "M " + hookEdge + "," + 0;
        path += " l " + 0 + "," + height / 2;
        path += " l " + (width - (hookEdge * 2)) + "," + 0;
        path += " l " + 0 + "," + height / 2;
        path += " l " + hookEdge + "," + 0;
        path += " l " + 0 + "," + (-1 * height);
        path += " z";
        return path;
      });
  }

  //------------------***** End drawing pills *****--------------------//

  function prepareData(rawData) {
    rawData.forEach(function(d) {
      years.forEach(function(y) {
        d[y] = +d[y];
      });
    });

    return rawData;
  }

  function createLinks(data) {
    var links = [];
    data.forEach(function(d) {
      for(var i = 1; i < years.length; i++) {
        links.push({id:d.id, start:d[years[i-1]], end:d[years[i]], gap:i});
      }
    });

    return links.filter(function(l) { return l.start > 0 && l.end > 0; });
  }

  function getCityTitles(data) {
    endYears = [];
    data.forEach(function(d) {
      var started = false;
      for(var i = 0; i < years.length; i++) {
        if((started) && (isNaN(d[years[i]]) || d[years[i]] == -1)) {
          if(i > 1) {
            var yr = {
              id:d.id,
              year:years[i - 1],
              pos:d[years[i - 1]],
              name:pillMap.get(d.id).name,
              index:i - 1
            };
            endYears.push(yr);
          }
          if((d.id === "nbed") && (i === 7) || (d.id === "wil") && (i === 4)) { //TODO fix bad hack
            continue;
          } else {
            break;
          }
        } else if(i + 1 === years.length) {
          endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
        } else if(!(isNaN(d[years[i]])) && (d[years[i]] !== -1)) {
          if(i > 0 && !started) {
            endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
          } 

          else if(d[years[i]] > sideEnds[years[i]]) {
            endYears.push({id:d.id, year:years[i], pos:d[years[i]], name:pillMap.get(d.id).name, index:i});
          }

          if((d.id === "pet") && (i === 3)) { //TODO fix bad hack
            started = false;
          } else {
            started = true;
          }
        }
      }
    });

    return endYears;
  }

  function getStartCities(data) {
    var startIds = data
    .filter(function(d) { return d[years[0]] > 0; })
    .map(function(d) { return d.id; });
    var cities = startIds.map(function(d) { return {id:d, name:pillMap.get(d).name}; });
    return cities;
  }

  var chart = function(selection) {
    selection.each(function(rawData) {
      data = prepareData(rawData);
      var links = createLinks(data);
      var cityTitles = getCityTitles(data);
      var startCities = getStartCities(data);

      svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");

      orgWidth = width = (pillWidth + yearSpace) * (years.length + 1);
      orgHeight = height = (pillHeight + pillSpace) * 50;


      svg.attr("width", width + margin.left + margin.right + "300");
      svg.attr("height", height + margin.top + margin.bottom );
      svg.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));
      svg.attr("preserveAspectRatio", "xMidYMid");

      aspect = (width + margin.left + margin.right) / (height + margin.left + margin.right);

      defs = svg.append("defs");

      var pill = defs.append("clipPath")
        .attr("id", "pill")
        .append("path")
        .attr("d", pillPath(pillWidth, pillHeight));

      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll(".city-title")
        .data(startCities).enter()
        .append("text")
        .attr("class", "title city-title start-city")
        .attr("x", 0)
        .attr("dx", -100)
        .attr("dy", pillHeight )
        .attr("y", function(d,i) { return (pillHeight + pillSpace) * i; })
        .text(function(d) { return d.name; })
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .on("click", click);

      var defpills = defs.selectAll("pill")
        .data(pillTypes)
        .enter()
        .append("g")
        .attr("id", function(d) { return d.id; })
        .attr("class", "pill");

      defpills.append("g").attr("clip-path", "url(#pill)")
        .each(function(d,i) {
          d3.select(this).call(d.func, pillWidth, pillHeight, d.opts);
        });

      defpills.append("path")
        .attr("class", "pill-outline")
        .attr("d", pillPath(pillWidth, pillHeight));

      g.selectAll("links").data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", function(d,i) { return ((pillWidth + yearSpace) * d.gap) - (yearSpace ) + 75; })
        .attr("y1", function(d,i) { return (pillHeight + pillSpace) * (d.start - 1) + (pillHeight / 2); })
        .attr("x2", function(d,i) { return ((pillWidth + yearSpace) * d.gap + 75); })
        .attr("y2", function(d,i) { return (pillHeight + pillSpace) * (d.end - 1) + (pillHeight / 2); });

      var year = g.selectAll("year").data(years)
        .enter()
        .append("g")
        .attr("class", "year")
        .attr("transform", function(d,i) { return "translate(" + ((pillWidth + yearSpace) * i + 75)  + ",0)";  });

      year.append("text")
        .attr("class", "title year-title")
        .attr("text-anchor", "middle")
        .attr("x", pillWidth / 2)
        .attr("dy", -15)
        .text(function(d) { if(d == "1890")
                                return "Quarter 3";
                               else if(d == "1880")
                                return "Quarter 4";
                                else if(d == "1870")
                                return "Quarter 1";
                                else
                                  return "Quarter 2";
                                 });

      year.append("text")
        .attr("class", "title year-title")
        .attr("text-anchor", "middle")
        .attr("x", pillWidth / 2)
        .attr("dy", -27)
        .text(function(d,i) { return censuses[i]; });

      year.selectAll("pill-use")
        .data(function(y) {
          return data.map(function(d) {
            return {"id":d.id, "value":d[y]};
          }).filter(function(d) { return d.value > 0; });
        })
        .enter()
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.id;})
        .attr("class", "pill-use")
        .attr("transform", function(d,i) {
          return "translate(0," + (d.value - 1) * (pillHeight + pillSpace) + ")";
        })
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .on("click", click);

      g.selectAll("end-title")
        .data(cityTitles)
        .enter()
        .append("text")
        .attr("class", "title end-title")
        .attr("transform", function(d,i) {
          var x = ((pillWidth + yearSpace) * d.index + 75);
          var y = (d.pos ) * (pillHeight + pillSpace);
          return "translate(" + x + "," + y + ")";
        })
        .attr("text-anchor", function(d) { return d.pos > sideEnds[d.year] ? "left" : "middle"; })
        .attr("dx", function(d) { return d.pos > sideEnds[d.year] ? pillWidth + 5 : pillWidth / 2;})
        .attr("dy", -1 * (pillHeight - 1))
        .text(function(d) { return d.name; })
        // .on("mouseover", mouseover)
        // .on("mouseout", mouseout)
        .on("click", click);

      g.append("text")
        .attr("class", "title main-title")
        .attr("x", width / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Rank of All Stations From Quarter 3 of 2015 to Quarter 2 of 2016");

      // g.append("text")
      //   .attr("class", "title zoom-title zoom")
      //   .attr("x", -100)
      //   .attr("y", -50)
      //   .text("zoom")
      //   .on("click", chart.zoom);

      d3.select(window).on('resize', resize);
      resize();
      // if (Modernizr.mq('only screen and (min-width: 800px)')) {
      //   d3.select(window).on('resize', resize);
      //   resize();
      // }
    });
  };

  function resize() {
    if(!zooming) {
      var p = svg.node().parentNode;
      var targetWidth = +d3.select(p).style("width").replace("px","");
      svg.attr("width", targetWidth);
      svg.attr("height", targetWidth / aspect);
    }
  }

  // function mouseover(d,i) {
  //   defs.selectAll(".pill")
  //     .classed("highlight", function() {return d3.select(this).attr("id") === d.id;})
  //     .classed("unhighlight", function(e) {return e.id !== d.id; });
  //   g.selectAll(".link")
  //     .classed("highlight", function(e) {return e.id === d.id; })
  //     .classed("unhighlight", function(e) {return e.id !== d.id; });
  //   g.selectAll(".start-city")
  //     .classed("highlight", function(e) {return e.id === d.id; })
  //     .classed("unhighlight", function(e) {return e.id !== d.id; });
  //   g.selectAll(".end-title")
  //     .classed("highlight", function(e) {return e.id === d.id; })
  //     .classed("unhighlight", function(e) {return e.id !== d.id; });
  // }

  // function mouseout(d,i) {
    // defs.selectAll(".pill").classed("highlight", false);
    // defs.selectAll(".pill").classed("unhighlight", false);
    // g.selectAll(".link").classed("highlight", false);
    // g.selectAll(".link").classed("unhighlight", false);
    // g.selectAll(".start-city").classed("highlight", false);
    // g.selectAll(".start-city").classed("unhighlight", false);
    // g.selectAll(".end-title").classed("highlight", false);
    // g.selectAll(".end-title").classed("unhighlight", false);
  // }

  function click(d,i){
    // alert(d3.select(this).classed("highlight"));
    if(! d3.select(this).classed("highlight")){
      defs.selectAll(".pill")
      .classed("highlight", function() {return d3.select(this).attr("id") === d.id;})
      .classed("unhighlight", function(e) {return e.id !== d.id; });
      g.selectAll(".link")
      .classed("highlight", function(e) {return e.id === d.id; })
      .classed("unhighlight", function(e) {return e.id !== d.id; });
      g.selectAll(".start-city")
      .classed("highlight", function(e) {return e.id === d.id; })
      .classed("unhighlight", function(e) {return e.id !== d.id; });
      g.selectAll(".end-title")
      .classed("highlight", function(e) {return e.id === d.id; })
      .classed("unhighlight", function(e) {return e.id !== d.id; });
    } 
    else{
      defs.selectAll(".pill").classed("highlight", false);
      defs.selectAll(".pill").classed("unhighlight", false);
      g.selectAll(".link").classed("highlight", false);
      g.selectAll(".link").classed("unhighlight", false);
      g.selectAll(".start-city").classed("highlight", false);
      g.selectAll(".start-city").classed("unhighlight", false);
      g.selectAll(".end-title").classed("highlight", false);
      g.selectAll(".end-title").classed("unhighlight", false);  
      }
    
    
  }


  // chart.zoom = function() {
  //   zooming = true;
  //   svg.attr("width", orgWidth + margin.left + margin.right);
  //   svg.attr("height", orgHeight + margin.top + margin.bottom);

  //   svg.select(".zoom")
  //     .text("unzoom")
  //     .on("click", chart.unzoom);
  // };

  // chart.unzoom = function() {
  //   zooming = false;
  //   resize();
  //   svg.select(".zoom")
  //     .text("zoom")
  //     .on("click", chart.zoom);
  // };

  return chart;
};

var zooming = false;

$(document).ready(function() {
  var plot = chart();

  function display(error, data) {
    d3.select("#vis").datum(data).call(plot);
  }

  queue()
    .defer(d3.csv, "data/pops.csv")
    .await(display);

  function unzoomSetup() {
    d3.select("#zoom").on("click", function() {
      plot.unzoom();
      d3.select(this)
      .text("zoom");
      zoomSetup();
    });
  }

  function zoomSetup() {
    d3.select("#zoom").on("click", function() {
      if (zooming) {
        plot.unzoom();
        d3.select(this)
          .text("zoom");
      } else {
        plot.zoom();
        d3.select(this)
          .text("unzoom");
      }
      zooming = !zooming;
    });
  }

  zoomSetup();
});
