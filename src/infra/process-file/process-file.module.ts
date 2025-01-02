import { Module } from '@nestjs/common'
import { XlsxProcessFile } from './xlsx'
import { ProcessFile } from '@/domain/cards/application/process-file/process-file'

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: ProcessFile, useClass: XlsxProcessFile }],
  exports: [ProcessFile],
})
export class ProcessFileModule {}
