# example-ts-micro-service

Beispiel wie micro-services mittels [micro](https://github.com/zeit/micro) implementiert werden können.

## dev

pre-requirements:

```
yarn global add concurrently
```

### `yarn dev`

startet den [micro-dev](https://github.com/zeit/micro-dev)-server und parallel den TypeScript-watch-prozess (`tsc -w`).

### `yarn build`


1. set the `NODE_ENV=production` via [cross-env](https://github.com/kentcdodds/cross-env)
1. 

#### build-script im Zusammenhang mit now-deployment

~~Es ist wichtig dass `NODE_ENV=production` (da dadurch doch die devDependencies installiert werden) im `build`-script gesetzt wird, da `now.json`-`env`-Option mit `"NODE_ENV": "production"` gesetzt wird, installiert now eigentlich keine devDependencies: siehe [Ignoring devDependencies (now-doku)](https://zeit.co/docs/deployment-types/node#ignoring-devdependencies).~~

NODE_ENV wird zu production bei start-script gesetzt, da sonst build-script nicht funktioniert.

### now as deploy-server

Es ist zu überlegen ob now den build-step übernehmen soll ([now führt automatisch das `package.json."build"`-script aus](https://zeit.co/docs/deployment-types/node#file-system-specifications)), oder man einen externen build-server (gitlab-ci etc) nutzen will

Zum Anfang ist now sicherlich einfacher, hat aber Nachteile:

- devDependencies müssen mit installiert werden
- kompilierter src-code wird hochgeladen
- build-step ist limitert (da eigentlich nur build möglich ist)

mit jenkins/gitlab-ci/circle-ci/... könnte man da mehr und besser steuern und würde dann nur die fertige app hochladen. Idee-Ansatz

- use the [Selecting Files and Directories to Be Uploaded](https://zeit.co/docs/clients/now-cli#selecting-files-and-directories-to-be-uploaded)-feature von now => `"files": ["dist"]` (zu checken pb package.json und now.json eigtl auch hinzugefügt werden müssten?)
- dann sollte auch wieder `now.json."env"` genutzt werden um `process.env.NODE_ENV` auf `production` zu setzen, dann wird ausschließlich die für prodcution wichtigen packages installiert (nicht devDependencies): [Ignoring devDependencies (now-doku)] 


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
