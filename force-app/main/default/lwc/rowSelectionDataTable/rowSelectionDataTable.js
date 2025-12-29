import { LightningElement,track } from 'lwc';
import getopportunityList from '@salesforce/apex/OpportunityHandlerDisplay.getopportunityList';

export default class OpportunityDataTable extends LightningElement {
   @track data=[];
    @track columns=[
        {label:'Opportunity Name', fieldName:'Name', type:'text'},
        {label:'Stage Name', fieldName:'StageName', type:'text'},
        {label:'Close Date', fieldName:'CloseDate', type:'date'},
        {label:'Amount', fieldName:'Amount', type:'currency'}
    ];
    connectedCallback(){
        this.getOpportunities();
    }

    getOpportunities(){
        getopportunityList()
        .then((result)=>{
            console.log('result:',result);
            this.data=result;
            console.log('data length:'+this.data.length);
        })
        .catch(error=>{
            console.log('Error'+error);
        });
    }

   @track selectedRecords=[];

    handleRowSelection(event){
       this.selectedRecords=event.detail.selectedRows;
       console.log('selectedRecords:',JSON.stringify(this.selectedRecords));
        console.log('selectedRecords length:',this.selectedRecords.length);
    }

}
