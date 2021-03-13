/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeviceType = /* GraphQL */ `
  query GetDeviceType($id: ID!) {
    getDeviceType(id: $id) {
      id
      name
      shadownName
      createdAt
      updatedAt
    }
  }
`;
export const listDeviceTypes = /* GraphQL */ `
  query ListDeviceTypes(
    $filter: ModelDeviceTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeviceTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        shadownName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const companyByName = /* GraphQL */ `
  query CompanyByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
          name
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
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
      id
      name
      deviceTypeId
      deviceType {
        id
        name
        shadownName
        createdAt
        updatedAt
      }
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
    }
  }
`;
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        deviceTypeId
        deviceType {
          id
          name
          shadownName
          createdAt
          updatedAt
        }
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
          CRUD_Group
          R_Group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const deviceByCompanyId = /* GraphQL */ `
  query DeviceByCompanyId(
    $companyId: ID
    $alias: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    deviceByCompanyId(
      companyId: $companyId
      alias: $alias
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        deviceTypeId
        deviceType {
          id
          name
          shadownName
          createdAt
          updatedAt
        }
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
          CRUD_Group
          R_Group
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
