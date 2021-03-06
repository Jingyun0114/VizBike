
/* Colors found in sass/viz.scss but if there's a clever way to automate extraction */
var positive_color = '#2c826b';//36ac9c';
var negative_color = '#df6342'//'#8B2A2F';//f9a72b';
var neutral_color = '#a1988d';'#9b8978';// #6f5d4d';//'#c9baad';//'#b4aca8';//c7bb79';
// by hand darkened in the gimp '#c0c29d';

//With 25% opacity the mix is this: "#d1d3b1";//"#ac9faa"
var acc_y_ax_pad = 50;
var highlighted_color = '#ffffff';
var selected_color = '#fddf24';
var excessFactor = 0.2; // corresponds to Zia's old value of 1.5, with new math arrive/depart > (1+F)/(1-F).
// arrive = 1.5*depart >> arrive = 60% of total traffic, which seems like the easiest way to talk about it. .2 means 20% of middle is considered neutral...

var hourMap = ["Mon",  "Tue",  "Wed",  "Thur",  "Fri",  "Sat", "Sun"];
var longhourMap = ["Monday",  "Tuesday",  "Wednesday",  "Thursday",  "Friday",  "Saturday", "Sunday"]

/* Abstract representation of the state of the UI (a la Model-View-ViewModel) */
function ViewModel(stations, hourly_data) {
    var self = this;

    /* Static data, attaching to this object */
    self.stations = stations;
    self.hourly_data = hourly_data;

    /* Key view state */
    self.selected_station = ko.observable("1000"); // Interesting station
    self.selected_hour = ko.observable(0); // Interesting hour

    self.highlighted_hour = ko.observable(null);
    self.highlighted_map_station = ko.observable(null);
    self.highlighted_accum_station = ko.observable(null);

    /*
     * Precomputed fields
     */

    /* Extracts either the arrival or departure data for a particular station id */
    function one_station_data(hourly_data, accessor, station_id) {
        if (!station_id) {
            return null
        } else {
            return _.chain(hourly_data)
                .filter(function(d) { return d.station_id == station_id;})
                .sortBy(function(d) { return d.hour })
                .map(accessor) // Either d.arrivals or d.departures, basically
                .value();
        }
    }

    var precomputed_station_arrivals = {};
    var precomputed_station_departures = {};
    _(stations).each(function(station) {
        precomputed_station_arrivals[station.id] = one_station_data(self.hourly_data, function(d) { return d.arrivals; }, station.id);

        precomputed_station_departures[station.id] = one_station_data(self.hourly_data, function(d) { return d.departures; }, station.id);
    });

    /* Extracts the accumulation data for a particular day, or the string "total" */
    function hour_accumulation(hourly_data, hour) {
        if (_(hour).isNumber()) {
            var result = _.chain(hourly_data)
                .filter(function(d) { return d.hour === hour; })
                .sortBy(function(d) { return -d.accumulation; })
                .value();

            return result;
        } else {
            var result = _.chain(hourly_data)
                .filter(function(d) { return d.hour <7;})
                .groupBy(function(d) { return d.station.id; })
                .map(function(ds, station_id) {
                    template = _.clone(_(ds).first());
                    // template = _(template).extend({
                    //     hour: "total",
                    //     accumulation: _(ds).reduce(function(accum, d) { return accum + d.accumulation; }, 0),
                    //     arrivals: _(ds).reduce(function(accum, d) { return accum + d.arrivals; }, 0),
                    //     departures: _(ds).reduce(function(accum, d) { return accum + d.departures; }, 0),
                    //     traffic: _(ds).reduce(function(accum, d) { return accum + d.traffic; }, 0)
                    // });
                    return template;
                })
                .sortBy(function(d) { return -d.accumulation; })
                .value();
            return result;
        }
    }

    var precomputed_accumulations = {
        hourly: _(_.range(0, 7)).map(function(hour) { return hour_accumulation(self.hourly_data, hour); }),
        total: hour_accumulation(self.hourly_data, "total")
    };

    /*
     * Derived fields
     */

    /* Just one or the other of the highlighted stations from different UI controls */
    self.highlighted_station = ko.computed(function() {
        var map_station = self.highlighted_map_station();
        var accum_station = self.highlighted_accum_station();
        return map_station || accum_station;
    });

    /* And now the highlighted station or the selected station for appearance in the chart */
    self.station_chart_station = ko.computed(function() {
        var highlighted_station = self.highlighted_station();
        var selected_station = self.selected_station();
        return highlighted_station || selected_station;
    });

    /* Accumulation computed from the highlighted/selected hour, otherwise overall. */
    self.accumulation_data = ko.computed(function() {
        var selected_hour = self.selected_hour();
        var highlighted_hour = self.highlighted_hour();
        var hour = (highlighted_hour !== null) ? highlighted_hour : selected_hour;

        return (hour === "total") ? precomputed_accumulations.total : precomputed_accumulations.hourly[hour];
        return result;
    });


    // HELP I can't figure out why this data is switched
    // The code looked right, but I made it look wrong
    // so that the data would be right!! -- Zia
    self.one_station_arrivals = ko.computed(function() {
        return precomputed_station_departures[self.station_chart_station()];
    });
    // note representing departures as negative for line graph
    self.one_station_departures = ko.computed(function() {
        return precomputed_station_arrivals[self.station_chart_station()];
    });
}

