import FFI from 'ffi';
import fs from 'fs';
const text1 = fs.readFileSync('C:/Users/onetwo/Desktop/NLPIR2014/test/中英文混杂示例.txt', 'utf-8');
// function TEXT(text) {
//   return new Buffer(text, 'ucs2').toString('binary');
// }

// const user32 = new FFI.Library('../../NLPIR2014/lib/win64/NLPIR', {
//   MessageBoxW:
//   [
//     'int32', ['int32', 'string', 'string', 'int32']
//   ]
// });

// const okOrCalcel = user32.MessageBoxW(
//    0, TEXT('I am Node.JS!'), TEXT('Hello, World!'), 1
// );
console.log(text1);
