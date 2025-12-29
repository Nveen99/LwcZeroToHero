import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSeacrchHandler.getAccounts';

export default class WireUsingFunctionMethod extends LightningElement {
contacts;
error;
    //wire function
@wire(getAccounts)
handleAccounts({data,error}){
    if(data){
        this.contacts = data;
        this.error = undefined;
    }
    else if(error){
        this.error = error;
        this.contacts = undefined;
    }
}
}