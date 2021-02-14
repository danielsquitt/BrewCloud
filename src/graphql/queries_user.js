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