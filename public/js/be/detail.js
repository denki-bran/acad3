/**
 * Created by cotei on 16-11-23.
 */
"use strict";
const request = require('request');
const cheerio = require('cheerio');

const url={
    detailApi:"https://api.elsevier.com/content/abstract/",
};

const fetchDetail = (key,eid,callback)=>{
    const options = {
        url:url.detailApi+"eid:"+eid+"?view=FULL",
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

const parseDetail = (body, callback) => {
    let ref = JSON.parse(body)["abstracts-retrieval-response"];
    return callback(null, ref);
};

const detail = (key,eid,callback)=>{
    fetchDetail(key,eid,(errFetch,resFetch)=>{
        if (errFetch) {
            return console.log(errFetch);
        }
        parseDetail(resFetch, (errParse, data) => {
            callback(null,data)
        });
    })
};

module.exports = detail;

/*
 * in return json, the mew eid is 2-s2.0- {tail-bibliography-reference-ref-info-refd-itemidlist-$}
 * */