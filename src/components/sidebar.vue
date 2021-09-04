<template>
  <div class="sidebar-page has-background-black-bis">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :fullheight="true"
        :fullwidth="false"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-dark"
        open
      >
        <div class="p-1">
          <div class="block" v-if="currentRouteName != 'profile'">
            <!-- Hide the image if route is 'profile' -->
            <figure class="image">
              <img
                class="is-rounded"
                :src="getProfilePicture()"
                alt="Kludge"
                referrerpolicy="no-referrer"
              />
            </figure>
          </div>
          <b-menu class="is-custom-mobile usr-buefy-menu">
            <b-menu-list label="Menu">
              <b-menu-item
                icon="user"
                label="My Profile"
                :active="
                  this.$store.getters.selectedMenuOption == 'profile'
                    ? true
                    : false
                "
                @click="changeRoute('profile')"
              ></b-menu-item>

              <b-menu-item
                icon="code"
                label="Code Editor"
                :active="
                  this.$store.getters.selectedMenuOption == 'panel'
                    ? true
                    : false
                "
                @click="changeRoute('panel')"
              ></b-menu-item>

              <b-menu-item
                icon="book"
                label="Learn Programming"
                :active="
                  this.$store.getters.selectedMenuOption == 'resources'
                    ? true
                    : false
                "
                @click="changeRoute('resources')"
              ></b-menu-item>

              <b-menu-item icon="user-shield" label="Administrator">
                <b-menu-item icon="users" label="Users"></b-menu-item>
                <b-menu-item icon="tablet-alt" label="Devices"></b-menu-item>
                <b-menu-item
                  icon="coins"
                  label="Payments"
                  disabled
                ></b-menu-item>
              </b-menu-item>

              <b-menu-item
                icon="comments"
                label="Public Space"
                :active="
                  this.$store.getters.selectedMenuOption == 'forum'
                    ? true
                    : false
                "
                @click="changeRoute('forum')"
              ></b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Expo" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item
                @click="logoutUser"
                icon="sign-out-alt"
                label="Logout"
              ></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Misc.">
              <b-menu-item icon="rss" label="Blog"></b-menu-item>
              <b-menu-item
                icon="cat"
                label="Test View"
                @click="changeRoute('test')"
              ></b-menu-item>
              <b-menu-item
                icon="dog"
                label="Test View 2"
                @click="changeRoute('testView2')"
              ></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "sidebar",
  components: {},
  data() {
    return {
      loggedInUser: this.$store.getters.loggedInUser,
      expandOnHover: true,
      mobile: "reduce",
      reduce: true,
    };
  },
  methods: {
    changeRoute(pathname) {
      this.$router.push({ name: pathname }).catch((error) => {
        this.$buefy.snackbar.open(error.name);
      });
      this.$store.commit("changeSelectedMenuOption", pathname);
    },
    getProfilePicture() {
      if (this.loggedInUser.thumbnail) return this.loggedInUser.thumbnail;
      return `https://robohash.org/${Math.ceil(Math.random() * 10)}`;
    },
    logoutUser() {
      this.$buefy.dialog.confirm({
        title: "Confirm Logout",
        message: "Are you sure you want to logout?",
        cancelText: "Cancel",
        confirmText: "Yes",
        type: "is-dark",
        iconPack: "fa",
        icon: "question-circle",
        hasIcon: true,
        onConfirm: () => {
          axios
            .get("/api/auth/logout")
            .then((response) => {
              if (response.data) {
                // User is successfully logged out from backend.
                this.$store.commit("setLoggedInUser", null); // reflect that in vuex.
                window.localStorage.removeItem("vuex"); // Empty the localstorage too. The former is redundant now.
                this.$router.push({ name: "landing" }).catch((error) => {
                  this.$buefy.snackbar.open(error);
                });
              }
            })
            .catch((error) => {
              this.$buefy.snackbar.open({ message: error });
            });
        },
      });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {},
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}

.menu-list li a:hover {
  background-color: hsl(0, 0%, 14%);
  color: whitesmoke;
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 3.25em);
  // width: 100%;
  // min-height: 100%;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
  }
}

@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.usr-buefy-menu {
  margin-left: 3px;
}

// Dialog Modal
.dialog {
  .modal-card-head,
  .modal-card-body,
  .modal-card-foot,
  .modal-card-title {
    background-color: hsl(0, 0%, 14%);
    color: whitesmoke;
    border: none;
    border-radius: 0%;
  }

  .modal-card-body .media-content {
    margin: auto;
  }

  .modal-card-foot .button:last-child {
    background-color: hsl(0, 0%, 21%);
    border: none;
    box-shadow: none !important;
    color: whitesmoke;
  }

  .modal-card-foot .button:last-child:hover {
    background-color: hsl(0, 0%, 14%);
    border: none;
  }

  .modal-card-foot .button:first-child {
    background-color: hsl(0, 0%, 14%);
    border: none;
    box-shadow: none !important;
    color: whitesmoke;
  }

  .modal-card-body i {
    color: whitesmoke;
  }
}
</style>