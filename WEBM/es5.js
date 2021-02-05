var WebmVideo = function (recordVideoDom, previewDom) {
    // private
    this.recordVideo = recordVideoDom;
    this.previewVideo = previewDom;
    this.stream = null;
    this.recorder = null;
    this.recordVideoSrc = null;
    // public
    this.videoFile = null;
};

WebmVideo.prototype.init = function () {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            facingMode: 'user',
            frameRate: 30
        }
    }).then((mediaStream) => {
        this.recordVideo.autoplay = true;
        this.recordVideo.muted = true;
        this.recordVideo.playsinline = true;
        this.recordVideo.srcObject = mediaStream;
        this.stream = mediaStream;

        let mimeType;
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            mimeType = 'video/webm;codecs=vp9';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
            mimeType = 'video/webm;codecs=vp8';
        }
        if (mimeType) {
            this.recorder = new MediaRecorder(mediaStream, { mimeType });
            return $.Deferred().resolve();
        }
        return $.Deferred().reject('type error');
    }).catch(err => $.Deferred().reject(err));
};

WebmVideo.prototype.start = function () {
    if (this.recorder.state === 'inactive') {
        this.recorder.start();
    }
};

WebmVideo.prototype.stop = function () {
    const deferred = $.Deferred();
    this.recorder.ondataavailable = (res) => {
        this.videoFile = new Blob([res.data], { type: 'video/webm' });
        this.recordVideoSrc = URL.createObjectURL(this.videoFile);
        this.previewVideo.playsinline = true;
        this.previewVideo.controls = true;
        this.previewVideo.src = this.recordVideoSrc;
        return deferred.resolve(this.videoFile);
    };
    this.recorder.stop();
    return deferred.promise();
};

WebmVideo.prototype.rerecord = function () {
    URL.revokeObjectURL(this.recordVideoSrc);
};

WebmVideo.prototype.destory = function () {
    URL.revokeObjectURL(this.recordVideoSrc);
    this.stream.getTracks().forEach((track) => {
        track.stop();
        this.stream.removeTrack(track);
    });
};

Object.defineProperty(WebmVideo, 'caniuse', {
    get() {
        return function () {
            return navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && MediaRecorder && (MediaRecorder.isTypeSupported('video/webm;codecs=vp9') || MediaRecorder.isTypeSupported('video/webm;codecs=vp8'));
        };
    }
});


