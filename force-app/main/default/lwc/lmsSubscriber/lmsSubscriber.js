import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import LMSChannel from '@salesforce/messageChannel/lmsData__c';

export default class LmsSubscriber extends LightningElement {
    msg = '';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(
            this.messageContext,
            LMSChannel,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.msg = message.constant;
    }
}
    