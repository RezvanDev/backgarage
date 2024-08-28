import { Injectable } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ImageService {
  async uploadImage(file?: Express.Multer.File): Promise<string | null> {
    if (!file) {
      return null;
    }

    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const filename = `${timestamp}-${random}-${file.originalname}`;
    const destination = path.join(process.cwd(), 'uploads', filename);
    
    await fs.promises.writeFile(destination, file.buffer);
    return `/uploads/${filename}`;
  }
}