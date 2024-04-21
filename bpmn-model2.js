const BpmnModdle = require('bpmn-moddle');
const fs = require('fs');

const moddle = new BpmnModdle();

const xmlStr =
'<?xml version="1.0" encoding="UTF-8"?>' +
'<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
'id="empty-definitions" ' +
'targetNamespace="http://bpmn.io/schema/bpmn">' +
'</bpmn2:definitions>';

moddle.fromXML(xmlStr, (err, definitions) => {
if (err) {
return console.error('Error parsing BPMN file', err);
}


const process = moddle.create('bpmn:Process', { id: 'MyProcess' });

const task1 = moddle.create('bpmn:Task', { id: 'Task1' });
const task2 = moddle.create('bpmn:Task', { id: 'Task2' });
const task3 = moddle.create('bpmn:Task', { id: 'Task3' });
const task4 = moddle.create('bpmn:Task', { id: 'Task4' });

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
const sequenceFlow3 = moddle.create('bpmn:SequenceFlow', {
    id: 'flow3',
    sourceRef: task3,
    targetRef: task2,
});
const sequenceFlow4 = moddle.create('bpmn:SequenceFlow', {
    id: 'flow4',
    sourceRef: task2,
    targetRef: task4,
});
const sequenceFlow5 = moddle.create('bpmn:SequenceFlow', {
    id: 'flow5',
    sourceRef: task3,
    targetRef: task4,
});

process.get('flowElements').push(
    task1,
    task2,
    task3,
    task4,
    sequenceFlow1,
    sequenceFlow2,
    sequenceFlow3,
    sequenceFlow4,
    sequenceFlow5
);

definitions.get('rootElements').push(process);

moddle.toXML(definitions, (err, result) => {
    if (err) {
        return console.error('Error writing BPMN file', err);
    }
    fs.writeFileSync('bpmn-model2.xml', result.xml);
    console.log('The file has been saved!');
});
});