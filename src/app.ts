import {Task} from "./Task";
import {SerializationHelper} from "./SerializationHelper";
// import {TsSerializer} from "ts-json-serializer";
import {Test} from "./test";
import {Dispatcher} from "./queueSdk/Dispatcher";
import {TaskHandler} from "./queueSdk/TaskHandler";
import {QueueApiImpl} from "./queueSdk/QueueApiImpl";
import {TaskBean} from "./queueSdk/TaskBean";
import {TaskImpl} from "./taskImpl";
import {Consts} from "./queueSdk/Consts";
import {WebpackCompiler} from "./queueSdk/WebpackCompiler";
import {sep} from "path";
import {Utils} from "./queueSdk/Utils";
import {ConnectionInfoBean} from "./queueSdk/ConnectionInfoBean";


// const request = require('request');

const task = new TaskImpl();
// QueueApiImpl.test();
// task.run();
let temp = Utils.findFile('app11.ts');
let dispatcher = new Dispatcher(new ConnectionInfoBean('http://localhost', 3000, "http", 'queue/addTask'));
dispatcher.dispatch(task);
// let com = new WebpackCompiler();
// let t = com.compile(task);
// TaskHandler.createZip(Consts.taskWorkingDir);
// QueueApiImpl.sendTask(Consts.taskWorkingDir + sep + Consts.taskZipName, new TaskBean(false, '', ''),task);
//const serializer = new TsSerializer();
// let temp;
// // try {
// // 	temp = serializer.serialize(task);
// // 	console.log(temp);
// // 	let temp1 = serializer.deserialize<Task>(temp);
// // } catch (e) {
// // 	console.log('error serializing task: ' + e.message)
// // }
// // let temp3:Task =  SerializationHelper.toInstance( {} as Task,temp);
// let replacer = (key, value) => {
// 	// if we get a function give us the code for that function
// 	if (typeof value === 'function') {
// 		return value.toString();
// 	}
// 	return value;
// };
// let reviver = (key, value) => {
// 	if (typeof value === 'string'
// 		&& value.indexOf('function ') === 0) {
// 		let functionTemplate = `(${value})`;
// 		return eval(functionTemplate);
// 	}
// 	return value;
// };
// let f = Object.keys(TaskImpl);
//
// temp = task.ser();
// let temp3 = JSON.parse(temp, reviver);
// request.post({
// 	headers: {'content-type': 'application/json'},
// 	url: 'http://localhost:3000/queue/addTask',
// 	body: JSON.stringify( {'haim':'test'} )
// }, function (error, response, body) {
// 	console.log(response);
// 	console.log(error);
// 	;
// });
