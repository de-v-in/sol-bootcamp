export type Solancer = {
  version: '0.1.0';
  name: 'solancer';
  instructions: [
    {
      name: 'createDeveloper';
      accounts: [
        {
          name: 'developer';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'profileImageUrl';
          type: 'string';
        },
        {
          name: 'role';
          type: 'string';
        },
        {
          name: 'cvUrl';
          type: 'string';
        }
      ];
    },
    {
      name: 'createCompany';
      accounts: [
        {
          name: 'company';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'profileImageUrl';
          type: 'string';
        },
        {
          name: 'role';
          type: 'string';
        }
      ];
    },
    {
      name: 'createJd';
      accounts: [
        {
          name: 'jd';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'title';
          type: 'string';
        },
        {
          name: 'jdContentUrl';
          type: 'string';
        },
        {
          name: 'maxSlot';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'developerAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'walletAddress';
            type: 'publicKey';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'profileImageUrl';
            type: 'string';
          },
          {
            name: 'role';
            type: 'string';
          },
          {
            name: 'point';
            type: 'u64';
          },
          {
            name: 'cvUrl';
            type: 'string';
          }
        ];
      };
    },
    {
      name: 'companyAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'walletAddress';
            type: 'publicKey';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'profileImageUrl';
            type: 'string';
          },
          {
            name: 'role';
            type: 'string';
          },
          {
            name: 'point';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'jdAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'company';
            type: 'publicKey';
          },
          {
            name: 'title';
            type: 'string';
          },
          {
            name: 'jdContentUrl';
            type: 'string';
          },
          {
            name: 'maxSlot';
            type: 'u64';
          },
          {
            name: 'acceptedList';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'pendingList';
            type: {
              vec: {
                defined: 'PendingSubmission';
              };
            };
          },
          {
            name: 'isAvailable';
            type: 'bool';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'PendingSubmission';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'msg';
            type: 'string';
          },
          {
            name: 'developer';
            type: 'publicKey';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'CannotCreateUser';
      msg: 'User cannot be created, missing data';
    },
    {
      code: 6001;
      name: 'CannotCreateJD';
      msg: 'JD cannot be created, missing data';
    },
    {
      code: 6002;
      name: 'InvalidJDMaxSlot';
      msg: 'JD cannot be created, max slot is 0 or greater than 50';
    },
    {
      code: 6003;
      name: 'CannotCreateSubmission';
      msg: 'Submission cannot be created, missing data';
    }
  ];
};

export const IDL: Solancer = {
  version: '0.1.0',
  name: 'solancer',
  instructions: [
    {
      name: 'createDeveloper',
      accounts: [
        {
          name: 'developer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'profileImageUrl',
          type: 'string',
        },
        {
          name: 'role',
          type: 'string',
        },
        {
          name: 'cvUrl',
          type: 'string',
        },
      ],
    },
    {
      name: 'createCompany',
      accounts: [
        {
          name: 'company',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'profileImageUrl',
          type: 'string',
        },
        {
          name: 'role',
          type: 'string',
        },
      ],
    },
    {
      name: 'createJd',
      accounts: [
        {
          name: 'jd',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'jdContentUrl',
          type: 'string',
        },
        {
          name: 'maxSlot',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'developerAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'walletAddress',
            type: 'publicKey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'profileImageUrl',
            type: 'string',
          },
          {
            name: 'role',
            type: 'string',
          },
          {
            name: 'point',
            type: 'u64',
          },
          {
            name: 'cvUrl',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'companyAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'walletAddress',
            type: 'publicKey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'profileImageUrl',
            type: 'string',
          },
          {
            name: 'role',
            type: 'string',
          },
          {
            name: 'point',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'jdAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'company',
            type: 'publicKey',
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'jdContentUrl',
            type: 'string',
          },
          {
            name: 'maxSlot',
            type: 'u64',
          },
          {
            name: 'acceptedList',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'pendingList',
            type: {
              vec: {
                defined: 'PendingSubmission',
              },
            },
          },
          {
            name: 'isAvailable',
            type: 'bool',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'PendingSubmission',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'msg',
            type: 'string',
          },
          {
            name: 'developer',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'CannotCreateUser',
      msg: 'User cannot be created, missing data',
    },
    {
      code: 6001,
      name: 'CannotCreateJD',
      msg: 'JD cannot be created, missing data',
    },
    {
      code: 6002,
      name: 'InvalidJDMaxSlot',
      msg: 'JD cannot be created, max slot is 0 or greater than 50',
    },
    {
      code: 6003,
      name: 'CannotCreateSubmission',
      msg: 'Submission cannot be created, missing data',
    },
  ],
};
