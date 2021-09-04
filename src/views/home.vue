
<template>
  <div>
    <nav class="navbar is-fixed-top has-background-black-bis">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img
            src="../assets/kludge1.png"
            alt="Kludge"
            style="width: 30px; min-height: 30px"
          />
        </div>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarExampleTransparentExample"
        class="navbar-menu"
        v-if="$route.name == 'panel'"
      >
        <div class="navbar-start">
          <a class="navbar-item has-background-black-bis">
            <div class="buttons">
              <div
                class="button is-dark is-small run-button"
                @click="emitGlobalExecutionEvent('execute')"
              >
                <span class="icon">
                  <i class="fas fa-play"></i>
                </span>
                <b-tooltip
                  :label="runMessage"
                  type="is-dark"
                  position="is-bottom"
                  :delay="500"
                  multilined
                >
                  <span class="is-size-6">Run</span>
                </b-tooltip>
              </div>
              <div class="button is-dark is-small" disabled>
                <span class="icon">
                  <i class="fas fa-save"></i>
                </span>
                <span class="is-size-6">Save</span>
              </div>
              <div class="button is-dark is-small" disabled>
                <span class="icon">
                  <i class="fas fa-align-right"></i>
                </span>
                <span class="is-size-6">Beautify</span>
              </div>
              <div class="button is-dark is-small" disabled>
                <span class="icon">
                  <i class="fas fa-share"></i>
                </span>
                <span class="is-size-6">Share</span>
              </div>
              <div class="button is-dark is-small" disabled>
                <span class="icon">
                  <i class="fas fa-download"></i>
                </span>
                <span class="is-size-6">Download</span>
              </div>
            </div>
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <v-select
              style="min-width: 200px"
              v-model="selectedLanguage"
              :options="['JavaScript', 'Python']"
            ></v-select>
          </div>
          <div class="navbar-item">
            <b-dropdown
              position="is-bottom-left"
              :scrollable="true"
              v-model="selectedConfiguration"
              aria-role="list"
            >
              <button
                class="button is-dark has-background-black-bis is-small"
                slot="trigger"
              >
                <b-icon pack="fas" icon="cog" size="is-medium"></b-icon>
              </button>

              <b-dropdown-item @click="isLayoutVertical = !isLayoutVertical">
                <div class="media">
                  <b-icon
                    v-if="isLayoutVertical"
                    class="media-left"
                    icon="drag-vertical"
                  ></b-icon>
                  <b-icon
                    v-else
                    class="media-left"
                    icon="drag-horizontal"
                  ></b-icon>
                  <div class="media-content">
                    <h3>Switch layout</h3>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="media">
                  <b-icon class="media-left" icon="theme-light-dark"></b-icon>
                  <div class="media-content">
                    <h3>Editor Theme</h3>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item>
                <div class="media">
                  <b-icon class="media-left" icon="format-size"></b-icon>
                  <div class="media-content">
                    <h3>Font Size</h3>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>

      <div class="navbar-menu" v-if="$route.name == 'forum'">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="buttons">
              <div
                class="button is-dark is-small new-post-button"
                @click="emitGlobalExecutionEvent('newpost')"
              >
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                <span class="is-size-6">New Post</span>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <v-select
              class="posttype_class"
              v-model="selectedPostType"
              :options="['Challenges', 'Questions', 'Articles']"
            ></v-select>
          </div>
          <div class="navbar-item">
            <b-field>
              <b-input
                v-model="searchPostsText"
                @keyup.enter.native="searchPosts"
                custom-class="has-background-black-ter has-text-light search-input"
                placeholder="Search..."
                type="search"
                icon="search"
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>

      <div class="navbar-menu" v-if="$route.name == 'profile'">
        <div class="navbar-end">
          <div class="navbar-item">
            <b-field>
              <b-input
                custom-class="has-background-black-ter has-text-light search-input"
                placeholder="Search..."
                type="search"
                icon="search"
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns is-marginless">
      <div
        class="
          column
          is-narrow
          sidebar-column
          has-background-black-bis
          is-paddingless
        "
      >
        <sidebar></sidebar>
      </div>
      <div
        class="column content-column has-background-black-bis is-paddingless"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main.js";
