# Custom Shopify Theme
Directory structure aligned with Shopify 1.0 theme development.

### Project Links
- [Demo Link](https://codepen.io/jodriscoll/live/jENEpWm/b4d0b88fefdf93d02d866ec1eee2c6f2)
- [Demo Codebase](https://codepen.io/jodriscoll/pen/jENEpWm/b4d0b88fefdf93d02d866ec1eee2c6f2?editors=1100)
- [Production](https://www.zugucase.com/incaseofdeath)
- [Product Template "shirt" Overrides](https://gist.github.com/jodriscoll/31e84be1728da822eac91a4d99e94ff0)

---

## Local Development
If you'd like to configure a local development workflow, the following process can be followed to accomplish this.

1. Execute `npm install -g @shopify/cli@latest`
    - **Note:** You must be running `npm` version `^18.20.0 || >=20.10.0`
2. Execute `shopify` to validate your installation and version
3. Test the `shopify-cli` by executing `shopify theme check`
4. Spin up a local environment by executing `shopify theme dev --store={the_store_url}`
    - **Note:** You must have a storefront to connect to, otherwise it will fail

To learn more about `shopify-cli`, read about it [here](https://shopify.dev/docs/storefronts/themes/getting-started/create).
