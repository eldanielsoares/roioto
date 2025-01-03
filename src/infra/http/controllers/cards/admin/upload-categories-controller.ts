import { SaveCategoriesUsecase } from '@/domain/cards/application/usecases/save-categories'
import { AdminGuard } from '@/infra/auth/admin.guard'
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('upload/categories')
export class UploadCategoriesController {
  constructor(private readonly saveCategoriesUseCase: SaveCategoriesUsecase) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveCategoriesUseCase.execute(file.buffer)
  }
}
