import { LightningElement,api } from 'lwc';

export default class C2pSubChild extends LightningElement {
@api label;
    @api icon;

    handleClick() {
        const factor = this.label;

        const event = new CustomEvent('buttonclickevent', {
            detail: factor,
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}