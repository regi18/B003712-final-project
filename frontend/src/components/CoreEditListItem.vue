<template>
  <div class="core-crud-list core-edit-list-item">
    <div class="header">
      <button @click="onCancel()" :disabled="loading">
        <i class="fas fa-arrow-left"></i>
      </button>

      <div class="spacer"></div>

      <p class="error" v-if="errorMsg">{{ errorMsg }}</p>

      <button @click="onSave()" :disabled="loading">
        <i class="fas fa-save"></i>
      </button>
    </div>

    <main>
      <div class="field" v-for="t of template" :key="t.key">
        <label :for="t.key">{{ t.title }}{{ t.required ? '*' : '' }}</label>

        <!-- Input -->
        <input
          type="text"
          :id="t.key"
          v-model="editItem[t.key]"
          v-if="t.type === 'input'"
          @input="onInputChanged(t.key)"
          :disabled="!editItem?.isNew && (t.key === 'slug' || t.key === 'id')"
        />

        <!-- Number or Checkbox -->
        <input :type="t.type" :id="t.key" v-model="editItem[t.key]" v-if="t.type === 'number' || t.type === 'checkbox'" />

        <!-- Textarea -->
        <!-- <textarea id="content" rows="10" v-model="editItem[t.key]" v-else-if="t.type === 'textarea'"></textarea> -->
        <v-md-editor v-model="editItem[t.key]" height="400px" v-else-if="t.type === 'textarea'"></v-md-editor>

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

    // Remove file fields if not new, because they now contain the file url. The endpoint expects the base64 data.
    if (this.item && this.template && !this.item?.isNew) {
      for (const t of this.template) {
        if (t.type === 'file') {
          delete this.editItem[t.key];
        }
      }
    }
  },
  data() {
    return {
      editItem: null as any,
      loading: false,
      errorMsg: null as string | null,
    };
  },
  methods: {
    onInputChanged(key: string) {
      // If the title is changed, also change the slug.
      if (key === 'title' && this.editItem?.isNew) {
        this.editItem.slug = this.editItem.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    },
    error(message: string) {
      this.errorMsg = message;
      setTimeout(() => (this.errorMsg = null), 3500);
    },
    onCancel() {
      this.$emit('cancel', null);
    },
    onSave() {
      for (const t of this.template) {
        // Check if required fields are filled.
        // One exception: If the item is not new, the file fields are not required (same process as in created()).
        if (t.required && !this.editItem[t.key] && !(!this.item?.isNew && t.type === 'file')) {
          this.error('Please fill all required fields.');
          return;
        }
      }

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

    select, input {
      width: 100%;
    }

    input[type="checkbox"] {
      width: 0.7em;
      height: 0.7em;
    }
  }
}

.error {
  color: red;
  margin-top: 0 !important;
  line-height: 1.8em;
  margin-right: 0.5em;
}

:deep(.vuepress-markdown-body) {
  font-family: 'Playfair Display' !important;
}
</style>
