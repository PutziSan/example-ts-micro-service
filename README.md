# example-ts-micro-service

Beispiel wie micro-services mittels [micro](https://github.com/zeit/micro) implementiert werden können.

ToDos:

- Deployment mit [now](https://zeit.co/now) muss noch dokumentiert werden.

## dev

pre-requirements:

```
yarn global add concurrently
```

### `yarn dev`

startet den [micro-dev](https://github.com/zeit/micro-dev)-server und parallel den TypeScript-watch-prozess (`tsc -w`).

## configs

welche besonderen configurations werden für dieses node-TS-Project genutzt

### TypeScript

hier wird beschrieben welche TSConfig-optionen bzw. TypeScript-programming-guidelines genutzt werden

#### `"noImplicitUseStrict": true` (tsconfig.json)

prevent emitting `"use strict"` in the js-file, see [stackoverflow: Prevent “use strict” in typescript?](https://stackoverflow.com/questions/38269478/prevent-use-strict-in-typescript)

#### `export = ...`

> [TS-handbook](https://www.typescriptlang.org/docs/handbook/modules.html): "The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum."

This prevents that `tsc` injects `object.defineproperty(exports, "__esmodule", { value: true });`. Es wird nicht weiter ekklärt warum und die #hotdiscussion wurde zensiert: [#14351](https://github.com/Microsoft/TypeScript/issues/14351)

## Technologien

### http-framework

[micro](https://github.com/zeit/micro) als sehr gute minimalisitische Option (im Prinzip nur ein mini-wrapper um nodes native http-api mit `async/await`-Unterstützung). [micro-dev](https://github.com/zeit/micro-dev) als Ergänzung zum leichten entwickeln

### request-library

**TL;DR** use [got](https://github.com/sindresorhus/got)

- Gute (subjektive) Vergleichs-Grafik by [got#comparison](https://github.com/sindresorhus/got#comparison)
- [request](https://github.com/request/request) ist viel zu riesig und aufgebläht (4mb install-size) und kann async/await bzw promises nur mit zusatzlib
- [axios](https://github.com/axios/axios) sehe ich eher mit Fokus auf die browser-Nutzung und code sieht deshalb leicht gewaltiger aus als bei got
- [node-fetch](https://github.com/bitinn/node-fetch) ist mir ein bisschen zu basic
