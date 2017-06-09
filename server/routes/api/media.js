const express = require('express');
const axios = require('axios');
const Page = require('../../lib/Page');
const request = require('../../utils').request;
const convertLrcToJSON = require('../../lib/convertLrcToJSON');

const router = express.Router();

router.get('/song', (req, res, next) => {
  const { name, id } = req.query;

  request(`http://mp3.zing.vn/bai-hat/${name}/${id}.html`)
    .then(html => {
      const regex = /json\/song\/get-source\/.{24}/;
      const match = html.match(regex);
      if (!match) return next(new Error("can't find the source URL"));

      const [matchUrl] = match;
      return request(`http://mp3.zing.vn/${matchUrl}`);
    })
    .then(data => {
      const result = JSON.parse(data).data[0];
      if (!result.lyric.trim()) {
        result.lyric = [];
        return result;
      }

      return request(result.lyric)
        .then(lrcFile => {
          result.lyric = convertLrcToJSON(lrcFile);
          return Promise.resolve(result);
        })
        .catch(err => Promise.reject(err));
    })
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/suggested-song/:id', (req, res, next) => {
  const { id } = req.params;
  const url = `http://mp3.zing.vn/json/song/get-song-suggest?id=${id}&start=0&length=10`;

  // use axios instead of request cuz this site is not gzipped
  axios
    .get(url, { headers: { 'Content-Type': null } }) // prevent rewriting the header
    .then(resp => resp.data.html)
    .then(html => {
      const parser = new Page(html, { decodeEntities: true });
      parser
        .setRoot('.widget.widget-countdown')
        .restrict('.fn-list .fn-item')
        .setType('song')
        .setExtractedAttr('src', '.fn-thumb', 'thumb')
        .setExtractedAttr('text', '.song-name a', 'songName')
        .setExtractedAttr(null, '.singer-name a', 'artists');
      res.json(parser.get());
    })
    .catch(err => next(err));
});

module.exports = router;