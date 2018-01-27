export default [
  {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'name': '_name',
        'type': 'string',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '_totalSupply',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'name': '_decimals',
        'type': 'uint8',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'MAX_UINT256',
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
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address',
      },
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': 'balance',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'name': '_symbol',
        'type': 'string',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
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
    'name': 'transfer',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'name': '_initialAmount',
        'type': 'uint256',
      },
      {
        'name': '_tokenName',
        'type': 'string',
      },
      {
        'name': '_decimalUnits',
        'type': 'uint8',
      },
      {
        'name': '_tokenSymbol',
        'type': 'string',
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
        'indexed': true,
        'name': 'from',
        'type': 'address',
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'data',
        'type': 'bytes',
      },
    ],
    'name': 'Transfer',
    'type': 'event',
  },
]
