/**
 * Created by dingjunyi on 2017/3/18.
 */
const transDetail = (json)=>{
    let refer=json.item["bibrecord"].tail["bibliography"].reference,self=json.coredata;
 let newJson="{\"nodes\":[{\"name\":\""+self['dc:title']+"\"},";
    for(let i =0;i<refer.length;i++){
        newJson+="{\"name\":\""+refer[i]['ref-info']['ref-title']['ref-titletext']+"\"}";
        if(i<refer.length-1){
            newJson+=",";
        }
    }
    newJson+="],\"links\":[";
    for(let i=1;i<refer.length;i++){
        newJson+="{\"source\":"+i+",\"target\":0}";
        if(i<refer.length-1){
            newJson+=",";
        }
    }
    newJson+="]}";
    return newJson;
};

module.exports = transDetail;