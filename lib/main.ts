import * as path from 'path';
import { ReadmeGenerator } from './readme-generator';

const basePath   = path.resolve(__dirname, '..');
const configFile = path.resolve(__dirname, '../config.yaml');

const generator = new ReadmeGenerator(basePath, configFile);

generator.generate();
