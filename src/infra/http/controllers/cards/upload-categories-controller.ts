import { SaveCategoriesUsecase } from '@/domain/cards/application/usecases/save-categories'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadCategoriesController {
  constructor(private readonly saveCategoriesUseCase: SaveCategoriesUsecase) {}

  @Post('categories')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveCategoriesUseCase.execute(file.buffer)
  }
}
