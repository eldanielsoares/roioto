import { SaveCardsUsecase } from '@/domain/cards/application/usecases/save-cards'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadCardsController {
  constructor(private readonly saveCardsUseCase: SaveCardsUsecase) {}

  @Post('cards')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveCardsUseCase.execute(file.buffer)
  }
}
