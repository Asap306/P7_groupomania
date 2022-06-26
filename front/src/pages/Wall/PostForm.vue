<script>
import { getUrlAndHeaders, getUserInfos } from "./../../services/fetchOptions";
import axios from "axios";
export default {
  name: "PostForm",
  data() {
    return {
      content: "",
      selectedImage: null,
    };
  },
  methods: {
    handleNewFile(e) {
      this.selectedImage = e.target.files[0];
    },
    handleClick() {
      const { url, headers } = getUrlAndHeaders();

      const user = getUserInfos();
      const formData = new FormData();

      formData.append("content", this.content);
      formData.append("userId", user.id);
      formData.append("image", this.selectedImage);

      const options = {
        Authorization: headers.Authorization,
        "Content-Type": "multipart/form-data",
      };
      console.log("options:", options);
      axios
        .post(url + "posts", formData, options)
        .then((res) => {
          this.$router.go();
          alert(res.data.message);
        })
        .catch((error) => (this.msgError = error));

      /*fetch(url + "posts", options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to fetch posts");
          }
        })
        .then((res) => {
          this.$router.go();
        })
        .catch((err) => console.log("err:", err));*/
    },
  },
};
</script>

<template>
  <div class="form-floating mt-3">
    <input class="form-control py-3" v-model="content" />
  </div>

  <div class="d-flex">
    <label for="file-input" class="btn btn-secondary mt-1"
      >Ajouter une image</label
    >
    <span v-if="selectedImage">{{ selectedImage.name }}</span>
    <input id="file-input" type="file" @change="handleNewFile" />
    <button
      @click="handleClick"
      type="button"
      class="btn btn-primary mt-1 ms-auto"
    >
      Poster
    </button>
  </div>

  <hr class="dropdown-divider mt-4" />
</template>

<style scoped>
label{
  font-weight: bolder;
}
button {
  font-weight: bolder;
}
input{
  font-weight: bolder;
}
#file-input {
  display: none;
}
label {
  display: grid;
  place-content: center;
}
div span {
  margin: 1rem;
}
body {
  background-color: #5f5f5f1a !important;
}
.form-floating > div.form-control {
  height: auto;
  min-height: 5rem;
}

.form-floating > div.form-control:empty:not(:focus)::before {
  content: "Leave a comment here";
  color: #a0a0a0;
  display: block;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}

.btn-primary {
  color: black;
  background-color: #ffd7d7;
  border: none;
}
.btn-primary:hover {
  background-color: #fd2d01;
  opacity: 0.8;
}

.btn-secondary {
  color: black;
  background-color: #ffd7d7;
  border: none;
}
.btn-secondary:hover {
  background-color: #fd2d01;
  opacity: 0.8;
}

button:hover {
  background-color: #fd2d01;
}
</style>
