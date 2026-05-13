# exam-project-1 Online Shop

Online shop built with vanilla JavaScript for Noroff FED1

This is a responsive e-commerce web application using data from the Noroff API.

## Features
Product listing from Noroff API.
Product detail page.
User registration and login.
Shopping cart.
Checkout flow with a success page.

## Tech
HTML
CSS
JavaScript (Vanilla)
Noroff API

## Structure

- `index.html` - Homepage (product feed)
- `/product` - product detail page
- `/account` - Login and register pages
- `/cart` - cart page
- `/checkout` - Checkout page 
- `/success` - order confirmation page

## Progress log

14.04.2026
- Created project structure and GitHub repository
- Set up (kanban) project board
- Defined sitemap and component list
- Designed mobile wireframes (lo-fi) in Figma


15.04.26
- Created hi-fi design with product image from API (https://v2.api.noroff.dev/online-shop)
- Started HTML implementation
- Built reusable layout (header, main, footer)
- Added SVG cart icon (heroicons) (AI_LOG.md)
- Set up global CSS and variables
- Styled homepage (carousel and product grid)


16.04.26
- Completed HTML structure for all pages (home, product, cart, checkout,success)
- Finished global CSS and design systems (colors, spacing, typography)
- Styled all pages to match Figma design
- Implemented responsive layout across pages
- Linked pages together (navigation flow)
- Fixed layout issues (footer positioning and form styling)
- Prepared homepage for dynamic content (product grid container)
- UI phase completed, ready to start JavaScript and API integration


20.04.2026
- Started JavaScript implementation
- Fetched products from Noroff Online Shop API
- Rendered product image, title and price
- Made product cards clickable and linked to product page using ID in URL
- Updated homepage product styling card to match dynamic content

- Built dynamic product page
- Read product ID from URL
- Fetched single product from Noroff API
- Rendered product image, title, price, description and tags
- Handled rating display based on available API data
- Adjusted product page layout for responsive screens

- Built shopping cart functionality with localStorage
- Added Add to Cart from product page
- Stored multiple products in cart
- Rendered cart items dynamically on cart page
- Displayed product image, title and price in cart
- Calculated total price dynamically
- Added remove item functionality
- Added clear cart functionality



21.04.2026
- Built checkout page from cart data
- Rendered order summary dynamically from localStorage
- Calculated checkout total dynamically
- Connected Complete Purchase button to success page
- Cleared cart after complete purchase
- Core e-commerce flow complete


29.04.2026:
- Improved product page functionality:
  - Display discounted price when available
  - Render product tags dynamically
  - Render product reviews dynamically
  - Handle empty review state
- Added share product functionality
- Fixed bugs related to rendering and data handling
- Started carousel functionality


06.05.2026
- Completed cart functionality with quantity controls
- Finished checkout validation and success flow
- Added accessibility improvements (skip link and heading structure)
- Improved homepage with hero section
- Final testing and bug fixes


11.05.2026

- Completed checkout and success page
- Implemented order flow from cart to success
- Cleared cart after purchase
- Added empty state handling from checkout


13.05.2026

- Polish and cleanup across the project
- Improved cart and checkout totals to use disqounted price
- Added feedback when adding products to cart
- Improved empty state handeling for cart and checkout
- Removed unused file (success.js)
- Reviewed project structure, accessibility and consistency 


## Assets
- cart icon from Heroicons (https://heroicons.com/)