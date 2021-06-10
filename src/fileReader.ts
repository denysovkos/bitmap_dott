import * as path from "path"
import { readdir, readFile } from "fs/promises"

import { FileStorage } from "./interfaces"


class FileReader {
    private sourcePath: string = path.resolve(process.cwd(), "samples");

    constructor(sourcePath?: string) {
        if (sourcePath) {
            this.sourcePath = sourcePath;
        }

        console.log("Path for sample files: ", this.sourcePath);
    }

    async readFiles(): Promise<FileStorage> {
        const files: string[] = await readdir(this.sourcePath);
        const result: FileStorage = {};

        for await (const file of files) {
            result[file] = await readFile(path.resolve(this.sourcePath, file), "utf8");
        }

        return result;
    }
}

export default FileReader;