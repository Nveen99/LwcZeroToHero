import { LightningElement } from 'lwc';

export default class Child extends LightningElement {
    message='Hi, I am from child component';
    handleClick(){
        this.dispatchEvent(
            new CustomEvent('childclick',
            {
                detail:{msg:this.message},
                bubbles:true,
               composed:true
            }
            
        ));
    }
    }
