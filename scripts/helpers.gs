function loadSpreadsheet() {
  var employeeInfo = [];
  
  // Get active spreadsheet - spreadsheet from which is open in the browser currently
  var activeSheet = SpreadsheetApp.getActiveSheet();
  
  // Get values: first 2 is because we start from the second row since first row is headers such as Sender Mail Address, Last Name ....
  // Second argument 1 means that we should take from the first column
  // Third argument specifies total number of rows
  // Fourth argument - total number of columns
  var data = activeSheet.getRange(2, 1, activeSheet.getLastRow(), activeSheet.getLastColumn()).getValues();
  
  // return data which is employee info from the spreadsheetApp
  return data;
}

function loadSpreadsheetHeader() {
  return SpreadsheetApp.getActiveSheet().getDataRange().getValues()[0];
}


// Check validity of the email: return true if valid, otherwise false
function isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

