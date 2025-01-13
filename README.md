# "In Case of Death" Shopify Theme
[![Production Site](https://img.shields.io/badge/Production-zugucases.com%2Fincaseofdeath-brightgreen)](https://www.zugucase.com/incaseofdeath)
[![Product](https://img.shields.io/badge/Product%20Template-Shopify-brightgreen)](https://www.zugucase.com/products/the-in-case-of-death-case)
[![Static Demo](https://img.shields.io/badge/Static%20Demo-Codepen-blue)](https://codepen.io/jodriscoll/live/jENEpWm/b4d0b88fefdf93d02d866ec1eee2c6f2)
[![Static Sandbox](https://img.shields.io/badge/Sandbox-Codepen-orange)](https://codepen.io/jodriscoll/pen/jENEpWm/b4d0b88fefdf93d02d866ec1eee2c6f2?editors=1100)
[![Product Template Overrides](https://img.shields.io/badge/Product%20Template%20Overrides-GitHub-purple)](https://gist.github.com/jodriscoll/31e84be1728da822eac91a4d99e94ff0)

## Tech Stack
<p>
  <img alt="Shopify" src="https://img.shields.io/badge/-Shopify-7AB55C?style=flat-square&logo=shopify&logoColor=white" />
  <img alt="Liquid" src="https://img.shields.io/badge/-Liquid-blue?style=flat-square&logo=shopify&logoColor=white" />
  <img alt="HTML5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img alt="CSS" src="https://img.shields.io/badge/-CSS-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img alt="SCSS" src="https://img.shields.io/badge/-SCSS-DD3A0A?style=flat-square&logo=sass&logoColor=white" />
  <img alt="Git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" />
</p>

## Local Development
Configuring a local development workflow is easy with [`shopify-cli`](https://shopify.dev/docs/storefronts/themes/getting-started/create), as long as [`npm`](https://nodejs.org/en/download/) is already installed:

1. Execute `npm install -g @shopify/cli@latest`
    - **Note:** You must be running `npm` version `^18.20.0 || >=20.10.0`
2. Execute `shopify` to validate your installation and version
3. Pull your theme by executing `shopify theme pull`
    - **Note:** You'll go through a browser-based login process to connect your storefront with your `cli`
    - You'll see a list of themes attached the connected storefront – pick the one you'd like to work with.
4. Prop up a local development environment by executing `shopify theme dev`
    - You'll get a localhost URL that you're able to work with locally to your machine
    - You'll also get a "preview link" that you're able to share with others to view your changes **without updating the actual theme** in Shopify
5. If you're happy with your changes locally, you can execute `shopify theme push`
    - **Note:* You should test the theme codebase by executing `shopify theme check` and resolving any errors before pushing

If you're working with a theme that isn't the active theme for the Shopify site, you can execute `shopify theme publish` to make it the active theme.
