module.exports = function (data, tile, writeData, done) {
  var count = 0
  var features = data.osm.bajahighways.features

  for (var i = 0; i < features.length; i++) {
    var feature = features[i]
    if (feature.properties.highway || feature.properties.building) count++
  }

  done(null, count)
}
