import { SaveDecksUsecase } from '@/domain/cards/application/usecases/save-decks'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload')
export class UploadDecksController {
  constructor(private readonly saveDecksUseCase: SaveDecksUsecase) {}

  @Post('decks')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveDecksUseCase.execute(file.buffer)
  }
}
