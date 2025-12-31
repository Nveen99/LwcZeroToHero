import { LightningElement,track } from 'lwc';
import getListOppoAccName from '@salesforce/apex/OpportunityHandlerDisplay.getListOppoAccName';

export default class DataTableLookupStandard extends LightningElement {
    @track data=[];
     @track columns=[
            {label:'Opportunity Name', fieldName:'Name', type:'text'},
            {label:'Stage Name', fieldName:'StageName', type:'text'},
            {label:'Close Date', fieldName:'CloseDate', type:'date'},
            {label:'Amount', fieldName:'Amount', type:'currency'},
            {label:'Account Name', fieldName:'AccountId', type:'text'}
        ];
        connectedCallback(){
            this.getOpportunities();
        }
         getOpportunities(){
                getListOppoAccName()
                .then((result)=>{
                   //  console.log('result:',result);
                  // console.log('data length:'+this.data.length);
                   console.log('result from Apex:', JSON.stringify(result));
                    //console.log('result from Apex:', result));
                    this.data=result;
                    
                    // to display the account name in the table
                    //JSON.parse(...) Converts string → new object
                    /* Use JSON.parse(JSON.stringify()) when:
                        1. Data comes from Apex or @wire
                        2. You need to modify values  
                        3. Datatable sorting/editing
                        4. Adding derived fields 
                    */
                    if(this.data){
                        let tempData= JSON.parse(JSON.stringify(this.data)); // deep copy
                        // Loops through each row (record) in the data
                       // currentItem → one Opportunity record at a time
                        tempData.forEach((currentItem)=>{
                            currentItem.AccountId= currentItem.AccountId != undefined ? currentItem.Account.Name: '';
                           // currentItem.AccPhone= currentItem.Account != undefined ? currentItem.Account.Phone: '';
                           // currentItem.AccRating= currentItem.Account != undefined ? currentItem.Account.Rating: '';
                        });
                        this.data=tempData;
                        

                    }
                })
                .catch((error)=>{
                    console.log('Error'+error);
                });
            }
}