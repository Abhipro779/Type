<script>
    import {displaytext,reset,updater,counter,counterupdate} from "./stores.js";
    let maindata;
    $:{maindata=[];
        for(let i=0;i<$displaytext.length;i++){
            maindata.push({
                value:$displaytext[i],
                ref:null
            })
        }
    }
</script>
<svelte:window on:keypress={(event)=>{
    let returned=updater(event);
    if(returned){
        console.log(returned);
        if(returned.correct){
            counterupdate();
        }
    }
}}/>
<div>
    {#each maindata as data ,i}<span class:space={data.value==" "}>{data.value==" " ? "_" : data.value}</span>{/each}
    <button on:click={()=>console.log("clicked")}>Press to reset!</button>
</div>

<style>
    .space{
        color:rgb(184, 183, 183);
    }
</style>

