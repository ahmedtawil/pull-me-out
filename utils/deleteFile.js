const fs = require('fs');

function deleteFile(path) {
  let filePath = './' + path;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`HEJAZY UTIL DELETE FILE : ${err.message}`);
    } else console.log(`${path} is deleted!`);
  });
}

module.exports = deleteFile;