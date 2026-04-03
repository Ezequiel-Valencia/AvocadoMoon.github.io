// Type declarations for non-module CSS/SCSS side-effect imports
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
