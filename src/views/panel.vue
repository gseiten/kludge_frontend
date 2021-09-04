
<template>
  <div class="main-class has-background-black-bis has-text-light">
    <!-- // ! Left for tabs menu  -->
    <!-- <div class="level has-background-black-bis is-marginless">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, optio!
        </div>-->

    <splitpanes
      @ready="splitpanesReady"
      @resize="splitpanesResized"
      @pane-add="paneAdded"
      :horizontal="!isLayoutVertical"
    >
      <!-- PANE 1 (CODE EDITOR) -->
      <pane :size="editorPanelSize" min-size="10">
        <div
          class="level editor-configs has-background-black-ter is-marginless"
        >
          <div class="level-left is-unselectable">
            <b-icon
              size="is-small"
              icon="sliders-h"
              pack="fas"
              class="has-text-grey"
            ></b-icon>
            <div class="level-item item-editor-theme">
              <b-dropdown
                v-model="selectedTheme"
                aria-role="list"
                :scrollable="true"
                :max-height="200"
              >
                <a slot="trigger" role="button">
                  <span>{{ selectedTheme.name }}</span>
                  <b-icon size icon="angle-down"></b-icon>
                </a>
                <b-dropdown-item
                  v-for="(item, index) in editorThemes"
                  :key="index"
                  :value="item"
                  aria-role="listitem"
                  >{{ item.name }}</b-dropdown-item
                >
              </b-dropdown>
            </div>
            <div class="level-item item-font-size">
              <b-dropdown
                v-model="selectedFontSize"
                aria-role="list"
                :scrollable="true"
                :max-height="200"
              >
                <a slot="trigger" role="button">
                  <span>{{ selectedFontSize }}</span>
                  <b-icon size icon="angle-down"></b-icon>
                </a>
                <b-dropdown-item
                  v-for="(item, index) in fontSizes"
                  :key="index"
                  :value="item"
                  aria-role="listitem"
                  >{{ item }}</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
        </div>

        <editor
          :key="editorPanelSize"
          class="has-background-black-bis editor-class"
          @keyup.ctrl.enter.exact.native="execute()"
          @keydown.ctrl.83.exact.native.prevent.stop="saveCode"
          ref="myEditor"
          v-model="code"
          @init="editorInit"
          :lang="lang"
          :theme="selectedTheme.value"
        ></editor>
      </pane>

      <!-- PANE 2 (OUTPUT) -->
      <pane class="res-container" :size="outputPanelSize" min-size="10">
        <nav class="level has-background-black-ter console-pane">
          <div class="level-left">
            <div class="level-item is-size-6">Output</div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-tooltip
                label="Clear output"
                type="is-dark"
                position="is-left"
                :delay="500"
              >
                <div
                  class="button is-dark is-small has-background-black-ter"
                  @click="resetResult()"
                >
                  <span class="icon trash_icon">
                    <i class="far fa-trash-alt"></i>
                  </span>
                </div>
              </b-tooltip>
            </div>

            <div class="level-item" v-if="!isAnalysisOn">
              <div
                class="
                  button
                  is-dark is-small
                  has-background-black-ter
                  is-paddingless
                "
              >
                <b-tooltip
                  label="Switch on Code Analysis"
                  type="is-dark"
                  position="is-left"
                  :delay="500"
                >
                  <b-switch
                    class="analysisSwitch"
                    v-model="isAnalysisOn"
                    size="is-small"
                    type="is-light"
                    :outlined="true"
                  ></b-switch>
                </b-tooltip>
              </div>
            </div>
          </div>
        </nav>

        <div class="list is-hoverable has-background-black-bis is-size-6">
          <div
            class="list-item success-list-item is-family-code"
            v-for="(el, index) in result"
            v-bind:key="index"
          >
            {{ el }}
          </div>
          <div v-if="error" class="list-item error-list-item">{{ error }}</div>
        </div>
      </pane>

      <!-- PANE 3 (INFO) -->
      <pane
        class="res-container"
        v-if="isAnalysisOn"
        :size="analysisPanelSize"
        min-size="10"
      >
        <nav class="level has-background-black-ter analytics-pane">
          <div class="level-left">
            <div class="level-item is-size-6">Analysis</div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <div
                class="
                  button
                  is-dark is-small
                  has-background-black-ter
                  is-paddingless
                "
              >
                <b-tooltip
                  label="switch off Code Analysis"
                  type="is-dark"
                  position="is-left"
                  :delay="500"
                >
                  <b-switch
                    class="analysisSwitch"
                    v-model="isAnalysisOn"
                    size="is-small"
                    type="is-light"
                    :outlined="true"
                  ></b-switch>
                </b-tooltip>
              </div>
            </div>
          </div>
        </nav>

        <b-collapse
          class="card has-background-black-bis has-text-light"
          animation="slide"
          v-for="(cr, index) of complexity_report"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title has-text-light">
              <span v-if="cr.title === 'Aggregate'">{{ cr.title }}</span>
              <span v-else>
                <span class="has-text-warning has-text-weight-normal"
                  >function</span
                >
                <span style="margin-left: 0.5em">{{ cr.title }}</span>
              </span>
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              The file has a
              <span class="has-text-warning">cyclomatic complexity</span> score
              of
              <strong class="has-text-light">{{ cr.data.cyclomatic }}</strong>
              and
              <span class="has-text-warning">density</span> of
              <strong class="has-text-light">{{
                cr.data.cyclomaticDensity
              }}</strong
              >. <br />There are a total of
              <strong class="has-text-light">{{ cr.data.lines }}</strong>
              physical line(s) of code.
            </div>
          </div>
        </b-collapse>
      </pane>
    </splitpanes>
  </div>
