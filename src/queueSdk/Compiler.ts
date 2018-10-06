import {Task} from "../Task";

export interface Compiler {
	compile(task: Task):Promise<Boolean> | null;
}
