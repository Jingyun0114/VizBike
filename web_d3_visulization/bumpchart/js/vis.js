
var years = ["1890","1880","1870","1860"];
var censuses = ["2015", "2015", "2016", "2016"];


var sideEnds = {
  "1860":0

};

var chart = function() {

  var pillTypes = [
    {func:oneColor, opts: {colors:["#F8C3CD"]}, id:"1001", name:"Forbes Ave & Market Sq (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#8E354A"]}, id:"1045", name:"S 27th & Tunnel Blvd (Capacity: 19)"},
    {func:twoColor, opts: {colors:["#DB8E71","#FAD689"]}, id:"1010", name:"10th St & Penn Ave (Capacity: 15)"},
    {func:twoColor, opts: {colors:["#B55D4C","#D05A6E"]}, id:"1000", name:"Liberty & Stanwix (Capacity: 16)"},
    {func:twoColorVert, opts: {colors:["#DCB879","#994639"]}, id:"1017", name:"21st St & Penn Ave (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#86473F"]}, id:"1013", name:"Isabella St & Federal St (Capacity: 15)"},
    {func:oneColor, opts: {colors:["#DAC9A6"]}, id:"1012", name:"North Shore Trail & Ft Duquesne Bridge (Capacity: 35)"},
    {func:twoColorDiag, opts: {colors:["#9F353A","#B47157"]}, id:"1049", name:"S 12th St & E Carson St (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#D75455"]}, id:"1041", name:"Fifth Ave & S Bouquet (Capacity: 19)"},
    {func:midStripe, opts: {colors:["#B54434","#D9CD90"], width:0.5}, id:"1019", name:"42nd St & Butler St (Capacity: 17)"},
    {func:midStripe, opts: {colors:["#FB966E","#F19483"], width:0.3}, id:"1033", name:"Ivy St & Walnut St (Capacity: 19)"},
    {func:twoColor, opts: {colors:["#F0A986","#B5495B"]}, id:"1016", name:"17th St & Penn Ave (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#CB1B45"]}, id:"1048", name:"S 18th St & Sidney St (Capacity: 16)"},
    {func:littleSquares, opts: {colors:["#D05A6E", "#F17C67"]}, id:"1018", name:"37th St & Butler St (Capacity: 21)"},
    {func:oneColor, opts: {colors:["#F8C3CD"]}, id:"1011", name:"Fort Duquesne Blvd & 7th (Capacity: 15)"},
    {func:longStripe, opts: {colors:["#B55D4C", "#F75C2F"], width:0.6, edge:false}, id:"1036", name:"Schenley Dr at Schenley Plaza (Capacity: 19)"},
    {func:bigTri, opts: {colors:["#ECB88A", "#D7B98E"]}, id:"1015", name:"Federal St & E North Ave (Capacity: 12)"},
    {func:twoColorVert, opts: {colors:["#B5495B", "#E87A90"]}, id:"1004", name:"First Ave & B St (Capacity: 15)"},
    {func:midFlag, opts: {colors:["#DC9FB4", "#CC543A"], width:0.25, skew:6}, id:"1006", name:"Ross St & Sixth Ave (Capacity: 21)"},
    {func:twoColor, opts: {colors:["#F4A7B9","#DDA52D"]}, id:"1046", name:"S 25th St & E Carson St (Capacity: 18)"},
    {func:twoColorVert, opts: {colors:["#F19483","#E16B8C"]}, id:"1005", name:"Forbes Ave & Grant St (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#B5495B"]}, id:"1047", name:"S 22nd St & E Carson St (Capacity: 20)"},
    {func:twoColor, opts: {colors:["#F596AA","#B35C37"]}, id:"1009", name:"12th St & Penn Ave (Capacity: 19)"},
    {func:twoColorVert, opts: {colors:["#E1A679","#EEA9A9"]}, id:"1040", name:"Bigelow Blvd & Fifth Ave (Capacity: 21)"},
    {func:oneColor, opts: {colors:["#E98B2A"]}, id:"1029", name:"Alder St & S Higland Ave (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#9E7A7A"]}, id:"1002", name:"Third Ave & Wood St (Capacity: 15)"},
    {func:twoColorDiag, opts: {colors:["#E87A90","#BF6766"]}, id:"1034", name:"Ellsworth Ave & N Neville St (Capacity: 15)"},
    {func:doubleStripe, opts: {colors:["#EB7A77","#D0104C"], width:0.08, dist:0.08}, id:"1023", name:"Liberty Ave & Baum Blvd (Capacity: 21)"},
    {func:bigTriInverted, opts: {colors:["#CB4042", "#DC9FB4"]}, id:"1003", name:"First Ave & Smithfield St (Capacity: 15)"},
    {func:twoColorDiag, opts: {colors:["#E3916E","#FB966E"]}, id:"1038", name:"Boulevard of the Allies & Parkview Ave (Capacity: 19)"},
    {func:twoHooks, opts: {colors:["#F8C3CD","#DB8E71"], width:0.1}, id:"1007", name:"Stevenson St & Forbes Ave (Capacity: 19)"},
    {func:midStripe, opts: {colors:["#FAD689","#DCB879"], width:0.5}, id:"1035", name:"Fifth Ave & S Dithridge St (Capacity: 19)"},
    {func:midStripe, opts: {colors:["#86473F","#DAC9A6"], width:0.2, offset:8}, id:"1039", name:"Atwood St & Bates (Capacity: 19)"},
    {func:bigTri, opts: {colors:["#B47157", "#D75455"]}, id:"1014", name:"Ridge Ave & Brighton Rd (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#B54434"]}, id:"1021", name:"Taylor St & Liberty Ave (Capacity: 19)"},
    {func:doubleStripe, opts: {colors:["#F19483","#F0A986"], width:0.15, dist:0.0}, id:"1032", name:"Maryland Ave & Walnut St (Capacity: 15)"},
    {func:midStripe, opts: {colors:["#CB1B45","#D05A6E"], width:0.3} , id:"1028", name:"Penn Ave & Putnam St (Capacity: 19)"},
    {func:midFlag, opts: {colors:["#F17C67", "#F8C3CD"], width:0.27, skew:6}, id:"1022", name:"Liberty Ave & S Millvale (Capacity: 15)"},
    {func:doubleFlag, opts: {colors:["#B55D4C", "#F75C2F"], width:0.08, dist:0.3}, id:"1020", name:"42nd St & Penn Ave (Capacity: 15)"},
    {func:twoColorVert, opts: {colors:["#ECB88A","#D7B98E"]}, id:"1024", name:"S Negley Ave & Baum Blvd (Capacity: 17)"},
    {func:oneColor, opts: {colors:["#B5495B"]}, id:"1044", name:"Zulema St & Coltart Ave (Capacity: 19)"},
    {func:doubleStripe, opts: {colors:["#E87A90","#DC9FB4"], width:0.15, dist:-0.07}, id:"1031", name:"Maryland Ave & Ellsworth Ave (Capacity: 19)"},
    {func:oneColor, opts: {colors:["#CC543A"]}, id:"1026", name:"S Whitfield St & Baum Blvd (Capacity: 13)"},
    {func:doubleStripe, opts: {colors:["#F4A7B9","#DDA52D"], width:0.15, dist:0.2}, id:"1043", name:"Coltart Ave & Forbes Ave (Capacity: 15)"},
    {func:candyStripe, opts: {colors:["#E16B8C","#B5495B"], width:0.20, dist:0.2}, id:"1025", name:"Penn Ave & N Fairmount St (Capacity: 15)"}, //TODO
    {func:twoColor, opts: {colors:["#F596AA","#B35C37"]}, id:"1008", name:"Centre Ave and Consol (Capacity: 35)"},
    {func:oneColor, opts: {colors:["#E1A679"]}, id:"1030", name:"S Euclid Ave & Centre Ave (Capacity: 12)"},
    {func:twoColorDiag, opts: {colors:["#EEA9A9","#E98B2A"]}, id:"1027", name:"Shady Ave & Ellsworth Ave (Capacity: 19)"},
    {func:midStripe, opts: {colors:["#9E7A7A","#E87A90"], width:0.18, offset:0}, id:"1037", name:"Frew St & Schenley Dr (Capacity: 20)"},
    {func:midFlag, opts: {colors:["#BF6766", "#EB7A77"], width:0.24, skew:6}, id:"1042", name:"Centre Ave & Kirkpatrick St (Capacity: 12)"},
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
        .attr("x1", function(d,i) { return ((pillWidth + yearSpace) * d.gap) - (yearSpace ) + 75 + 60; })
        .attr("y1", function(d,i) { return (pillHeight + pillSpace) * (d.start - 1) + (pillHeight / 2); })
        .attr("x2", function(d,i) { return ((pillWidth + yearSpace) * d.gap + 75 + 60); })
        .attr("y2", function(d,i) { return (pillHeight + pillSpace) * (d.end - 1) + (pillHeight / 2); });

      var year = g.selectAll("year").data(years)
        .enter()
        .append("g")
        .attr("class", "year")
        .attr("transform", function(d,i) { return "translate(" + ((pillWidth + yearSpace) * i + 75)  + ",0)";  });

      year.append("text")
        .attr("class", "title year-title")
        .attr("text-anchor", "middle")
        .attr("x", pillWidth / 2 + 60)
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
        .attr("x", pillWidth / 2 + 60)
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
          return "translate(60," + (d.value - 1) * (pillHeight + pillSpace) + ")";
        })
        .on("click", click);


      d3.select(window).on('resize', resize);
      resize();
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


  function click(d,i){
    if(! d3.select(this).classed("highlight")){
      defs.selectAll(".pill")
      .classed("highlight", function() {return d3.select(this).attr("id") === d.id;})
      .classed("unhighlight", function(e) {return e.id !== d.id; })
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