function color_w_neutral(d){
    return (d.accumulation > 0) ? "bar positive" :
        (-d.accumulation > 0) ? "bar negative":
        "bar neutral";
}
function color_basic(d){
    return (d.arrivals > d.departures) ? "bar positive" : "bar negative";
}
/* The station accumulation bars */
function set_up_station_accumulations(view_model) {
    var width = $('#accumulation-chart').width() - acc_y_ax_pad;
    var height = $('#accumulation-chart').height() + 100;

    var svg = d3.select("#accumulation-chart").append("svg")
        .attr("width", width+acc_y_ax_pad)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + acc_y_ax_pad + ",0)");

    var width = $('#accumulation-chart').width() - acc_y_ax_pad;
    var height = $('#accumulation-chart').height();

    ko.computed(function() {
        var data = view_model.accumulation_data();

        var min_acc = _.min(_(data).map(function(d) { return d.accumulation;} ));
        // var max_acc = _.max(_(data).map(function(d) { return d.accumulation;} ));
        var max_acc = 8;
        var y_max = Math.max(-min_acc-1, max_acc+1);

        // Y scale keep 0 at exactly the midpoint of the SVG canvas
        var y = d3.scale.linear()
            .domain([-8, 8])
            .range([height, 10])
            .nice();

        // X scale allocates fixed-size rectangles for stations in order.
        // FIXME: I think it should be by index, not station id, since it stays sorted. We'll see when things get dynamic
        var x = d3.scale.ordinal()
            .domain(_(data).map(function(d) { return d.station_id; }))
            .rangeRoundBands([0, width]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(16)
            //坐标轴
            .orient("left");

        // Actually bind the data
        svg.selectAll(".station-accumulation").remove();
        var svg_data = svg.selectAll(".station-accumulation")
            .data(data)

        svg_data.exit().remove();

        var accumulation_enter = svg_data.enter()
            .append("g").attr("class", "station-accumulation");

        /* The visible bar */
        accumulation_enter.append("rect")
            .attr("class", function(d){ return color_basic(d);})
            .attr("data-station", function(d) { return d.station_id; })
            .attr("data-accum", function(d) { return d.accumulation; })
            .attr("x", function(d, i) { return x(d.station_id); })
            .attr("y", function(d) { return y(Math.max(0, d.accumulation)); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return Math.abs( y(d.accumulation)-y(0));});

        svg.selectAll('g.axis').remove();
        svg.append("g")
            .attr("class", "bary axis")// TODO: create a style for this
            .attr("transform","translate(8, " + 0 + ")")
            .call(yAxis)
            .append("text")
            .attr("y",-35)
            .attr("x", -50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .text("Net Accumulation of Bikes");

        svg.append("g")
            .attr("class", "bary axis")// TODO: create a style for this
            .append("line")
            .attr("x1", 0)
            .attr("x2", width - 100) // hack not sure why it extends too far
            .attr("y1", y(0))
            .attr("y2", y(0));

        /* The station name*/
        accumulation_enter
            .append("g")
            .attr("transform", function(d) { return "translate(" + ( x(d.station_id) + x.rangeBand()*2/3.5 )+ ", " + y(0) + ")," + "rotate(270)" })
            .append("text")
            .attr("class", function(d) { return d.accumulation < 0 ? "bar-label negative" : "bar-label positive"; })
            .attr("dx", function(d) { return d.accumulation < 0 ? "0.6em" : "-0.6em" })
            .text(function(d) { return d.station.short_name });

        /* An invisible rectangle over everything to receive selection */
        var selected_station = view_model.selected_station.peek(); // No dependency, so we do not recompute too much
        var highlighted_station = view_model.highlighted_station.peek();
        accumulation_enter.append("rect")
            .attr("class", function(d) { return (selected_station == d.station_id) ? "activator selected" :
                                                 (highlighted_station == d.station_id) ? "activator highlighted" :
                                                 "activator" })
            .attr("data-station", function(d) { return d.station_id; })
            .attr("data-accum", function(d) { return d.accumulation; })
            .attr("x", function(d, i) { return x(d.station_id) - 1; })
            .attr("y", 0)
            .attr("width", x.rangeBand() + 2)
            .attr("height", height);
    });

    /* Set up mouse handlers for highlight */
    function mouseover_handler() {
        var station_id = $(this).attr("data-station");
        var highlighted_station = view_model.highlighted_accum_station.peek();

        if (highlighted_station != station_id) {
            view_model.highlighted_accum_station( station_id );
        }
    }

    var throttled_mouseover = $.throttle(100, mouseover_handler);

    /* In order to always catch events from dynamically generated content, the parent div is where we bind */
    $('#accumulation-chart').on("mouseover", "rect", throttled_mouseover);
    $('#accumulation-chart svg').mouseout(function() {
        view_model.highlighted_accum_station( null );
    });

    $('#accumulation-chart').on("click", 'rect[class~="activator"]', function() {
        $('#accumulation-chart .activator.selected').attr("class", "activator");
	// if we re-run the hour can we get it in back?
        view_model.selected_station( $(this).attr('data-station') );
    });

    /* Set up watchers for updating highlighted. Since selection overrides highlight, do them in one handler */
    ko.computed(function() {
        var selected_station = view_model.selected_station();
        var highlighted_station = view_model.highlighted_station();
        $('#accumulation-chart svg .activator.selected').attr("class", "activator");
        $('#accumulation-chart svg .activator.highlighted').attr("class", "activator");

        $('#accumulation-chart svg rect[class~="activator"][data-station=' + highlighted_station + ']').attr("class", "activator highlighted");
        $('#accumulation-chart svg rect[class~="activator"][data-station=' + selected_station + ']').attr("class", "activator selected");
    });
}

function set_up_map(view_model) {
    var circle_scale = 50;

    // Center coords, and zoomlevel 13
    var map = L.map('map', {
        scrollWheelZoom: false
    });

    // var layer = new L.MAPCTileLayer("basemap");
    // map.addLayer(layer);
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	// 	maxZoom: 18,
  	// 	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  	// }).addTo(map);
    // var min_lat = _.chain(stations).map(function(s) { return s.lat }).min().value();
    // var max_lat = _.chain(stations).map(function(s) { return s.lat }).max().value();
    // var min_lng = _.chain(stations).map(function(s) { return s.lng }).min().value();
    // var max_lng = _.chain(stations).map(function(s) { return s.lng }).max().value();

    map.setView([40.4470, -79.9680], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  		maxZoom: 18,
  		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  		id: 'mapbox.streets'
  	}).addTo(map);


    /* Initialize circles - mouseover to highlight the station, click to select it */
    var circles = {};
    _(view_model.stations).each(function(station) {

      var circle = L.circle([station.lat, station.lng], 0).addTo(map);
        var greenIcon = L.icon({
          // iconUrl: 'flag.jpg',
          // iconSize:     [30, 30],
          // iconAnchor:   [14.5, 25],

          iconUrl: 'bike.png',
          iconSize:     [11, 11],
          iconAnchor:   [5, 5],
      });



      L.marker([station.lat, station.lng], {icon: greenIcon}).addTo(map);
        // L.marker([station.lat, station.lng], 0).addTo(map);

        circle.on('mouseover', function() { view_model.highlighted_map_station(station.id); });
        circle.on('mouseout', function() {
            var highlighted_map_station = view_model.highlighted_map_station();

            /* Only clear the selection if another has not already been entered */
            if (highlighted_map_station == station.id) {
                view_model.highlighted_map_station(null);
            }
        });
        circle.on('click', function() {
            var selected_station = view_model.selected_station();
            if (station.id == selected_station) {
                view_model.selected_station(null);
            } else {
                view_model.selected_station(station.id);
            }
        });

        circles[station.id] = circle;
    });

    /* Make circles always reflect the current data */
    ko.computed(function() {
        var selected_hour = view_model.selected_hour();
        var highlighted_hour = view_model.highlighted_hour();
	var hour = (highlighted_hour !== null) ? highlighted_hour : selected_hour;

        var highlighted_station = view_model.highlighted_station();
        var selected_station = view_model.selected_station();
        var data = view_model.accumulation_data();
        var black = "#000000";
        var gray = "#5f5e5e";
	var normal_op = (hour === "total")?0.3:0.5; // fudge the circles smaller for the totals, illegible otherwise.
        _(data).each(function(d) {

            var fillColor =
                (d.accumulation > 0) ? positive_color :
                (-d.accumulation > 0) ?  negative_color:
                neutral_color;
            var color =
                (d.station.id == highlighted_station) ? gray:
                (d.station.id == selected_station) ? black :
                fillColor;
            var weight =
                (d.station.id == highlighted_station) ? 4 : 2;
            var fillOpacity =
                (d.station.id == selected_station) ? 1.0: normal_op;

            circles[d.station.id].setRadius(circle_scale * Math.sqrt(Math.abs(d.traffic+3)));
            // circles[d.station.id].setRadius((d.traffic+6)*8);

            circles[d.station.id].setStyle({
                color: color, fillColor: fillColor,
                weight: weight, opacity: 1.0, fillOpacity: fillOpacity
            });
        });
    });
}

