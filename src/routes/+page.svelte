<script>
import {onMount} from "svelte";
import {keylist} from "./stores.js";
import Keyboard from "./keyboard.svelte";
	import Header from "./Header.svelte";
/**
	 * @type {Key}
	 */
let obj;
let val=true;
</script>
<Header/>
<Keyboard/>
<div>This is just for testing.</div>
<button on:click={()=>{val=!val;obj.changecolor(val)}}>This is a button.</button>

