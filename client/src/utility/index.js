import { saveAs } from 'file-saver';

const downloadFile = (code, lang, filename) => {
    console.log(code);
    let ext = '';
    switch (lang) {
        case 'Py':
            ext = 'py'
            break
        case 'C++':
            ext = 'cpp'
            break
        case 'C#':
            ext = 'cs'
            break
        case 'C':
            ext = 'c'
            break
        default:
            ext = 'txt'
    }
    let blob = new Blob([code], { type: "text/plain;charset=utf-8" })
    saveAs(blob, `${filename}.${ext}`);
}
export default downloadFile;