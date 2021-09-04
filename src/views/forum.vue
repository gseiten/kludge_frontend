
<template>
  <div class="main_container">
    <newpost
      :status="is_newpost_modal_open"
      @closeNewpostModal="closeNewpostModal"
      :key="is_newpost_modal_open"
    ></newpost>

    <div class="main_table">
      <b-table
        :data="table_data"
        :narrowed="true"
        :hoverable="true"
        :bordered="false"
        :paginated="true"
        :per-page="25"
        pagination-size="is-small"
        @click="conversationClicked"
      >
        <b-table-column field label="Board">
          <template v-slot:header="{ column }">
            <b-tooltip type="is-dark" :label="column.label" append-to-body>{{
              column.label
            }}</b-tooltip>
          </template>
          <template v-slot="props">
            <article class="media">
              <figure class="media-left is-paddingless">
                <p class="image is-48x48">
                  <img :src="props.row.picture" />
                </p>
              </figure>

              <div class="media-content">
                <div class="content">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat cumque et voluptates tempore quam libero nisi iste
                    minima! Obcaecati eos rerum quis, velit nemo veniam.
                  </p>
                </div>
                <nav class="level is-mobile is-paddingless">
                  <div class="level-left">
                    <div class="level-item is-size-7">
                      <p>
                        Posted by
                        <span class="has-text-weight-bold is-italic">{{
                          props.row.full_name
                        }}</span>
                        10 Hours ago
                      </p>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item is-size-7">
                      <span>
                        <b-icon
                          pack="fas"
                          size="is-small"
                          :icon="
                            props.row.gender === 'male' ? 'comment' : 'comments'
                          "
                        ></b-icon>
                        {{ props.row.age }}
                      </span>
                    </div>
                  </div>
                </nav>
              </div>
            </article>
          </template>
        </b-table-column>

        <template slot="empty">
          <section class="section" v-if="table_data">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="sad-cry" size="is-large"></b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
          <section v-else>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            officia libero consectetur et amet, veniam, vel optio recusandae
            aliquam nihil unde. Ipsa labore totam nam tempora dolor, dicta iusto
            qui.
          </section>
        </template>
      </b-table>
    </div>
    <!-- table ends here -->

    <b-modal
      :active.sync="is_modal_open"
      has-modal-card
      :full-screen="is_modal_fullscreen"
      :can-cancel="false"
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title">#121</div>
          <button
            class="delete has-background-black-ter"
            aria-label="close"
            @click="is_modal_open = !is_modal_open"
          ></button>
          <div
            class="button is-dark is-small"
            @click="is_modal_fullscreen = !is_modal_fullscreen"
          >
            <i v-if="is_modal_fullscreen" class="fas fa-compress"></i>
            <i v-else class="fas fa-expand"></i>
          </div>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img :src="opened_conversation.picture" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ opened_conversation.full_name }}</strong>
                  <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Duis porta eros lacus, nec ultricies elit blandit non.
                  Suspendisse pellentesque mauris sit amet dolor blandit rutrum.
                  Nunc in tempus turpis.
                  <br />
                  <small> <a>Like</a> · <a>Reply</a> · 3 hrs </small>
                </p>
              </div>

              <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img :src="opened_conversation.picture" />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ opened_conversation.full_name }}</strong>
                      <br />Donec sollicitudin urna eget eros malesuada
                      sagittis. Pellentesque habitant morbi tristique senectus
                      et netus et malesuada fames ac turpis egestas. Aliquam
                      blandit nisl a nulla sagittis, a lobortis leo feugiat.
                      <br />
                      <small> <a>Like</a> · <a>Reply</a> · 2 hrs </small>
                    </p>
                  </div>

                  <article class="media">
                    Vivamus quis semper metus, non tincidunt dolor. Vivamus in
                    mi eu lorem cursus ullamcorper sit amet nec massa.
                  </article>

                  <article class="media">
                    Morbi vitae diam et purus tincidunt porttitor vel vitae
                    augue. Praesent malesuada metus sed pharetra euismod. Cras
                    tellus odio, tincidunt iaculis diam non, porta aliquet
                    tortor.
                  </article>
                </div>
              </article>

              <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img :src="opened_conversation.picture" />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ opened_conversation.full_name }}</strong>
                      <br />Sed convallis scelerisque mauris, non pulvinar nunc
                      mattis vel. Maecenas varius felis sit amet magna
                      vestibulum euismod malesuada cursus libero. Vestibulum
                      ante ipsum primis in faucibus orci luctus et ultrices
                      posuere cubilia Curae; Phasellus lacinia non nisl id
                      feugiat.
                      <br />
                      <small> <a>Like</a> · <a>Reply</a> · 2 hrs </small>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </article>

          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img :src="opened_conversation.picture" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control has-background-white">
                  <vue-simplemde ref="markdownEditor" v-model="user_reply" />
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button is-dark is-pulled-right">
                    Post comment
                  </button>
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from "../main.js";
import axios from "axios";
import newpost from "../components/newpost.vue";

export default {
  name: "forum",
  components: {
    newpost,
  },
  data() {
    return {
      users_url:
        "https://randomuser.me/api/?results=30&inc=gender,name,nat,dob,picture",
      table_data: [],
      table_data_loader: false,
      opened_conversation: {},
      is_modal_open: false,
      is_modal_fullscreen: false,
      user_reply: "",
      is_newpost_modal_open: false,
    };
  },
  methods: {
    conversationClicked(row) {
      this.is_modal_open = true;
      this.opened_conversation = row;
    },
    openNewPostModal() {
      this.is_newpost_modal_open = true;
    },
    closeNewpostModal(value) {
      this.is_newpost_modal_open = value;
    },
  },
  created() {
    EventBus.$on("newpost", () => {
      this.openNewPostModal();
    });

    EventBus.$on("searchPosts", (text) => {
      this.table_data = this.table_data.filter((obj) => obj["gender"] == text);
    });

    this.table_data_loader = true;
    axios
      .get(this.users_url)
      .then((response) => {
        let users = response.data.results;
        users.forEach((user, index) => {
          this.table_data.push({
            id: index,
            full_name: user.name.first + " " + user.name.last,
            gender: user.gender,
            age: user.dob.age,
            picture: user.picture.thumbnail,
          });
        });
      })
      .catch((error) => {
        this.$buefy.snackbar.open({
          message: error.response,
          type: "is-danger",
        });
      })
      .then(() => {
        this.table_data_loader = false;
      });
  },
  beforeDestroy() {
    EventBus.$off("askquestion", this.askquestion);
  },
};
</script>

<style lang="css" scoped>
.main_container {
  height: 100%;
  overflow-y: auto;
  margin-right: 7px;
  padding-bottom: 2em;
}

a {
  color: whitesmoke;
}
a:hover {
  color: blue;
}

strong {
  color: whitesmoke;
}

.media .content {
  margin-bottom: 0.1rem !important;
}

.main_table {
  height: 100% !important;
  /* max-height: calc(100vh - 3.2em) !important;  */
  /* max-height: calc(100vh - 60px); */
  overflow-y: hidden;
  overflow-x: hidden;
}

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
</style>