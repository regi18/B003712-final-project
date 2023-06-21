export interface CoreEditorTemplateItem {
    type: 'input' | 'textarea' | 'file';
    title: string;
    key: string;
    mime?: string; // Only for type: 'file'
}