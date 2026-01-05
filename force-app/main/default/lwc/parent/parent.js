import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    messageFromChild;
    handleChildClick(event){
        this.messageFromChild=event.detail.msg;

    }
     handleChildClickDiv(){
        this.messageFromChild="I am form Parent Div"
    }
}