export const companyByName = /* GraphQL */ `
  query CompanyByName(
    $name: String
  ) {
    companyByName(
      name: $name
    ) {
      items {
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
      }
    }
  }
`;

export const listCompanys = /* GraphQL */ `
  query ListCompanys {
    listCompanys {
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
      }
    }
  }
`;

export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
  ) {
    listDevices(filter: $filter) {
      items {
        id
        name
        alias
        description
        deviceType {
          id
          name
          shadownName
          telemetryName
        }
      }
    }
  }
`;
