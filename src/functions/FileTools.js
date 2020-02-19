var FileTools = {};

/*
       * @param: fileName      文件名称
       * @param: no match       false
       * @param: match image    image
       * @param: match txt      txt
       * @param: match excel    excel
       * @param: match word     word
       * @param: match pdf      pdf
       * @param: match ppt      ppt
       * @param: match video    video
       * @param: match radio    radio
       * @param: match archive  archive
       * @param:  其他匹配项 - other
       */
FileTools.matchType = function (filename) {
    // 后缀名称
    let suffix = '';
    // 获取类型结果
    let result = '';
    try {
        let fileArr = filename.split('.');
        suffix = fileArr[fileArr.length - 1];
    } catch (err) {
        suffix = '';
    }
    // fileName无后缀返回 false
    if (!suffix) {
        result = false;
        return {'result':result,'suffix':suffix};
    }
    // 图片格式
    let img = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'];
    // 进行图片匹配
    result = img.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'image';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 code
    let code = ['txt', 'html', 'css', 'js', 'go', 'py', 'c', 'php', 'java', 'yaml', 'yml', 'json','md'];
    result = code.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'code';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 PDF
    let pdf = ['pdf'];
    result = pdf.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'pdf';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 word
    let word = ['doc', 'docx'];
    result = word.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'word';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 PPT
    let ppt = ['ppt', 'pptx'];
    result = ppt.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'ppt';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 excel
    let excel = ['xls', 'xlsx'];
    result = excel.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'excel';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 视频
    let video = ['mp4', 'm2v', 'mkv'];
    result = video.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'video';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 音频
    let radio = ['mp3', 'wav', 'wmv'];
    result = radio.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'radio';
        return {'result':result,'suffix':suffix};
    }
    // 匹配 音频
    let archive = ['zip', 'rar', 'gz', 'tar', '7z', 'xz', 'bz2'];
    result = archive.some(function (item) {
        return item === suffix;
    });
    if (result) {
        result = 'archive';
        return result;
    }
    // 其他 文件类型
    result = 'other';
    return {'result':result,'suffix':suffix};
};

export default FileTools