public class AccountTriggerHelper {
    /* 1. When inserting an account if user left phone field empty then throw error "you can not left the phone field empty"*/
    public static void validateAccountPhone(List<Account>accList){
        for(Account acc :accList){
            if(acc.Phone == null){
                acc.Phone.addError('You can not left the phone field empty');
            }
        }
    }
    /*When ever account phone is updated then updated with related contact phone with account phonenumber(UsingMap)*/
    public static void updateRelatedConPhone(List<Account>accList, Map<Id,Account>oldMap){
        List<Contact>conList = new List<Contact>();
        Map<Id,Account>accMapToUpdate = new Map<id,Account>();
        for(Account acc : accList){
            if(acc.Phone!=null && acc.Phone!=(oldMap.get(acc.Id).Phone)) {
                accMapToUpdate.put(acc.Id,acc);
            }
        }
        for(Contact con:[SELECT AccountId,LastName, Phone FROM Contact WHERE AccountId IN:accMapToUpdate.keySet()]){
            if(accMapToUpdate.containsKey(con.AccountId)){
                con.Phone=accMapToUpdate.get(con.AccountId).Phone;
                conList.add(con);
            }
        }
        if(!conList.isEmpty()){
            update conList;
        }
    }
    
    /*When ever account phone is updated then updated with related contact phone with account phonenumber(UsingParent to child)*/
    public static void updateRelatedContactPhone(List<Account>accList, Map<Id,Account>oldMap){
        List<Contact>conList = new List<Contact>();
        Set<Id>accIds = new Set<Id>();
        for(Account acc : accList){
            if(acc.Phone!=null && acc.Phone!=(oldMap.get(acc.Id).Phone)) {
                accIds.add(acc.Id);
            }
        }
        for(Account acc:[SELECT Id, Name,Phone,(SELECT LastName, Phone,AccountId FROM contacts) FROM Account WHERE Id IN:accIds]){
            if(acc.contacts!=null){
                for(Contact con: acc.Contacts){
                    con.Phone = acc.Phone;
                    conList.add(con);
                }
            }
        }
        if(!conList.isEmpty()){
            update conList;
        }
    }
    
    /*trigger to prevent duplication of account record based on name when ever record is inserted or updated*/
    
    public static void preventDuplicationAccountName(List<Account>accList, Map<Id,Account>oldMap){
        // Store incoming Account names (converted to lowercase for case-insensitive check)
        Set<String>strNames = new Set<String>();
         // Map to store existing Account names from database
        Map<String,Account>existingNames = new Map<String,Account>();
         // Safety check to avoid null list processing
        if(!accList.isEmpty()){
            // Collect names from incoming records
            for(Account acc: accList){
                if(acc.Name!=null){
                    strNames.add(acc.Name.toLowerCase());
                }
            }
            // Query existing Accounts with same names (Executed only once – bulk safe)
            for(Account acc :[SELECT Id,Name FROM Account WHERE Name IN:strNames]){
                if(acc.Name!=null){
                    existingNames.put(acc.Name.toLowerCase(),acc);
                }
            }
            
          // Compare incoming records with existing records            
            for(Account acc:accList){
                if(acc.Name!=null){
                    String nameLower = acc.Name.toLowerCase();
                    // If duplicate name found, block the record
                    if(existingNames.containsKey(nameLower) ){
                        acc.Name.addError('Duplicate Name found');
                    }
                }
                
            }
        }
    }
    
    
}