function set_up_hours(view_model) {

    function highlight_hour(hour) {
        var highlighted_hour = view_model.highlighted_hour();

        if (highlighted_hour != hour) {
            view_model.highlighted_hour(hour);
        }
    }

    function unhighlight_hour(hour) {
        var highlighted_hour = view_model.highlighted_hour();

        /* Only unhighlight if another hour has not been chosen */
        if (highlighted_hour == hour) {
            view_model.highlighted_hour(null);
        }
    }

    function mouse_handler(event) {
        var this_hour = $(this).attr('data-hour');
        this_hour = this_hour == "total" ? "total" : parseInt(this_hour);

        if (event.type == "mouseover") {
            highlight_hour(this_hour);
        } else if (event.type == "mouseout") {
            $.debounce(100, unhighlight_hour)(this_hour); // Prevent jitters from immediate deselection
        } else if (event.type == "click") {
            view_model.selected_hour(this_hour);
        }
    }

    var throttled_mouse_handler = mouse_handler;
    $('#hour-controls').on('mouseover mouseout click', '.hour', throttled_mouse_handler);

    ko.computed(function() {
        var selected_hour = view_model.selected_hour();

        $('#hour-controls .selected').removeClass('selected');
        $('#hour-controls .hour[data-hour=' + selected_hour + ']').addClass('selected');
    });
}

