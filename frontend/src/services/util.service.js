export const utilService = {
    makeId,
    uploadImg,
    getRandomColor
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function uploadImg(ev) {
    const CLOUD_NAME = "dcwrnwtiu"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'fy4cqrtq'); // second parameter is the upload preset

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}

function getRandomColor() {
    var Characters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += Characters[Math.floor(Math.random() * 16)];
    }
    return color;
}