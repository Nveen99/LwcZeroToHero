trigger AccountTrigger on Account (before insert,before update,after update) {
    if(Trigger.isBefore){
        if(Trigger.isInsert){
          AccountTriggerHelper.validateAccountPhone(trigger.new);
           AccountTriggerHelper.preventDuplicationAccountName(trigger.new,null);
        }else if(Trigger.isBefore){
            AccountTriggerHelper.preventDuplicationAccountName(trigger.new,trigger.oldMap);
        }
    }
    if(trigger.isAfter){
        if(trigger.isUpdate){
            // AccountTriggerHelper.updateRelatedConPhone(Trigger.new,Trigger.oldMap);
            AccountTriggerHelper.updateRelatedContactPhone(Trigger.new,Trigger.oldMap);
        }
    }
}