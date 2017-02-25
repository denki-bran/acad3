/**
 * Created by dingjunyi on 2017/2/25.
 */
const appendRef =()=>{
        $.ajax({
            type:'GET',
            url:`http://localhost:1130/satest?eid=${args}`,

            success:function(data) {
                let json=JSON.parse(data);
                console.log(json);
                let $json=$('<div class="appendBox"></div>');
                json.forEach(function(obj){
                    $json.append(`<div class="appendCon">`);
                    if (obj['ref-info'].hasOwnProperty('ref-title')){
                        $json.append(`<div class=appConTit">${obj['ref-info']['ref-title']['ref-titletext']}</div>`)
                    }
                    $json.append(`</div>`);
                });
                $(`#append${ord}`).append($json);
            },
            error: function (xhr, errorType, exception) {
                let errorMessage = exception || xhr.statusText;
                console.log("Excep:: " + exception + "Status:: " + xhr.statusText);
            }
        });
};