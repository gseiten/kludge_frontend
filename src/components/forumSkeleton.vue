

<template>

<div>

<article class="media" v-for="i in 10" :key="i">
    <figure class="media-left">
        <p class="image is-48x48">
            <b-skeleton :animated="true" width="48px" height="48px"></b-skeleton>
        </p>
    </figure>
    <div class="media-content">
        <div class="content">
            <p>
                <b-skeleton :animated="true" height="50px"></b-skeleton>
            </p>
        </div>
    </div>
</article>

</div>
    
</template>


<script>
export default {
    name: 'forumSkeleton',
    components:{}
}
</script>


<style lang="scss" scoped>

::v-deep .b-skeleton > .b-skeleton-item {
  background: linear-gradient(90deg, hsl(0,0%,14%) 25%, rgba(219, 219, 219, 0.5) 50%, hsl(0,0%,14%) 75%);
  background-size: 400% 100%;
  width: 100%;
}

::v-deep .media{
    margin: 0 !important;
    border: none !important
}

</style>
