// Global TypeScript declarations for CSS and other asset imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Additional declarations for other asset types (if needed)
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}