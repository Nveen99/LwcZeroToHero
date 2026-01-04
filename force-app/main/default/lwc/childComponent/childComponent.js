import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
  @api  message;
  @api num;
   
    
  // increment function without parameter
  @api increment(){
    this.num = this.num+1000;
  }

  @api decrease(value){
    this.num = this.num-value;
  }

  priorNumber=0;
    currentNumber=0;

    @api get count(){
        return this.currentNumber;
    }

    set count(value){
        this.priorNumber = this.currentNumber;
        this.currentNumber = value;
}
}