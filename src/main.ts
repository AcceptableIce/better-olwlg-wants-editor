import Vue from "vue";
import App from "./App.vue";

(<any>window).App = new Vue({
	el: "#wants-editor",
	render: h => h(App)
})
