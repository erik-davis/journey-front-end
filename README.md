# Journey Products

This project was completed as part of the front-end technical exercise for Journey. It is hosted in Azure: https://journeyproducts.azurewebsites.net/ and the code is also available in GitHub: https://github.com/erik-davis/journey-front-end

## Considerations

The project is an Angular 7 project. Although the README specified AngularJS, Nik indicated that Angular 7 is also acceptable. The "Do not refactor" code has been left unchanged, and is now in the src/assets/repositories folder. The ProductDataConsolidator and ProductDataRenderer have been replaced with the ProductSelectionCompoonent and ProductDetailComponent, as well as the three supporting services.

## Third party packages

The only package added that is not needed for Angular 7 and unit tests is Angular Material. Material is used for the table, sorting columns, and tab selector.

## Features

The site allows the user to view all products or only products of a certain type by using the tabs. Any of the four columns can be sorted either ascending or decending by clicking on the column header. Clicking the header a third time will return the data to the sort order that it initially comes in from the repositories.

## Future Features

Each product type currently has its own model which extends the base product model. This would allow for use of specific properties like 'isVehicle' to be used if desired. However, the current site only uses the name and price property from each product. If the data set size increased, it might also be desirable to add a text box where the user could type in a search term to filter the visible data.

## Adding a new product type

This project was designed around the single-responsibility and open-closed principles in order to make adding new product types easy.
To display the name and price data for an additional product type, a developer would have to make the following changes: 

1) Add the product type to the ProductType.ts file

2) Add a data repo to the /assets/repositories folder that follows the Repository Interface in /models/repository-interface.ts 

3) Modify the product-repository-factory.service.ts to return the correct repo for the new ProductType (if the ProductType is added, but there is no repo to handle it, an error will be thrown by the repo factory service to indicate this to the developer).

The two main view components and other supporting services can remain unchanged. 

## Build

After running `npm install`, run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Tests

Run `ng test` to execute the unit tests via [Karma]
Each component and service has a corresponding .spec file which contains the unit tests (31 tests total). Tests are strictly scoped to the method-level and spies are used to keep tests from executing code outside of the method being tested. Running 'ng test --code-coverage' will generate the coverage report. Statements, Branches, Functions, and Lines are currently all covered over 85%.