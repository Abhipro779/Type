<script>
    import {displaytext,reset,updater,counter,counterupdate,toggler} from "./stores.js";
    import {Cursor} from "./cursor.js";
	import { onMount, createEventDispatcher } from "svelte";
    let maindata;
    let cursor;
    var caret=null;
    let focus=false;
    let input;
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

        }
        if(input)input.focus()
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
    if(!focus) return;
    let returned=updater(event);
    dispatcher("send",returned);
    if(returned){
        console.log(returned);
        if(returned.correct){
            counterupdate();
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
<div class="container flex"  >
    {#if !focus}
    <div class="wait" on:click={()=>input.focus()} ><div class="write">Press here to start ...</div></div>
    {/if}
    <input bind:this={input} on:focus={()=>{focus=true;}} on:blur={()=>{focus=false;reset();}}>
    <div class="text" class:blur={!focus}>
        <span class="caret" bind:this={cursor}>|</span>
    {#each maindata as data ,i}<span bind:this={data.ref} class:space={data.value==" "}>{data.value==" " ? "_" : data.value}</span>{/each}
</div>
</div>

<style>
    .text{
        max-width: 80%;

        word-wrap: break-word;
    }
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
        justify-content: center;
        align-items: center;
    }
    .container{
        height:20vh;
        width:100%;
    }

    .caret{
        position:absolute;
        transition:transform 0.1s;
    }
    input{
        position:absolute;
        z-index:-1;
    }
    .blur{
        filter:blur(5px);
    }
    .wait{
        position:absolute;
        width:100%;
        display: flex;
        justify-content: center;
        height: 100%;
        align-items: center;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        font-size:5vw;
        background: rgba(67, 4, 4, 0.449);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        mix-blend-mode: multiply;
        box-shadow:0px 10px 55px 50px  gray;
    }
</style>

