import FileReader from "./fileReader";
import { FileStorage } from "./interfaces";
import { search } from "./searchController";

const inputToBitmap = (input: string): number[][] => {
  const rows: string[] = input.split(',');
  const bitmap: number[][] = rows.map((row) =>
    row.split('').map((pixel) => parseInt(pixel, 10)),
  );

  return bitmap;
}

(async () => {
  const fileReader = new FileReader();
  const files: FileStorage = await fileReader.readFiles();

  await Promise.all(Object.keys(files).map((file) => {
    if (!files[file].length) {
      console.log(`File ${file} is empty`);
      return;
    }
    const data = files[file].trim().split('\n').filter(Boolean);
    const [size, ...bitmap] = data;
    const [rows, columns] = size.split(' ');

    const result = search(
      parseInt(rows, 10),
      parseInt(columns, 10),
      inputToBitmap(bitmap.join(',')),
    );

    if (!result.length) {
      console.log(`Nothing found for ${file}`);
    } else {
      console.log(`Result for file ${file}`)
      console.table(result);
    }
  }));
})();