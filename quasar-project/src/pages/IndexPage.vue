<template>
  <q-page class="flex flex-center">


    <div class="q-pa-md row items-start q-gutter-md">
      <div class="text-h2" style=" margin-left: auto; margin-right: auto;">
        <p>My Blogs</p>

      </div>
      <div class="q-pa-md   items-start q-gutter-md" style="display: flex; min-width: 100%;">


        <div class="q-gutter-y-m q-ml-xl  column" style="min-width: 40%;">
          <q-input color="teal" rounded outlined v-model="search" label="Search Post">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

        </div>
        <div class="q-gutter-y-m q-ml-xl  column" style="min-width: 40%;">
          <q-select outlined v-model="selectedFilter" label="Filter by Author" :options="options" :dense="dense"
            :options-dense="denseOpts">
            <template v-slot:prepend>
              <q-icon name="filter" />
            </template>
          </q-select>
        </div>
      </div>



      <div class="q-pa-md row items-start q-gutter-md">

        <!-- This is blogpost card -->
        <q-card class="my-card" flat bordered v-for="post in filteredItems" :key="post.id">
          <q-img height="150px" :src="`https://source.unsplash.com/random/200x200?sig=${post.id}`" />

          <q-card-section>
            <q-btn fab padding="6px" color="primary" icon="edit" class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);" @click="editPost(post)" />
            <q-btn @click="deleteBlog(post)" fab padding="6px" color="negative" icon="delete" class="absolute"
              style="top: 0; right: 55px; transform: translateY(-50%);" />

            <div class="row no-wrap items-center" @click="postDetail(post)">
              <div class="col text-h6 ellipsis" style="cursor: pointer;">
                {{ post.title }}
              </div>

            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              by {{ post.userId }}
            </div>
            <div class="text-caption text-grey caption">
              {{ post.body }}
            </div>
          </q-card-section>


        </q-card>

      </div>


    </div>
    <div class="q-pa-lg flex flex-center">
      <nav>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </nav>
        </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="dialog()" />
    </q-page-sticky>
  </q-page>

  <!-- This is a blog creation dialoge box -->
  <q-dialog v-model="isOpen" persistent>
    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6">Create Post</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="title" label="Title"   />
        <q-input v-model="body" label="Body"   />
        <q-input v-model="createdBy" label="Created by"   />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Create" color="primary" @click="createPost()" v-close-popup />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import axios from 'axios';


export default {
  setup() {
    const title=ref('');
    const body=ref('');
    const createdBy=ref('')
    const search=ref('');
    const selectedFilter=ref('all')
    const itemsPerPage=ref(8);
    const currentPage=ref(1);
    const apiData=ref([]);
    const totalPages = computed(() => Math.ceil(apiData.value.length / itemsPerPage.value));


    const blogsPerPage=computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;

      return apiData.value.slice(startIndex, endIndex);
    });
    const filteredItems = computed(() => {
      const query = search.value.toLowerCase();
      const filter = selectedFilter.value;
      console.log(query);


      return blogsPerPage.value.filter(item => {
        // Apply filtering logic based on the selected filter
        if (filter === 'all' || item.title === filter) {
          return item.title.toLowerCase().includes(query);

        }
      });
    });


    const getBlog=async () => {
      await axios.get('http://localhost:8000/api/v1/blogs')
      .then(response=>{
        console.error(response.data);
        apiData.value=response.data.blogs
      }).catch(error=>{
          console.error(error)
        })
    };
    onMounted(() => {
      getBlog();
    });
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };


    const isOpen = ref(false);
    const route = useRouter();
     const createPost=async ()=> {
      const blog={
        title:title.value,
        body:body.value,
        userId:createdBy.value
      }
      const params=JSON.stringify(blog);
      axios.post("http://localhost:8000/api/v1/blog/new",blog).then(response=>{
        alert("Blog is created")
      }).catch(error=>{
        console.error(error)
      })

    }
    function dialog() {
      isOpen.value = !isOpen.value
    }
    function postDetail(post) {
      const params = { id: post.id }

      route.push({ name: 'blog', params })
    }
    function editPost(post) {
      const params = { id: post.id }
      route.push({ name: 'edit', params })
    }

    function deleteBlog(post) {

    }

    defineComponent({
      name: 'IndexPage'
    });


    return {
      title,
      body,
      createdBy,
      search,
      blogsPerPage,
      previousPage,
      filteredItems,
      nextPage,
      totalPages,
      currentPage,
      itemsPerPage,
      postDetail,
      route,
      editPost,
      isOpen,
      dialog,
      createPost
    }
  }
}





</script>

<style lang="sass" scoped>


.caption

  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  line-height: 16px
  max-height: 32px
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical

.my-card

  width: 100%
  max-width: 292px
  max-height:350px

</style>
