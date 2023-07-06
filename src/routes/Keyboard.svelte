<script>
    import {onMount} from "svelte";
import {keylist,keysize,keyscount,NonCap,Cap,reset} from "./stores.js";
import Key from "./key.svelte";
let keydata=[];
let mode=true;
let height;
let width=10;
onMount(()=>{
    let keyscounter=0;
    let x_count=0;
    let y_count=0;
    const basesize=100;
    for(let i=0;i<$keylist.length;i++){
        let keyval=[];
        if($Cap[i]!='None'){
            keyval.push($Cap[i])
        }
        if($NonCap[i]!='None'){
            keyval.push($NonCap[i])
        }      
        const obj={
            size:{height:basesize,width:$keysize[i]*basesize},
            position:{x:x_count,y:y_count},
            values:keyval,
            greenscale:[[250,50,50,1],[50,250,50,1]],
            refs:null
        }
        keydata.push(obj);
        if(i<$keyscount[keyscounter]-1){
            x_count+=basesize*$keysize[i];
        }
        else{
            x_count=0;
            y_count+=basesize+10;
            keyscounter++;
        }
    }
    keydata[56].values=['Space'];
    width=keydata[keydata.length-1]['position']['x']+basesize*$keysize[keydata.length-1];
    height=keydata[keydata.length-1]['position']['y']+basesize+10;

});
</script>


<button on:click={reset}>Click for reset.</button>

<div class="flexed"  >
    <svg style="aspect-ratio:{width/height};width:80%" viewBox="0 0 {width} {height}">
{#each keydata as key}
<Key size={key.size} mode={mode} position={key.position} values={key.values} greenscale={key.greenscale} bind:this={key.refs} />
{/each}
    </svg>
</div>
<style>
    div{position:relative;
    }
    .inside{
        left:50%;
        translate:-50% 0%;
    }
</style>

