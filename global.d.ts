declare type Crood = { x: number; y: number };

declare type Position = { left: number; top: number };

declare type Constructor = abstract new (...args: any) => any;

declare type Transform = {
  translate: { x: number; y: number };
  rotate: number;
  scale: { x: number; y: number };
};

declare type ArrayElement<A> = A extends (infer T)[] ? T : never;