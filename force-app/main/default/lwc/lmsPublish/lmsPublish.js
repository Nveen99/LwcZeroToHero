import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import LMSChannel from '@salesforce/messageChannel/lmsData__c';

export default class LmsPublish extends LightningElement {
    message = '';

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.message = event.target.value;
    }

    handlePublish() {
        const payload = {
            operator: 'MESSAGE',
            constant: this.message
        };

        publish(this.messageContext, LMSChannel, payload);
    }
}
