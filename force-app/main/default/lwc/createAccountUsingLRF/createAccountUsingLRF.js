import { LightningElement } from 'lwc';

// import account fields
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';

//for Navigation to Account  page
import { NavigationMixin } from 'lightning/navigation';

export default class AccountCreator extends NavigationMixin(LightningElement) {
    
    // show or hide the success message
   showSuccessMessage = false;
    //used to show or hide the error message
    showErrorMessage = false;

    //holds error message shown to user
    errorMessage = '';

    // Fields displayed in lightning-record-form
    fields = [ACCOUNT_NAME, ACCOUNT_PHONE, ACCOUNT_WEBSITE, ACCOUNT_INDUSTRY];



    //this will show when record is saved successfully
    handleSubmit(event) {
        // Stop Salesforce automatic save
        event.preventDefault();

        // Get values entered by user
        var fields = event.detail.fields;

        // -------- CUSTOM VALIDATION --------
        // Check if Account Name is empty
        if (fields.Name == null || fields.Name === '') {
            this.showErrorMessage = true;
            this.showSuccessMessage = false;
            this.errorMessage = 'Account Name is required';
            return; // stop saving
        }

        // If validation passed, submit the record
        event.target.submit(fields);
        // Navigate to the Account home page

        

    }

    // This method is called when user clicks SAVE button
    handleSuccess(event) {
        this.showSuccessMessage = true;
        this.showErrorMessage = false;

         const recordId = event.detail.id;

        // Hide success message after 3 seconds
        setTimeout(() => {
           this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Account',
                actionName: 'view',
            }
        });
        }, 300);      
        
    }


    //this will show when record gets error
    handleError(event) {
        this.showErrorMessage = true;
        this.showSuccessMessage = false;

        // Default message
        this.errorMessage = 'Something went wrong while saving Account';

        // Check if event exists
        if (event != null) {

            // Check if error details exist
            if (event.detail != null) {

                // Get Salesforce error message
                if (event.detail.message != null) {
                    this.errorMessage = event.detail.message;
                }
            }
        }
    }
}