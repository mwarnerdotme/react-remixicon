# @mwarnerdotme/react-remixicon

## Usage

```jsx
import {
  RemixIcon,
  riUserSmileFill,
  riUserSmileLine
} from '@mwarnerdotme/react-remixicon'

export default function MyComponent() {
  return (
    <>
      <RemixIcon icon={riUserSmileFill} size="1x" />
      <RemixIcon
        icon={riUserSmileLine}
        size="2x"
        color="#0000ff"
      />
      <RemixIcon
        icon={riUserSmileFill}
        size="lg"
        className='text-green-500'
      />
      <RemixIcon
        icon={riUserSmileFill}
        size="xxs"
        style={{ display: 'absolute' }}
      />
    </>
  );
}
```

First, import the `<RemixIcon />` component from the library. Then import the icon(s) you want to use in your component. Pass an icon into the `icon` prop of `<RemixIcon />` and: voila! You should now see a beautiful, open-source icon in your component.

## Finding Icons

All available icons can be found on the [official Remix Icon website](https://remixicon.com). Once you've found the icon you're looking for, you'll be able to import it from this library using tree shaking.

> Icon imports follow the convention of `riCamelCaseIconNameVariant` (ex: `riUserSmileFill`).

> Icons with numbers will look like `riHome4Fill`.

## Dev Quickstart

### Generating Icon Typescript Files

All of the icon data will end up in the `src/icons` directory in a designated Typescript file when the `yarn icons:generate` command is ran. Be sure to run `yarn` to download the required devDependencies before running the command.

> `yarn dist` will automatically clear the icon files from this folder before generating new icon files and building.

### Building

Before building, ensure that there are Typescript files for all icons in the `src/icons` directory. Follow the previous section to generate those files programatically (there shouldn't be a need to copy SVG path data manually... unless you really want to).
