/* eslint-disable class-methods-use-this */
import Vue from 'vue';

class WebmVideo {
    constructor(recordVideo) {
        this.recordVideo = recordVideo;
        this.stream = null;
        this.recorder = null;
        this.recordVideoSrc = null;
    }

    static caniuse() {
        return (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && MediaRecorder && MediaRecorder.isTypeSupported('video/webm'));
    }

    init() {
        const height = this.recordVideo.clientHeight * window.devicePixelRatio;
        Vue.prototype.$loading.show(true);
        return navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                facingMode: 'user',
                height
            }
        }).then((stream) => {
            Vue.prototype.$loading.show(false);
            this.recordVideo.autoplay = true;
            this.recordVideo.muted = true;
            this.recordVideo.srcObject = stream;
            this.stream = stream;
            this.recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        }).catch((err) => {
            Vue.prototype.$toast.info(err);
            return Promise.reject(err);
        });
    }

    start() {
        if (this.recorder.state === 'inactive') {
            this.recorder.start();
        }
    }

    stop() {
        return new Promise((resolve) => {
            this.recorder.ondataavailable = (res) => {
                console.log(res);
                const videoFile = new Blob([res.data], { type: 'video/webm' });
                this.recordVideoSrc = URL.createObjectURL(videoFile);
                this.recordVideo.srcObject = null;
                this.recordVideo.autoplay = false;
                this.recordVideo.muted = false;
                this.recordVideo.src = this.recordVideoSrc;
                this.recordVideo.controls = true;

                return resolve(videoFile);
            };
            this.recorder.stop();
        });
    }

    rerecord() {
        URL.revokeObjectURL(this.recordVideoSrc);
        console.log(this.recordVideoSrc);
        this.recordVideo.autoplay = true;
        this.recordVideo.muted = true;
        this.recordVideo.src = null;
        this.recordVideo.controls = false;
        this.recordVideo.srcObject = this.stream;
    }

    destory() {
        URL.revokeObjectURL(this.recordVideoSrc);
    }
}

export default WebmVideo;
