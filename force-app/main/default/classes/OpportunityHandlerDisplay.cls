public with sharing class OpportunityHandlerDisplay {

  // =======================
  // GET OPPORTUNITIES
  // =======================
  @AuraEnabled(cacheable=true)
  public static List<Opportunity> getopportunityList() {

      // Object READ permission
      if (!Schema.sObjectType.Opportunity.isAccessible()) {
          return new List<Opportunity>();
      }

      // Field-level READ permission
      if (
          !Schema.sObjectType.Opportunity.fields.Name.isAccessible() ||
          !Schema.sObjectType.Opportunity.fields.StageName.isAccessible() ||
          !Schema.sObjectType.Opportunity.fields.CloseDate.isAccessible() ||
          !Schema.sObjectType.Opportunity.fields.Amount.isAccessible()
      ) {
          return new List<Opportunity>();
      }

      return [
          SELECT Id, Name, StageName, CloseDate, Amount
          FROM Opportunity
          LIMIT 100
      ];
  }

  // =======================
  // DELETE OPPORTUNITIES
  // =======================
@AuraEnabled
public static List<Opportunity> deleteOpportunityList(List<Opportunity> optyList) {
   delete optyList;
     return optyList;


}

@AuraEnabled(cacheable=true)
public static List<Opportunity> getListOppoAccName(){
return [
          SELECT Id, Name, StageName, CloseDate, Amount,Account.Name
          FROM Opportunity
          LIMIT 100
      ];
}

}