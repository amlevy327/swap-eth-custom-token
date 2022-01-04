# Name
swap-eth-custom-token

# Description

A simple swap from ETH to a custom ERC-20 token

# Requirements

For Rinkeby interaction and deployment:
-Install [MetaMask](https://metamask.io/download) and create a free account\
-Obtain [Rinkeby test ETH](https://faucet.rinkeby.io/)

For local deployment:
-Install [MetaMask](https://metamask.io/download) and create a free account\
-Obtain [Rinkeby test ETH](https://faucet.rinkeby.io/) for test gas fees\
-Install [Ganache](https://trufflesuite.com/ganache/) to run local blockchain

# Usage

## Interact with sample project deployed on Rinkeby test net (LUV token)

To interact with a deployed version of this project you can visit:
- Deployed contract on [Etherscan](https://rinkeby.etherscan.io/address/0x4D915D76f51a6Ca80C20DE2eEf7ea56D67DFf4ED)\
- Front end dapp [here](https://swap-eth-luv.surge.sh/)

## Interact with local clone

### Clone repo and install packages

```
git clone https://github.com/amlevy327/swap-eth-custom-token
cd swap-eth-custom-token
npm i
```

### Setup .env file

Visit [Infura](https://infura.io/) to create profile and project.\
Create .env file and add:
> PRIVATE_KEYS="{YOUR_KEY_HERE}"\
> INFURA_API_KEY={YOUR_KEY_HERE}

### Test locally

npx truffle test

### Customize your token - update migration files
Modify 2_deploy_contract.js for your custom token.\
You may change the following parameters:
- tokenName
- tokenSymbol
- exchangeRate (tokens per ETH)

### Deploy locally

1. Start Ganache on port 7545
2. [Import](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) your private key (make sure is a Ganache private key only!)
3. Start development server and migrate contracts
```
npx truffle migrate --network development --reset
yarn start
```

### Deploy on Rinkeby test net

Start development server and migrate contracts
```
npx truffle migrate --network rinkeby --reset
yarn start
```

# REACT BOILERPLATE: Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