function set_up_station_chart(one_station_departures, one_station_arrivals) {
    // Begin Graphical Elements for Station Chart
    // sc for station_chart
    // Margin convention from here: http://bl.ocks.org/3019563
    var width = $('#station-chart').width();    // TODO how to make width '100%' again dynamically?, use width of parent?
    var height = $('#station-chart').height();
    var margin_bottom = 30; // This has to be within the SVG, to make room for x axis labels, but nothing else does

    var chart_svg = d3.select('#station-chart').append('svg')
        .attr('width', width)
        .attr('height', height);

        // chart_svg.selectAll("g.point.arrivals")
        // .attr("class", "point")
        //     .datum(one_station_arrivals)
        //     .enter()
        //     .append("circle")
        //     .attr("r", 10)
        //     .attr("cx", function(d, i) { return x_scale(i); })
        //     .attr("cy", function(d) { return y_scale(d); });

    chart_svg.append("path")
        .attr("class", "line arrivals");

        chart_svg.append("g")
            .attr("class", "point arrivals");

    chart_svg.append("path")
        .attr("class", "line departures");

    chart_svg.append("path")
        .attr("class", "area arrivals");

    chart_svg.append("path")
        .attr("class", "area departures");

    // BEGIN LEGEND CODE
    // We can keep the legend in a fixed location, so no need to update for new data
    var legend = {
    	x_start: width-120,
    	x_end: width-100,
    	t_start: width-90,
    	y_first: 15,
    	y_second: 30,
    	yt_fudge: 3, // move the text down just a bit
    };

    chart_svg.append("g")
        .attr("class", "line arrivals")
        .append("line")
        .attr("x1", legend.x_start)
        .attr("x2", legend.x_end)
        .attr("y1", legend.y_first)
        .attr("y2", legend.y_first);

    chart_svg.append("text")
      	.text("Bikes In")
      	.attr("class", "title")
      	.attr("x", legend.t_start)
      	.attr("y", legend.y_first+legend.yt_fudge);

       chart_svg.append("g")
        .attr("class", "line departures")
        .append("line")
        .attr("x1", legend.x_start)
        .attr("x2", legend.x_end)
        .attr("y1", legend.y_second)
        .attr("y2", legend.y_second);

    chart_svg.append("text")
      	.text("Bikes Out")
      	.attr("class", "title")
      	.attr("x", legend.t_start)
      	.attr("y", legend.y_second+legend.yt_fudge);
    // END LEGEND CODE


    return chart_svg;
}

