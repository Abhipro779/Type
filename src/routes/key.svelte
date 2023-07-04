<script>
    export let size={height:70,width:70};
    export let mode=true;
    export let position={x:10,y:10};
    export let values=['आ','ा'];
    export let greenscale=[[50,100,200,1],[100,20,30,1]];
    let color="normal";
    // @ts-ignore
    function getcolor(value){
        let [r,g,b,a]=greenscale[value];
        return `rgb(${r},${g},${b},${a})`;
    }
    // @ts-ignore
    export function changecolor(value){
        if(value){
            color="cor";
        }
        else{
            color="wro";
        }
        setTimeout(()=>color="normal",200);
    }
    
</script>

<svg class={color}  style="left:{position.x};top:{position.y}" height={size.height} width={size.width-2}>
{#if mode}
{#if values.length==2}
<text x=20px y=25px text-anchor="middle" alignment-baseline="middle">{values[0]}</text>
<text x={size.width-50} y={size.height-40} text-anchor="middle" alignment-baseline="middle">{values[1]}</text>
{:else}
<text x={size.width/2-5} y={size.height/2-10} text-anchor="middle" alignment-baseline="middle">{values[0]}</text>
{/if}
{:else}
{#if values.length==2}
    <polygon points="0,0 0,{size.height} {size.width},0" fill={getcolor(0)}/>
    <text x=20px y=25px text-anchor="middle" alignment-baseline="middle">{values[0]}</text>
    <polygon points="0,{size.height} {size.width},{size.height} {size.width},0" fill={getcolor(1)}/>
    <text x={size.width-50} y={size.height-40} text-anchor="middle" alignment-baseline="middle">{values[1]}</text>
    {:else}
    <rect height={size.height} width={size.width} fill={getcolor(0)}/>
    <text x={size.width/2-5} y={size.height/2+5} text-anchor="middle" alignment-baseline="middle">{values[0]}</text>
    {/if}
    {/if}
</svg>
<style>

    svg{
        border-radius: 20px;
        fill:blue;
        box-shadow: inset 0px 0px 50px 20px #585858;
        position:absolute;
    }
.normal{
    box-shadow: #585858;
}
.cor{
    box-shadow: inset 0px 0px 50px 20px #163106;
}
.wro{
    box-shadow:inset 0px 0px 50px 20px #701a1a;
}
text{
    fill:rgba(21, 22, 21, 0.637);
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:25px;
    font-weight: 400;
    stroke: rgb(0, 0, 0);
    stroke-width: 2px;
    
}
polygon,rect{
    filter:blur(15px);
}
</style>