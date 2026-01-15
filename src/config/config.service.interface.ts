import type { DotenvError, DotenvParseOutput } from 'dotenv';

export interface IConfigService {
	// get: <T extends string | number>(key: string) => T;
	get: (key: string) => DotenvError | DotenvParseOutput | undefined;
}
