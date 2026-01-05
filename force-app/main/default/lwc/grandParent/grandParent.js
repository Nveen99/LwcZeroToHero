import { LightningElement } from 'lwc';

export default class GrandParent extends LightningElement {
    messageFromChild;
    handleChildClick(event){
        this.messageFromChild=event.detail.msg;

    }

    handleChildClickDiv(){
        this.messageFromChild="I am form GrandParent Div"
    }

    }
