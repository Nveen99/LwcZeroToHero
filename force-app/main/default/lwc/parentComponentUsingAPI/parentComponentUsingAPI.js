import { LightningElement } from 'lwc';

export default class ParentComponentUsingAPI extends LightningElement {
    message;
    changeHandler(event){
        this.message = event.target.value;
   
    }
}