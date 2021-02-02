/* eslint-disable class-methods-use-this */
const recordVideo = Symbol('recordVideo');
const stream = Symbol('stream');
const recorder = Symbol('recorder');
const recordVideoSrc = Symbol('stream');

class WebmVideo {
    constructor(recordVideoDom) {
        // private
        this[recordVideo] = recordVideoDom;
        this[stream] = null;
        this[recorder] = null;
        this[recordVideoSrc] = null;
        // public
        this.videoFile = null;
    }

    static caniuse() {
        return (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && MediaRecorder && MediaRecorder.isTypeSupported('video/webm'));
    }

    init() {
        const height = this[recordVideo].clientHeight * window.devicePixelRatio;
        return navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                facingMode: 'user',
                height
            }
        }).then((mediaStream) => {
            this[recordVideo].autoplay = true;
            this[recordVideo].muted = true;
            this[recordVideo].srcObject = mediaStream;
            this[stream] = mediaStream;
            this[recorder] = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });
        }).catch(err => Promise.reject(err));
    }

    start() {
        if (this[recorder].state === 'inactive') {
            this[recorder].start();
        }
    }

    stop() {
        return new Promise((resolve) => {
            this[recorder].ondataavailable = (res) => {
                console.log(res);
                this.videoFile = new Blob([res.data], { type: 'video/webm' });
                this[recordVideoSrc] = URL.createObjectURL(this.videoFile);
                this[recordVideo].srcObject = null;
                this[recordVideo].autoplay = false;
                this[recordVideo].muted = false;
                this[recordVideo].src = this[recordVideoSrc];
                this[recordVideo].controls = true;

                return resolve(this.videoFile);
            };
            this[recorder].stop();
        });
    }

    rerecord() {
        URL.revokeObjectURL(this[recordVideoSrc]);
        this[recordVideo].autoplay = true;
        this[recordVideo].muted = true;
        this[recordVideo].src = null;
        this[recordVideo].controls = false;
        this[recordVideo].srcObject = this[stream];
    }

    destory() {
        URL.revokeObjectURL(this[recordVideoSrc]);
        this[stream].getTracks().forEach((track) => {
            track.stop();
            this[stream].removeTrack(track);
        });
    }
}

export default WebmVideo;
