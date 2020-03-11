import store from "../js/store/index";
import { addArticle } from "../js/actions/index";

window.store = store;
window.addArticle = addArticle;

store.subscribe(() => console.log('Look ma, Redux!!'));
store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );
store.getState();