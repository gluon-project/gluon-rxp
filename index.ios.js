import 'babel-preset-react-native-web3/globals';
global.navigator = {
  userAgent: 'React Native',
}
require('./dist/index');
