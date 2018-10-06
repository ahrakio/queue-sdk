import {Compiler} from "./Compiler";
import * as path from "path";
import {sep} from "path";
import {existsSync, mkdirSync, readdirSync, statSync} from "fs";
import webpack from 'webpack';
import {Task} from "../Task";
import {Consts} from "./Consts";
import {Utils} from "./Utils";

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

export class WebpackCompiler implements Compiler {


	compile(task: Task): Promise<Boolean> | null {
		if (!task.fileName) {
			console.error('Did you forget to put @Task annotation above tha task class?');
			return null;
		}
		return this.handle(task.fileName, task.constructor.name);
	}

	private handle(fileName: string, className: string): Promise<Boolean> | null {
		if (Utils.findFile(fileName) === null) {
			console.log(`Did not fount the class file: ${fileName}`);
			return null;
		}

		let fpath = Utils.findFile(fileName);
		let config = this.prepareConfig(fpath, Consts.taskWorkingDir, fileName);
		if (!existsSync(Consts.taskWorkingDir)) {
			mkdirSync(Consts.taskWorkingDir);
		}
		return this.compileTask(config);
	}

	private prepareConfig(entryPath, outputPath, outputFileName) {
		return {
			entry: entryPath,
			module: {
				rules: [
					{
						test: /\.ts$/,
						use: [{loader: 'ts-loader'}],
						exclude: /node_modules/
					}
				]
			},
			resolve: {
				extensions: [".ts", ".js"]
			},
			output: {
				filename: outputFileName+'.js',
				library: 'bundle',
				libraryTarget: 'umd',
				path: outputPath
			},
			target: "node",
			mode: "production", //todo check
			plugins: [new TsConfigPathsPlugin({configFile: "./tsconfig.json"})] //todo check
		};
	}

	private compileTask(config): Promise<Boolean> {
		const compiler = webpack(config);
		return new Promise(function (resolve, reject) {
			compiler.run((a, stats) => {
				const info = stats.toJson();
				if (stats.hasErrors()) {
					console.error(info.errors);
					reject(false);
				}

				if (stats.hasWarnings()) {
					console.warn(info.warnings);
				}
				resolve(true);
			})
		})
	}
}
