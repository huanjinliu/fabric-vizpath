declare type Crood = { x: number; y: number };

declare type Position = { left: number; top: number };

declare type Matrix = [a: number, b: number, c: number, d: number, e: number, f: number];

declare type Constructor = abstract new (...args: any) => any;

declare type Transform = {
  translate: { x: number; y: number };
  rotate: number;
  scale: { x: number; y: number };
};

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.md' {
  const content: string;
  export default content;
}
