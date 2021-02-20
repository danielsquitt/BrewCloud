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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
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
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
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
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
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
export const createDeviceType = /* GraphQL */ `
  mutation CreateDeviceType(
    $input: CreateDeviceTypeInput!
    $condition: ModelDeviceTypeConditionInput
  ) {
    createDeviceType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateDeviceType = /* GraphQL */ `
  mutation UpdateDeviceType(
    $input: UpdateDeviceTypeInput!
    $condition: ModelDeviceTypeConditionInput
  ) {
    updateDeviceType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteDeviceType = /* GraphQL */ `
  mutation DeleteDeviceType(
    $input: DeleteDeviceTypeInput!
    $condition: ModelDeviceTypeConditionInput
  ) {
    deleteDeviceType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
