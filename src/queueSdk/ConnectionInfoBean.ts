export class ConnectionInfoBean {


	private _remoteAddress: string;
	private _remoteHttpPath: string;
	private _remotePort: number;
	private _connectionType: 'http' | 'https' | 'db';

	set remoteAddress(value: string) {
		this._remoteAddress = value;
	}

	set remotePort(value: number) {
		this._remotePort = value;
	}

	set connectionType(value: "http" | "https" | "db") {
		this._connectionType = value;
	}

	get remoteAddress(): string {
		return this._remoteAddress;
	}

	get remotePort(): number {
		return this._remotePort;
	}

	get remoteHttpPath(): string {
		return this._remoteHttpPath;
	}

	get connectionType(): "http" | "https" | "db" {
		return this._connectionType;
	}

	constructor(remoteAddress: string, remotePort: number, connectionType: "http" | "https" | "db", remoteHttpPath = '') {
		this._remoteAddress = remoteAddress;
		this._remotePort = remotePort;
		this._connectionType = connectionType;
		this._remoteHttpPath = remoteHttpPath;
	}


}
