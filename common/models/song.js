'use strict';

module.exports = function(Song) {
  Song.findByGenre = function (genres, cb) {
    var query = {
      where: {
        and: []
      },
      order: "created DESC"
    };

    var genreQuery = {
      pop: {'genres.pop': {exists: true}},
      rnb: {'genres.rnb': {exists: true}},
      hipHop: {'genres.hipHop': {exists: true}},

      house: {'genres.house': {exists: true}},
      electro: {'genres.electro': {exists: true}},
      techno: {'genres.techno': {exists: true}},

      dubstep: {'genres.dubstep': {exists: true}},
      future: {'genres.future': {exists: true}},
      trap: {'genres.trap': {exists: true}},

      dnb: {'genres.dnb': {exists: true}},
      beats: {'genres.beats': {exists: true}},
      ambient: {'genres.ambient': {exists: true}},
      bass: {'genres.bass': {exists: true}},

      tropical: {'genres.tropical': {exists: true}},
      funk: {'genres.funk': {exists: true}},
      rock: {'genres.rock': {exists: true}},
      indie: {'genres.indie': {exists: true}}
    };

    genres.forEach(function (genre) {
      query.where.and.push(genreQuery[genre]);
    });

    if (genres.length == 0 || genres == 'undefined') {
      Song.find({order: "created DESC"}, function (err, instance) {
        cb(null, instance);
      });
    } else {
      Song.find(query, function (err, instance) {
        cb(null, instance);
      });
    }

  };

  Song.remoteMethod(
    'findByGenre',
    {
      http: {path: '/findByGenre', verb: 'get'},
      accepts: {arg: 'genres', type: 'array'},
      returns: {type: 'array', root: true}
    }
  );
};
