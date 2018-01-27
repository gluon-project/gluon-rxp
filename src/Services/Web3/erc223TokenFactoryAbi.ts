export default [
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address',
      },
      {
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'created',
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
        'name': '_tokenContract',
        'type': 'address',
      },
    ],
    'name': 'verifyERC223Token',
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
    'constant': false,
    'inputs': [
      {
        'name': '_initialAmount',
        'type': 'uint256',
      },
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
    ],
    'name': 'createERC223Token',
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
    'name': 'humanStandardByteCode',
    'outputs': [
      {
        'name': '',
        'type': 'bytes',
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
    'name': 'isHumanToken',
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
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
]
