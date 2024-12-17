declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Allow all data-* attributes
declare module 'vue' {
  interface HTMLAttributes {
    'data-testid'?: string;
  }
}
