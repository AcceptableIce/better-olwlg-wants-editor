<template>
	<button class="submit-button" @click="submitWants()">Save Changes</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import * as wantsStore from "store/WantsStore";

const addHiddenInput = (name: string, value: string, form: HTMLFormElement) => {
  const hidden = document.createElement("input");

  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", name);
  hidden.setAttribute("value", value);

  form.appendChild(hidden);
};

@Component
export default class SubmitButton extends Vue {
  submitWants() {
    const form = document.createElement("form");

    form.setAttribute("method", "POST");
    form.setAttribute("action", window.location.href);

    wantsStore.getListings(this.$store).forEach(listing => {
      listing.wants.forEach(want => addHiddenInput("want", `${want.id}-${listing.id}`, form));
    });

    wantsStore.getDummies(this.$store).forEach(dummy => {
      dummy.children.forEach(child => addHiddenInput("want", `${dummy.id}-${child.id}`, form));
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