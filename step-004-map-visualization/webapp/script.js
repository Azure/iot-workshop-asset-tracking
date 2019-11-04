/// <reference path="./node_modules/azure-maps-control/typings/index.d.ts" />
// NOTE: you may uncomment the line below to trick VS Code in providing you code completion for Azure Maps SDK (atlas).
// const atlas = require("azure-maps-control");

//Define an initial position for our device.
var map, datasource, popup, dataLayer, hoverLayer, currentTimestamp;

const TSI_FQDN = '<000000-000000-0000-00000.env.timeseries.azure.com>'; // You can find this in the overview of your Time Series Insights resource in the Azure portal
const AZURE_MAPS_SUBSCRIPTION_KEY = '<Your_Azure_Maps_Key>';            // Your Azure Maps subscription key. Get your key in the "Authentication" section of your Azure Maps service in the Azure Portal
const TIME_SERIES_ID = '<Your_Time_Series_ID>';                         // The ID of the device (and hence associated time series) you want to display in this page

window.onload = function () {
    initAuth('Maps Example');  //Initiate auth objects, header, and login modal

    //Initialize a map instance.
    
    // TODO: Add code to initialize Map component
    // map = ...

    //Wait until the map resources are ready
    map.events.add('ready', function () {
        // TODO: Create a data source to add your data to -- will be populated through TSI queries.
        // TODO: Create layers
        // TODO: Add mouse listeners        
    });

    // TODO: Add functions highlightMap(timestamp) and unhighlightMap() that will be
    // called when hovering the line chart 

    var tsiClient = new TsiClient();
    //Set a date range for the past 1 hour.
    var endDate = new Date();
    var startDate = new Date(endDate.valueOf() - 1000 * 60 * 60 * 1);

    var linechartTsqExpressions = [];
    // TODO: Add TsqExpressions to linechartTsqExpressions array to query temperature and humidity variables

    var positionsTsqExpressions = [];
    // TODO: Add TsqExpressions to positionsTsqExpressions array to query latitude and longitude variables

    authContext.getTsiToken().then(function (token) {

        // TODO: Query TSI server, populate Maps data source, and draw line chart

    });
}