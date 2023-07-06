<script>
    import {displaytext,reset} from "./stores.js";
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
<div>
    {#each maindata as data ,i}<span>{data.value}</span>{/each}
    <button on:click={()=>console.log("clicked")}>Press to reset!</button>
</div>

