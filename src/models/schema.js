export const schema = {
    "models": {
        "Company": {
            "name": "Company",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "initImg": {
                    "name": "initImg",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "faviIcon": {
                    "name": "faviIcon",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "devices": {
                    "name": "devices",
                    "isArray": true,
                    "type": {
                        "model": "Device"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "company"
                    }
                },
                "CRUD_Group": {
                    "name": "CRUD_Group",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "R_Group": {
                    "name": "R_Group",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Companies",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "companyByName",
                        "fields": [
                            "name"
                        ],
                        "queryField": "companyByName"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "R_Group",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "Device": {
            "name": "Device",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "deviceTypeId": {
                    "name": "deviceTypeId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "deviceType": {
                    "name": "deviceType",
                    "isArray": false,
                    "type": {
                        "model": "DeviceType"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id"
                    }
                },
                "company": {
                    "name": "company",
                    "isArray": false,
                    "type": {
                        "model": "Company"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "companyId"
                    }
                },
                "alias": {
                    "name": "alias",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "connStatus": {
                    "name": "connStatus",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "CRUD_Group": {
                    "name": "CRUD_Group",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "R_Group": {
                    "name": "R_Group",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            },
            "syncable": true,
            "pluralName": "Devices",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "timestamps": {
                            "createdAt": "createdOn",
                            "updatedAt": "updatedOn"
                        }
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCompanyId",
                        "fields": [
                            "companyId",
                            "alias"
                        ],
                        "queryField": "deviceByCompanyId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "R_Group",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "CRUD_Group",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "DeviceType": {
            "name": "DeviceType",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "shadownName": {
                    "name": "shadownName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "telemetryName": {
                    "name": "telemetryName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "DeviceTypes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "subscriptions": null
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "S3Object": {
            "name": "S3Object",
            "fields": {
                "bucket": {
                    "name": "bucket",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "region": {
                    "name": "region",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "key": {
                    "name": "key",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "50fa6d6b1e469f233b4182e81266f51e"
};