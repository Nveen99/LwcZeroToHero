import { LightningElement } from 'lwc';

export default class C2pChildComponent extends LightningElement {
    handleClickAddition() {
        const event = new CustomEvent('addition', {
            detail: 'Addition'
        });
        this.dispatchEvent(event);
    }

    handleClickSubtraction() {
         const event1 = new CustomEvent('substraction', {
            detail: 'substraction'
        });
        this.dispatchEvent(event1);
    }


    handleClickMul() {
        const event2 = new CustomEvent('multiple', {
            detail: 2
        });
        this.dispatchEvent(event2);
    }
    handleClickMultiply(event){
        const factor = event.target.dataset.factor;
        const event3 = new CustomEvent('multifactor', {
            detail: factor
        });
        this.dispatchEvent(event3);

    }

    array=[3,2,4,6,0];
     array = [3, 2, 4, 6, 0];
     handleSubChildMultiply(event) {
        const factor = event.detail;

        const parentEvent = new CustomEvent('multifactor', {
            detail: factor
        });

        this.dispatchEvent(parentEvent);
    }
}