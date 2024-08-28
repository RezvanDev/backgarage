import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { PartService } from "./part.service";

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Get('')
  async getAll(@Body() body: any) {
    return this.partService.getAll(body.carId)
  }

  @Get(':id')
  async getById(@Body() body: any) {
    return this.partService.getById(body.id)
  }

  @Post('')
  async createPart(@Body() body: any, @Headers('user-id') userId: string) {
    const parsedUserId = parseInt(userId, 10);
    // Извлекаем URL изображения из объекта, если он есть
    const imageUrl = body.image && body.image.imageUrl ? body.image.imageUrl : null;
    
    return this.partService.createPart(
      body.requestId,
      body.name,
      body.new,
      body.original,
      body.manufacturer,
      body.numberOrName,
      body.price,
      imageUrl,  // Теперь передаем строку URL или null
      parsedUserId,
      body.carId
    )
  }
}