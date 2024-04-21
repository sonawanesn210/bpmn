const fs = require('fs');
/* const util = require('util');
const writeFile = util.promisify(fs.writeFile); */

const BpmnModdle = require('bpmn-moddle');
const moddle = new BpmnModdle();

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

const process = moddle.create('bpmn:Process', { id: 'MyProcess' });
process.get('flowElements').push(task1, task2, task3, task4, sequenceFlow1, sequenceFlow2, sequenceFlow3, sequenceFlow4, sequenceFlow5);

const definitions = moddle.create('bpmn:Definitions', {
  targetNamespace: 'http://bpmn.io/schema/bpmn',
  id: 'definitions',
  rootElements: [process]
});

/* moddle.toXML(definitions)
  .then(xmlStr => {
    return writeFile('bpmn-model.xml', xmlStr);
  })
  .then(() => {
    console.log('The file has been saved!');
  })
  .catch(err => {
    console.error('Error writing BPMN file', err);
  }); */
   const xmlStr =  moddle.toXML(definitions).then(xmlStr => {
    fs.writeFileSync('bpmn-model.xml', JSON.stringify(xmlStr));
    console.log('The file has been saved!');
});
 
/* This code is creating a BPMN (Business Process Model and Notation) model using the BpmnModdle library.

Line 1 and 2: it imports the 'fs' and 'util' modules from Node.js. 'fs' is used for interacting with the file system and 'util' is used to promisify the 'fs.writeFile' function.

Line 4: it imports the 'bpmn-moddle' library, which is used for creating BPMN models.

Line 6: it creates a new instance of the BpmnModdle class, which is stored in the 'moddle' variable.

Lines 8-11: it creates four 'bpmn:Task' objects and assigns them unique IDs.

Lines 13-20: it creates five 'bpmn:SequenceFlow' objects, which are used to connect the tasks in the process. Each flow object has an ID and references to the source task and target task.

Line 22: it creates a 'bpmn:Process' object, which is the root element of the BPMN model, and assigns it the ID 'MyProcess'.

Line 23: it adds the tasks and sequence flows to the process element.

Line 25: it creates a 'bpmn:Definitions' object, which is the root element of the BPMN document and assigns it the target namespace and ID.

Line 26: it adds the process to the definitions element as a root element.

Line 31: it converts the definitions object to an XML string and write the string to a file named 'bpmn-model.xml' using the 'fs.writeFileSync' function

Line 32: it prints 'The file has been saved!' to the console.

Dependencies:

BpmnModdle: a library that allows to create and manipulate BPMN models.
'fs': a built-in Node.js module for interacting with the file system.
'util': a built-in Node.js module that provides utility functions. */