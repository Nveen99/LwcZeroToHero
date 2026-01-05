public class AccountTriggerHandler {
    /* Whenever account record inserted or updated then add prefix as Mr. for accountName*/
    public static void addPrefixAccountName(List<Account>accList, Map<Id,Account>oldMap){
       //for Insert account records
        if(oldMap == NULL){
            for(Account acc : accList){
                if(!acc.Name.startsWith('Mr.') || !acc.Name.startsWith('Mr. ') ){
                    acc.Name='Mr. '+acc.Name;
                }
            }
        } 
        // for update account records
        else if(oldMap != NULL){
                for(Account acc : accList){
                    if((acc.name !=oldMap.get(acc.Id).Name) && !acc.Name.startsWith('Mr.') || !acc.Name.startsWith('Mr. ') ){
                        acc.Name='Mr. '+acc.Name;
                    }
                }
            }
    }
}