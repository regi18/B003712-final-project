import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
  Prism,
});
VMdEditor.lang.use('en-US', enUS);

const app = createApp(App)

app.use(router)
app.use(VMdEditor);
app.mount('#app')

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement|any,
    },
    // ... more stuff
  }
}