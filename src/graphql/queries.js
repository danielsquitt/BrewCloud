/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
        InitImg {
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
      nextToken
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
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
        }
        createdAt
        updatedAt
      }
      alias
      description
      connStatus
      createdOn
      updatedOn
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
        type
        companyId
        company {
          id
          name
          createdAt
          updatedAt
        }
        alias
        description
        connStatus
        createdOn
        updatedOn
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
        InitImg {
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
      nextToken
    }
  }
`;
export const deviceByCompanyId = /* GraphQL */ `
  query DeviceByCompanyId(
    $companyId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    deviceByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        companyId
        company {
          id
          name
          createdAt
          updatedAt
        }
        alias
        description
        connStatus
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
