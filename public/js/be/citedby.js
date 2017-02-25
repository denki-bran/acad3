/**
 * Created by cotei on 16-11-27.
 */
"use strict";
const request = require('request');
const cheerio = require('cheerio');

const url={
    citedbyApi:"https://api.elsevier.com/content/search/scopus? "
};

const fetchCit = (key,eid,start,count,callback)=>{
    const options = {
        url:url.citedbyApi+"start="+start+"&count="+count+"&query=refeid({"+eid+"})",
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

const parseCit = (body, callback) => {
    let cits = JSON.parse(body)["search-results"].entry;
    return callback(null, cits);
};

const citedby = (key,eid,start,count,callback)=>{
    fetchCit(key,eid,start,count,(errFetch,resFetch)=>{
        if (errFetch) {
            return console.log(errFetch);
        }
        parseCit(resFetch, (errParse, data) => {
            console.log(data);
        });
    })
};

module.exports=citedby;

