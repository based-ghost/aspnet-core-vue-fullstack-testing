# Full-Stack Testing (ASP.NET Core 2.2 & Vue.js)
Prototype application with a Vue.js client that has significant unit testing coverage with Vue Test Utils (Jest as the test runner) and configured for e2e testing with Nightwatch. The web API is built using ASP.NET Core 2.2 and unit/integration testing is handled using xUnit.net. Has a basic, functional UI for executing requests to a back-end web api.

## Demo

![demo](https://j.gifs.com/vllpXr.gif)

## General/Technology Stack Overview

- Front-end initially bootstrapped using the [`Vue CLI App`](https://cli.vuejs.org) with the following options: ```Babel```, ```TypeScript```, ```PWA```, ```Router```, ```Vuex```, ```CSS Pre-processors (node-sass)```, ```Linter (ts-lint)```, ```Unit Testing (Jest/ts-jest)```, ```E2E Testing (Nightwatch)```
- Additionally I added: 
	- [`Bulma CSS Framework`](https://bulma.io/) for modular styling 
	- [`axios`](https://github.com/axios/axios) for REST endpoint requests
	- [`vuex-module-decorators`](https://github.com/championswimmer/vuex-module-decorators) which enables you to write class based vuex store modules
	- [`vue-js-modal`](https://github.com/euvl/vue-js-modal) for displaying compiled templates as modal components, or the option to create modals dynamically at runtime (my preferred modal plugin for Vue.js)
- Back-end Web API using ```ASP.NET Core 2.2``` and a seperate ```xUnit.net``` test project (for integration/unit testing of server-side code). For both Development and xUnit tests I am using the In-Memory database option with ```Entity Framework Core``` for convienence

## Setup
1. Install the following (or confirm installed):
   - [`.NET Core 2.2 SDK`](https://dotnet.microsoft.com/download/dotnet-core/2.2)
   - [`Node.js >= v8`](https://nodejs.org/en/download/)
2. After cloning the repo, run the command ```npm install``` in the ```ClientApp``` directory to restore all Node packages/dependencies from package.json
3. Open the .sln solution in Visual Studio and make sure all dependencies and Nuget dependencies are installed/restored - won't hurt to rebuild the entire solution (both projects)
4. Two potential ways to start the entire project:
	- I installed and configured the [`aspnetcore-vueclimiddleware`](https://github.com/EEParker/aspnetcore-vueclimiddleware) in the FullStackTesting.Web.Api project - in theory this should make things easier by allowing you to launch the Web Api and the Vue.js client from within Visual Studio by just running the project. However, in practice I found this option to be very hit or miss (mostly miss as it will fail a couple times before it works). This option is the Vue.js alternative to Angular's ```UseAngularCliServer```, which in my experience, works much better.
	
	```csharp
	// BOTTOM OF Startup.Configure
	
	app.UseSpa(spa =>
        {
            spa.Options.SourcePath = _spaSourcePath;

            if (env.IsDevelopment())
            {
                // Option 1: Run npm process with client app
                 spa.Options.StartupTimeout = new TimeSpan(days: 0, hours: 0, minutes: 1, seconds: 30);
                 spa.UseVueCli(npmScript: "serve", port: 8080);
            }
        });
	```
	
	- Launch the Web Api and the Vue.js client seperately - this should be be the preferred method. First, in the ClientApp directory run the command ```npm serve``` and when it is listening successfully at the specified uri/port (http://localhost:8080), you can run it in your preferred browser, and then run the ASP.NET Core Web Api project in visual studio - the application will proxy requests to the specified uri/port - which should be set to your client uri/port.
	
	```csharp
	// BOTTOM OF Startup.Configure
		
	app.UseSpa(spa =>
        {
            spa.Options.SourcePath = _spaSourcePath;

            if (env.IsDevelopment())
            {
                // Option 2: Serve ClientApp independently and proxy requests from ClientApp to api:
                spa.UseProxyToSpaDevelopmentServer("http://localhost:8080");
            }
        });
	```

## Scripts

### `npm install`

After cloning the repo, run this command.  This will:

- Install Node dependencies from package.json

### `npm run serve`

To start the app (development build), run this command.  This will:

- Compile the app and run on the development server

### `npm run lint`

- Run the linter (configured in the tslint.json file found in the root of this project)

### `npm run build`

This script will:
 - Build release Webpack bundles
