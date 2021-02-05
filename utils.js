const path = require('path')

const root = (inputPath) => {
    let currentDir = __dirname
    if (inputPath) {
        currentDir = path.join(currentDir, inputPath)
    }
    return currentDir
}

module.exports = {
    root,
}
