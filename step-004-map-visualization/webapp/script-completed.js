/// <reference path="./node_modules/azure-maps-control/typings/index.d.ts" />
// NOTE: you may uncomment the line below to trick VS Code in providing you code completion for Azure Maps SDK (atlas).
// const atlas = require("azure-maps-control");

//Define an initial position for our device.
var map, datasource, popup, dataLayer, hoverLayer, currentTimestamp;

const TSI_FQDN = '<000000-000000-0000-00000.env.timeseries.azure.com>'; // You can find this in the overview of your Time Series Insights resource in the Azure portal
const AZURE_MAPS_SUBSCRIPTION_KEY = '<Your_Azure_Maps_Key>';
const TIME_SERIES_ID = '<Your_Time_Series_ID>';

window.onload = function () {
    initAuth('Maps Example');  //Initiate auth objects, header, and login modal

    //Initialize a map instance.
    map = new atlas.Map('myMap', {
        style: 'grayscale_dark', // see https://docs.microsoft.com/en-us/azure/azure-maps/supported-map-styles

        //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: AZURE_MAPS_SUBSCRIPTION_KEY
        }
    });

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
        popup = new atlas.Popup();

        //Create a data source to add your data to.
        datasource = new atlas.source.DataSource();
        map.sources.add(datasource);

        //Create a layer for rendering the data on the map as scaled circles.
        dataLayer = new atlas.layer.BubbleLayer(datasource, null, {
            color: [
                "interpolate",
                ["linear"],
                ['get', 'temperature'],
                24, "royalblue",
                26, "cyan",
                28, "lime",
                30, "yellow",
                32, "red"
            ],

            radius: [
                'interpolate',
                ['linear'],
                ['get', 'humidity'],
                0, 2,
                100, 30
            ],

            strokeColor: 'gray'
        });

        //Create a second layer that is nearly identical, but use it to highlight the selected timestamp.
        hoverLayer = new atlas.layer.BubbleLayer(datasource, null, {
            color: [
                "interpolate",
                ["linear"],
                ['get', 'temperature'],
                24, "royalblue",
                26, "cyan",
                28, "lime",
                30, "yellow",
                32, "red"
            ],

            radius: [
                'interpolate',
                ['linear'],
                ['get', 'humidity'],
                0, 2,
                100, 30
            ],

            filter: ['==', 'timestamp', '']
        });

        map.layers.add([dataLayer, hoverLayer]);

        //Create a heatmap and add it to the map.
        map.layers.add(new atlas.layer.HeatMapLayer(datasource, null, {
            weight: [
                'interpolate',
                ['linear'],
                ['get', 'temperature'],
                28, 0,
                30, 1
            ],
            radius: [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 2,
                22, 200
            ],
            color: [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ]
        }), 'labels');


        map.events.add('mousemove', dataLayer, function (e) {
            if (e && e.shapes && e.shapes.length > 0) {
                highlightMap(e.shapes[0].getProperties().timestamp);
            }
        });

        map.events.add('mouseout', hoverLayer, unhighlightMap);
    });

    function highlightMap(timestamp) {
        //Only update the UI if the timestamp has changed.
        if (currentTimestamp !== timestamp) {
            currentTimestamp = timestamp;

            //Filter the hover layer to show the selected timestamp.
            hoverLayer.setOptions({
                filter: ['==', 'timestamp', timestamp]
            });

            //Make all other data semi-transparent on the map.
            dataLayer.setOptions({
                opacity: 0.3
            });

            //Get the data point for the timestamp.
            var shape = datasource.getShapeById(timestamp);
            var prop = shape.getProperties();
            popup.setOptions({
                content: '<div style="padding:5px;"><b>' + prop.timestamp + '</b><br/>AvgTemp: ' + prop.temperature + '<br/>AvgHumidity: ' + prop.humidity + '<div>',
                position: shape.getCoordinates(),
                closeButton: false
            });
            popup.open(map);

        }
    }

    function unhighlightMap() {
        currentTimestamp = null;

        //Clear the filter on the hover layer.
        hoverLayer.setOptions({
            filter: ['==', 'timestamp', '']
        });

        //Revert the opacity.
        dataLayer.setOptions({
            opacity: 1
        });

        //Close the popup.
        popup.close();
    }

    var tsiClient = new TsiClient();

    var linechartTsqExpressions = [];

    //Set a date range for the past 1 hour.
    var endDate = new Date();
    var startDate = new Date(endDate.valueOf() - 1000 * 60 * 60 * 1);

    linechartTsqExpressions.push(new tsiClient.ux.TsqExpression(
        { timeSeriesId: [ TIME_SERIES_ID ] },
        {
            AvgTemp: {
                kind: 'numeric',
                value: { tsx: '$event.[temperature]' },
                filter: null,
                aggregation: { tsx: 'avg($value)' }
            }
        }, // variable json
        { from: startDate, to: endDate, bucketSize: '1m' }, // search span
        '#60B9AE', // color
        'AvgTemp')); // alias

    linechartTsqExpressions.push(new tsiClient.ux.TsqExpression(
        { timeSeriesId: [ TIME_SERIES_ID ] },
        {
            AvgHumidity: {
                kind: 'numeric',
                value: { tsx: '$event.[humidity]' },
                filter: null,
                aggregation: { tsx: 'avg($value)' }
            }
        }, // variable json
        { from: startDate, to: endDate, bucketSize: '1m' }, // search span
        'yellow', // color
        'AvgHumidity')); // alias

    var positionsTsqExpressions = [];

    positionsTsqExpressions.push(new tsiClient.ux.TsqExpression(
        { timeSeriesId: [ TIME_SERIES_ID ] },
        {
            Lat: {
                kind: 'numeric',
                value: { tsx: '$event.[location_lat]' },
                filter: null,
                aggregation: { tsx: 'avg($value)' }
            }
        }, // variable json
        { from: startDate, to: endDate, bucketSize: '1m' }, // search span
        'yellow', // color
        'Lat')); // alias


    positionsTsqExpressions.push(new tsiClient.ux.TsqExpression(
        { timeSeriesId: [ TIME_SERIES_ID ] },
        {
            Lon: {
                kind: 'numeric',
                value: { tsx: '$event.[location_lon]' },
                filter: null,
                aggregation: { tsx: 'avg($value)' }
            }
        }, // variable json
        { from: startDate, to: endDate, bucketSize: '1m' }, // search span
        'yellow', // color
        'Lon')); // alias


    authContext.getTsiToken().then(function (token) {

        tsiClient.server.getTsqResults(token, TSI_FQDN, linechartTsqExpressions.map(function (ae) { return ae.toTsq() })).then(function (result) {
            var transformedLineChartResult = tsiClient.ux.transformTsqResultsForVisualization(result, linechartTsqExpressions);

            // query latitudes/longitudes
            tsiClient.server.getTsqResults(token, TSI_FQDN, positionsTsqExpressions.map(function (ae) { return ae.toTsq() }))
                .then(function (result) {
                    var transformedPositionsResult = tsiClient.ux.transformTsqResultsForVisualization(result, positionsTsqExpressions);

                    var temps = transformedLineChartResult[0].AvgTemp[''];
                    var humidity = transformedLineChartResult[1].AvgHumidity[''];

                    var lats = transformedPositionsResult[0].Lat[''];
                    var lons = transformedPositionsResult[1].Lon[''];

                    var timestamps = Object.keys(humidity);

                    var features = [];
                    var position, t, h, lat = null, lon = null;

                    //Create mock positions for each timestamp since this device doesn't have position information.
                    for (var i = 0; i < timestamps.length; i++) {
                        var timestamp = timestamps[i];

                        t = temps[timestamp].AvgTemp;
                        h = humidity[timestamp].AvgHumidity;

                        //If there is a temperature and humidity value, add a data point to the map.
                        if (t !== null && h !== null) {
                            lat = lats[timestamp].Lat;
                            lon = lons[timestamp].Lon;
                            position = [lon, lat];

                            var timestamp = timestamps[i];

                            //Create a point feature that has the sensor readings and timestamp information.
                            features.push(new atlas.data.Feature(new atlas.data.Point(position), {
                                temperature: t,
                                humidity: h,
                                timestamp: timestamp
                            }, timestamp));
                        }
                    }

                    datasource.add(features);

                    //Set the map view over the data.
                    map.setCamera({
                        bounds: atlas.data.BoundingBox.fromData(features),
                        padding: 50
                    });

                    //Create the line chart.
                    var lineChart = new tsiClient.ux.LineChart(document.getElementById('chart1'));
                    lineChart.render(transformedLineChartResult, {
                        theme: 'dark', dateLocale: 'en_US', grid: true, tooltip: true, legend: 'compact',
                        onMouseover: function () {
                            var textBlock = document.querySelector('#chart1 > svg > g > g.focus > g.hHoverG > text > tspan:nth-child(1)');
                            if (textBlock) {
                                var date = new Date(textBlock.innerHTML);
                                //Convert to a UTC.
                                date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                                var timestamp = date.toISOString().replace('.000Z', 'Z');

                                highlightMap(timestamp);
                            }
                        }, onMouseout: function () {
                            unhighlightMap();
                        }
                    }, linechartTsqExpressions);
                })
        });
    });
}