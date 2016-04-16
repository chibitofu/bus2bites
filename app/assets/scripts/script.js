var map;

   require([
     "esri/map",
     "esri/geometry/Extent",
     "esri/layers/FeatureLayer",
     "esri/symbols/SimpleLineSymbol",
     "esri/symbols/SimpleFillSymbol",
     "esri/symbols/TextSymbol",
     "esri/renderers/SimpleRenderer",
     "dojo/_base/Color",
     "dojo/domReady!"
   ], function(Map, Extent, FeatureLayer, SimpleLineSymbol, SimpleFillSymbol,
     TextSymbol, SimpleRenderer, Color) {
     // load the map centered on the United States
     var bbox = new Extent({"xmin":-1940058,"ymin":-814715,"xmax":1683105,"ymax":1446096,"spatialReference":{"wkid":102003}});
     map = new Map("map", {
       extent: bbox,
       showLabels : true //very important that this must be set to true!
     });

     var labelField = "STATE_NAME";

     // create a renderer for the states layer to override default symbology
     var statesColor = new Color("#666");
     var statesLine = new SimpleLineSymbol("solid", statesColor, 1.5);
     var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
     var statesRenderer = new SimpleRenderer(statesSymbol);
     // create a feature layer to show country boundaries
     var statesUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
     var states = new FeatureLayer(statesUrl, {
       id: "states",
       outFields: ["*"]
     });
     states.setRenderer(statesRenderer);
     map.addLayer(states);
   });
