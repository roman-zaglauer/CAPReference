# CAPReference

A CAP reference project

> **Note**: Follow this [link](https://github.com/roman-zaglauer/cap-samples/tree/main) to show all available scenarios

```shell
npm i
# build application
npm run build
# Login to cloud foundry and select org/space where you want to deploy
cf login --sso
# deploy the application
npm run deploy
```

## Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


### Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


### Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
