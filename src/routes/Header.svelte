<script>
    import {displaytext,reset,updater,counter,counterupdate,toggler} from "./stores.js";
    import {Cursor} from "./cursor.js";
	import { onMount, createEventDispatcher } from "svelte";
    export let nextitemget;
    let maindata;
    let cursor;
    var caret=null;
    let dispatcher=createEventDispatcher();
    $:{
        resetit();
        let x= $toggler;

    }


    function resetit()
    {maindata=[];
        for(let i=0;i<$displaytext.length;i++){
            maindata.push({
                value:$displaytext[i],
                ref:null
            })
            nextitemget(maindata[$counter].value);
        }
        if(caret)
        caret.reset()
    }
    resetit();
    onMount(()=>{
        caret=new Cursor(cursor);
        caret.reset();
        
    })
</script>
<svelte:window on:keypress={(event)=>{
    let returned=updater(event);
    dispatcher("send",returned);
    if(returned){
        console.log(returned);
        if(returned.correct){
            counterupdate();
            nextitemget(maindata[$counter].value);
            caret.update(maindata[$counter].ref);
            console.log("This function ran!");
        }
    }
}}

on:resize={
    ()=>{
        caret.update(maindata[$counter].ref);
    }
}

/>
<div class="container flex">
    <div class="text">
        <span class="caret" bind:this={cursor}>|</span>
    {#each maindata as data ,i}<span bind:this={data.ref} class:space={data.value==" "}>{data.value==" " ? "_" : data.value}</span>{/each}
</div>
</div>

<style>
    *{
        position:relative;
    }
    span{
        font-size: 28px;
        font-weight: bold;
    }
    .space{
        color:rgb(184, 183, 183);
    }
    .flex{
        display:flex;
        height:20vh;
        justify-content: center;
        align-items: center;
    }
    .caret{
        position:absolute;
        transition:transform 0.1s;
    }
</style>

