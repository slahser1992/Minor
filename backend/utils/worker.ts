import { expose } from 'threads/worker';
import { readFile } from 'fs';
import { join } from 'path';

expose({
  readFileWorker(postRef: string) {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, `../posts/${postRef}`), 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
})
