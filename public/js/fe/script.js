/**
 * Created by cotei on 16-10-30.
 */
let flag1=flag2=false;
const conDiv1 =()=>{
    const tp = document.getElementById('hiddenBoxRef');
    if(flag1==false){
        tp.setAttribute("style","display:block");
        flag1=true;
    }
    else{
        tp.setAttribute("style","display:none");
        flag1=false;
    }
};

const conDiv2 =()=>{
    const tp = document.getElementById('hiddenBoxCit');
    if(flag2==false){
        tp.setAttribute("style","display:block");
        flag2=true;
    }
    else{
        tp.setAttribute("style","display:none");
        flag2=false;
    }
};

const refer =()=>{
    let args=document.getElementById('doiInput1').value;
    window.location = `/ref?arg=${args}`;//TODO:encode url
};

const cited =()=>{
    let doi=document.getElementById('doiInput2').value;
    window.location = `/cit?doi=${doi}`;
};

