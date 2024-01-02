const FileConfigService = require("../services/fileConfig.service");
const fs = require('fs');
const path = require('path');
const util = require('util');
const { readdir, stat } = require('fs').promises;
const readFile = util.promisify(fs.readFile);
const maxSize = 20971520;
const FileImageModel = require('../models/fileImage.model')
class FileConfigController {
    static async createFileConfig(req, res, next) {
        try {
            const fileConfig = `http://localhost:8000/file-config/${req.file.filename}`;
            const payload = {
                ...req.body,
                fileConfig,
            }
            const newFileConfig = await FileConfigService.createFileConfig(payload);
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: newFileConfig
            })
        } catch (err) {
            console.log(err)
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
    static async createFileContent(req, res, next) {
        try {
            const pathToDriveD = 'D:/IMAGE'
            const uploadedFileName = req.uploadedFileName;
            console.log(uploadedFileName)
            const url = `http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${uploadedFileName}`
            const data = new FileImageModel({ fileImage: url });
            await data.save();
            const imageUrl = path.join(pathToDriveD, uploadedFileName).replace(/\\/g, '/');

            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                imageUrl: imageUrl,
            });
        } catch (err) {
            console.log(err);
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async Recycle(req, res, next) {
        try {
            const imageDirectory = 'D:/Recycle';
            const size = getDirectorySize(imageDirectory)
            if (size > maxSize) {
                return res.status(201).json({
                    code: 201,
                    message: 'Thùng rác đầy',
                });
            }
            const imageName = req.params.filename;
            console.log(imageName)
            const sourcePath = path.join('D:', 'IMAGE', imageName);
            const destinationPath = path.join('D:', 'Recycle', imageName);
            if (fs.existsSync(sourcePath)) {
                fs.renameSync(sourcePath, destinationPath);
                return res.status(200).json({
                    code: 200,
                    message: 'Image moved to Recycle successfully',
                    imageUrl: `http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${imageName}`,
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    message: 'Image not found in the source directory',
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }
    static async Restore(req, res, next) {
        try {
            const imageName = req.params.filename;
            console.log(imageName)
            const destinationPath = path.join('D:', 'IMAGE', imageName);
            const sourcePath = path.join('D:', 'Recycle', imageName);
            if (fs.existsSync(sourcePath)) {
                fs.renameSync(sourcePath, destinationPath);
                return res.status(200).json({
                    code: 200,
                    message: 'Image moved to Recycle successfully',
                    imageUrl: `http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${imageName}`,
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    message: 'Image not found in the source directory',
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }
    static async MultiRecycle(req, res, next) {
        try {
            const imageDirectory = 'D:/Recycle';
            const size = getDirectorySize(imageDirectory)
            if (size > maxSize) {
                return res.status(201).json({
                    code: 201,
                    message: 'Thùng rác đầy',
                });
            }
            const imageNames = req.body.fileNames;
            console.log(imageNames)
            const movedImages = [];
            for (const imageName of imageNames) {
                const sourcePath = path.join('D:', 'IMAGE', imageName);
                const destinationPath = path.join('D:', 'Recycle', imageName);
                if (fs.existsSync(sourcePath)) {
                    fs.renameSync(sourcePath, destinationPath);
                    movedImages.push(imageName);
                } else {
                    console.warn(`Image not found: ${imageName}`);
                }
            }
            return res.status(200).json({
                code: 200,
                message: 'Images moved to Recycle successfully',
                movedImages: movedImages,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }
    static async MultiRestore(req, res, next) {
        try {
            const imageNames = req.body.fileNames;
            console.log(imageNames)
            const movedImages = [];
            for (const imageName of imageNames) {
                const destinationPath = path.join('D:', 'IMAGE', imageName);
                const sourcePath = path.join('D:', 'Recycle', imageName);
                if (fs.existsSync(sourcePath)) {
                    fs.renameSync(sourcePath, destinationPath);
                    movedImages.push(imageName);
                } else {
                    console.warn(`Image not found: ${imageName}`);
                }
            }
            return res.status(200).json({
                code: 200,
                message: 'Images moved to Recycle successfully',
                movedImages: movedImages,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }

    static async getAllImages(req, res, next) {
        const arr = [];
        const imageDirectory = 'D:/IMAGE';
        try {
            const files = await readdir(imageDirectory);
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(imageDirectory, file);
                arr.push({
                    fileName: file,
                });
            }));
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: arr
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error reading image directory');
        }
    }
    static async getAllRecycleByDate(req, res, next) {
        const imageDirectory = 'D:/Recycle';
        const groupedImages = [];
        const size = getDirectorySize(imageDirectory)

        try {

            const files = await readdir(imageDirectory);
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(imageDirectory, file);
                const fileStat = await stat(filePath);
                const datePart = file.split('_')[0];
                let group = groupedImages.find((item) => item.date === datePart);
                if (!group) {
                    group = { date: datePart, images: [], totalSize: 0 };
                    groupedImages.push(group);
                }
                group.images.push({
                    fileName: file,
                    fileSize: fileStat.size,
                });
                group.totalSize += fileStat.size;
            }));
            groupedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.status(200).json({
                code: 200,
                message: 'Get images grouped by date successfully',
                data: groupedImages,
                size: size
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error reading image directory');
        }
    }
    static async getAllRecycleBySize(req, res, next) {
        const arr = [];
        const imageDirectory = 'D:/Recycle';
        const size = getDirectorySize(imageDirectory)

        try {

            const files = await readdir(imageDirectory);
            const filePromises = files.map(async (file) => {
                const filePath = path.join(imageDirectory, file);
                const fileStat = await stat(filePath);
                arr.push({
                    fileName: file,
                    fileSize: fileStat.size,
                });
            });
            await Promise.all(filePromises);
            arr.sort((a, b) => a.fileSize - b.fileSize);
            return res.status(201).json({
                code: 200,
                message: 'Get images successfully',
                data: arr,
                size: size
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error reading image directory');
        }
    }

    static async getImagesGroupedByDate(req, res, next) {
        const imageDirectory = 'D:/IMAGE';
        const groupedImages = [];
        try {
            const files = await readdir(imageDirectory);
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(imageDirectory, file);
                const fileStat = await stat(filePath);
                const datePart = file.split('_')[0];
                let group = groupedImages.find((item) => item.date === datePart);
                if (!group) {
                    group = { date: datePart, images: [] };
                    groupedImages.push(group);
                }
                group.images.push({
                    fileName: file,
                    fileSize: fileStat.size,
                });
            }));
            groupedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.status(200).json({
                code: 200,
                message: 'Get images grouped by date successfully',
                data: groupedImages,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error reading image directory');
        }
    }
    static async getAllImagesBySize(req, res, next) {
        const arr = [];
        const imageDirectory = 'D:/IMAGE';
        try {
            const files = await readdir(imageDirectory);
            const filePromises = files.map(async (file) => {
                const filePath = path.join(imageDirectory, file);
                const fileStat = await stat(filePath);
                arr.push({
                    fileName: file,
                    fileSize: fileStat.size,
                });
            });
            await Promise.all(filePromises);
            arr.sort((a, b) => a.fileSize - b.fileSize);
            return res.status(201).json({
                code: 200,
                message: 'Get images successfully',
                data: arr,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error reading image directory');
        }
    }
    static async getFileImage(req, res, next) {
        const filename = req.query.filename
        const imageDirectory = `D:/IMAGE/${filename}`;
        fs.readFile(imageDirectory, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading image file');
            }
            res.setHeader('Content-Type', 'image/png');
            res.send(data);
        });
    }
    static async getFileRecycle(req, res, next) {
        const filename = req.query.filename
        const imageDirectory = `D:/Recycle/${filename}`;
        fs.readFile(imageDirectory, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading image file');
            }
            res.setHeader('Content-Type', 'image/png');
            res.send(data);
        });
    }
    static async deleteImage(req, res, next) {
        try {
            const pathToDriveD = 'D:/Recycle';
            const uploadedFileName = req.params.fileName;
            const filePath = path.join(pathToDriveD, uploadedFileName);
            if (fs.existsSync(filePath)) {
                await deleteFile(filePath);
                return res.status(200).json({
                    code: 200,
                    message: 'File deleted successfully',
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    message: 'File not found',
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }

    static async getAllFileConfigs(req, res, next) {
        try {
            const fileConfigs = await FileConfigService.getAllFileConfigs(req.query)
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: fileConfigs
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async deleteFileConfig(req, res, next) {
        try {
            const fileConfigs = await FileConfigService.deleteFileConfig({
                file_id: req.params.file_id,
            })
            return res.status(200).json({
                code: 200,
                message: 'Delete file config successfully',
                data: fileConfigs
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
    static async deleteMultiImage(req, res, next) {
        try {
            const pathToDriveD = 'D:/Recycle';
            const fileNames = req.body.fileNames;
            console.log(fileNames)
            if (!fileNames || !Array.isArray(fileNames)) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid fileNames parameter',
                });
            }
            const deletedFiles = [];
            for (const fileName of fileNames) {
                const filePath = path.join(pathToDriveD, fileName);
                if (fs.existsSync(filePath)) {
                    await deleteFile(filePath);
                    deletedFiles.push(fileName);
                }
            }
            return res.status(200).json({
                code: 200,
                message: 'Files deleted successfully',
                deletedFiles: deletedFiles,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
            });
        }
    }
}
const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

function getDirectorySize(directoryPath) {
    let totalSize = 0;
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            totalSize += stats.size;
        } else if (stats.isDirectory()) {
            totalSize += getDirectorySize(filePath);
        }
    });
    return totalSize;
}
module.exports = FileConfigController;