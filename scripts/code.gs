function sendEmails() {
  // Get draft ID from user preferences and Select a draft from GMAIL
  Logger.log('Before accessing preferences');
  var draftId = getPreference('DRAFT_ID');
  Logger.log('After accessing preferences');
  Logger.log(draftId);
  var draftBody = getDraftBody(draftId);
  
  // Get Mail Column Index
  var emailColumnIndex = getPreference('EMAIL_COLUMN');
  
  // Load spreadsheet header
  var spreadsheetHeader = loadSpreadsheetHeader();
  
  // Load data from spreadsheet
  var employeeInfo = loadSpreadsheet();
  
  var timeColumnIndex = -1;
  var statusColumnIndex = -1;
  for (var i = 0; i < spreadsheetHeader.length; i++){
    if (spreadsheetHeader[i] == 'Send Time') {
      timeColumnIndex = i;
    } else if (spreadsheetHeader[i] == 'Status') {
      statusColumnIndex = i;
    }
  }
  var currentTime = new Date().getTime();
 
  // Iterate rows of the spreadsheet
  for (var i = 0; i < employeeInfo.length; i++) {
    
      // Get employee info (one row from the spreadsheet)
      var employee = employeeInfo[i];
    
    if (employee[statusColumnIndex] == "Scheduled" && employee[timeColumnIndex].getTime() <= currentTime) {
    
      // Reinitialize draft body
      var body = draftBody;
      
      // Replace to real variables
      for (var j = 0; j < employee.length; j++) {
        body = body.replace('[' + spreadsheetHeader[j] + ']', employee[j]);  
      }
      
      
      // Check validity of the email, if email is not valid, do not send
      if (isEmailValid(employee[emailColumnIndex])) {
        // You second arugment which is 'Working hours info' is the subject of the email
        
        
        
        GmailApp.sendEmail(employee[emailColumnIndex], 'Working hours info', body, {htmlBody: body});
        
        SpreadsheetApp.getActiveSheet().getRange(2 + i, statusColumnIndex + 1).setValue('Delivered');
      } 
      
    }
    
  }
}

function scheduleSetter() {
  var spreadsheetHeader = loadSpreadsheetHeader();
  var employeeInfo = loadSpreadsheet();
  
  var timeColumnIndex = -1;
  var statusColumnIndex = -1;
  for (var i = 0; i < spreadsheetHeader.length; i++){
    if (spreadsheetHeader[i] == 'Send Time') {
      timeColumnIndex = i;
    } else if (spreadsheetHeader[i] == 'Status') {
      statusColumnIndex = i;
    }
  }
  
  if (timeColumnIndex != -1 && statusColumnIndex != -1) {
    for (var i = 0; i < employeeInfo.length; i++) {
     var employee = employeeInfo[i];
     var schedule = employee[timeColumnIndex];
     var currentTime = new Date().getTime();
      if (schedule) {
       if (employee[statusColumnIndex] == "" && schedule.getTime() > currentTime) {
        ScriptApp.newTrigger('sendEmails')
               .timeBased()
               .at(schedule)
               .inTimezone(SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone())
               .create();
        SpreadsheetApp.getActiveSheet().getRange(2 + i, statusColumnIndex + 1).setValue('Scheduled');
        } else {
          if (employee[statusColumnIndex]  == "Scheduled" || employee[statusColumnIndex] == "Delivered") {
            continue;
          } else {
           SpreadsheetApp.getActiveSheet().getRange(2 + i, statusColumnIndex + 1).setValue('Date was passed'); 
          }
        }
      }
    }
  }
}

function onOpen() {
  var UI= SpreadsheetApp.getUi();
  UI.createMenu('Custom scripts')
      .addItem('⏰ Set email schedule', 'scheduleSetter')
      .addItem('📩 Send emails', 'sendEmails')
      .addItem('📝 Select draft', 'selectDraft')
      .addItem('📧 Set email column', 'setEmailColumn')
      .addToUi();
}
