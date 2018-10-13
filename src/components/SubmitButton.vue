<template>
	<button class="submit-button" @click="submitWants()">Save Changes</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import * as wantsStore from "store/WantsStore";
import Dummy, { WantOrDummy } from "models/Dummy";

const addHiddenInput = (name: string, value: string, form: HTMLFormElement) => {
  const hidden = document.createElement("input");

  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", name);
  hidden.setAttribute("value", value);

  form.appendChild(hidden);
};

const addValueInput = (want: WantOrDummy, form: HTMLFormElement) => {
  addHiddenInput(
    `value${want.id}`,
    want.toDelete ? "delete" : "" + want.value,
    form
  );
};

@Component
export default class SubmitButton extends Vue {
  submitWants() {
    const form = document.createElement("form");

    addHiddenInput("listid", `${wantsStore.getListId(this.$store)}`, form);
    addHiddenInput("modify", "1", form);
    addHiddenInput("newstyle", "1", form);

    form.setAttribute("method", "POST");
    form.setAttribute("action", window.location.href);
    form.setAttribute("target", "_self");

    wantsStore.getWants(this.$store).forEach(want => addValueInput(want, form));

    wantsStore.getListings(this.$store).forEach(listing => {
      Object.keys(listing.wants).forEach(wantId => addHiddenInput("want", `${wantId}-${listing.id}`, form));
    });

    wantsStore.getDummies(this.$store).forEach(dummy => {
      Object.keys(dummy.children).forEach(childId => addHiddenInput("want", `${dummy.id}-${childId}`, form));
      addValueInput(dummy, form);
    });

    document.body.appendChild(form);
    form.submit();
  }
}
</script>

<style scoped>
.submit-button {
  position: relative;
  margin: 12px 8px 12px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  padding: 8px 16px;
  transition: background-color 0.25s;
  font-family: "Muli", Helvetica, sans-serif;
  font-size: 1.25rem;
  margin-top: 8px;
}

.submit-button:hover,
.submit-button:focus {
  background-color: #f0f0f0;
}
</style>