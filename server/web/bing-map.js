'use strict';
var map;
function GetMap() {
    map = new Microsoft.Maps.Map('#myMap',
    {
        credentials: 'AhI3S5NwTP-2UR17M-9sAt4dl93bTYLdOTuwAS-DhWmhNePvDnCuWuV16_mq3fQU'
    });

    map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        center: new Microsoft.Maps.Location(2.23489, 38.13874),
        zoom: 13
    });

    Microsoft.Maps.Events.addHandler(map, 'click', getLatlng);
};

function getLatlng(e) {
  if (e.targetType == "map") {
     var point = new Microsoft.Maps.Point(e.getX(), e.getY());
     var locTemp = e.target.tryPixelToLocation(point);
     var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);
     addBlocks(location);
  }
}

function addBlocks(location) {
  const numBlockSize = 10;
  const size = 0.02;
  const width = size;
  const height = size;

  const startLat = (location.latitude - (numBlockSize/2 * width));
  var long = (location.longitude - (numBlockSize/2 * height));
  var lat = startLat;

  for(let i=0; i<numBlockSize; i++) {
	  for(let j=0; j<numBlockSize; j++) {
		  var polygon = new Microsoft.Maps.Polygon([
      		new Microsoft.Maps.Location(lat, long),
      		new Microsoft.Maps.Location(lat + width, long),
      		new Microsoft.Maps.Location(lat + width, long + height),
			    new Microsoft.Maps.Location(lat, long + height)
  		]);
			map.entities.push(polygon);
			lat += width;
	  }
	  long += height;
	  lat = startLat;
  }
}
