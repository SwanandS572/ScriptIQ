export interface TemplateFormField {
  label: string;
  name: string;
  field: 'input' | 'textarea';
  required?: boolean;
}

export interface TEMPLATE {
  name: string;
  desc: string;
  category: string;
  icon: string;
  slug: string;
  aiPrompt: string;
  form?: TemplateFormField[];
}
