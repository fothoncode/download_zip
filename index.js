import JSZip from "jszip";
import { saveAs } from "file-saver";
import JSZipUtils from './JsZipUtils';

var ZipUtils = {};

ZipUtils.GetBinaryFile = (file) => new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(file, function (err, data) {
        if(err) {
            reject(err); 
        }
        resolve(data)
    });
})

ZipUtils.GenerateZip = async() => {
    var zip = new JSZip();
    for (const f of banyakFiles) {
        const fileName = new URL(f).pathname.split('/').pop();
        const data = await ZipUtils.GetBinaryFile(f)
        zip.file(fileName, data, {binary:true});
    }
    zip.generateAsync({type:"blob"})
        .then(function(content) {
        saveAs(content, `test-${new Date().getTime()}.zip`);
        });
}

module.exports = ZipUtils;