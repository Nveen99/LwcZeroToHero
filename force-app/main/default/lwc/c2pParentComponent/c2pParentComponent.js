import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    number=0;
    handleAddition(event){
        if(this.number<1000){
            this.number=this.number+1;
        }
        
    }
    
    handleSubstraction(event){
        if(this.number>0){
     this.number=this.number-1;
        }
    }

    handleMultiple(event){
        this.number=this.number*event.detail;
    }

    handleMuliFactor(event){
        this.number=this.number*event.detail;
    }
    
} 