function bind_station_chart_data(chart_svg, one_station_departures, one_station_arrivals, capacity) {
    var width = $('#station-chart').width();    // TODO how to make width '100%' again dynamically?, use width of parent?
    var height = $('#station-chart').height();
    var margin_bottom = 30; // This has to be within the SVG, to make room for x axis labels, but nothing else does

    // var one_station_max = Math.max(
    //     Math.max(_.max(one_station_departures)),
    //     _.max(one_station_arrivals));
    //
    // var min_thr = Math.min(3, one_station_max*2);
    // one_station_max = Math.max(min_thr, one_station_max)*1.1;

    //X axis
    var x_scale = d3.scale.ordinal()
        .domain(_.range(0,7))
        // .domain(['Mon','Tue','Wedn','Thur','Fri','Sat','Sun'])
        .rangeRoundBands([25, width+10]);

    var y_scale = d3.scale.linear()
        //max for arrival & departures
        .domain([0, 50])
        .range([height-margin_bottom, 40]);

    var line = d3.svg.line()
        .x(function(d, i) { return x_scale(i); })
        .y(function(d) { return y_scale(d); })
        .interpolate("cardinal");
        // curve the lines a little bit

    var area = d3.svg.area()
        .interpolate("cardinal") // curve the lines a little bit
        .x(function(d, i) { return x_scale(i); })
        .y1(function(d) { return y_scale(d); })
        .y0(function(d) { return y_scale(0);});

    // TODO: a smooth transition
    chart_svg.selectAll("path.line.arrivals")
        .datum(one_station_arrivals)
        .attr("d", line);

        chart_svg.selectAll("g.point.arrivals")
        .attr("class", "point")
            .datum(one_station_arrivals)
            // .enter()
            // .append("circle")
            .attr("r", 10)
            .attr("cx", function(d, i) { return x_scale(i); })
            .attr("cy", function(d) { return y_scale(d); });
            // .on("mouseover", function(d) {
            //     div.transition()
            //         .duration(200)
            //         .style("opacity", .9);
            //     div	.html(formatTime(d.date) + "<br/>"  + d.close)
            //         .style("left", (d3.event.pageX) + "px")
            //         .style("top", (d3.event.pageY - 28) + "px");
            //     })
            // .on("mouseout", function(d) {
            //     div.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            // });


    chart_svg.selectAll("path.line.departures")
        .datum(one_station_departures)
        .attr("d", line);

    chart_svg.selectAll("path.area.departures")
        .datum(one_station_departures)
        .attr("d", area);
    chart_svg.selectAll("path.area.arrivals")
        .datum(one_station_arrivals)
        .attr("d", area);

//ADD POINT
      //   chart_svg.selectAll("path.point")
      //   .attr("cx",function(d){return x(hour)})
      //  .attr("cy",function(d){return y(one_station_arrivals)})
      //  .attr("r",4);

    sc_x_axis = d3.svg.axis()
        .scale(x_scale)
        .orient("bottom")
        .ticks(6)
	      .tickFormat(function(d){
          return hourMap[parseInt(d)];
        });

    sc_y_axis = d3.svg.axis()
        .scale(y_scale)
        .orient("left")
        // .ticks(12)
        // remove the zero that is lying on the x axis
	      .tickFormat(function(d){
          return d;
      });

    // TODO: mutate axis if it is too ugly
    chart_svg.selectAll('g.axis').remove();

    //Control X axis
    chart_svg.append("g")
        .attr("class", "axis")
        .attr("transform","translate(-27, " + y_scale(0) + ")")
        .call(sc_x_axis);

    //Control Y axis
    chart_svg.append("g")
        .attr("class", "y axis")
        .attr("transform","translate(25.5, " + 0 + ")")
        .call(sc_y_axis)
        .append("text")
        .attr("transform","translate(55, " + 0 + ")")
        .attr("y", 15)
      	.attr("x", -30)
      	.attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Trips per Day");

}

