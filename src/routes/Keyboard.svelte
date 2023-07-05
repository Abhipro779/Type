<script>
    import {onMount} from "svelte";
import {keylist,keysize,keyscount,NonCap,Cap} from "./stores.js";
import Key from "./key.svelte";
let keydata=[];
let mode=true;
let height=10;
let width=10;
let varwidth=width;
export function shine(value,state){
    keydata[value].refs.changecolor(state)
}
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
    varwidth=width;
});
</script>
<svelte:window on:resize={()=>{
    varwidth=Math.min(window.innerWidth,width);
}

}/>
<div class="contain">
<div class="flexed">
    <div class="buttons">
        <button on:click={()=>mode=!mode}>Show key speed</button>
    </div>
</div>
<div class="flexed" >

<svg height={height*varwidth/width*0.7} width={varwidth} viewBox="0 0 {width} {height}"   >
{#each keydata as key}
<Key size={key.size} mode={mode} position={key.position} values={key.values} greenscale={key.greenscale} bind:this={key.refs} />
{/each}
    </svg>
</div>
</div>
<style>
    .contain{
        width:100%;
        height:50vh;
    }
.flexed{
    display:flex;
    justify-content: center;
    align-items:end;
}
button{
    border-radius: 20px;
    height:50px;
    width:250px;
    font-size: 22px;
    background-color: gray;
    border-style: groove;
    border-width:2px;
    margin:5px;
}

</style>

