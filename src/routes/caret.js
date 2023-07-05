export class Cursor {
    constructor(element){
        this.element=element;
        this.left=0;
        this.top=0;
    }
    update(nextelement){
        const {x:x_obj,y:y_obj}=nextelement.getBoundingClientRect();
        const {x:my_x_obj,y:my_y_obj}=this.element.getBoundingClientRect();
        this.left+=x_obj-my_x_obj-5;
        this.top+=y_obj-my_y_obj-5;
        this.element.style.transform=`translate(${this.left}px,${this.top}px)`;
    }
    reset(){
        this.left=0;
        this.top=0;
        this.element.style.transform=`translate(${this.left}px,${this.top}px)`;
    }
}