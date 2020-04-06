function selectDraft() {
  var template = HtmlService.createTemplateFromFile('choosing-draft.html');
  var html = template.evaluate().setWidth(600).setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Choosing a draft');
}

function getDraftBody(draftId) {
  var draftBody;
  GmailApp.getDraftMessages().forEach(function(draft){
    if (draft.getId() == draftId) {
     draftBody = (draft.getBody()); 
    }
  })
  return draftBody;
}