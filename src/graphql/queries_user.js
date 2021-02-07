export const companyByName = /* GraphQL */ `
  query CompanyByName(
    $name: String
  ) {
    companyByName(
      name: $name
    ) {
      items {
        InitImg {
          bucket
          region
          key
        }
      }
    }
  }
`;