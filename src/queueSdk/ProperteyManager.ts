export interface ProperteyManager {

	getValue<T>(key: string): T;

	setValue(key: string): boolean;
}
