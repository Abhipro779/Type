<script>
import Keyboard from "./keyboard.svelte";
import Header from "./Header.svelte";
let nextitem;
$:{console.log(nextitem);}
let obj;
let val=true;
let thekeyboard;
function headervalue(event){
	if(event.detail){
		thekeyboard.color(event.detail.shift ? [[event.detail.value,41,52],event.detail.correct] : [[event.detail.value],event.detail.correct]);
	}
}
function nextupdate(value){
	nextitem=value;
}
</script>
<div class="kall">
<Header on:send={headervalue} nextitemget={nextupdate}/>

<Keyboard bind:this={thekeyboard} {nextitem}/>
</div>
<style>
	*{
		margin:0px;
		padding:0px;
		position: relative;
	}
	.kall{
		position:relative;
		height:100dvh;
		background-color: gray;
	}


</style>