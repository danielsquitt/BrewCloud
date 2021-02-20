/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      CRUD_Group
      R_Group
      createdAt
      updatedAt
      devices {
        items {
          id
          deviceTypeId
          companyId
          alias
          description
          connStatus
          CRUD_Group
          R_Group
          createdOn
          updatedOn
        }
        nextToken
      }
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
      CRUD_Group
      R_Group
      createdAt
      updatedAt
      devices {
        items {
          id
          deviceTypeId
          companyId
          alias
          description
          connStatus
          CRUD_Group
          R_Group
          createdOn
          updatedOn
        }
        nextToken
      }
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
      CRUD_Group
      R_Group
      createdAt
      updatedAt
      devices {
        items {
          id
          deviceTypeId
          companyId
          alias
          description
          connStatus
          CRUD_Group
          R_Group
          createdOn
          updatedOn
        }
        nextToken
      }
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      deviceTypeId
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
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
        CRUD_Group
        R_Group
        createdAt
        updatedAt
        devices {
          nextToken
        }
      }
      deviceType {
        id
        name
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
      deviceTypeId
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
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
        CRUD_Group
        R_Group
        createdAt
        updatedAt
        devices {
          nextToken
        }
      }
      deviceType {
        id
        name
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
      deviceTypeId
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
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
        CRUD_Group
        R_Group
        createdAt
        updatedAt
        devices {
          nextToken
        }
      }
      deviceType {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
