/**
 * Created by dingjunyi on 2017/2/12.
 */
const request = require('request');
const cheerio = require('cheerio');
const getEid = require('./public/js/be/eid');
const detail = require('./public/js/be/detail');
const citedby = require('./public/js/be/citedby');
const express = require('express');

const app = express();
app.use(express.static('public'));
const pubPath = process.env.ASSETS ? process.env.ASSETS : './public';

/*
 const doi = "10.1016/j.stem.2011.10.002";
 */
const key = "5c8ccee1796b0de95a022f90fcf8ad1c";


/*getEid(doi,key,(errGet,eid)=>{
 if (errGet) {
 return console.log(error);
 }
 detail(key,eid,(errDetail,resDetail)=>{
 console.log(resDetail);
 });
 citedby(key,eid,0,158,(errCit,resCit)=>{
 console.log(resCit);
 });
 });*/

app.get('/',  (req, res)=> {
    res.render('index.ejs');
});

app.get('/atest',  (req, res)=> {
    res.render('ajaxTest.ejs');
});

// app.get('/ref',  (req, res)=> {
//     doi =req.query.doi;
//     getEid(doi,key,(errGet,eid)=>{
//         if (errGet) {
//             return console.log(error);
//         }
//         detail(key,eid,(errDetail,resDetail)=>{
//             console.log(resDetail);
//             res.render('result.ejs',{result:resDetail});
//         });
//     });
// });

app.get('/satest', function (req, res) {
    // 使用了superagent来发起请求
    var superagent = require('superagent');
    // 查询本机ip，这里需要根据实际情况选择get还是post
    var url=`https://api.elsevier.com/content/abstract/eid:${req.query.eid}?httpAccept=application%2Fjson&apiKey=5c8ccee1796b0de95a022f90fcf8ad1c`;
    var sreq = superagent.get(url);
    sreq.pipe(res);
    sreq.on('end', function(){
        console.log('done');
    });
});

app.get('/ref',  (req, res)=> {
    arg =req.query.arg;
    let eidReg = /2-s2.0-\d+/;
    let doiReg =/10\.[^\s\/]+\/[^\s]+/;
    if (doiReg.test(arg)){
        getEid(arg,key,(errGet,eid)=>{
            if (errGet) {
                return console.log(error);
            }
            detail(key,eid,(errDetail,resDetail)=>{
                res.render('result.ejs',{result:resDetail});
            });
        });
    }
    else if(eidReg.test(arg)){
        detail(key,arg,(errDetail,resDetail)=>{
            console.log(resDetail);
            if(resDetail===undefined){
                res.redirect(301,'/404');
            }
            else{
                res.render('result.ejs',{result:resDetail});
            }
        });
    }
    else{}
});


app.get('/cit',  (req, res)=> {
    let doi =req.query.doi;
    getEid(doi,key,(errGet,eid)=>{
        if (errGet) {
            return console.log(error);
        }
        citedby(key,eid,0,158,(errCit,resCit)=>{
            res.render('citation.ejs',{result:resCit});
        });
    });
});

app.get('/404',  (req, res)=> {
    res.render('404.ejs');
});

const port = process.env.PORT ? process.env.PORT : 1130;
app.listen(port, () =>{
        console.log('app started, listening on port:', port);
    }
);
