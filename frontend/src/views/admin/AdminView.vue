<template>
  <h2 style="padding-top: 0.4em">Manage the gazette</h2>

  <div class="container admin-container">
    <div class="sidenav">
      <ul>
        <li :class="section === 'articles' ? 'active' : ''" @click="setSection('articles')">Articles</li>
        <li :class="section === 'sections' ? 'active' : ''" @click="setSection('sections')">Sections</li>
        <li :class="section === 'cartoons' ? 'active' : ''" @click="setSection('cartoons')">Cartoons</li>
        <li :class="section === 'downloads' ? 'active' : ''" @click="setSection('downloads')">Papers Issues</li>
      </ul>
    </div>

    <div class="content">
      <CoreCrudList
        :editorTemplate="template"
        :titleKey="titleKey"
        :items="items"
        @saveItem="onSave($event)"
        @deleteItem="onDelete($event)"
      ></CoreCrudList>
    </div>
  </div>
</template>

<script lang="ts">
import CoreCrudList from '@/components/CoreCrudList.vue';
import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';
import templates from '@/assets/AdminEditorTemplates';
import { get, post, put, remove } from '@/services/AjaxService';

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
      this.items = [];

      if (this.section === 'cartoons') {
        this.template = templates.cartoon;
        this.items = await get('cartoons');
        this.titleKey = 'title';
      } 
      else if (this.section === 'downloads') {
        this.template = templates.paperIssue;
        this.items = await get('downloads');
        this.titleKey = 'issueNumber';
      } 
      else if (this.section === 'sections') {
        this.template = templates.section;
        this.items = await get('sections');
        this.titleKey = 'title';
      } 
      else if (this.section === 'articles') {
        this.template = templates.article;
        const sections = await get('sections');
        const i = this.template.findIndex(e => e.key === 'section');
        this.template[i].options = sections.map((e: any) => ({ key: e.slug, title: e.title }));

        this.items = await get('articles');
        this.titleKey = 'title';
      }
    },
    async onSave(item: any) {
      if (item.isNew) {
        // Create item
        await post(this.section, item);
      }
      else {
        // Update
        await put(this.section + '/' + item.slug ?? item.id, item);
      }

      // Reload
      this.items = await get(this.section);
    },
    async onDelete(item: any) {
      // Delete item
      await remove(this.section + '/' + item.slug ?? item.id);
      // Reload
      this.items = await get(this.section);
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
