const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const xmlString = {"xml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" id=\"definitions\" targetNamespace=\"http://bpmn.io/schema/bpmn\"><bpmn:process id=\"MyProcess\"><bpmn:task id=\"Task1\" /><bpmn:task id=\"Task2\" /><bpmn:task id=\"Task3\" /><bpmn:task id=\"Task4\" /><bpmn:sequenceFlow id=\"flow1\" sourceRef=\"Task1\" targetRef=\"Task2\" /><bpmn:sequenceFlow id=\"flow2\" sourceRef=\"Task2\" targetRef=\"Task3\" /><bpmn:sequenceFlow id=\"flow3\" sourceRef=\"Task2\" targetRef=\"parallelGateway\" /><bpmn:sequenceFlow id=\"flow4\" sourceRef=\"Task3\" targetRef=\"parallelGateway\" /><bpmn:sequenceFlow id=\"flow5\" sourceRef=\"Task2\" targetRef=\"Task4\" /><bpmn:sequenceFlow id=\"flow6\" sourceRef=\"Task3\" targetRef=\"Task4\" /></bpmn:process></bpmn:definitions>"};

xml2js.parseString(xmlString.xml, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        const bpmnXML = builder.buildObject(result);
        console.log(bpmnXML);
    }
});




// steps
//1 create bpmn-model.js
// it will return xml but it is in string format
// create xmljs.js 
//it will in correct bpmn xml format
