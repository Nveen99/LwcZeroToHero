import { LightningElement } from 'lwc';

export default class C2pChildEventListener extends LightningElement {
    fname = '';
    lname = '';

    handleChangeFname(event) {
        this.fname = event.target.value;
    }

    handleChangeLname(event) {
        this.lname = event.target.value;
    }

    handleSubmit() {
        const evt = new CustomEvent('submitevent', {
            detail: {
                fname: this.fname,
                lname: this.lname
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(evt);
    }
}
