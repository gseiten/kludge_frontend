
<template>
    <div class="has-background-black-ter">
        <nav class="navbar is-dark has-background-black-ter is-fixed-top">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <img
                        src="../assets/kludge1.png"
                        alt="Kludge"
                        style="width: 50px; min-height: 50px"
                    />
                </a>
                <a
                    role="button"
                    class="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    :class="{ 'is-active': is_hamburger_active }"
                    @click="is_hamburger_active = !is_hamburger_active"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <!-- <div id="navbarBasicExample" class="navbar-menu has-background-black-ter" :class="{'is-active': is_hamburger_active}"> -->
            <div class="navbar-start">
                <a class="navbar-item">Home</a>

                <a class="navbar-item">Documentation</a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">More</a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item">Jobs</a>
                        <a class="navbar-item">Contact</a>
                        <hr class="navbar-divider" />
                        <a class="navbar-item">Report an issue</a>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a
                                class="button is-dark start-button"
                                @click="openNewPostModal"
                            >
                                <span class="icon">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>Start</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <!-- </div> -->
        </nav>

        <div class="container" style>
            <div class="columns">
                <div class="column is-4">
                    <section
                        class="hero has-background-black-ter is-fullheight"
                    >
                        <div class="hero-body">
                            <div class="container">
                                <div class="is-pulled-right">
                                    <h1 class="title has-text-light is-1">
                                        Learn, Build & Debug Code the right way.
                                    </h1>
                                    <h2
                                        class="subtitle has-text-grey-light is-4"
                                    >
                                        Visualize execution, analyze
                                        performance, debug code snippets and
                                        much more.
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="column">
                    <section
                        class="hero has-background-black-ter has-text-light is-fullheight"
                    >
                        <div class="hero-body">
                            <div class="container">
                                <figure class="image">
                                    <img src="@/assets/coding1.svg" />
                                </figure>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <loginModal
            :status="is_login_modal_open"
            :key="is_login_modal_open"
            @closeLoginModal="closeLoginModal"
        ></loginModal>
    </div>
</template>


<script>

    // @ is alias for /src
	import loginModal from '@/components/login'

    export default {
        name: "landing",
        components: {
			loginModal
        },
		data() {
			return {
				is_hamburger_active: false,
				is_login_modal_open: false,
			}
		},
		methods: {

			openNewPostModal(){
				this.is_login_modal_open = true;
			},
			closeLoginModal(value){
				this.is_login_modal_open = value;
			}
		}
    }
</script>

<style scoped>
</style>
