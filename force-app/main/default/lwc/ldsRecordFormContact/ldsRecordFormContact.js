import { LightningElement, api } from 'lwc';
import LastName_Fields from '@salesforce/schema/Contact.LastName';
import FirstName_Field from '@salesforce/schema/Contact.FirstName';
import Phone_Field from '@salesforce/schema/Contact.Phone';
import Email_Field from '@salesforce/schema/Contact.Email';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { NavigationMixin } from "lightning/navigation";

export default class LdsRecordFormContact extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
     fields =[LastName_Fields,FirstName_Field, Phone_Field, Email_Field];

    // to avoid loading the record form until the recordId and objectApiName are set
    get isReady() {
        return this.recordId && this.objectApiName;
    }

    handleSuccess(event){
         const recordId = event.detail.id; 
        const eve = new ShowToastEvent({
            title: 'Record Created Successfully!',
            message: 'Record Id:'+event.detail.id,
            variant: 'success'
            
        });
        this.dispatchEvent(eve);

          this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });

    }
      recordPageUrl;
}
