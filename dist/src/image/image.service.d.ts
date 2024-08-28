/// <reference types="node" />
interface UploadedFile {
    originalname: string;
    buffer: Buffer;
}
export declare class ImageService {
    uploadImage(file?: UploadedFile): Promise<string | null>;
}
export {};
