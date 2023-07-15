<template>
  <div class="core-crud-list" v-if="!editItem">
    <div class="header">
      <button @click="addNew()">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <main>
      <div class="list-item" v-for="(item, index) of items" :key="index">
        <div class="left">
          <span class="title">{{ item[titleKey] }}</span>
          <span class="subtitle">{{ item[subtitleKey] }}</span>
        </div>
        <div class="right">
          <button @click="onEdit(item)">
            <i style="color: darkorange" class="fas fa-edit"></i>
          </button>
          <button @click="onDelete(item)">
            <i style="color: red" class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </main>
  </div>

  <CoreEditListItem :item="editItem" @cancel="editItem = null" @save="onSave($event)" :template="editorTemplate" v-else></CoreEditListItem>
</template>

<script lang="ts">
import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';
import CoreEditListItem from './CoreEditListItem.vue';
import type { PropType } from 'vue';
import { post, put, remove } from '@/services/AjaxService';

export default {
  name: 'core-crud-list',
  components: {
    CoreEditListItem,
  },
  emits: ['deleteItem', 'saveItem', 'error'],
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    titleKey: {
      type: String,
      default: 'title',
    },
    subtitleKey: {
      type: String,
      default: 'subtitle',
    },
    editorTemplate: {
      type: Array as PropType<CoreEditorTemplateItem[]>,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editItem: null as any,
    };
  },
  methods: {
    addNew() {
      this.editItem = { isNew: true };
    },
    onEdit(item: any) {
      this.editItem = JSON.parse(JSON.stringify(item));
    },
    async onDelete(item: any) {
      if (!confirm('Are you sure you want to delete this item?')) return;

      try {
        // Delete item
        await remove(this.apiBaseUrl + '/' + (item.slug ?? item.id));
        this.$emit('deleteItem', item);
      }
      catch (e: any) {
        this.$emit('error', e.errors);
      }
    },
    async onSave(item: any) {
      try {
        if (item.isNew) {
          // Create item
          await post(this.apiBaseUrl, item);
        } 
        else {
          // Update
          await put(this.apiBaseUrl + '/' + (item.slug ?? item.id), item);
        }

        this.$emit('saveItem', item);
        this.editItem = null;
      }
      catch (e: any) {
        this.$emit('error', e.errors);
      }
    },
  },
};
</script>

<style lang="scss">
.core-crud-list {
  border: 1px solid #e4e4e4;
  border-radius: 8px;

  .header {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #e4e4e4;
    padding: 0.3em 0.5em;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background 0.2s ease-in-out;

    &:not([disabled]) {
      cursor: pointer;
    }

    &:not([disabled]):hover {
      background: #e4e4e4;
    }

    &:focus-visible {
      outline: none;
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    padding: 0.3em 1em;

    &:last-child {
      border-bottom: none;
    }

    .left {
      display: flex;
      flex-direction: column;

      .subtitle {
        font-size: 0.8em;
        opacity: 0.8;
      }
    }

    .right {
      display: flex;
    }

    i {
      font-size: 1rem;
    }
  }
}
</style>
