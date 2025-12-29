import { LightningElement,wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSeacrchHandler.searchAccounts';

export default class WireusingDynamicParameter extends LightningElement {
searchstring='';  
accounts=[];  
    @wire(searchAccounts,{searchKey:'$searchstring'})
    handleGetAccounts({data,error}){
        if(data){
            this.accounts = data;
            this.error = undefined;

        }else if(error){
              this.accounts=undefined;
            this.error = error;
        }
    }
    handleSearch(event){
        this.searchstring = event.target.value;
    }
}