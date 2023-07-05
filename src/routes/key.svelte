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

<svg   x="{position.x}px" y="{position.y}px" height={size.height} width={size.width-2}>
{#if mode}
<rect class={color} height={size.height} width={size.width} fill="#585858"/>
{#if values.length==2}
<text x={size.width*1/4} y={size.height*2/5} >{values[0]}</text>
<text x={size.width*3/5} y={size.height*4/6} >{values[1]}</text>

{:else}
<text x={size.width/2-values[0].length/2} y={size.height/2+15} >{values[0]}</text>

{/if}
{:else}
{#if values.length==2}
    <polygon points="0,0 0,{size.height} {size.width},0" fill={getcolor(0)}/>
    <text x={size.width*1/4} y={size.height*2/5} >{values[0]}</text>
    <polygon points="0,{size.height} {size.width},{size.height} {size.width},0" fill={getcolor(1)}/>
    <text x={size.width*3/5} y={size.height*4/6} >{values[1]}</text>
    {:else}
    <rect height={size.height} width={size.width} fill={getcolor(0)}/>
    <text x={size.width/2-values[0].length/2} y={size.height/2+15} >{values[0]}</text>
    {/if}
    {/if}
</svg>
<style>

    svg{
        border-radius: 20px;
        fill:blue;
        position:absolute;
    }
.normal{
    fill:#585858;
}
.cor{
    fill:#163106;
}
.wro{
    fill:#701a1a;
}
text{
    fill:rgba(21, 22, 21, 0.637);
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:25px;
    font-weight: 400;
    stroke: rgb(0, 0, 0);
    stroke-width: 2px;
    
}
rect{
    filter:blur(2px);
}
polygon{
    filter : blur(15px);
}
</style>