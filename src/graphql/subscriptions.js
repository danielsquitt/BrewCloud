/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      type
      companyId
      alias
      description
      connStatus
      createdOn
      updatedOn
      company {
        id
        name
        initImg {
          bucket
          region
          key
        }
        faviIcon {
          bucket
          region
          key
        }
        devices {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice {
    onUpdateDevice {
      id
      type
      companyId
      alias
      description
      connStatus
      createdOn
      updatedOn
      company {
        id
        name
        initImg {
          bucket
          region
          key
        }
        faviIcon {
          bucket
          region
          key
        }
        devices {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice {
    onDeleteDevice {
      id
      type
      companyId
      alias
      description
      connStatus
      createdOn
      updatedOn
      company {
        id
        name
        initImg {
          bucket
          region
          key
        }
        faviIcon {
          bucket
          region
          key
        }
        devices {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
      id
      name
      initImg {
        bucket
        region
        key
      }
      faviIcon {
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
          createdOn
          updatedOn
        }
        nextToken
      }
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
      initImg {
        bucket
        region
        key
      }
      faviIcon {
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
          createdOn
          updatedOn
        }
        nextToken
      }
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
      initImg {
        bucket
        region
        key
      }
      faviIcon {
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
          createdOn
          updatedOn
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
