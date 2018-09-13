import * as Enums from '../Enums'

export const etherAddress = '0x0000000000000000000000000000000000000000'
export const gluonAddress = '0x099bd590c2e795eb9c5c4797da73a2e6f757decd'
export const communityTokenFactoryAddress = '0x2484d47c306f9ec5e47d09e1616849a80ac3d6eb'

export default {
  etherAddress,
  gluonAddress,
  communityTokenFactoryAddress,
  defaultList: [
    {
      name: 'Ether',
      code: 'ETH',
      logo: '',
      address: etherAddress,
      decimals: 18,
      type: Enums.TokenType.ETH,
    },
    // {
    //   name: 'Gluon',
    //   code: 'GLU',
    //   logo: '',
    //   address: gluonAddress,
    //   networkId: '4',
    //   decimals: 0,
    //   exponent: 2,
    //   reserveToken: etherAddress,
    //   type: Enums.TokenType.Erc223,
    // },
  ],
}
