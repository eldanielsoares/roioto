import { SaveCardsUsecase } from '@/domain/cards/application/usecases/save-cards'
import { Public } from '@/infra/auth/public'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as XLSX from 'xlsx'

@Controller('upload')
export class UploadController {
  constructor(private readonly saveCardsUseCase: SaveCardsUsecase) {}
  @Public()
  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveCardsUseCase.execute(file.buffer)
  }
}
