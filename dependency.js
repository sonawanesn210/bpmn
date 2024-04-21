const fs = require('fs');
const BpmnModdle = require('bpmn-moddle');
const moddle = new BpmnModdle();

// Create tasks
const task1 = moddle.create('bpmn:Task', { id: 'Task1' });
const task2 = moddle.create('bpmn:Task', { id: 'Task2' });
const task3 = moddle.create('bpmn:Task', { id: 'Task3' });
const task4 = moddle.create('bpmn:Task', { id: 'Task4' });

// Create sequence flows for linear dependencies
const sequenceFlow1 = moddle.create('bpmn:SequenceFlow', {
  id: 'flow1',
  sourceRef: task1,
  targetRef: task2,
});
const sequenceFlow2 = moddle.create('bpmn:SequenceFlow', {
  id: 'flow2',
  sourceRef: task2,
  targetRef: task3,
});

// Create parallel gateway for parallel dependencies
const parallelGateway = moddle.create('bpmn:ParallelGateway', {
  id: 'parallelGateway'
});

const sequenceFlow3 = moddle.create('bpmn:SequenceFlow', {
  id: 'flow3',
  sourceRef: task2,
  targetRef: parallelGateway,
});
const sequenceFlow4 = moddle.create('bpmn:SequenceFlow', {
  id: 'flow4',
  sourceRef: task3,
  targetRef: parallelGateway,
});

const sequenceFlow5 = moddle.create('bpmn:SequenceFlow', {
id: 'flow5',
sourceRef: task3,
targetRef: task4,
});
const sequenceFlow6 = moddle.create('bpmn:SequenceFlow', {
id: 'flow6',
sourceRef: task2,
targetRef: task4,
});

const process = moddle.create('bpmn:Process', { id: 'MyProcess' });
process.get('flowElements').push(task1, task2, task3, task4, sequenceFlow1, sequenceFlow2, sequenceFlow3, sequenceFlow4, sequenceFlow5, sequenceFlow6);

const definitions = moddle.create('bpmn:Definitions', {
targetNamespace: 'http://bpmn.io/schema/bpmn',
id: 'definitions',
rootElements: [process]
});
/* const xmlStr =  moddle.toXMLString(definitions);
fs.writeFileSync('bpmn-dependency.xml', xmlStr);
console.log('The file has been saved!'); */
/* const xmlStr=moddle.toXML(definitions)
(xmlStr => { fs.writeFile('bpmn-dependency.xml', xmlStr);

console.log('The file has been saved!');
})
.catch(err => {
console.error('Error writing BPMN file', err);
}); */


const xmlStr =  moddle.toXML(definitions).then(xmlStr => {
    fs.writeFileSync('bpmn-dependency.xml', JSON.stringify(xmlStr));
    console.log('The file has been saved!');
}); 