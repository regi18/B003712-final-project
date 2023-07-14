<template>
  <div class="core-crud-list core-edit-list-item">
    <div class="header">
      <button @click="onCancel()" :disabled="loading">
        <i class="fas fa-arrow-left"></i>
      </button>

      <div class="spacer"></div>

      <button @click="onSave()" :disabled="loading">
        <i class="fas fa-save"></i>
      </button>
    </div>

    <main>
      <div class="field" v-for="t of template" :key="t.key">
        <label :for="t.key">{{ t.title }}</label>

        <!-- Input -->
        <input type="text" :id="t.key" v-model="editItem[t.key]" v-if="t.type === 'input'" />

        <!-- Number -->
        <input type="number" :id="t.key" v-model="editItem[t.key]" v-if="t.type === 'number'" />

        <!-- Textarea -->
        <textarea id="content" rows="10" v-model="editItem[t.key]" v-else-if="t.type === 'textarea'"></textarea>

        <!-- Select -->
        <select v-model="editItem[t.key]" v-if="t.type === 'select'">
          <option v-for="option in t.options" :key="option.key" :value="option.key">
            {{ option.title }}
          </option>
        </select>

        <!-- File -->
        <input
          type="file"
          :id="t.key"
          :accept="t.mime"
          @change="readFile($event, t.key)"
          v-else-if="t.type === 'file'"
          class="file-upload"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { type CoreEditorTemplateItem } from '@/interfaces/CoreEditor';

export default {
  name: 'core-edit-list-item',
  emits: ['cancel', 'save'],
  props: {
    template: {
      type: Object as PropType<CoreEditorTemplateItem[]>,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.editItem = this.item;
  },
  data() {
    return {
      editItem: null as any,
      loading: false,
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel', null);
    },
    onSave() {
      this.$emit('save', this.item);
    },
    readFile(event: any, templateKey: string) {
      this.loading = true;
      const file: File = event?.target?.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.editItem[templateKey] = event.target?.result;
        this.loading = false;
      });
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  flex-grow: 1;
}

main {
  display: flex;
  flex-direction: column;
  padding: 1em 1.5em;
  gap: 1em;

  .field {
    display: flex;
    flex-direction: column;

    textarea {
      resize: vertical;
      font-size: 1rem;
    }

    input.file-upload {
      margin-top: 0.3em;
      font-size: 0.85em;
    }
  }
}
</style>
