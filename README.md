# React Phone Catalog

The "React Phone Catalog" app is a web application that allows users to browse and explore a catalog of mobile phones, tablets, and accessories. The app follows a clean and structured design provided in [Figma Design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?type=design&node-id=14-49&mode=design&t=hubLt6D4F2f60Q2O-0), with various pages and functionalities.

## Key Features

### Home Page

Displays a slider with "Hot prices" and a "Brand new" block showcasing the latest products.
Users can navigate between images in the slider and swipe pictures automatically every 5 seconds.
Offers a "Shop by category" section with links to specific product categories.
Provides pagination options and sorting features for efficient navigation.
Utilizes localStorage to store the user's Cart.

### Phones, Tablets, and Accessories Pages

Dedicated pages for phones, tablets, and accessories, each with a title, product list, and sorting options.
Implements pagination and sorting features for a seamless user experience.
Displays a loader while fetching data from the server.
Allows users to sort products by newest, alphabetically, or cheapest.
Saves sorting and pagination preferences in the URL for persistence.

### Product Details Page

Individual pages for each product with detailed information, images, and technical specifications.
Users can choose product variants, view suggested products, and navigate back to the previous page.
Breadcrumbs provide easy navigation through the app.

### Cart Page

A dedicated cart page displaying added items, quantities, and total amount.
Users can add products to the cart, remove items, and adjust quantities.
Cart information is stored in localStorage for persistence.
The checkout button, when clicked, displays a message indicating the feature is not yet implemented.

### Favorites Page

A page showcasing favorite products with the ability to add/remove items.
The total count of favorites is displayed near the "Favorites" icon in the header.

### Search Functionality

A search component in the header allows users to filter products based on their query.
The search feature works with pagination and sorting for a seamless experience.
Search parameters are saved in the URL, and there's a debounce mechanism for efficient searching.

### Additional Features

A header with navigation links, including favorites and cart icons.
A sidebar (burger menu) for navigation on phone designs.
A cart/favorite section that slides in from the bottom for phone designs.
A footer with a link to the GitHub repository, LinkedIn and an optional "Back to top" button.
A "Not Found" page for handling invalid URLs, redirecting users to the home page.
Specific states, such as "Phone not found," are implemented to handle various scenarios gracefully.

The "React Phone Catalog" app provides a user-friendly interface for exploring and managing products in the catalog, with attention to detail in terms of design, functionality, and user experience.

#### [DEMO LINK](https://mariasnegireva.github.io/phone-catalog/)

#### [LinkedIn LINK](https://www.linkedin.com/in/mariasnegireva/)

#### [Figma Design](https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original?type=design&node-id=15885-6068&mode=design&t=5NB12Oxj2tHbjIbI-0)

#### Used

- React
- TypeScript
- localStorage
- API
- Sass
- BEM
- Grid
- Flexbox
- Transformations and Animations
- [Figma](https://www.figma.com/)
- [Google Fonts](https://fonts.google.com/)

#### Run Locally

Clone the project

```bash
  git clone
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the development server with the following command

```bash
  npm start
```
