import {sep} from "path";

export const task = () => {
	return function (target) {
		const oldPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (err, stack) => stack;
		const stack: any = new Error().stack;
		Error.prepareStackTrace = oldPrepareStackTrace;
		let fileName = stack ? stack[1].getFileName() : undefined;
		let splitPath = fileName ? fileName.split(sep) : undefined;
		fileName = splitPath ? splitPath[splitPath.length -1].split('.')[0] : undefined;
		Object.defineProperty(target.prototype, 'fileName', {value: fileName});
	};
};
