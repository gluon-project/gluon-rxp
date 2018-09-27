export default [
  {
    'constant': true,
    'inputs': [],
    'name': 'gluon',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'isCommunityToken',
    'outputs': [
      {
        'name': '',
        'type': 'bool',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'createdTokens',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'name': 'gluonAddress',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'name',
        'type': 'string',
      },
      {
        'indexed': false,
        'name': 'addr',
        'type': 'address',
      },
    ],
    'name': 'TokenCreated',
    'type': 'event',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address',
      },
      {
        'name': '_value',
        'type': 'uint256',
      },
      {
        'name': '_data',
        'type': 'bytes',
      },
    ],
    'name': 'tokenFallback',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_name',
        'type': 'string',
      },
      {
        'name': '_decimals',
        'type': 'uint8',
      },
      {
        'name': '_symbol',
        'type': 'string',
      },
      {
        'name': 'exponent',
        'type': 'uint8',
      },
    ],
    'name': 'createCommunityToken',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_name',
        'type': 'string',
      },
      {
        'name': '_decimals',
        'type': 'uint8',
      },
      {
        'name': '_symbol',
        'type': 'string',
      },
      {
        'name': 'exponent',
        'type': 'uint8',
      },
    ],
    'name': 'createEthCommunityToken',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_name',
        'type': 'string',
      },
      {
        'name': '_decimals',
        'type': 'uint8',
      },
      {
        'name': '_symbol',
        'type': 'string',
      },
      {
        'name': 'exponent',
        'type': 'uint8',
      },
      {
        'name': 'numTokens',
        'type': 'uint256',
      },
    ],
    'name': 'createEthCommunityTokenAndMint',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_name',
        'type': 'string',
      },
      {
        'name': '_decimals',
        'type': 'uint8',
      },
      {
        'name': '_symbol',
        'type': 'string',
      },
      {
        'name': '_totalSupply',
        'type': 'uint256',
      },
    ],
    'name': 'createERC20Token',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getNumberOfCreatedTokens',
    'outputs': [
      {
        'name': '',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
]
