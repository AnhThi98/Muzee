const DOMParser = require('./DOMParser');
const util = require('util');

/**
 * @description model
 *  {
      "songs": [
        "title": "Lac troi",
        "id": "69797",
        "link": "/bai-hat-lac-troi/6969.html"
        "artist": "Son Tung M-TP"
      ]
    }
 */

function Page(...args) {
  DOMParser.apply(this, args);
  this.type = ''; // type is one of "song, video, album"
  this.attrsToBeExtracted = {}; //  attributes that are extracted from the element
}

util.inherits(Page, DOMParser);

// static methods
Page.pluralize = function (string) {
  return `${string}s`;
};

// get page number of the document
Page.prototype.paginate = function () {
  const lastPage = this.$('.pagination ul li').last().children()[0];

  if (lastPage) {
    const lastPageHref = lastPage.attribs.href;
    this.result.pageNumbers = /\d+$/g.exec(lastPageHref)[0];
  } else {
    this.result.pageNumbers = Number(1).toString();
  }
};

Page.prototype.restrict = function (selectorToTheElementList) {
  const selector = selectorToTheElementList;
  this.elements = this.$(selector);
  return this;
};

Page.prototype.setType = function (type) {
  this.type = Page.pluralize(type);
  return this;
  /*
    Ex: this.setType('song');
    this.get()
    {
      'songs': []
    }
  */
};

// define attributes that are extracted from the element
Page.prototype.setExtractedAttr = function (attr, selector, keyIncludedInResult) {
  this.attrsToBeExtracted[selector] = this.attrsToBeExtracted[selector] || [];
  const obj = { attr, keyIncludedInResult };
  this.attrsToBeExtracted[selector].push(obj);
  return this;
};

/*
  Ex: this.setExtractedAttr('href', '._trackLink', 'link')
  this.setExtractedAttr('text', '._trackLink', 'title')
  this.setExtractedAttr('text', '.trackRelease', 'releaseDate')

  this.attrsToBeExtracted
  -> {
    "._trackLink": [
      {attr: 'href', keyIncludedInResult: 'link'},
      {attr: 'text', keyIncludedInResult: 'title'}
    ],
    ".trackRelease": [
      {attr: 'text', keyIncludedInResult: 'releaseDate' }
    ]
  }
*/

Page.prototype.getExtractedAttrs = function () {
  return this.attrsToBeExtracted;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

Page.prototype.get = function () {
  this.result[this.type] = [];
  this.elements.each((index, element) => {
    const doc = {};

    const selectors = Object.keys(this.attrsToBeExtracted);

    selectors.forEach(selector => {
      if (hasOwnProperty(this.attrsToBeExtracted, selector)) {
        const arr = this.attrsToBeExtracted[selector];

        arr.forEach(obj => {
          const { attr, keyIncludedInResult } = obj;
          const $el = this.$(element).find(selector);
          doc[keyIncludedInResult] = this.attr($el, attr);
        });
      }
    });

    this.result[this.type].push(doc);
  });

  return this.result;
};

module.exports = Page;