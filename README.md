# urban

The Urban Dictionary doesn't have an actual API, so the data comes from the iPhone page which comes in json format, easy to manipulate: `http://www.urbandictionary.com/iphone/search/define?term=kvlt`

### installation

    $ npm install -g urban # bin
    $ npm install urban # lib

### examples

#### bin
    $ urban facepalm

#### lib
    var urban = require('urban'),
        trollface = urban('trollface');

    trollface.first(function(json) {
        console.log(json);
    });

### license

MIT