</template>


<script>
import { EventBus } from "../main.js";
import axios from "axios";
/* eslint-disable no-unused-vars */
import axiosMiddleware from "../config/axios-middleware";
/* eslint-enable no-unused-vars */
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
var codeSnippet = require("../constants/code_snippets.js");

export default {
  name: "panel",
  components: {
    editor: require("vue2-ace-editor"),
    Splitpanes,
    Pane,
  },

  data() {
    return {
      isOpen: 0,
      complexity_report: [],
      result: [],
      error: "",
      fileInfo: [],
      editorPanelSize: 0,
      outputPanelSize: 0,
      analysisPanelSize: 0,
      isAnalysisOn: false,

      // Editor (User's settings)
      fontSizes: [
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30,
      ],
      selectedFontSize: 16,
      editorThemes: [
        { name: "Monokai", value: "monokai" },
        { name: "Vibrant Ink", value: "vibrant_ink" },
        { name: "Tomorrow Night", value: "tomorrow_night" },
        { name: "Gruvbox", value: "gruvbox" },
        { name: "Twilight", value: "twilight" },
      ],
      selectedTheme: { name: "Monokai", value: "monokai" },
    };
  },

  methods: {
    splitpanesReady() {},

    splitpanesResized(event) {
      this.editorPanelSize = event[0].size;
      this.outputPanelSize = event[1].size;
      if (this.isAnalysisOn) this.analysisPanelSize = event[2].size;
    },

    paneAdded() {
      this.editorPanelSize =
        this.outputPanelSize =
        this.analysisPanelSize =
          100 / 3;
    },

    editorInit: function (editor) {
      /* 'editor' arg is ACE's instance. Another way is; let editor = this.$refs.myEditor.editor */
      require("brace/ext/beautify");
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/python");
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/theme/vibrant_ink");
      require("brace/theme/gruvbox");
      require("brace/theme/monokai");
      require("brace/theme/tomorrow_night");
      require("brace/theme/twilight");
      require("brace/snippets/javascript"); //snippet
      editor.setShowPrintMargin(false);
      editor.setFontSize(this.selectedFontSize + "px");
      editor.getSession().setUseWrapMode(true);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
        highlightActiveLine: true,
      });
    },

    execute: function () {
      axios
        .post(
          `/api/code/${this.lang}`,
          {
            code: this.code,
            analysis: this.isAnalysisOn,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          let result = response.data;
          if (result.modules) {
            alert(result);
          } else if (result.result) {
            if (result.result != "") {
              this.result.push(result.result);
            }
            this.error = result.error;

            this.fileInfo = []; // reset fileInfo for every code execution.
            if (result.fileInfo) {
              this.fileInfo = result.fileInfo;
            }

            this.complexity_report = [];
            if (result.complexityReport) {
              this.complexity_report = result["complexityReport"];
            }
          }
        })
        .catch((error) => {
          this.$buefy.snackbar.open({
            message: error,
            type: "is-light",
          });
        })
        .then(() => {});
    },

    saveCode: function () {
      this.$buefy.snackbar.open("Code saved.");
    },

    resetResult: function () {
      this.result = [];
      this.error = "";
    },

    scrollToEnd: function () {
      var container = document.querySelector(".res-container");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
  },

  mounted() {
    this.scrollToEnd();
  },

  updated() {
    this.scrollToEnd();
  },

  created() {
    EventBus.$on("execute", () => {
      this.execute();
    });
  },

  beforeDestroy() {
    EventBus.$off("execute", this.execute);
  },

  computed: {
    code: {
      // * two-way computed property with a setter.
      get() {
        return this.$store.getters["code"];
      },
      set(value) {
        this.$store.commit("holdTheCode", value);
      },
    },
    lang: {
      get() {
        return this.$store.getters["selectedLanguage"].toLowerCase();
      },
      set() {},
    },
    isLayoutVertical() {
      return this.$store.getters["isLayoutVertical"];
    },
  },

  watch: {
    //  whenever the value of computed property "lang" changes, a code snippet is provided for the newly selected language as we are   watching "lang". NOTE that this will only happen on lang change and not on page refresh. "code" persists on page refresh.
    lang(newVal) {
      this.lang = newVal.toLowerCase();
      if (this.lang === "python") {
        this.code = codeSnippet.py;
      } else if (this.lang === "javascript") {
        this.code = codeSnippet.js;
      }
    },
    selectedFontSize() {
      let editor = this.$refs.myEditor.editor;
      editor.setFontSize(this.selectedFontSize + "px");
    },
    isAnalysisOn() {
      // reset complexity report when analysis pane is hidden.
      if (!this.isAnalysisOn) this.complexity_report.splice(0);
    },
  },
};
</script>


