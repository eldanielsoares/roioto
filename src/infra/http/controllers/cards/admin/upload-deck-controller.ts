import { SaveDecksUsecase } from '@/domain/cards/application/usecases/save-decks'
import { AdminGuard } from '@/infra/auth/admin.guard'
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload/decks')
export class UploadDecksController {
  constructor(private readonly saveDecksUseCase: SaveDecksUsecase) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.saveDecksUseCase.execute(file.buffer)
    return { message: 'file successfully uploaded.' }
  }
}
