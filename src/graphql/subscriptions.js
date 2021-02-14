/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
      id
      name
      InitImg {
        bucket
        region
        key
      }
      devices {
        items {
          id
          type
          companyId
          alias
          description
          connStatus
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
      id
      name
      InitImg {
        bucket
        region
        key
      }
      devices {
        items {
          id
          type
          companyId
          alias
          description
          connStatus
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
      id
      name
      InitImg {
        bucket
        region
        key
      }
      devices {
        items {
          id
          type
          companyId
          alias
          description
          connStatus
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      type
      companyId
      company {
        id
        name
        InitImg {
          bucket
          region
          key
        }
        devices {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      alias
      description
      connStatus
      _version
      _deleted
      _lastChangedAt
      createdOn
      updatedOn
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice {
    onUpdateDevice {
      id
      type
      companyId
      company {
        id
        name
        InitImg {
          bucket
          region
          key
        }
        devices {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      alias
      description
      connStatus
      _version
      _deleted
      _lastChangedAt
      createdOn
      updatedOn
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice {
    onDeleteDevice {
      id
      type
      companyId
      company {
        id
        name
        InitImg {
          bucket
          region
          key
        }
        devices {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      alias
      description
      connStatus
      _version
      _deleted
      _lastChangedAt
      createdOn
      updatedOn
    }
  }
`;
