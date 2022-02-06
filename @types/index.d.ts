// declare module "*.svg" {
//   const content: any;
//   export default content;
// }

declare module "*.svg" {
  export type SVGComponent = React.FC<
    React.SVGAttributes<SVGElement>
  >;

  const content: SVGComponent;
  export default content;
}
