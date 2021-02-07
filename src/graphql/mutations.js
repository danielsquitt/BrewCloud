/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
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
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
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
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
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
