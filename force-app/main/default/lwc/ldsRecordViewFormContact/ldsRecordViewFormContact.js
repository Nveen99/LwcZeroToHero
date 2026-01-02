import { LightningElement,api } from 'lwc';
import LastName_Fields from '@salesforce/schema/Contact.LastName';
import FirstName_Field from '@salesforce/schema/Contact.FirstName';     
import Phone_Field from '@salesforce/schema/Contact.Phone';
import Email_Field from '@salesforce/schema/Contact.Email';
import Department_Field from '@salesforce/schema/Contact.Department';

export default class LdsRecordViewFormContact extends LightningElement {
    @api recordId;
    @api objectApiName;
    lastName=LastName_Fields;
    firstName=FirstName_Field;
    phone=Phone_Field;
    email=Email_Field;
    department=Department_Field;
}