import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    messageFromParent ="Hello , I am from Parent component";
    number=0;
   
    handleChangeNumber(event){
        this.number = parseInt(event.target.value);
    }
    handleSubmit(){
        this.template.querySelector('c-child-component').increment();
    }
    handleDescrease(){
         this.template.querySelector('c-child-component').decrease(100);
    }
}