import sidebar from "../components/sidebar.vue";
export default {
  name: "home",
  components: { sidebar },
  data() {
    return {
      runMessage: "use ctrl+enter as shortcut. command+enter for mac.",
      searchPostsText: "",
      selectedConfiguration: "",
      isLayoutVertical: true,
    };
  },
  methods: {
    emitGlobalExecutionEvent(method) {
      EventBus.$emit(method);
    },
    searchPosts() {
      EventBus.$emit("searchPosts", this.searchPostsText);
    },
  },

  computed: {
    selectedLanguage: {
      get() {
        return this.$store.getters["selectedLanguage"];
      },
      set(value) {
        this.$store.commit("changeSelectedLanguage", value);
      },
    },
    selectedPostType: {
      get() {
        return this.$store.getters["selectedPostType"];
      },
      set(value) {
        this.$store.commit("changePostType", value);
      },
    },
  },

  watch: {
    isLayoutVertical() {
      this.$store.commit("switchSplitpanesLayout", this.isLayoutVertical);
    },
  },

  created() {},
};
</script>

<style>
.columns {
  height: 100%;
  min-height: calc(100vh - 3.25em);
  /* height: calc(100vh - 3.25em); */
}

* {
  /* for firefox's scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.8) hsl(0, 0%, 7%);
}

::-webkit-scrollbar {
  width: 0.3em;
}

::-webkit-scrollbar-track {
  background: hsl(0, 0%, 7%) !important;
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.8);
}

::-webkit-scrollbar-corner,
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(100, 100, 100, 0.4);
}

/* make all buttons of every component curve-less */
.button {
  border-radius: 0% !important;
}

.navbar .navbar-brand .navbar-item {
  width: 80px !important;
}

.navbar-brand .navbar-item img {
  display: block;
  margin: auto;
}

.navbar-menu .navbar-start .navbar-item {
  padding-left: 0 !important;
}

.search-input {
  border: none !important;
  box-shadow: none !important;
  border-radius: 0% !important;
  height: 33px !important;
}
.search-input + span.icon {
  height: 33px !important;
}
.search-input:hover {
  border: 1px whitesmoke solid !important;
}
.search-input:focus {
  width: 30em !important;
  border: 1px whitesmoke solid !important;
}
.search-input::placeholder {
  color: grey !important;
}
.control.has-icons-left .icon,
.control.has-icons-right .icon {
  color: grey !important;
}

/* v-select */
.vs__selected {
  color: whitesmoke !important;
}
.vs__dropdown-toggle {
  border-radius: 0% !important;
  min-width: 200px;
}
.vs__dropdown-menu {
  background: hsl(0, 0%, 7%) !important;
}
.vs__dropdown-option {
  color: whitesmoke !important;
}
.vs__dropdown-option--highlight {
  background: hsl(0, 0%, 29%) !important;
  color: whitesmoke !important;
}
.vs__dropdown-toggle {
  border-color: hsl(0, 0%, 14%) !important;
}
.vs__clear {
  fill: whitesmoke !important;
}
.vs__open-indicator {
  fill: whitesmoke !important;
}
/* v-select ends */

/* buefy dropdown */
.dropdown-content {
  background-color: hsl(0, 0%, 7%) !important;
}
.dropdown-content .dropdown-item {
  color: white !important;
}
.dropdown-content .dropdown-item:hover {
  color: white !important;
  background-color: hsl(0, 0%, 29%) !important;
}
.run-button:hover,
.new-post-button:hover {
  border-bottom: 1px solid whitesmoke !important;
}
/* buefy dropdown ends */

/* buefy table pagination */
.pagination-previous,
.pagination-next,
.pagination-link {
  color: whitesmoke !important;
}
.pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled] {
  background-color: hsl(0, 0%, 14%) !important;
}
/* buefy table pagination ends */
</style>
