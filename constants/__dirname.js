import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// export const __dirname = dirname(fileURLToPath(import.meta.url));
export const __dirname = dirname(process.argv[1]);

export default __dirname;