function formatStats(cap, arrivals, departures, selectedHour){

    var dSum = Math.round(sum24HrsData(arrivals));
    var aSum = Math.round(sum24HrsData(departures));

    var sd = arrivals[selectedHour];
    var sa = departures[selectedHour];

    return 'Capacity: '+ cap;
}

$(document).ready(function() {

    /* Massage the initial data to make life a little easier */
    var stations_by_id = {};
    _(stations).each(function(station) { stations_by_id[station.id] = station; });
    _(hourly_data).each(function(d) {
        d.traffic = d.arrivals + d.departures; // vs d.accumulation which is d.arrivals - d.departures
        d.station = stations_by_id[d.station_id];
    });

    var station_capacity_by_id = {};
    _(station_capacity).each(function(cap){
        station_capacity_by_id[cap.station_id] = cap.capacity;
    });

    /* Set up View Model; allow the console to access it easily */
    window.view_model = new ViewModel(stations, hourly_data);

    /* Set up UI components */
    set_up_station_accumulations(view_model);
    set_up_hours(view_model);
    set_up_map(view_model);

    // Configure the map footer and header
    ko.computed(function() {
	var station_id = view_model.station_chart_station();
	var selected_hour = view_model.selected_hour();
	var highlighted_hour = view_model.highlighted_hour();
        var hour = (highlighted_hour !== null) ? highlighted_hour : selected_hour;

	var data = view_model.accumulation_data();

	var datum = _(data).filter(function(d){return d.station_id == station_id;})[0];

	var nameStr = stations_by_id[station_id].short_name;

  if(datum.traffic == 0) {
    var trafficStr = ' --- Average traffic: ' + datum.traffic + ' trips/day';
  } else if (datum.traffic == 1) {
    if (datum.arrivals == 1) {
      var trafficStr = ' --- Average traffic: ' + datum.traffic + ' trips/day ' + 'which is an arrival';
    } else if(datum.departures == 1) {
      var trafficStr = ' --- Average traffic: ' + datum.traffic + ' trips/day ' + 'which is a departure';
    }
  } else {
    var trafficStr = ' --- Average traffic: ' + datum.traffic + ' trips/day of which ' +
  	    Math.round(datum.arrivals/datum.traffic*100) + ' % are arrivals';
  }


	var titleString = 'Total traffic (sum of arrivals and departures) '

	$('#map-foot-station').text("Selected Station: ");

  $('#map-panel header').text(titleString + ' on '+ longhourMap[hour]);
  $('#map-foot-stats').text(nameStr +' @ ' +longhourMap[hour] + trafficStr);

  $('#day').text(longhourMap[hour]);

	// if (hour !== 'total'){
	//     $('#map-panel header').text(
	// 	titleString + ' on '+
	// 	    longhourMap[hour]);
	//     $('#map-foot-stats').text(nameStr +' @ ' +longhourMap[hour] +
	// 	    trafficStr);
	// }else{
	//     $('#map-panel header').text(
	// 	titleString + 'for typical weekday.');
	//     $('#map-foot-stats').text( nameStr +
	// 	' 24 Hr ' +
	// 	    trafficStr);
	//     }

    });
    /* Set up the station line chart header */
    ko.computed(function() {
        var station_id = view_model.station_chart_station();
        var capacity = station_capacity_by_id[
            view_model.station_chart_station()];

        if (station_id) {
            // $('#station-chart-panel header').text("Average " + stations_by_id[station_id].short_name + " Station Traffic by Day");
            $('#stationname').text(stations_by_id[station_id].short_name + " Station");
            $('img#station-deselect').attr('style', 'display: normal');
        } else {
            $('#station-chart-panel header').text('Select a station to see day-by-day activity.');
            $('img#station-deselect').attr('style', 'display: none');
        }
    });

    $('#station-deselect').click(function() {
        view_model.selected_station(null);
        $('#accumulation-chart .activator.selected').attr("class", "activator")
        return false;
    });

    /* Set up the station chart and subscribe to data changes */
    var station_chart_svg = null; // This will start blank and be added when data is ready

    // TODO: this can go right into the set up
    ko.computed(function() {
        var arrivals = view_model.one_station_arrivals();
        var departures = view_model.one_station_departures();
        var capacity = station_capacity_by_id[
            view_model.station_chart_station()];
        var hour = view_model.selected_hour();

        if (arrivals && departures) {
            if (!station_chart_svg) {
                station_chart_svg = set_up_station_chart();
            }
            bind_station_chart_data(station_chart_svg, arrivals, departures, capacity);

            $('#capacity').text('[Capacity: '+ capacity +']');


            $('#station-chart').attr('style', 'opacity: 1.0');
        } else {
            $('#station-chart').attr('style', 'opacity: 0.0');
            // TODO: hide a static div with the intro text and show the line chart via css

        }
    });

    view_model.selected_hour.valueHasMutated();
    view_model.selected_station.valueHasMutated();
});
