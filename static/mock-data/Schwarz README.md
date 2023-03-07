# SIT BCN FRONTEND CHALLLENGE

First of all, thanks for considering SIT BCN as your future workplace. Here's a little exercise for evaluating some technical skills required for the position we consider you are a good candidate. This exercise should not take longer than 10 hours.

## Context

Our backoffice received a list of new articles that we need to visualise in our logistic centers screens, we got a huge JSON file with the articles and their properties, and we would like to show them using a visual representation, showing all of their attributes allow some filtering.

Each product have the following information:

````json
{
    "id": "2535651d-d3a1-4bc8-98de-f5ead6cda08e",
    "category": "X",
    "description": "Ea cillum culpa esse ad nisi. Quis adipisicing fugiat amet dolore duis ad velit nisi reprehenderit id voluptate in anim exercitation. Fugiat id nisi velit in laboris aute reprehenderit nulla duis pariatur elit labore do. Tempor adipisicing non laboris reprehenderit elit dolore. Pariatur eu excepteur dolore qui sint magna consequat Lorem velit nisi officia aliqua.\r\n",
    "discount": {
      "status": true,
      "value": 66
    },
    "isActive": false,
    "name": "laborum eiusmod consequat",
    "picture": "https://picsum.photos/700/700?random=488",
    "price": 87.6316,
    "stock": 14
  },
````

## Exercise

We would like you to prepare a small Frontend application, using any Flavor/Stack/Toolset you prefer, and represent the list of product from `product-list.json`, with their information in a web application.

### Requirements

- Use Typescript
- Allow some kind of filtering/sorting of the product
- Allow pagination

### What we will evaluate

- KISS principle: we want you to find the easiest solution, with no over engineering.
- Single Responsibility Principle (SRP): Modularity is key to ensure maintainability.
- Performance: We want the web application to load as fast as possible, and avoid full reload on page/filter changes.
- Accessability: We want the application to be accessible by keyboard and a big enought color contrast ratio (https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast).
