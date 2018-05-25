import * as Enums from '../Enums'

export const etherAddress = '0x0000000000000000000000000000000000000000'
export const gluonAddress = '0x0e790233e78b0252d7d1c1cfdd2af30e5ffa0a46'

export default {
  etherAddress,
  gluonAddress,
  defaultList: [
    {
      name: 'Ether',
      code: 'ETH',
      logo: '',
      address: etherAddress,
      decimals: 18,
      type: Enums.TokenType.ETH,
    },
    {
      name: 'Gluon',
      code: 'GLU',
      logo: '',
      address: gluonAddress,
      networkId: '4',
      decimals: 0,
      exponent: 2,
      reserveToken: etherAddress,
      type: Enums.TokenType.Erc223,
    },
  ],
}
