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
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
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
      _version
      _deleted
      _lastChangedAt
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
          _version
          _deleted
          _lastChangedAt
          createdOn
          updatedOn
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      name
      deviceTypeId
      deviceType {
        id
        name
        shadownName
        telemetryName
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        devices {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice {
    onUpdateDevice {
      id
      name
      deviceTypeId
      deviceType {
        id
        name
        shadownName
        telemetryName
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        devices {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice {
    onDeleteDevice {
      id
      name
      deviceTypeId
      deviceType {
        id
        name
        shadownName
        telemetryName
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      companyId
      alias
      description
      connStatus
      CRUD_Group
      R_Group
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        devices {
          nextToken
          startedAt
        }
      }
    }
  }
`;
