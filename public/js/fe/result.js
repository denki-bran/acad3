/**
 * Created by dingjunyi on 2017/2/25.
 */
const appendRef =(arg,ord)=>{
    let args=`2-s2.0-${arg}`;
    console.log(`${arg}:${args}`);
        $.ajax({
            type:'GET',
            url:`http://localhost:1130/satest?eid=${args}`,

            success:function(data) {
                let json=JSON.parse(data);
                let $json=$('<div class="appendBox"></div>');
                console.log($json);
                let cont = json["abstracts-retrieval-response"].item["bibrecord"].tail["bibliography"].reference;
                for(let i=0;i<cont.length;i++){
                    let peid=""+cont[i]['ref-info']['refd-itemidlist']['itemid']['$'];
                    if (cont[i]['ref-info'].hasOwnProperty('ref-title')){
                        console.log(cont[i]['ref-info']['ref-title']['ref-titletext']);
                        $json.append(`<div class="resultTitle" onclick="appendRef(${peid},${peid}${i})"><span>${i +1}.</span><a href="ref?arg=2-s2.0-${peid}">${cont[i]['ref-info']['ref-title']['ref-titletext']}</a></div><div class="appender" id=append${peid}${i}></div><div class="resultDivide"><hr></div>`);
                    }
                    else{
                    }
                }
                $(`#append${ord}`).append($json);
            },
            error: function (xhr, errorType, exception) {
                let errorMessage = exception || xhr.statusText;
                console.log("Excep:: " + exception + "Status:: " + xhr.statusText);
            }
        });
};
