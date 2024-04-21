var DOMParser = require("xmldom").DOMParser;
const { JSDOM } = require("jsdom");
const XMLSerializer = require("xmlserializer");
const dom = new JSDOM();
const document = dom.window.document;
const parser = new DOMParser();
// const bpmnXml = `
//   <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" id="definitions">
//     <bpmn2:process id="Process_1" isExecutable="false">
//       <bpmn2:startEvent id="StartEvent_1"/>
//     </bpmn2:process>
//   </bpmn2:definitions>
// `;

const bpmnXml = `<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="definitions"> <bpmn:process id="MyProcess"> <bpmn:task id="Task1" name="Task1"/><bpmn:task id="Task2"/> <bpmn:sequenceFlow id="flow1" sourceRef="Task1" targetRef="Task2"/><bpmn:sequenceFlow id="flow2" sourceRef="Task2"/></bpmn:process></bpmn:definitions>`;

const bpmnDoc = parser.parseFromString(bpmnXml, "text/xml");
const bpmnDefinitions = bpmnDoc.getElementsByTagNameNS(
  "http://www.omg.org/spec/BPMN/20100524/MODEL",
  "definitions"
)[0];

const bpmndi = document.createElementNS(
  "http://www.omg.org/spec/BPMN/20100524/DI",
  "bpmndi:BPMNDiagram"
);

bpmndi.setAttribute("id", "BPMNDiagram_1");
const bpmnPlane = document.createElementNS(
  "http://www.omg.org/spec/BPMN/20100524/DI",
  "bpmndi:BPMNPlane"
);
bpmnPlane.setAttribute("id", "BPMNPlane_1");
bpmnPlane.setAttribute("bpmnElement", "MyProcess");

// for start event
const startEventShape = document.createElementNS(
  "http://www.omg.org/spec/BPMN/20100524/DI",
  "bpmndi:BPMNShape"
);
const startCreateShape = document.createElementNS(
  "http://www.omg.org/spec/BPMN/20100524/DI",
  "bpmndi:BPMNShape"
);

startEventShape.setAttribute("id", "_BPMNShape_StartEvent_2");
startEventShape.setAttribute("bpmnElement", "Task1");

startCreateShape.setAttribute("id", "_BPMNShape_StartEvent_3");
startCreateShape.setAttribute("bpmnElement", "Task2");

const bounds = document.createElementNS(
  "http://www.omg.org/spec/DD/20100524/DC",
  "dc:Bounds"
);
const bounds1 = document.createElementNS(
  "http://www.omg.org/spec/DD/20100524/DC",
  "dc:Bounds"
);
bounds.setAttribute("x", "160");
bounds.setAttribute("y", "80");
bounds.setAttribute("width", "100");
bounds.setAttribute("height", "80");

bounds1.setAttribute("x", "310");
bounds1.setAttribute("y", "80");
bounds1.setAttribute("width", "100");
bounds1.setAttribute("height", "80");

startEventShape.appendChild(bounds);
startCreateShape.appendChild(bounds1);
bpmnPlane.appendChild(startEventShape);
// bpmndi.appendChild(bpmnPlane);
// bpmnDefinitions.appendChild(bpmndi);
bpmnPlane.appendChild(startCreateShape);
bpmndi.appendChild(bpmnPlane);

bpmnDefinitions.appendChild(bpmndi);
// end for start event


// for sequence flow
// const startSeqFlowShape = document.createElementNS(
//   "http://www.omg.org/spec/BPMN/20100524/DI",
//   "bpmndi:BPMNShape"
// );
// startSeqFlowShape.setAttribute("id", "_BPMNShape_StartEvent_3");
// startSeqFlowShape.setAttribute("bpmnElement", "flow1");

// const bounds1 = document.createElementNS(
//   "http://www.omg.org/spec/DD/20100524/DC",
//   "dc:Bounds"
// );
// bounds1.setAttribute("x", "260");
// bounds1.setAttribute("y", "120");

// startSeqFlowShape.appendChild(bounds1);
// bpmnPlane.appendChild(startSeqFlowShape);
// bpmndi.appendChild(bpmnPlane);

// bpmnDefinitions.appendChild(bpmndi);

//end of sequence flow


// console.log(new XMLSerializer().serializeToString(bpmnDoc));
console.log(bpmnDoc.toString());
// console.log(bpmnDoc.documentElement.outerHTML);
