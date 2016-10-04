#!/usr/bin/env node

var tileReduce = require('tile-reduce')
var path = require('path')

var numFeatures = 0

tileReduce({
  bbox: [-122.05, 36.94, -121.97, 37.04],
  zoom: 15,
  map: path.join(__dirname, '/map.js'),
  sources: [
    {
      name: 'osm',
      mbtiles: path.join(__dirname, '../data/osm.mbtiles'),
      raw: true
    }
  ]
})
.on('reduce', num => numFeatures += num)
.on('end', () => console.log('count: %d', numFeatures))
