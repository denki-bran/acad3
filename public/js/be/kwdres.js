/**
 * Created by dingjunyi on 2017/3/4.
 */
"use strict";
const request = require('request');
const cheerio = require('cheerio');

const url={
    kesApi:"http://api.elsevier.com/content/search/scopus?query=",
};

const fetchRes = (key,kwd,callback)=>{
    const options = {
        url:url.kesApi+"title%28"+kwd+"%29",
        headers:{
            'X-ELS-APIKey':key,
            'Accept':'application/json'
        }
    };
    request(options,(err,response,body)=>{
        if (err) {
            console.log('Fali to connect site: ', err);
            return callback({
                code: 1002,
                error: 'Fali to connect site',
                detail: err
            });
        }
        console.log('response.statusCode: ', response.statusCode);
        if (response.statusCode !== 200) {
            return callback({
                code: 1003,
                error: 'Fali to connect site, code problem',
                detail: response
            });
        }

        return callback(null, body);
    })

};

const parseRes = (body, callback) => {
    let ref = JSON.parse(body)["search-results"].entry;
    return callback(null, ref);
};

const result = (key,kwd,callback)=>{
    fetchRes(key,kwd,(errFetch,resFetch)=>{
        if (errFetch) {
            return console.log(errFetch);
        }
        parseRes(resFetch, (errParse, data) => {
            callback(null,data)
        });
    })
};

module.exports = result;