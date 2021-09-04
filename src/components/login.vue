

<template>

<section>

    <b-modal :active.sync="is_modal_open" has-modal-card :can-cancel="false">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">
                    <figure class="image">
                        <img src="@/assets/signin2.svg">
                    </figure>
                    <div class="subtitle has-text-light has-text-centered is-size-4">
                        to <br>
                        <span class="title has-text-light is-size-2">Kludge</span>
                    </div>
                    <p class="has-text-grey-lighter has-text-weight-light has-text-centered is-size-5">
                        Sign in to save your progress.
                    </p>
                </div>
                <button class="delete delete-button is-large has-background-black-ter" @click="closeLoginModal" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
    
                <div class="buttons is-block">

                    <a 
                        class="button google-button is-fullwidth"
                        href="/api/auth/google"
                    >
                        <span class="icon">
                            <i class="fab fa-google has-text-white"></i>
                        </span>
                        <span class="has-text-white">Google</span>
                    </a>

                    <a
                        class="button github-button has-background-dark is-fullwidth"
                        href="/api/auth/github"   
                    >
                        <span class="icon">
                            <i class="fab fa-github has-text-white"></i>
                        </span>
                        <span class="has-text-white">GitHub</span>
                    </a>

                </div>
            </section>
        </div>

    </b-modal>
</section>
    
</template>


<script>

import axios from 'axios';

export default {
    name: 'login',
    props: ['status'],
    components: {},
    data(){
        return{
            is_modal_open: false,
        }
    },
    methods:{
        checkIfLoggedIn(){
            axios.get('/api/auth/check').then(user => {
                if(user.data){
                    this.$store.commit('setLoggedInUser', user.data.user);
                    this.$router.push('profile').catch(error => { this.$buefy.snackbar.open(error) });
                }
            }).catch(error => {
                this.$buefy.snackbar.open({message: error});
            });
        },
        closeLoginModal(){
            this.is_modal_open = false;
            this.$emit('closeLoginModal', false);
        }
    },

    mounted(){
        this.checkIfLoggedIn();
    },
    created(){
        this.is_modal_open = this.status;
    }
}
</script>

<style scoped>

::v-deep .button{
    border: none !important;
    box-shadow: none !important;
}

.google-button{
    background-color: #E74B37;
}
.google-button:hover{
    background-color: hsl(7, 59%, 48%);
}

.github-button:hover{
    background-color: hsl(0, 0%, 18%) !important;
}

.modal-card {
    border-radius: 0%;
    position: relative;
    width: 400px;
}

.delete-button {
    position: absolute;
    right: 0;
    top: 0;

}

.modal-card .modal-card-head {
    background-color:hsl(0, 0%, 14%);
    color: whitesmoke;
    border-radius: 0%;
}

.modal-card-title{
    width: 100%;
    padding: 15px;
}

.modal-card-head{
    border: none;
}

.modal-card .modal-card-head .modal-card-title {
    color: whitesmoke;
}
.modal-card .modal-card-head .button {
    font-size: 0.8em;
    margin-left: 1em;
    background-color: hsl(0, 0%, 14%);
}

.modal-card .modal-card-head .button:hover, .modal-card .modal-card-head .delete:hover{
    transform: scale(1.2);
}

.modal-card .modal-card-body {
    background-color: hsl(0, 0%, 14%);
    color: whitesmoke;
}

</style>