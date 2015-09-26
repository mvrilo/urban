# urban

The Urban Dictionary has a JSON API which can be easily accessed via URLs like this: `http://api.urbandictionary.com/v0/define?term=kvlt`

### installation

    $ npm install -g urban # bin
    $ npm install urban # lib

### examples

#### bin
    $ urban facepalm
    $ urban -r // gets random entry

#### lib
    var urban = require('urban').urban,
        trollface = urban('trollface');

    trollface.first(function(json) {
        console.log(json);
    });
    
    
    // Using the random feature
    var urban = require('urban');
    
    urban.setRandom(true);
    urban().first(function(json) {
        console.log(json);
    });
    

### license

MIT
