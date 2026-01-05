import { LightningElement,wire } from 'lwc';
import * as pubsub from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
export default class Subscriber extends LightningElement {
    msg='';

@wire(CurrentPageReference) pageRef;

    connectedCallback(){
       pubsub.registerListener('submitevent',this.handlesubmit,this);        
    }
    handlesubmit(message){
        this.msg=message;
    }
}