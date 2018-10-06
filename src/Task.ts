export abstract class Task {
	timeout?: number;
	numOfReTry?: number;
	fileName?: string;


	abstract run(): void | boolean | Promise<boolean>;

	protected getPath(): any {
		// let path = require('path');
		// return path.basename(__filename).split('.')[0];


		const oldPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (err, stack) => stack;
		const stack = new Error().stack;
		Error.prepareStackTrace = oldPrepareStackTrace;

		return stack ? stack[1] : undefined;
	}

}

