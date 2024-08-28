/// <reference types="node" />
import { UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';
interface UploadedFile {
    originalname: string;
    buffer: Buffer;
}
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImage(image: UploadedFile | undefined, res: Response): Promise<any>;
}
export {};
