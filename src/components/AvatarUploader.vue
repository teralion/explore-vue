<template>
  <div ref="dropzone">
    <p>
      <img :src="picture">
    </p>
    <div class="row">
      <div class="col-md-2">
        <input 
          type="file"
          ref="image"
          name="avatarInput"
          @change="upload"
          class="hidden"
        >
        <button 
          type="button"
          name="customAvatarInput"
          @click="selectNewImage"
          class="btn btn-primary btn-block"
        >
          Загрузить новую
        </button>
      </div>
      <div class="col-md-10">
        <input 
          type="text" 
          name="fileName"
          class="form-control"
          v-model="picture"
          readonly
        >
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import Dropzone from 'dropzone'

export default {
  name: 'AvatarUploader',
  model: {
    prop: 'picture'
  },
  props: {
    picture: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.initDropzone();
  },
  methods: {
    upload() {
      const url = 'https://api.imgur.com/3/image';

      const data = new FormData();
      data.append('image', this.$refs.image.files[0]);

      const config = {
        headers: {
          Authorization: 'Client-ID 2d3e88f3be0d9f7'
        }
      };

      axios
        .post(url, data, config)
        .then(response => response.data)
        .then((response) => {
          this.setNewAvatar(response.data.link);
          this.$refs.image.value = '';
        })
    },

    selectNewImage() {
      this.$refs.image.click();
    },

    setNewAvatar(picture) {
      this.$emit('input', picture);
    },

    initDropzone() {
      new Dropzone(this.$refs.dropzone, {
        url: 'https://api.imgur.com/3/image',
        paramName: 'image',
        accetpedFiles: 'image/*',
        method: 'post',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          Authorization: 'Client-ID 2d3e88f3be0d9f7',
        },
        createImageThumbnails: false,
        previewImage: `<div style="display: none"></div>`,
        success: (file, response) => {
          this.setNewAvatar(response.data.link);
          this.$refs.image.value = '';
        },
      })
    }
  }
};

</script>

<styles lang="stylus">
.hidden {
  display: none;
}
</styles>