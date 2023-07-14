export interface CoreEditorTemplateItem {
    type: 'input' | 'textarea' | 'file' | 'number' | 'select';
    title: string;
    key: string;
    mime?: string; // Only for type: 'file'
    options?: { key: string | number; title: string; }[]; // Only for type: 'select'
}