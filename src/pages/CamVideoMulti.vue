<template>
  <div>
    <label for="dev">
      <select id="dev" name="dev" v-model="selectedDevice">
        <option v-for="device in devices" :key="device.deviceId" :value="device.deviceId">
          {{ device.label }}</option>
      </select>
    </label>
    <button @click="startCapture">Start Capture</button>
    <button @click="stopCapture">Stop Capture</button>
    <button @click="takePhoto">Take Photo</button>
    <video ref="videoElement" autoplay>
      <track kind="captions" src="captions.vtt" srclang="en" label="English">
    </video>
    <canvas ref="canvas" style="display: none;"></canvas>
    <img :src="photo" alt="Captured Photo">
  </div>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
      selectedDevice: null,
      videoStream: null,
      photo: null,
    };
  },
  async created() {
    await this.getVideoDevices();
  },
  methods: {
    async getVideoDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.devices = devices.filter((device) => device.kind === 'videoinput');
        if (this.devices.length > 0) {
          this.selectedDevice = this.devices[0].deviceId;
        }
      } catch (error) {
        console.error('Error getting video devices:', error);
      }
    },
    async startCapture() {
      try {
        const constraints = {
          video: {
            deviceId: { exact: this.selectedDevice },
          },
        };
        console.log(this.selectedDevice);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.videoStream = stream;
        this.$refs.videoElement.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    stopCapture() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        this.$refs.videoElement.srcObject = null;
        this.videoStream = null;
      }
    },
    takePhoto() {
      const { video, canvas } = this.$refs;
      console.log(video, this.$refs.videoElement.videoWidth);
      canvas.width = this.$refs.videoElement.videoWidth;
      canvas.height = this.$refs.videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.videoElement, 0, 0, canvas.width, canvas.height);
      this.photo = canvas.toDataURL('image/png');
    },
  },
};
</script>

<style>
</style>
