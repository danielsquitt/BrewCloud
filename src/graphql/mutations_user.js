export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
  ) {
    updateDevice(input: $input) {
      alias
    }
  }
`;