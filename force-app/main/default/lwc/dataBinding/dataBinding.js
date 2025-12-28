import { LightningElement,track } from 'lwc';

export default class DataBinding extends LightningElement {
    //One way data binding
    message="I am from Js One way binding"

    @track greetingmessage="I am from Js Two way binding"
    handleChange(event){
        this.greetingmessage=event.target.value
    }
}