<script>
import Keyboard from "./keyboard.svelte";
import Header from "./Header.svelte";
let obj;
let val=true;
let thekeyboard;
function headervalue(event){
	if(event.detail){
		thekeyboard.color(event.detail.shift ? [[event.detail.value,41,52],event.detail.correct] : [[event.detail.value],event.detail.correct]);
	}
}

</script>
<div class="kall">
<Header on:send={headervalue} />

<Keyboard bind:this={thekeyboard} />
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
		width:100%;
		background-color: gray;
	}

:global(body),:global(html){
	overflow:hidden;
}
</style>