<style>
/* important */
.main-class {
  height: calc(100vh - 3.5em) !important;
}
.editor-class {
  height: calc(100vh - 4.2em) !important;
}

.list .list-item {
  border-radius: 0% !important;
  padding: 5px;
}
.list .success-list-item {
  color: whitesmoke;
  border-bottom: 1px solid #3a3a3a !important;
}
.list .error-list-item {
  color: whitesmoke;
  border-bottom: 1px solid #3a3a3a !important;
  background-color: rgb(49, 3, 3);
}

.trash_icon:hover {
  transform: scale(1.5);
}

.analysisSwitch {
  transform: scale(0.7);
}

/* .analysisSwitch .check .is-light {
    color: yellow !important;
} */

/* Buefy Collapse */
a.card-header-icon {
  color: whitesmoke !important;
}

.splitpanes {
  background-color: hsl(0, 0%, 7%);
  /* background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB); */
}

.splitpanes__pane {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
  justify-content: center;
  align-items: center;
  /* display: flex; */
}

.splitpanes--vertical > .splitpanes__splitter {
  min-width: 6px;
  background-color: hsl(0, 0%, 10%);
  /* background: linear-gradient(90deg, #ccc, #111); */
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 6px;
  background-color: hsl(0, 0%, 10%);
  /* background: linear-gradient(0deg, #ccc, #111); */
}

.res-container {
  /* padding: 0.5em; */
  overflow-y: auto;
  height: 100%;
  white-space: pre-line;
}

/* .console-pane {
    padding-left: 0.5em;
    margin-bottom: 0.2em !important;
} */

.console-pane,
.analytics-pane {
  position: sticky;
  top: 0;
  padding-left: 0.5em;
  margin-bottom: 0.2em !important;
}

.editor-configs,
.analytics-pane,
.console-pane {
  height: 30px;
}

/* editor configs */

.editor-configs .level-left {
  padding-left: 0.5rem;
}
.item-editor-theme a {
  color: grey;
  font-size: 1rem;
  padding-left: 1em;
}
.item-editor-theme a:hover,
.item-font-size a:hover {
  color: whitesmoke;
}
.item-editor-theme .dropdown .dropdown-content .dropdown-item.is-active,
.item-font-size .dropdown .dropdown-content .dropdown-item.is-active {
  background-color: grey !important;
}
.item-font-size a {
  color: grey;
  font-size: 1rem;
  padding-left: 0.5em;
}
</style>
