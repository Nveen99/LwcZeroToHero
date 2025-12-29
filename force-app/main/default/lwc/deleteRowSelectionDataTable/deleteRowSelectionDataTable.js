import { LightningElement,track } from 'lwc';
import getopportunityList from '@salesforce/apex/OpportunityHandlerDisplay.getopportunityList';
import deleteOpportunityList from '@salesforce/apex/OpportunityHandlerDisplay.deleteOpportunityList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityDataTable extends LightningElement {
   @track data=[];
   @track isDisabled=true;
   @track selectedRecords=[];
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

   

    handleRowSelection(event){
       this.selectedRecords=event.detail.selectedRows;
       console.log('selectedRecords:',JSON.stringify(this.selectedRecords));
        console.log('selectedRecords length:',this.selectedRecords.length);
        if(this.selectedRecords.length>=1){
            this.isDisabled=false;
        }else{
            this.isDisabled=true;
        }
        
    }

    deleteSelectedRows(){
         deleteOpportunityList({optyList : this.selectedRecords})
        .then((result)=>{
            console.log('result==',result);
            // this.data=result;
          //  console.log('data length:'+this.data.length);
             const event = new ShowToastEvent({
            title: 'success',
            variant: 'success',
            message:result.length+''+'Records deleted succcessfully',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
        setTimeout(() => {
            location.reload();
        }, 2000);
        })
        .catch((error)=>{
            console.log('Error'+error);
        });
    }

}
