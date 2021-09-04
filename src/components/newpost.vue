
<template>
  <div>
    <b-modal
      :active.sync="is_modal_open"
      has-modal-card
      :full-screen="is_modal_fullscreen"
      :can-cancel="false"
    >
      <div class="modal-card has-background-black-ter">
        <header class="modal-card-head">
          <div class="modal-card-title">Create a public post</div>
          <button
            class="delete has-background-black-ter"
            aria-label="close"
            @click="closeModal()"
          ></button>
          <div
            class="button is-dark is-small"
            @click="is_modal_fullscreen = !is_modal_fullscreen"
          >
            <i v-if="is_modal_fullscreen" class="fas fa-compress"></i>
            <i v-else class="fas fa-expand"></i>
          </div>
        </header>

        <section class="modal-card-body has-text-light">
          <div class="block post-types-class">
            <b-radio
              v-model="post_type"
              type="is-light"
              name="name"
              native-value="article"
            >
              <span :class="{ 'has-text-light': post_type == 'article' }">
                Publish an article
              </span>
            </b-radio>
            <b-radio
              v-model="post_type"
              type="is-light"
              name="name"
              native-value="question"
            >
              <span :class="{ 'has-text-light': post_type == 'question' }">
                Ask a question
              </span>
            </b-radio>
            <b-radio
              v-model="post_type"
              type="is-light"
              name="name"
              native-value="challenge"
            >
              <span :class="{ 'has-text-light': post_type == 'challenge' }">
                Post a challenge
              </span>
            </b-radio>
          </div>

          <b-field label="" class="">
            <b-input
              v-model="post_title"
              custom-class="has-background-black-ter has-text-light title_input"
              placeholder="Title"
              has-counter
              maxlength="100"
            >
            </b-input>
          </b-field>
          <b-field label="">
            <b-taginput
              v-model="selected_tags"
              custom-class="has-background-black-ter has-text-light tag_input"
              :data="filtered_tags"
              autocomplete
              field=""
              icon="tag"
              maxtags="5"
              type="is-dark"
              :allow-new="true"
              placeholder="Add relevant tags"
              @typing="getFilteredTags"
            >
              <template slot-scope="props">
                {{ props.option }}
              </template>
              <template slot="empty"> There are no items </template>
            </b-taginput>
          </b-field>
          <b-field label="" class="has-background-white">
            <vue-simplemde 
              class="has-text-black"
              v-model="post_body" 
              ref="markdownEditor"
              />
          </b-field>
          <b-field>
            <b-button
              type="is-dark"
              class="is-pulled-right"
              :class="{ 'is-loading': is_submit_loading }"
              @click="is_submit_loading = !is_submit_loading"
            >
              Submit
            </b-button>
          </b-field>
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
import languages from "../constants/languages.js";

export default {
  name: "newpost",
  props: ["status"],
  components: {},
  data() {
    return {
      is_modal_open: false,
      is_modal_fullscreen: false,
      filtered_tags: languages,
      selected_tags: [],
      post_title: "",
      post_body: "",
      post_type: "article",
      is_submit_loading: false,
    };
  },
  created() {
    this.is_modal_open = this.status;
  },
  methods: {
    getFilteredTags(text) {
      this.filtered_tags = languages.filter((option) => {
        return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
    closeModal() {
      this.is_modal_open = false;
      this.$emit("closeNewpostModal", false);
    },
  },
  watch: {},
};
</script>

<style scoped>

.modal-card {
  border-radius: 0%;
}

.modal-card .modal-card-head {
  background-color: hsl(0, 0%, 14%);
  color: whitesmoke;
  border-radius: 0%;
}
.modal-card .modal-card-head .modal-card-title {
  color: whitesmoke;
}
.modal-card .modal-card-head .button {
  font-size: 0.8em;
  margin-left: 1em;
  background-color: hsl(0, 0%, 14%);
}

.modal-card .modal-card-head .button:hover,
.modal-card .modal-card-head .delete:hover {
  transform: scale(1.5);
}

.modal-card .modal-card-body {
  background-color: hsl(0, 0%, 14%);
  color: whitesmoke;
  overflow-y: scroll;
  height: 100%;
}

/* ::v-deep is for deep selector to apply scoped level component css */

::v-deep .title_input {
  border: 1px rgb(83, 83, 83) solid !important;
  box-shadow: none !important;
  border-radius: 0% !important;
  padding-right: 30px;
}

::v-deep .title_input:hover {
  border: 1px whitesmoke solid !important;
}

::v-deep .title_input:focus {
  border: 1px whitesmoke solid !important;
}

::v-deep .title_input::placeholder {
  color: rgb(209, 209, 209) !important;
}

/* buefy character counter */

::v-deep .control .help.counter {
  margin: -22px 12px 0 0;
  opacity: 0.8;
}

/* tag input buefy */

::v-deep .taginput-container {
  background-color: hsl(0, 0%, 14%) !important;
  border: 1px rgb(83, 83, 83) solid !important;
  border-radius: 0% !important;
  box-shadow: none !important;
}

::v-deep .taginput-container:hover {
  border: 1px whitesmoke solid !important;
}

::v-deep .tag_input::placeholder {
  color: rgb(209, 209, 209) !important;
}

/* Buefy Radio */
::v-deep .b-radio .control-label:hover {
  color: whitesmoke;
}
::v-deep .b-radio .control-label {
  color: grey;
}
.post-types-class {
  margin-bottom: 0.75rem !important;
}
</style>