import * as Enums from '../Enums'

export default {
  defaultList: [
    {
      name: 'Ether',
      code: 'ETH',
      logo: '',
      address: '0x0000000000000000000000000000000000000000',
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
      reserveToken: null,
      type: Enums.TokenType.Erc223,
    },
  ],
}
