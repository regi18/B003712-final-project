<template>
  <h2 style="padding-top: 0.4em">Manage the gazette</h2>

  <div class="container admin-container">
    <div class="sidenav">
      <ul>
        <li :class="section === 'articles' ? 'active' : ''" @click="setSection('articles')">Articles</li>
        <li :class="section === 'cartoons' ? 'active' : ''" @click="setSection('cartoons')">Cartoons</li>
        <li :class="section === 'research-journal' ? 'active' : ''" @click="setSection('research-journal')">The Research Journal</li>
        <li :class="section === 'papers-issues' ? 'active' : ''" @click="setSection('papers-issues')">Papers Issues</li>
      </ul>
    </div>

    <div class="content">
      <CoreCrudList :editorTemplate="template" :items="items" @saveItem="onSave($event)" @deleteItem="onDelete($event)"></CoreCrudList>
    </div>
  </div>
</template>

<script lang="ts">
import CoreCrudList from '@/components/CoreCrudList.vue';
import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';
import templates from '@/assets/AdminEditorTemplates';

// TODO protect this component/route from unauthenticated users
export default {
  name: 'AdminView',
  components: {
    CoreCrudList,
  },
  created() {
    // TODO
    this.setSection('articles');
  },
  methods: {
    setSection(section: string) {
      this.section = section;

      if (this.section === 'cartoons') this.template = templates.cartoon;
      if (this.section === 'papers-issues') this.template = templates.paperIssue;
      else this.template = templates.article;
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
      template: {} as CoreEditorTemplateItem[],
      items: [
        {
          id: 1,
          title: 'The First Article',
          author: 'asdfasdf',
          subtitle: 'test',
          content: 'asdfaskjfaksdjflkasjdf hasdjhf  asiodufoiadkf a *asdf* asdfasdfadfs',
        },
        {
          id: 1,
          title: 'The Second Article',
          author: 'asdfasdf',
          subtitle: 'test',
          content: 'asdfaskjfaksdjflkasjdf hasdjhf  asiodufoiadkf a *asdf* asdfasdfadfs',
        },
        {
          id: 1,
          title: 'The Second Article',
          subtitle: 'test',
          author: 'asdfasdf',
          content: 'asdfaskjfaksdjflkasjdf hasdjhf  asiodufoiadkf a *asdf* asdfasdfadfs',
        },
        {
          id: 1,
          title: 'The Second Article',
          author: 'asdfasdf',
          subtitle: 'test',
          content: 'asdfaskjfaksdjflkasjdf hasdjhf  asiodufoiadkf a *asdf* asdfasdfadfs',
        },
      ],
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
