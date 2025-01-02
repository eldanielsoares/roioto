import { ProcessFile } from '@/domain/cards/application/process-file/process-file'
import { Injectable } from '@nestjs/common'
import * as XLSX from 'xlsx'

@Injectable()
export class XlsxProcessFile implements ProcessFile {
  async processFile<T>(file: Buffer): Promise<T[]> {
    const workbook = XLSX.read(file, { type: 'buffer' })

    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const jsonData = XLSX.utils.sheet_to_json(sheet)

    return jsonData as T[]
  }
}
