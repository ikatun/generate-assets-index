# generate-assets-index
## Installation
```
npm install generate-assets-index --save-dev
```

## Add to package.json `scripts`
```
...
  "scripts": {
    "index-assets": "generate-assets-index assets/svgs assets/svgs",
  }
...
```

## Run script to index assets
This will generate file in assets/svgs/index.ts:
```
npm run index-assets
```
