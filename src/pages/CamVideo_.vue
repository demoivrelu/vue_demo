<template>
  <div>
    <video ref="videoElement" autoplay>
      <track kind="captions" src="captions.vtt" srclang="en" label="English">
    </video>
    <button @click="startCapture">Start Capture</button>
    <button @click="stopCapture">Stop Capture</button>
  </div>
</template>

<script>
export default {
  methods: {
    async startCapture() {
      try {
        const constraints = {
          video: true,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.videoElement.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    stopCapture() {
      // const videoElement = this.$refs.videoElement;
      const stream = this.$refs.videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        this.$refs.videoElement.srcObject = null;
      }
    },
  },
};
</script>

<style>
/* 样式可以根据需求自定义 */
</style>
