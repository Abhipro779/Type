import {writable,readable,get} from "svelte/store";
export const keylist=readable(['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'None' ,'AltLeft', 'Space', 'AltRight','None' ,'ContextMenu', 'ControlRight']);
export const keysize=readable([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25, 2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75, 1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25]);
export const keyscount=readable([14,28,41,53,61]);
export const NonCap=readable(['ऽ', '१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', '',"Back","Tab", 'ट', 'ौ', 'े', 'र', 'त', 'य', 'ु', 'ि', 'ो', 'प', 'इ', 'ए', 'ॐ',"Caps", 'ा', 'स', 'द', 'उ', 'ग', 'ह', 'ज', 'क', 'ल', ';', "'","Enter","Shift", 'ष', 'ड', 'छ', 'व', 'ब', 'न', 'म', ',' ,'।', '्',"Shift","Ctrl","WN","Alt"," ","Alt","FN","Ctx","Ctrl"]);
export const Cap=readable(['़', '!', '@', '#', '$', '%', '^', '&', '*', '', '॰', '॒', '',"None","None", 'ठ', 'औ', 'ै', 'ृ', 'थ', 'ञ', 'ू', 'ी', 'ओ', 'फ', 'ई', 'ऐ', 'ः',"None", 'आ', 'श', 'ध', 'ऊ', 'घ', 'अ', 'झ', 'ख', 'ळ', ':', '"',"None","None", 'ऋ', 'ढ', 'च', 'ँ', 'भ', 'ण', 'ं', 'ङ', '॥', '?',"None","None","None","None","None","None","None","None","None"]);

export const speeddata=readable(Array(get(keylist).length).fill([]))
export const toggler=writable(true);
const maintexts=[
    "ी होपे योु ारे उिने।",
    "औहात िस योुर नामे?",
    "माहेनदरानागार बाता कातहमानदु साममा।",
    "थहिस िस ा लोनग तेसत दोने तो तेसत ौेतहेर चुरसोर ौिलल रेसेत ोन रेसिषे ोर नोत। ी होपे ित ौिलल रेसिषे।"
]

export const displaytext=writable(maintexts[0])
export const counter=writable(0);


export function reset(){
displaytext.update((value)=>{
return maintexts[Math.floor(Math.random()*maintexts.length)]
});
counter.set(0);
console.log(`reset ran!${get(counter)}`);
toggler.update(value=>!value);
}

export function updater(event){
    const {code,shiftKey}=event;
    let index=get(keylist).indexOf(code);
    if(index==-1)return null
    let value=(shiftKey ? get(Cap) : get(NonCap))[index];
    let realvalue=get(displaytext)[get(counter)];
    console.log(realvalue);
    console.log(value);
    if(realvalue==value){
        return {
            value:index,
            correct:true,
            shift:shiftKey
        }
    }
    else{
        return {
            value:index,
            correct:false,
            shift:shiftKey
        }
    }
}


export function counterupdate(){
    if(get(counter)>=get(displaytext).length-1){
        reset()
    }
    else{
        counter.update((value)=>value+1)
    }
}