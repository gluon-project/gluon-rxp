import { saveAs } from 'file-saver/FileSaver'

export const save = (fileName: string, contents: string) => {
  var blob = new Blob([contents], {type: 'application/javascript;charset=utf-8'})
  saveAs(blob, fileName)
}
