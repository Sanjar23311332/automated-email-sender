function setPreference(key, value) {
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty(key, value);
  return true;
}

function getPreference(key) {
 return PropertiesService.getDocumentProperties().getProperty(key); 
}