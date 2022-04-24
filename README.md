# reptiles.dev

Generate colorful and temporarily identifiable SVGs with unique urls.

```html
<!-- A random svg  -->
<img src="https://reptiles.dev/svg " />

<!-- A temporarily identifiable random svg with key 123 or any key of your choosing.  -->
<img src="https://reptiles.dev/123" />
```

🦎
 [Website](https://reptiles.dev) · 🔗 [Random SVG](https://reptiles.dev/svg) · 🛝 [GraphQL Playground](https://reptiles.dev/api/graphql)

<img width="500px" src="docs/example.png" />

## Usage

Get a random image: [reptiles.dev/svg](https://reptiles.dev/svg)

Get a temporarily identifiable random image: [reptiles.dev/123](https://reptiles.dev/123) or [reptiles.dev/svg?key=123](https://reptiles.dev/svg?key=123)

Customize generated image: [reptiles.dev/svg?hue=green&luminosity=dark&size=20](https://reptiles.dev/svg?hue=green&luminosity=dark&size=20)

Visit [reptiles.dev](https://reptiles.dev) to use a UI to customize generated images and view available options.

Alternatively use the [GraphQL playground](https://reptiles.dev/api/graphql) and read the detailed documentation on all available options.

## How it works

Every image is given a key and cached for a short while. Including the key of the image in a link will return the cached image. If no image is cached than one will be generated cached with the given key.

This method of generating random yet temporarily identifiable image is great to use when mocking & developing front-ends, mapping some fake ids to images, or as placeholder images inside a
Storybook.

## Examples

```html
<img src="https://reptiles.dev/svg" />

<img src="https://reptiles.dev/some-identifier" />

<img src="https://reptiles.dev/svg?width=10&luminosity=light&hue=147A34" />
```

<img src="https://reptiles.dev/svg" />
<br />
<img src="https://reptiles.dev/some-identifier" />
<br />
<img src="https://reptiles.dev/svg?width=10&luminosity=dark&hue=147A34" />

