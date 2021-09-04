
<template>
  <div class="main-container">
    <div class="main-content">
      <div class="spinner" v-if="isSpinnerActive">
        <hollow-dots-spinner
          :animation-duration="1000"
          :dot-size="15"
          :dots-num="3"
          color="#fff"
        />
      </div>
      <div class="article-container">
        <div
          class="article-content has-background-black-ter"
          v-for="(item, index) in articles"
          :key="index"
          @click="goToArticle(item.url)"
        >
          <img v-if="item.urlToImage" :src="item.urlToImage" alt />
          <p class="title is-4 has-text-light" v-html="item.title"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { HollowDotsSpinner } from "epic-spinners";

export default {
  name: "resources",
  components: {
    HollowDotsSpinner,
  },
  data() {
    return {
      articles: [],
      isSpinnerActive: false,
      newsApiKey: "3e30fc4ba5fb4a738dbc7687e1704ece",
      newsURL: "https://newsapi.org/v2/everything",
    };
  },
  methods: {
    fetchArticles: function () {
      this.isSpinnerActive = true;
      let params = {
        sources: "TechCrunch",
        language: "en",
        pageSize: 50,
        sortBy: "publishedAt",
        apiKey: this.newsApiKey,
      };
      axios
        .get(this.newsURL, { params: params })
        .then((response) => {
          this.articles = response.data.articles.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (el) =>
                  el.title === item.title
              )
          );
        })
        .catch((error) => {
          this.$buefy.snackbar.open({ message: error, type: "is-danger" });
        })
        .then(() => {
          this.isSpinnerActive = false;
        });
    },
    goToArticle(url) {
      window.open(url, "_blank");
    },
  },
  created() {
    this.fetchArticles();
  },
};
</script>

<style lang="css" scoped>
.main-content {
  margin: 0 2em 0 0;
}

.article-container {
  width: 100%;
  margin: 0 10px;
  columns: 4;
  column-gap: 10px;
}
.article-content {
  width: 100%;
  margin: 0 0 10px;
  padding: 20px;
  overflow: hidden;
  break-inside: avoid;
}
.article-content:hover {
  background-color: hsl(0, 0%, 7%) !important;
}
.article-content img {
  margin-bottom: 10px;
}

@media (max-width: 1200px) {
  .article-container {
    columns: 3;
  }
}

@media (max-width: 768px) {
  .article-container {
    columns: 2;
  }
}
@media (max-width: 480px) {
  .article-container {
    columns: 1;
  }
}
</style>