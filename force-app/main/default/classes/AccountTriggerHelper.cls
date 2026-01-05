public class AccountTriggerHelper {
/* 1. When inserting an account if user left phone field empty then throw error "you can not left the phone field empty"*/
    public static void validateAccountPhone(List<Account>accList){
        for(Account acc :accList){
            if(acc.Phone == null){
                acc.Phone.addError('You can not left the phone field empty');
            }
            
        }
    }
}