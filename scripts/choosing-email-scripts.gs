function setEmailColumn() {
  var template = HtmlService.createTemplateFromFile('choosing-email.html');
  var html = template.evaluate().setWidth(600).setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Choosing email column');
}
