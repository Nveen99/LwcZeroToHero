// Import base LightningElement class and decorators
import { LightningElement, track, wire } from 'lwc';

// Import Apex methods
import getopportunityList 
    from '@salesforce/apex/OpportunityHandlerDisplay.getopportunityList';
import deleteOpportunityList 
    from '@salesforce/apex/OpportunityHandlerDisplay.deleteOpportunityList';

// Import refreshApex utility to refresh wired data
import { refreshApex } from '@salesforce/apex';

// Import toast event to show success / error messages
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DataTableWithRefreshApex extends LightningElement {

    // Holds opportunity records displayed in the datatable
    @track data = [];

    // Used to enable/disable the Delete button
    @track isDisabled = true;

    // Stores selected rows from the datatable
    @track selectedRecords = [];

    // Stores the @wire result object (required for refreshApex)
    wiredDataList;

    // Column configuration for lightning-datatable
    @track columns = [
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Stage Name', fieldName: 'StageName', type: 'text' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' }
    ];

    /**
     * @wire service to fetch opportunity data from Apex
     * Salesforce automatically calls this method and
     * provides a result object containing data or error
     */
    @wire(getopportunityList)
    wiredOpportunityList(result) {

        // Store wired result to use later in refreshApex
        this.wiredDataList = result;

        // If data is returned successfully
        if (result.data) {
            this.data = result.data;
        }
        // If any error occurs
        else if (result.error) {
            console.error('Wire Error:', result.error);
        }
    }

    /**
     * Triggered when user selects or deselects rows
     * from the lightning-datatable
     */
    handleRowSelection(event) {

        // Get selected rows
        this.selectedRecords = event.detail.selectedRows;

        // Enable delete button only when at least one row is selected
        this.isDisabled = this.selectedRecords.length === 0;
    }

    /**
     * Deletes selected opportunity records
     * and refreshes the datatable using refreshApex
     */
    deleteSelectedRows() {

        // Call Apex method to delete selected records
        deleteOpportunityList({ optyList: this.selectedRecords })
            .then((result) => {

                // Refresh wired data (NO page reload)
                refreshApex(this.wiredDataList);

                // Clear selected rows in the UI
                this.template
                    .querySelector('lightning-datatable')
                    .selectedRows = [];

                // Reset component state
                this.selectedRecords = [];
                this.isDisabled = true;

                // Show success toast message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: result.length + ' records deleted successfully',
                        variant: 'success',
                        mode: 'dismissable'
                    })
                );
            })
            .catch((error) => {
                // Handle errors
                console.error('Delete Error:', error);
            });
    }
}
