# Test project

## [Here](https://640f63b06ba44700889bbe4e--comfy-twilight-e67928.netlify.app/) you can see app live

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Thank you for taking your time and to review my project. 

### I did not implement everything I wanted, so the list of things I was thinking could be useful to implement next are: 

1. Use pnpm (For such small project it doesn't make a big difference, but for the bigger real-world apps, perfomant npm is a better choice.)
2. Separate page for each card (Wrap each product card in an anchor and using dynamic pages, display each card separately.)
3. Allow user to choose how many products per page to view (add input/select) and push that data to router `perPage=`)
4. Lazy loading products (only load when page is clicked)
5. In pagination have arrows to move one page left and right (and/or hide all pages buttons, and keep only a a few in both directions, the rest hide befind [...])
6. Add products to busket
7. Show busket page with all chosen products (like with favorites)
8. Error page (In Nuxt it can be (for example) created inside the `layouts` folder)
9. Add unit testing (test that click event actually updates displayed data)
10. Visual testing (no elements overflow, resizes correctly etc.)

# Have a great day!
