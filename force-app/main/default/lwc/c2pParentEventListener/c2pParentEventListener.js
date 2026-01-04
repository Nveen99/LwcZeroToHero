import { LightningElement } from 'lwc';

export default class C2pParentEventListener extends LightningElement {
    firstName = '';
    lastName = '';
    
    

    constructor() {
        super();
        // Correct: listen on host element
        this.addEventListener(
            'submitevent',
            this.handlesubmitevent.bind(this)
        );
    }

    handlesubmitevent(event) {
        this.firstName = event.detail.fname;
        this.lastName = event.detail.lname;
        const newData = {
            FName:event.detail.fname,
            LName:event.detail.lname
        }
        this.data=[...this.data,newData];

    }

    data=[];
    columns=[{label:'FirstName',fieldName: 'FName', type: 'text'},
        {label:'LastName',fieldName: 'LName', type: 'text'}
    ];
        
}
