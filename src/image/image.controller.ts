import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: any): Promise<any> {
    if (!image) {
      return { message: 'Изображение не было загружено', imageUrl: null };
    }
    try {
      const result = await this.imageService.uploadImage(image);
      return result;
    } catch (error) {
      return { message: 'Ошибка при загрузке файла', error: error.message };
    }
  }
}