trigger AccountTrigger on Account (before insert) {
    if(Trigger.isInsert){
        if(Trigger.isBefore){
            AccountTriggerHelper.validateAccountPhone(trigger.new);
        }
    }
}