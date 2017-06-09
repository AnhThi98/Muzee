// Copyright Anh Thi

const cheerio = require('cheerio');

function DOMParser(...args) {
  const [html, opt] = args;
  this.$ = opt ? cheerio.load(html, opt) : cheerio.load(html);
  this.result = {};
  this.$root = this.$('body');
}

DOMParser.prototype.setRoot = function (rootSelector) {
  this.$root = this.$(rootSelector);
  return this;
};

DOMParser.prototype.extract = function (attr, fromQuerySelector, apiRetrivedKey) {
  if (!/^(#||\.)/.test(attr)) {
    throw new TypeError('you missed # or .');
  }

  const $el = this.$root.find(fromQuerySelector);
  const data = this.attr($el, attr);
  this.result[apiRetrivedKey] = data;
  return this;
};

/**
 *@description extract a list of attributes from the selected element
 *@param {array} or {string} attrArr Ex: ['text', 'href'] or 'text'
*/
DOMParser.prototype.extractList = function (attrArr, selector, apiRetrivedKey) {
  this.result[apiRetrivedKey] = [];

  this.$(selector).each((index, e) => {
    if (!Array.isArray(attrArr)) {
      this.result[apiRetrivedKey].push(this.attr(this.$(e), attrArr));
    } else {
      const result = [];

      attrArr.forEach(attr => {
        result.push(this.attr(this.$(e), attr));
      });

      this.result[apiRetrivedKey].push(result);
    }
  });
};

DOMParser.prototype.attr = function ($el, attr) {

  // attr is null for "artists" cuz we extract both text and link attribute by default
  function extract(atrib, e) {
    return atrib === 'text' ? e.text().trim() : e.attr(atrib);
  }

  // check is $el array of artist element
  if (attr === null) {
    const arr = [];
    $el.each((index, e) => {
      arr.push({
        link: extract('href', this.$(e)),
        name: extract('text', this.$(e)),
      });
    });

    return arr;
  }

  return extract(attr, $el);
};

DOMParser.prototype.get = function () {
  return this.result;
};

module.exports = DOMParser;

