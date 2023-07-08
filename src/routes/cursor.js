export class Cursor {
    constructor(element){
        this.element=element;
        this.top=0;
        this.left=0;
    }
    update(nextelement){
        console.log("Update ran!");
        const {x:x_next,y:y_next}=nextelement.getBoundingClientRect();
        const {x:x_me,y:y_me}=this.element.getBoundingClientRect();
        this.left+=x_next-x_me;
        this.top+=y_next-y_me;
        this.element.style.transform=`translate(${this.left-2}px,${this.top}px)`;
    }
    reset(){
        this.top=0;
        this.left=0;
        this.element.style.transform=`translate(${this.left-2}px,${this.top}px)`;
    }
};