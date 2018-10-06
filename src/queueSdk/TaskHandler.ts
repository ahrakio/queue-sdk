import {sep} from "path";
import {Consts} from "./Consts";
import {rmdirSync, unlinkSync} from "fs";

const archiver = require('archiver');
const rmdir = require('rimraf');
const fs = require('fs');

export class TaskHandler {

	public static createZip(path: string, workDirPath: String): Promise<boolean> {

		return new Promise(function (resolve, reject) {
			let output = fs.createWriteStream(path);
			let archive = archiver('zip', {
				zlib: {level: 9}
			});
			output.on('close', function () {
				console.log('archiver has been finalized and the output file descriptor has closed.');
				resolve(true);
			});
			archive.on('error', function (err) {
				console.log(err);
				reject(false);
			});

			archive.pipe(output);
			archive.directory(workDirPath, false);
			archive.finalize();
		});
	}

	public static cleanFiles() {
		rmdir.sync(Consts.taskWorkingDir);
		unlinkSync(Consts.taskZipPath);
	}
}
