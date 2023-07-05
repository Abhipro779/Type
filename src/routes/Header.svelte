<script>
    import {onMount, createEventDispatcher} from 'svelte';
    import {Cursor} from './caret.js';
    import {keylist,NonCap,Cap,speed} from "./stores.js";
    let lang='nep';
    let textdata=[];
    let caret;
    let counter=0;
    let cursor;
    let time;
    let dispatch=createEventDispatcher();
    let maintext=["ञो मािले तेसत मातरा गारेको हो हाो।","यो आरको तेसत हो।"];
    let mainarray=maintext[Math.floor(Math.random()*maintext.length)].split("");


    function follow(){
    if (counter<textdata.length){
        cursor.update(textdata[counter].ref);
    }
}

    function reset(){
    mainarray=maintext[Math.floor(Math.random()*maintext.length)].split("");
    textdata=[];
    counter=0
    for(let i=0;i<mainarray.length;i++){
        textdata.push({
            value:mainarray[i],
            status:null,
            ref:null
        })
    }
    cursor.reset();
}
    function check(event){
        if (lang=='eng'){
            return event.key==textdata[counter].value;
        }
        else{

        let value=event.code;
        let shift=event.shiftKey;
        let index=$keylist.indexOf(value);
        let current_value=textdata[counter].value;
        if(index!=-1){
        return (shift ? $Cap[index]:$NonCap[index])==current_value;}
    }

    }
function updatetime(index,shift,time){
$speed[index][shift ? 1 : 0].push(time);
}
onMount(()=>{
counter=0;
cursor= new Cursor(caret);
reset();
}
);
</script>




<svelte:window on:keypress={
(event)=>{
event.preventDefault();
let newtime=event.timeStamp;
let delta= (time==0) ? null :newtime-time;
let cond=check(event);
if(cond){
counter++;
textdata[counter-1].status=textdata[counter-1].status==null ? "cor":"wro";
time=newtime;
if(time!=0 && delta!=null && $keylist.indexOf(event.code)!=-1){
    updatetime($keylist.indexOf(event.code),event.shiftKey,time)
}
}
else{
    textdata[counter].status="wro";
    time=0;
}

dispatch("send",{
    value:$keylist.indexOf(event.code),
    shift:event.shiftKey,
    correct:cond,
});

follow();
if(counter==textdata.length){reset();}
}}
/>
<div class="top flex">
    <div class="display flex">
        <div class="text">
            <span class="cursor" bind:this={caret}>|</span>
            {#each textdata as data , i}
            <span bind:this={data.ref} class={data.status} class:space={data.value==" "}>{data.value==" " ? "_" : data.value}</span>
            {/each}
        </div>
    </div>
</div>
<style>
    .flex{
    display: flex;
    justify-content: center;
    align-items: center;
}
.top{
    background-color: rgb(239, 239, 165);
    height:20vh;
    width:100%;
}
.display{
background-color: aquamarine;
width:80%;
height:80%;
align-items: normal;
}

span{
    display:inline;
    font-size:42px;
    font-weight: bold;
}
.text{
    display:inline-block;
    position:relative;

}
.space{
    color:rgb(157, 157, 157);
}
.cursor{
    position:absolute;
    transition:transform 0.1s;
    animation-name: caret-animation;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}

@keyframes caret-animation {
    0% {color:rgb(0, 0, 255)}
    50% {color:rgba(0, 0, 255, 0.431)}
    100% {color:rgb(0, 0, 255)}
}
.cor{
    color:rgb(29, 122, 29);
}
.wro{
    color:rgb(223, 45, 45);
}
</style>