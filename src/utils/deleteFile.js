const fs = require("fs");

module.exports = (path) => {
  // cek apakah file exist
  if (fs.existsSync(path)) {
    // delete file
    console.log("hello world");
    fs.unlinkSync(path);
  } else {
    console.log("failed delete file");
  }
};
