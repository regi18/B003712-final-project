<template>
  <div class="core-crud-list" v-if="!editItem">
    <div class="header">
      <div class="header-msg" v-if="headerMsg">{{ headerMsg }}</div>
      <div style="flex: 1"></div>
      <button @click="addNew()">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <main v-if="localItems?.length > 0">
      <draggable
        class="list-group"
        v-model="localItems"
        :itemKey="(el: any) => el.slug ? 'slug' : 'id'"
        @end="onDrop($event)"
        v-bind="dragOptions"
        :disabled="!dragAndDrop"
      >
        <template #item="{ element: e }">
          <div class="list-item" :class="{ draggable: dragAndDrop }">
            <div class="left">
              <span class="title">{{ e[titleKey] }}</span>
              <span class="subtitle">{{ e[subtitleKey] }}</span>
            </div>
            <div class="right">
              <button @click="onEdit(e)">
                <i style="color: darkorange" class="fas fa-edit"></i>
              </button>
              <button @click="onDelete(e)">
                <i style="color: red" class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </main>

    <main style="padding: 1em" v-else>Loading...</main>
  </div>

  <CoreEditListItem :item="editItem" @cancel="editItem = null" @save="onSave($event)" :template="editorTemplate" v-else></CoreEditListItem>
</template>

<script lang="ts">
import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';
import CoreEditListItem from './CoreEditListItem.vue';
import type { PropType } from 'vue';
import { post, put, remove } from '@/services/AjaxService';
import draggable from 'vuedraggable';

export default {
  name: 'core-crud-list',
  components: {
    CoreEditListItem,
    draggable,
  },
  emits: ['deleteItem', 'saveItem', 'error', 'onDrop'],
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
    dragAndDrop: {
      type: Boolean,
      default: false,
    },
    headerMsg: {
      type: String,
      default: undefined,
    },
  },
  watch: {
    items() {
      this.localItems = this.items;
    },
  },
  data() {
    return {
      editItem: null as any,
      localItems: this.items,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    };
  },
  methods: {
    async onDrop(e: any) {
      if (!e) return;

      // Save order
      this.localItems.forEach((item, index) => {
        item.order = index;
      });
      // Save order
      await put(this.apiBaseUrl + '/order', this.localItems);

      this.$emit('onDrop', e);
    },
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
      } catch (e: any) {
        this.$emit('error', e.errors);
      }
    },
    async onSave(item: any) {
      try {
        if (item.isNew) {
          // Create item
          await post(this.apiBaseUrl, item);
        } else {
          // Update
          await put(this.apiBaseUrl + '/' + (item.slug ?? item.id), item);
        }

        this.$emit('saveItem', item);
        this.editItem = null;
      } catch (e: any) {
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

    .header-msg {
      display: flex;
      align-items: center;
      padding-left: 0.5em;
      font-size: 0.9em;
      color: #939393;
      font-style: italic;
      font-family: serif;
    }
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

      .title {
        max-width: 30vw;

        @include mobile {
          max-width: 50vw;
        }

        @include tablet {
          max-width: 50vw;
        }

        overflow: hidden;
        text-overflow: ellipsis;
      }

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

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0;
  }

  .draggable {
    cursor: move;
  }
}
</style>
