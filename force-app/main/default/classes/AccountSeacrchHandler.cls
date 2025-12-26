public with sharing class AccountSeacrchHandler {
   @AuraEnabled(cacheable=true)
   public static List<Account> searchAccounts(String searchKey){
      // CRUD check (Object level)
        if (!Schema.sObjectType.Account.isAccessible()) {
            return new List<Account>();
        }

        // FLS check (Field level)
        if (!Schema.sObjectType.Account.fields.Name.isAccessible()) {
            return new List<Account>();
        }

      string key = '%' + string.escapesingleQuotes(searchKey) + '%';
      return [SELECT Id, Name FROM Account WHERE Name LIKE :key  ORDER By Name ASC LIMIT 100]; 
   }
}