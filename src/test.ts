import {Task} from "./Task";


export class Test extends Task {
	numOfReTry: number = 5;
	timeout: number;

	run(): void | boolean | Promise<boolean> {
		console.log(this.numOfReTry);
		return undefined;
	}

}
