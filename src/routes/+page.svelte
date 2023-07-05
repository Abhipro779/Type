<script>
import {onMount} from "svelte";
import {keylist} from "./stores.js";
import Keyboard from "./keyboard.svelte";
import Header from "./Header.svelte";
let keeve;
let obj;
let val=true;

function transporter(event){
	const {value,shift,correct}=event.detail;
	if(value!=-1){
		keeve.shine(value,correct);
		if(shift){
			keeve.shine(41,correct);
			keeve.shine(52,correct);
		}
	}
}


</script>
<Header on:send={transporter}/>
<Keyboard bind:this={keeve}/>
<div>This is just for testing.</div>
<button on:click={()=>{val=!val;obj.changecolor(val)}}>This is a button.</button>

