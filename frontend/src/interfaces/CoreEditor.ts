export type CoreEditorTemplateItem = CoreEditorTemplateItemInput | CoreEditorTemplateItemFile | CoreEditorTemplateSelectFile;

interface CoreEditorTemplateItemBase {
    type: string;
    title: string;
    key: string;
    required?: boolean;
}

interface CoreEditorTemplateItemInput extends CoreEditorTemplateItemBase {
    type: 'input' | 'number' | 'textarea' | 'checkbox';
}

interface CoreEditorTemplateItemFile extends CoreEditorTemplateItemBase {
    type: 'file';
    mime?: string;
}

interface CoreEditorTemplateSelectFile extends CoreEditorTemplateItemBase {
    type: 'select';
    options?: { key: string | number; title: string; }[];
}