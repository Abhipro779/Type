<script>
import {keylist,keysize,keyscount,NonCap,Cap,reset,nextitem} from "./stores.js";
import Key from "./key.svelte";
let keydata=[];
let mode=true;
let height;
let width=10;
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

export function color(value){
    console.log(value[1]);
value[0].forEach(element => {
    keydata[element].refs.changecolor(value[1]);
});
}
</script>
<div class="keyboardholder">
<div class="buttonholder flexed">
<button on:click={reset}>Click for reset.</button>
<div class="thebox">{$nextitem==" " ? "_" : $nextitem}</div>
<button on:click={()=>mode=!mode}>Change Mode</button>
</div>
<div class="flexed down" >
    <svg style="aspect-ratio:{width/height};width:70%" viewBox="0 0 {width} {height}">
{#each keydata as key}
<Key size={key.size} mode={mode} position={key.position} values={key.values} greenscale={key.greenscale} bind:this={key.refs} />
{/each}
    </svg>
</div>
</div>
<style>
    div{position:relative;
    }
    .inside{
        left:50%;
        translate:-50% 0%;
    }
    .flexed{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buttonholder{
        justify-content: space-evenly;
        margin:10px;
        padding:5px;
        height:15%;
    }
    button{
        aspect-ratio:3.5;
        width:10%;
        font-size: 1vw;
        box-shadow: 0px 0px 5px 2px;
        background-color: gray;
        transition:scale 0.5s, box-shadow 0.5s;
        border-radius: 20px;
        border-color: black;
    }
    button:hover{
        scale: 1.2;
        box-shadow:0px 0px 7px 5px rgba(245, 2, 2, 0.367);
    }
    .thebox{
        width:40%; 
        display: flex;
        justify-content: center;
        font-size: 32px;
    }
    .keyboardholder{
        height:100%;
    }
</style>

