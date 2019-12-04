# Full-Stack Testing (ASP.NET Core 3.1 & Vue.js)
Prototype application with a Vue.js client that has significant unit testing coverage with Vue Test Utils (Jest as the test runner) and configured for e2e testing with Nightwatch. The web API is built using ASP.NET Core 3.1 and unit/integration testing is handled using xUnit.core. Has a basic, functional UI for executing requests to a back-end web api.

## Demo

![demo](https://j.gifs.com/719JN1.gif)

## General/Technology Stack Overview

- Front-end initially bootstrapped using the [`Vue CLI App`](https://cli.vuejs.org) with the following options: ```Babel```, ```TypeScript```, ```PWA```, ```Router```, ```Vuex```, ```CSS Pre-processors (node-sass)```, ```Linter (ts-lint)```, ```Unit Testing (Jest/ts-jest)```, ```E2E Testing (Nightwatch)```
- Additionally I added: 
	- [`Bulma CSS Framework`](https://bulma.io/) for modular styling 
	- [`axios`](https://github.com/axios/axios) for REST endpoint requests
	- [`vuex-module-decorators`](https://github.com/championswimmer/vuex-module-decorators) which enables you to write class based vuex store modules
    - [`vue-snotify`](https://github.com/artemsky/vue-snotify) snackbar notifications (based off the original library for Angular)
	- [`vue-js-modal`](https://github.com/euvl/vue-js-modal) for displaying compiled templates as modal components, or the option to create modals dynamically at runtime (my preferred modal plugin for Vue.js)
- Back-end Web API using ```ASP.NET Core 3.1``` and a seperate ```xUnit.core``` test project (for integration testing of Web API). For both Development and xUnit tests I am using the ```InMemory``` database option with ```Entity Framework Core``` for convienence

## Setup
1. Install the following (or confirm installed):
   - [`.NET Core 3.1 SDK`](https://dotnet.microsoft.com/download/dotnet-core/3.1)
   - [`Node.js >= v8`](https://nodejs.org/en/download/)
2. After cloning the repo, run the command ```npm install``` in the ```ClientApp``` directory to restore all Node packages/dependencies from package.json
3. Open the .sln solution in Visual Studio and make sure all dependencies and Nuget dependencies are installed/restored - won't hurt to rebuild the entire solution (both projects)
4. Two potential ways to start the entire project:
	- I installed and configured the [`aspnetcore-vueclimiddleware`](https://github.com/EEParker/aspnetcore-vueclimiddleware) in the FullStackTesting.Web.Api project - in theory this makes things easier by allowing you to launch the Web Api and the Vue.js client from within Visual Studio by just running the project. I found its functionality to be spotty when used with .NET Core 2.x, however, after upgrading to .NET Core 3.1 and bump the Nugtet package to the 3.1 version I encountered zero issues.


```csharp
using VueCliMiddleware;

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();

    if (System.Diagnostics.Debugger.IsAttached)
        endpoints.MapToVueCliProxy("{*path}", new SpaOptions { SourcePath = _spaSourcePath }, "serve", regex: "running at");
    else
        endpoints.MapFallbackToFile("index.html");
});
```

- You can choose to not use this the way it is currently configured and instead launch the front-end and back-end independently and proxy requests to your specified port.

## Scripts (ClientApp)

### `npm install`

After cloning the repo, run this command.  This will:

- Install Node dependencies from package.json

### `npm run serve`

To start the app (development build), run this command.  This will:

- Compile the app and run on the development server

### `npm run test:unit`

- This will execute your unit tests located at ```ClientApp/tests/unit``` - they should follow the naming convention ```[name].spec.ts```. I have 7 tests already written and passing in there.

### `npm run test:e2e`

- This will execute your end-to-end integration Nightwatch tests located at ```ClientApp/tests/e2e/specs```

### `npm run lint`

- Run the linter (configured in the tslint.json file found in the root of this project)

### `npm run build`

This script will:
 - Build release Webpack bundles
 
 ## xUnit Integration Tests (.NET Core)

A few of the ways to execute the tests contained within the project FullStackTestin.Web.Api.IntegrationTests:
- Run the CLI command ```dotnet test``` from within the FullStackTesting.Web.Api.IntegrationTests folder
- If you have the [`Open Command Line`](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.OpenCommandLine) Visual Studio extension installed you can right click FullStackTesting.Web.Api.IntegrationTests project when loaded in Visual Studio to launch the cmd/PowerShell prompt that way and proceed to run ```dotnet test```
- From within Visual Studio (with the FullStackTesting.Web.Api.IntegrationTests project loaded) via Test/Run/[select option]


