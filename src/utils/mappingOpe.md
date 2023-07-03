base : 0

click digit || input :

-  update current

click "=" :

-  Dans tous les cas : update old + empty current.

-  Si old && opération && current : update result
-  Si !old && !opération && current : (result = null)
-  Si old && !opération && current : (result = null)
-  Si old && !opération && !current : update result with :
   -  If prev result : result as current && prev operation
   -  If no prev result : O as current && prev operation
-  Si old && opération && !current : update result from prev result as current && new operation

click opération :

-  Si precedente opération : comme "=";
