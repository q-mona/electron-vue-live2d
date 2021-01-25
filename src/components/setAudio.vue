<template>
  <input type="file" accept="audio/*" @change="upload($event)" />
</template>

<script>
export default {
  setup() {
    const upload = (e) => {
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // console.log(reader.result)
        let arr = reader.result.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        const blobObj = new Blob([u8arr], { type: mime })
        let audio = new Audio()
        audio.src = URL.createObjectURL(blobObj)
        audio.play()
      }
    }
    return {
      upload
    }
  },
}
</script>

<style>
</style>