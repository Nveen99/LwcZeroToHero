trigger ContactTrigger on Contact (after insert, after update, after delete, after undelete) {
    if(Trigger.isAfter){
        if(Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete){
            ContactTriggerHandler.updateContactCountOnAccount(Trigger.New,trigger.oldMap);
        }else if(trigger.isDelete){
            ContactTriggerHandler.updateContactCountOnAccount(Trigger.New,trigger.oldMap);
        }
        if(Trigger.isUpdate){
           // ContactTriggerHandler.updateAccountDescription(Trigger.New,trigger.oldMap);
        }
        
    }

}