import { SaveCardsUsecase } from '@/domain/cards/application/usecases/save-cards'
import { AdminGuard } from '@/infra/auth/admin.guard'
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload/cards')
export class UploadCardsController {
  constructor(private readonly saveCardsUseCase: SaveCardsUsecase) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.saveCardsUseCase.execute(file.buffer)

    return { message: 'file successfully uploaded.' }
  }
}
