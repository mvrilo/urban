var http = require('http'),
EventEmitter = require('events').EventEmitter;

function urban(words, page) {
  return new Dictionary(words, page);
}

urban.version = "0.0.1";

function Dictionary(words, page) {
  EventEmitter.call(this);

  if (Array.isArray(words)) {
    words = words.join(' ');
  }

  this.words = words;
  this.page = page || 1;
  this.json = '';
  this.ended = false;

  var self = this;

  http.get({
    port: 80,
    host: 'www.urbandictionary.com',
    path: '/iphone/search/define?page=' + self.page + '&term=' + self.words
  }, function(res) {
    res.on('data', function(data) {
      self.json += data;
    }).on('end', function() {
      self.emit('end', JSON.parse(self.json));
      self.ended = true;
    });
  });

  return this;
}

Dictionary.fn = Dictionary.prototype;
Dictionary.fn.__proto__ = new EventEmitter;
Dictionary.fn.end = function(fn) {
  if (this.ended) {
    fn(this.json);
  }
  else {
    this.on('end', function(json) {
      fn(json);
    });
  }
};

Dictionary.fn.images = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.images);
  });
};

Dictionary.fn.total = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.total);
  });
};

Dictionary.fn.pages = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.pages);
  });
};

Dictionary.fn.images = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.images);
  });
};

Dictionary.fn.more = Dictionary.fn.next = function() {
  var self = this;
  this.end(function(json) {
    return new Dictionary(self.words, ++self.page)
  });
}

Dictionary.fn.prev = function() {
  var self = this;
  this.end(function(json) {
    return new Dictionary(self.words, --self.page)
  });
}

Dictionary.fn.res = Dictionary.fn.results = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.list);
  });
};

Dictionary.fn.first = function(fn) {
  this.end(function(json) {
    if (fn) fn(json.list[0]);
  });
};

module.exports = urban;
