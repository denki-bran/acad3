/**
 * Created by dingjunyi on 2017/4/11.
 */
const transCit = (json)=>{
    let refer=json.item["bibrecord"].tail["bibliography"].reference,self=json.coredata;
    let newJson="{\"nodes\":[{\"name\":\""+self['dc:title']+"\"},";
    if(refer==null){
        return null;
    }
    else{
        for(let i =0;i<refer.length;i++){
            if (refer[i]['ref-info'].hasOwnProperty('ref-title')) {
                newJson += "{\"name\":\"" + refer[i]['ref-info']['ref-title']['ref-titletext'] + "\"";
            }
            else{
                newJson += "{\"name\":\"LACK OF TITLE\"";

            }
            if (refer[i]['ref-info'].hasOwnProperty('refd-itemidlist')) {
                newJson += ",\"eid\":\"2-s2.0-"+refer[i]['ref-info']['refd-itemidlist']['itemid']['$']+"\"}";
            }
            else{
                newJson += "}";

            }
            if(i<refer.length-1){
                newJson+=",";
            }

        }
        newJson+="],\"links\":[";
        for(let i=1;i<=refer.length;i++){
            newJson+="{\"source\":"+i+",\"target\":0}";
            if(i<refer.length){
                newJson+=",";
            }
        }
        newJson+="]}";
        return newJson;
    }

};

module.exports = transCit;