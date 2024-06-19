let currentFacingMode = 'environment';
const videoPreview = document.querySelector('#video-preview');

const startCamera = (facingMode = 'environment') => {
    stopCamera();
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode,
            width: {
                max: 1980,
                ideal: 1024
            },
            height: {
                max: 1080,
                ideal: 768
            }
        }
    }).then((stream) => {
        videoPreview.srcObject = stream;
    })
}

const stopCamera = () => {
    if (videoPreview.srcObject) {
        const stream = videoPreview.srcObject;
        const tracks = stream.getTracks().forEach((track) => track.stop());
    }
}

const btnCamera = document.querySelector('#btn-camera');
const canvas = document.querySelector('#canvas');
const videoPreviewContainer = document.querySelector('#video-preview-container');
const photoPreviewContainer = document.querySelector('#photo-preview-container');
const photoPreview = document.querySelector('#photo-preview');
const dialogCamera = document.querySelector('#dialog-camera');

btnCamera.addEventListener('click', () => {
    canvas.width = videoPreview.videoWidth;
    canvas.height = videoPreview.videoHeight;
    const context = canvas.getContext('2d');

    context.drawImage(videoPreview, 0, 0);

    canvas.toBlob((blob) => {
        photoPreview.src = URL.createObjectURL(blob);
        photoPreviewContainer.classList.replace('hidden', 'flex');
        videoPreviewContainer.classList.toggle('hidden');
    });
});

const btnToggleCamera = document.querySelector('#btn-toggle-camera');
btnToggleCamera.addEventListener('click', () => {
    if (currentFacingMode == 'environment') {
        currentFacingMode = 'user';
    } else {
        currentFacingMode = 'environment'
    }

    startCamera(currentFacingMode);
})

const btnOpenCamera = document.querySelector('#btn-open-camera');
btnOpenCamera.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    startCamera(currentFacingMode);
})

const btnCloseDialog = document.querySelector('#btn-close-dialog');
btnCloseDialog.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    stopCamera();
});

const btnRepeat = document.querySelector('#btn-repeat');
btnRepeat.addEventListener('click', () => {
    photoPreview.src = '';
    photoPreviewContainer.classList.replace('flex', 'hidden');
    videoPreviewContainer.classList.toggle('hidden');
});

const btnOk = document.querySelector('#btn-ok');
btnOk.addEventListener('click', () => {
    dialogCamera.classList.toggle('hidden');
    photoPreviewContainer.classList.replace('flex', 'hidden');
    videoPreviewContainer.classList.toggle('hidden');
    stopCamera();
});