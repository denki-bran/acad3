/**
 * Created by cotei on 16-11-24.
 */
"use strict";


const request = require('request');

const url={
    api:"http://api.elsevier.com/content/search/scopus?query="
};

const getEid = (doi,key,callback)=>{
    const options ={
        url:url.api+"DOI("+doi+")&field=eid",
        headers:{
            'X-ELS-APIKey': key
        }
    };
    request(options,(error,response,body)=>{
        let eid = null;
        if (error) {
            console.log('FAIL:Get eid: ', error);
            return callback({
                code: 1000,
                error: 'FAIL:Get eid',
                detail: error
            });
        }
        console.log('response.statusCode: ', response.statusCode);
        if (response.statusCode !== 200) {
            return callback({
                code: 1001,
                error: 'FAIL:Get eid json',
                detail: response
            });
        }
        eid = JSON.parse(body)["search-results"].entry[0].eid;
/*
        console.log(eid);
*/
        callback(null,eid);

    });
};

module.exports = getEid;