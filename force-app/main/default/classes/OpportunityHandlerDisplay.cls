public with sharing class OpportunityHandlerDisplay {
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getopportunityList(){
    if (!Schema.sObjectType.Opportunity.isAccessible()) {
            // If user doesn't have access, return empty list
            return new List<Opportunity>();
        }
    List<Opportunity>optyList = [SELECT Name, StageName, CloseDate, Amount FROM Opportunity LIMIT 100];
    
    System.debug('optyList:'+optyList);
    return optyList;
  }
}