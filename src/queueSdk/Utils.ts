import {sep} from "path";
import {existsSync, readdirSync, statSync} from "fs";
import * as path from "path";


export class Utils {

	private static excludeFolders = ['dist', 'node_modules', '.idea']; //todo check

	public static findFile(name: string, candidateFolder = process.cwd()): string | null {
		if (candidateFolder.indexOf(sep) === -1) {
			return null;
		}
		if (existsSync(`${candidateFolder}${sep}${name}.ts`)) { //todo check
			return `${candidateFolder}${sep}${name}`;
		}
		else {
			let folders: string[] = readdirSync(candidateFolder).filter(file => statSync(path.join(candidateFolder, file)).isDirectory());
			const temp = folders.find(folder => !Utils.excludeFolders.includes(folder) && Utils.findFile(name, `${candidateFolder}${sep}${folder}`) !== null);
			return temp !== undefined ? `${candidateFolder}${sep}${temp}${sep}${name}` + '.ts' : null;
		}
	}
}
