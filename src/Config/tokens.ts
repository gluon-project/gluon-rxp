import * as Enums from '../Enums'

export const etherAddress = '0x0000000000000000000000000000000000000000'

export default {
  etherAddress,
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
      address: '0xcf1fddb1a2564a6447cfb5a66f147798fa793a9d',
      networkId: '4',
      decimals: 18,
      exponent: 2,
      reserveToken: etherAddress,
      type: Enums.TokenType.Erc223,
    },
  ],
}
