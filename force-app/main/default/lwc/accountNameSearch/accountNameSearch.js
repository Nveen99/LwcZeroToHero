import { LightningElement, wire, track } from 'lwc';
import getaccounts from '@salesforce/apex/AccountSeacrchHandler.searchAccounts';

export default class AccountNameSearch extends LightningElement {
   @track searchKey = ''
   @track accounts;
   @track error;

   @wire(getaccounts, { searchKey: '$searchKey' })
   wiredAccounts({ data, error }) {
      if (data) {
         this.accounts = data;
         this.error = undefined;
      } else if (error) {
         this.accounts = undefined;
         this.error = error;
      }
   }

   handleChange(event){
          this.searchKey= event.target.value;
   }
}
