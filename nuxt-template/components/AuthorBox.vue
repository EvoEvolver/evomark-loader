<template>
  <div class="author-box">
    <div class="author-list">
      <span class="author-entry" v-for="(author, index) of authorList" :key="index">
        {{ author.givenName + " " + author.familyName }}
        <sup v-if="author.affil || author.note">
          <HoverTip
            v-for="(affil, index) of author.affil"
            :key="index"
          >
            <a class="author-sup-link" :href="'#affil-def-' + affil" >{{ affilIndices[affil]}}{{(index==author.affil.length-1)?"":","}}</a>
            <template v-slot:tip> {{affilDict[affil]}}</template>
          </HoverTip>
          <a
            v-for="(note, index) of author.note"
            :key="index"
            class="author-sup-link"
            :href="'#note-def-' + note"
          >{{ getSupSymbol(noteIndices[note]) }}</a>
        </sup>
      </span>
    </div>
    <div class="author-note-box">
      <p
        v-for="(value, key, index) of affilIndices"
        :key="index"
        class="author-note-define"
        :id="'affil-def-' + key"
      >
        <sup>{{ index + 1 }}</sup>
        {{ affilDict[key] }}
      </p>
      <p
        v-for="(value, key, index) of noteIndices"
        :key="index"
        class="author-note-define"
        :id="'note-def-' + key"
      >
        <sup>{{ getSupSymbol(value) }}</sup>
        {{ authorNotes[key] }}
      </p>
      <p></p>
    </div>
  </div>
</template>

<script>
const noteSupChar = ["*", "†", "⁑", "‡", "⁂", "⁝", "⁖", "⁘", "※"];
const noteSupCharLen = noteSupChar.length;
export default {
  inject: ["pageEnv"],
  data: function () {
    return {
      authorList: this.pageEnv.author,
      affilDict: this.pageEnv.affils,
      authorNotes: this.pageEnv.authorNotes,
      noteIndices: this.pageEnv.authorBoxRecord.noteIndices,
      affilIndices: this.pageEnv.authorBoxRecord.affilIndices
    };
  },
  methods: {
    getSupSymbol: function (index) {
      return noteSupChar[(index - 1) % noteSupCharLen];
    },
  },
};
</script>

<style>
</style>