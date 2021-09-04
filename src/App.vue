<template>
    <div id="app" >
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="css">


@import '../node_modules/buefy/dist/buefy.css';

/* Buefy Sidebar */
.b-sidebar .sidebar-content.is-dark {
    background-color: hsl(0, 0%, 7%) !important;
}
.b-sidebar .sidebar-content {
  box-shadow: none !important;
}
.menu-list a.is-active {
  background-color:transparent !important; 
  color: white;
}

/* Buefy Table */
.b-table .table{
    background-color: hsl(0, 0%, 10%) !important;
    color: whitesmoke !important;
    border-radius: 0 !important;
}
.b-table .table th {
  font-weight: 600;
  color: whitesmoke !important;
  border-color: hsl(0, 0%, 14%) !important;
}
.b-table .table td {
  border-width: 1px !important; 
  border-color: hsl(0, 0%, 14%) !important;
}
.table.is-hoverable tbody tr:not(.is-selected):hover {
   background-color: rgba(128, 128, 128, 0.1) !important;
}
.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {
   background-color: rgba(128, 128, 128, 0.1) !important;
}
.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.1) !important;
}

/* pagination changes */
.pagination-link.is-current {
  background-color: hsl(0, 0%, 14%) !important;
  border-color: whitesmoke !important
}
.pagination{
  margin-right: 12px !important;
}
.pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus {
  border-color: whitesmoke !important;
}

/* Simple Markdown editor */
@import '~simplemde/dist/simplemde.min.css';
.CodeMirror , .CodeMirror-scroll {
  min-height: 120px !important;
}

</style>
