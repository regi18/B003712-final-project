<template>
  <h2 style="padding-top: 0.4em">Manage the gazette</h2>

  <div class="container admin-container">
    <div class="sidenav">
      <ul>
        <li :class="section === 'articles' ? 'active' : ''" @click="setSection('articles')">Articles</li>
        <li :class="section === 'sections' ? 'active' : ''" @click="setSection('sections')">Sections</li>
        <li :class="section === 'cartoons' ? 'active' : ''" @click="setSection('cartoons')">Cartoons</li>
        <li :class="section === 'papers-issues' ? 'active' : ''" @click="setSection('papers-issues')">Papers Issues</li>
      </ul>
    </div>

    <div class="content">
      <CoreCrudList :editorTemplate="template" :titleKey="titleKey" :items="items" @saveItem="onSave($event)" @deleteItem="onDelete($event)"></CoreCrudList>
    </div>
  </div>
</template>

<script lang="ts">
import CoreCrudList from '@/components/CoreCrudList.vue';
import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';
import templates from '@/assets/AdminEditorTemplates';
import { get } from '@/services/AjaxService';

// TODO protect this component/route from unauthenticated users
export default {
  name: 'AdminView',
  components: {
    CoreCrudList,
  },
  created() {
    this.setSection('articles');
  },
  methods: {
    async setSection(section: string) {
      this.section = section;

      if (this.section === 'cartoons') {
        this.template = templates.cartoon;
        this.items = await get('cartoons');
        this.titleKey = 'title'
      }
      else if (this.section === 'papers-issues') {
        this.template = templates.paperIssue;
        this.items = await get('downloads');
        this.titleKey = 'issueNumber'
      }
      else if (this.section === 'sections') {
        this.template = templates.section;
        this.items = await get('sections');
        this.titleKey = 'title'
      }
      else {
        this.template = templates.article;
        this.items = await get('articles');
        this.titleKey = 'title'
      }
    },
    onSave(item: any) {
      console.log('createOrUpdate', item);
    },
    onDelete(item: any) {
      console.log('delete', item);
    },
  },
  data() {
    return {
      section: 'articles',
      titleKey: 'title',
      template: {} as CoreEditorTemplateItem[],
      items: [] as any[],
    };
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  min-height: 50vh;
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1000px;
}

.sidenav {
  li {
    list-style-type: none;
    cursor: pointer;
    padding: 0.5em 0;
    border-bottom: 1px solid #ccc;

    &:hover,
    &.active {
      text-decoration: underline;
    }
  }
}

.content {
  padding: 1em 2.5em;
  padding-top: 0;
}

@include mobile {
  .admin-container {
    grid-template-columns: 1fr;

    .content {
      margin-top: 2em;
      padding: 0;
    }
  }

  .sidenav {
    ul {
      padding: 0;
    }
    li {
      padding: 0.2em;
    }
  }
}
</style>
