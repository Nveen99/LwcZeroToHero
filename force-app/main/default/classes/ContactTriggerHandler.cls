public class ContactTriggerHandler {
    /*When ever contact description is updated the update account description*/
    public static void updateAccountDescription(List<Contact>conList, Map<Id,Contact>oldMap){
        List<Account>accList = new List<Account>();
        Map<Id,String>accDescMap  = new Map<Id,String>();
        for(Contact con :conList){
            if(con.AccountId!=null && con.Description!= null && con.Description!=oldMap.get(con.Id).Description){
                accDescMap.put(con.AccountId,con.Description);
            }
        }
        for(Account acc: [SELECT Id,Name,Description FROM Account WHERE Id IN:accDescMap.keySet()]){
            if(accDescMap.containsKey(acc.Id)){
                acc.Description=accDescMap.get(acc.Id);
                accList.add(acc);
            }
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
    
    /*Trigger to count the number of contacts associated with an account and display the contacts count on Account custom field(Number_of_Contacts)*/
    public static void updateContactCountOnAccount(List<Contact>conList, Map<Id,Contact>oldMap){
        List<Account>accList = new List<Account>();
        Set<Id>setIds = new Set<Id>();
        if(conList!=null){
            for(Contact con: conList){
                //for insert, update, undelete (Trigger.new)
                if(con.AccountId!=null){
                    setIds.add(con.AccountId);
                }
            }
        }
        
        if(oldMap!=null){
            // for delete (trigger.old)
            for(Contact con:oldMap.values()){
                if(con.AccountId!=null){
                    setIds.add(con.AccountId);
                }
            }
        }
        
        for(Account acc:[SELECT Name, Id,Number_of_Contacts__c,(SELECT AccountId, LastName FROM contacts) FROM Account WHERE Id IN:setIds]){
            acc.Number_of_Contacts__c = acc.contacts.size();
            accList.add(acc);
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
    
    
    
}