import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSeacrchHandler.getAccounts';
export default class WireUsingPropertyMethod extends LightningElement {
    @wire(getAccounts)
    getAccounts;
}