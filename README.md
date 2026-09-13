# LotteStadtkarteApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.5.

## Development server

To start a local development server, run:

```bash
yarn ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Editing city information

The city markers, popups, and info panel shown on the map are all driven by a
single data file:

```
src/app/components/city-map/cities.ts
```

This file exports a `CITIES` array, where each entry describes one city and
must match the `City` interface defined in
`src/app/components/city-map/city.model.ts`. To add, remove, or update a
city, edit the corresponding object in this array directly — no other file
needs to change.

### Fields of a city entry

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes | Display name of the city, shown as the marker tooltip, popup title, and info panel heading. |
| `lat` | `number` | yes | Latitude of the city, used to position the marker on the map. |
| `lng` | `number` | yes | Longitude of the city, used to position the marker on the map. |
| `description` | `string` | yes | Short descriptive text shown in the marker popup and at the bottom of the top-right info panel. |
| `image1` … `image4` | `string` | no | File path to an image (relative to `public/`, e.g. `assets/img1.jpeg`), rendered in the top-right info panel only (not in the hover tooltip or marker popup). Leave as `''` (empty string) or omit the field entirely if no image is available for that slot — up to 4 images per city are supported. |
| `image1Text` … `image4Text` | `string` | no | Caption text displayed directly below the corresponding image (e.g. `image2Text` is shown under `image2`). Only rendered if the matching image path is set. |
| `image1Source` … `image4Source` | `string` | no | Source/attribution text for the corresponding image (e.g. photo credit), shown below the image caption behind a collapsible "Quelle" toggle. Only rendered if set. |

### Example entry

```ts
{
  name: 'Frankfurt am Main',
  lat: 50.1109,
  lng: 8.6821,
  image1: 'assets/img1.jpeg',
  image1Text: 'Skyline von Frankfurt am Main',
  image1Source: 'Pixabay',
  image2: 'assets/img1.jpeg',
  image2Text: 'Der Römerberg im historischen Stadtkern',
  image2Source: 'Pixabay',
  image3: '',
  image3Source: '',
  image4: '',
  image4Source: '',
  description: 'Die größte Stadt Hessens, ein bedeutendes Finanzzentrum und Sitz der Europäischen Zentralbank.',
},
```

### Adding images

Image files must be placed inside the `public/` directory (e.g.
`public/assets/img1.jpeg`) so Angular serves them from the site root. When
referencing them in `cities.ts`, **omit** the `public/` prefix — for example
use `assets/img1.jpeg`, not `public/assets/img1.jpeg` or `./public/assets/img1.jpeg`.

### Where each field is displayed

- **Marker tooltip** (on hover): only `name`.
- **Marker popup** (on click, small box near the marker on the map itself): `name` and `description`. Images are never shown here.
- **Top-right info panel** (opens on click of a marker, closes when another city is selected): `name`, then all set `image1`–`image4` (with their `imageNText` caption and collapsible `imageNSource` "Quelle" toggle), followed by `description`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
