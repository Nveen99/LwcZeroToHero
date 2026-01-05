import { LightningElement,wire } from 'lwc';
import * as pubsub from 'c/pubsub';

import { CurrentPageReference } from 'lightning/navigation';

export default class Publisher extends LightningElement {
    message = '';
    @wire(CurrentPageReference) pageRef;
    handleChange(event) {
        this.message = event.target.value;
    }
    handlePublish() {
      pubsub.fireEvent(this.pageRef, 'submitevent', this.message )
    }
}