
<template>
    <div v-if="currentUser" class="container-sm">
        <div class="col-sm-12">
            <h1 class="text-center">Bienvenue, {{ currentUser }} !</h1>
            <!-- <router-link to="/profile" class="nav-link px-2 text-secondary">Profile</router-link> -->
        </div>
        <PostForm></PostForm>

        <div v-if="posts.length === 0">Aucun Post. Commencer chatter !</div>
        <div v-for="post in posts">
            <div class="container posts-content ">
                <div class="col">
                    <div class="row col-lg-6 m-auto" v-if="editedPostId == post.id">
                        <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title m-8">Modification de la publication</h2>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1">Contenu de la publication</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="contentUpdate"></textarea>
                                    </div>
                                    <div class="updatebtn">
                                    <div class="form-group mt-4">
                                        <label for="file-input-update" class="btn btn-secondary mt-1">Ajouter une image</label>
                                        <span v-if="selectedImageUpdate">{{ selectedImageUpdate.name }}</span>
                                        <input id="file-input-update" type="file" @change="handleUpdateFile" />
                                    </div>
                                    <div class="form-group d-flex justify-content-center">
                                        <button class="btn bg-primaire" @click="updatePost()">Enregistrer</button>
                                    </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-6 m-auto" v-else>
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="media mb-3">
                                   <div class="d-flex justify-content-between">
                                       <div>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                        class="d-block ui-w-40 rounded-circle" alt="">
                                       </div>
                                       <div>
                                           <button class="btn btn-sm m-2" @click="edit(post)" v-if="post.user.id== currentUserId || currentUserRole==1"><i class="fa fa-pen-to-square"> </i></button>
                                           <button class="btn btn-sm " @click="deletePost(post.id)" v-if="post.user.id== currentUserId || currentUserRole==1"><i class="fa fa-trash"> </i></button>
                                       </div>
                                   </div>
                                    <div class="media-body ml-3">
                                        {{post.user.username}}
                                        <div class="small">{{timer(post.createdAt)}}</div>
                                    </div>
                                </div>

                                <p>
                                    {{post.contenu}}
                                </p>
                                <span v-if="post.imageUrl">
                                    <img :src="post.imageUrl" class="ui-rect ui-bg-cover" alt="">
                                    
                                </span>
                            </div>
                            <div class="card-footer ">
                                <div class="d-flex justify-content-around m-4">
                                    <button @click="liker(post.id)" class="btn btn-sm bg-secondaire d-inline-block" v-if="!verifyIfUserHasLiked(post.likes)">
                                       Liker ? ( <strong>{{post.likes.length}}</strong> <i class="fa fa-heart"></i> )
                                    </button>
                                    <button @click="disliker(post.id)" class="btn btn-sm bg-primaire text-white d-inline-block" v-else>
                                       Disliker ? ( <strong>{{post.likes.length}}</strong> <i class="fa fa-heart"></i> )
                                    </button>
                                    <button @click="showComments(post.id)" class="d-inline-block text-muted ml-3" v-if="!commentToShowPost">
                                      Afficher   <strong>{{post.commentaires.length}}</strong> <i class="fa fa-comments"></i>
                                    </button>
                                    <button @click="hideComments()" class="d-inline-block text-muted ml-3" v-else>
                                      Cacher  <strong>{{post.commentaires.length}}</strong> <i class="fa fa-comments"></i>
                                    </button>

                                </div>
                            
                                <div class="p-2" v-for="comment in post.commentaires" v-if="commentToShowPost == post.id">
                                    <div class="d-flex gap-1">
                                        <Avatar />
                                        <div class="d-flex flex-column comment_text p-1">
                                        <p>{{ comment.user.username }}</p>
                                        <p>{{ comment.texte }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex gap-1">
                                    <Avatar></Avatar>
                                    <input type="text" class="form-control" placeholder="" aria-label="Username"
                                        v-model="currentComment" />
                                    <button type="button" class="btn btn-primary ms-auto" @click="addComment(post.id)">
                                        Poster
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </div>
                   
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import PostForm from "./PostForm.vue"
    import { getUrlAndHeaders, getUserInfos } from "./../../services/fetchOptions"
    import axios from "axios"
    import moment from "moment"


    export default {
        name: "WallPage",
        components: {
            PostForm
        },
        methods: {
            timer(dateTime) {
                moment.locale("fr")
                return moment(dateTime).fromNow();
            },

            redirectToLoginIfNoToken() {
                const token = localStorage.getItem("token")
                console.log("token:", token)
                if (token == null) {
                    this.$router.push("/login")
                }
            },
            getPosts(){
                const { url, headers } = getUrlAndHeaders()
                const options = {
                    headers: { ...headers }
                }
                const user = getUserInfos()
                this.currentUser = user.username
                this.currentUserId =user.id
                this.currentUserRole= user.is_admin
                axios.get(url + "posts/", options)
                .then((res) => {
                    this.posts = res.data
                })
                .catch((err) => console.log("err:", err))
            },
            addComment(postId) {
                const { url, headers } = getUrlAndHeaders();
                
                const user = getUserInfos();
                const formData = new FormData();
                console.log(user)
                formData.append("texte", this.currentComment);
                formData.append("userId", user.id);
                formData.append("postId", postId);
                
                const options = {
                    Authorization: headers.Authorization,
                    "Content-Type": "multipart/form-data",
                };
                console.log("options:", options);
                axios.post(url+ "posts/commentaire",formData,options)
                    .then(() => {
                        this.getPosts();
                        this.currentComment = null
                    })
                    .catch((error) => (this.msgError = error));

                
                },
            liker(postId){

                const { url, headers } = getUrlAndHeaders();

                const user = getUserInfos();
                const data = {
                    userId: user.id,
                    postId: postId
                }
                console.log(data)
                axios.post(url+"posts/liker", data, {headers: headers})
                .then(() => {
                    this.getPosts()
                })
            },
            disliker(postId){
                const { url, headers } = getUrlAndHeaders();
                const user = getUserInfos();
                const data = {
                    userId: user.id,
                    postId: postId
                }
                console.log(data)
                axios.delete(url+"posts/disliker",{ data: data, headers: headers})
                .then(() => {
                    this.getPosts()
                })
            },
            verifyIfUserHasLiked(likes){
                if(!likes){
                    return false
                }
                const user = getUserInfos();
                let result = likes.find(el => el.user.id == user.id )
                if(result){
                    return true
                }
                return false
            },
            showComments(idPost){
                this.commentToShowPost = idPost;
            },
            hideComments(){
                this.commentToShowPost = null;
            },
            edit(post){
                console.log(post)
                this.editedPostId = post.id;
                this.contentUpdate = post.contenu;
            },
            handleUpdateFile(e) {
                console.log("chargement ficher")
                this.selectedImageUpdate = e.target.files[0];
            },
            updatePost(){
                const { url, headers } = getUrlAndHeaders();
      
                const user = getUserInfos();
                const formData = new FormData();

                formData.append("content", this.contentUpdate);
                formData.append("userId", user.id);
                formData.append("image", this.selectedImageUpdate);
                
                const options = {
                    Authorization: headers.Authorization,
                    "Content-Type": "multipart/form-data",
                };
                axios.put(url+ "posts/"+this.editedPostId,formData,options)
                .then((res) => {
                    this.getPosts();
                    this.editedPostId = null
                    alert(res.data.message);
                })
                .catch((error) => (this.msgError = error));
            },
            deletePost(postId){
                let confirmation = confirm("Etes vous sur de vouloir supprimer ?");
                if (confirmation == true){
                    const { url, headers } = getUrlAndHeaders();
                    const user = getUserInfos();
                    const data = {
                        postId: postId
                    }
                    console.log(data)
                    axios.delete(url+"posts",{ data: data, headers: headers})
                    .then((res) => {
                        this.getPosts()
                        alert(res.data.message);
                    })
                }
            }

        },
        mounted() {
            this.redirectToLoginIfNoToken()
            this.getPosts()
            
        },
        data() {
            return {
                posts: [],
                currentUser: null,
                currentUserId: null,
                currentUserRole: null,
                currentComment: null,
                commentToShowPost: null, 
                contentUpdate: null,
                selectedImageUpdate: null,
                editedPostId: null,
            }
        }
    }
</script>

<style scoped>
    input{
        font-weight: bolder;
    }
    textarea{
        font-weight: bolder;
    }
    button{
        font-weight: bolder;
    }
    .btn-sm:hover{
        transform: scale(1.05);
        transition: 0.2s;
    }
    .updatebtn{
        display: flex;
        align-items: flex-end;
    }
    h1 {
        font-weight: bold;
        color: #4E5166;
        margin-block: 0.5em;
    }

    .posts-content {
        margin-top: 20px;
    }

    .ui-w-40 {
        width: 40px !important;
        height: auto;
    }

    .default-style .ui-bordered {
        border: 1px solid rgba(24, 28, 33, 0.06);
    }

    .ui-bg-cover {
        background-color: transparent;
        background-position: center center;
        background-size: cover;
    }

    
    .ui-rect,
    .ui-rect-30,
    .ui-rect-60,
    .ui-rect-67,
    .ui-rect-75 {
        position: relative !important;
        display: block !important;
        width: 100% !important;
    }

    .d-flex,
    .d-inline-flex,
    .media,
    .media>:not(.media-body),
    .jumbotron,
    .card {
        -ms-flex-negative: 1;
        flex-shrink: 1;
    }

    .bg-dark {
        background-color: rgba(24, 28, 33, 0.9) !important;
    }

    .card-footer,
    .card hr {
        border-color: rgba(24, 28, 33, 0.06);
    }

    .ui-rect-content {
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
    }

    .default-style .ui-bordered {
        border: 1px solid rgba(24, 28, 33, 0.06);
    }
    .comment_text {
  background-color: var(--bs-gray-200);
  border-radius: 5px;
  width: 100%;
  margin-block: 0.2rem;
}
.card-body > .d-flex {
  margin-bottom: 1rem;
}
.d-flex p {
  margin-bottom: 0;
}
.gap-1{
  align-items: center;
}
.d-flex p:nth-child(1) {
  font-weight: 500;
}
#file-input-update {
  display: none;
}
.btn-primary{
    background-color: #4E5166;
    border: none;
    opacity: 0.8;
}
.btn-primary:hover{
    color: white;
    background-color: #4E5166;
    opacity: 1;
}
.btn-secondary{
    margin-right: 1rem;
}
.btn-secondary:hover{
    color: #FD2D01;
    opacity: 0.8;
}
.fa-pen-to-square{
    color: #4E5166;
}
.fa-trash{
    color: #4E5166;
}
.btn-sm:hover{
    background-color: #FFD7D7;
}
.text-muted{
    border: none;
    border-radius: 3px;
    background-color: #FFD7D7 ;
}
.text-muted:hover{
    transform: scale(1.05);
    transition: 0.2s;
}
</style>