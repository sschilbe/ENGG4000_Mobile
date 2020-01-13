/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateSensorInput = {
  id?: string | null;
  type: SensorType;
  name: string;
};

export enum SensorType {
  force = "force",
  accel = "accel",
  gyro = "gyro"
}

export type ModelSensorConditionInput = {
  type?: ModelSensorTypeInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelSensorConditionInput | null> | null;
  or?: Array<ModelSensorConditionInput | null> | null;
  not?: ModelSensorConditionInput | null;
};

export type ModelSensorTypeInput = {
  eq?: SensorType | null;
  ne?: SensorType | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateSensorInput = {
  id: string;
  type?: SensorType | null;
  name?: string | null;
};

export type DeleteSensorInput = {
  id?: string | null;
};

export type CreateDataInput = {
  id?: string | null;
  value: number;
  time: string;
  dataSensorId: string;
};

export type ModelDataConditionInput = {
  value?: ModelIntInput | null;
  time?: ModelStringInput | null;
  and?: Array<ModelDataConditionInput | null> | null;
  or?: Array<ModelDataConditionInput | null> | null;
  not?: ModelDataConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateDataInput = {
  id: string;
  value?: number | null;
  time?: string | null;
  dataSensorId?: string | null;
};

export type DeleteDataInput = {
  id?: string | null;
};

export type ModelSensorFilterInput = {
  id?: ModelIDInput | null;
  type?: ModelSensorTypeInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelSensorFilterInput | null> | null;
  or?: Array<ModelSensorFilterInput | null> | null;
  not?: ModelSensorFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelDataFilterInput = {
  id?: ModelIDInput | null;
  value?: ModelIntInput | null;
  time?: ModelStringInput | null;
  and?: Array<ModelDataFilterInput | null> | null;
  or?: Array<ModelDataFilterInput | null> | null;
  not?: ModelDataFilterInput | null;
};

export type CreateSensorMutation = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type UpdateSensorMutation = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type DeleteSensorMutation = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type CreateDataMutation = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type UpdateDataMutation = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type DeleteDataMutation = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type GetSensorQuery = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type ListSensorsQuery = {
  __typename: "ModelSensorConnection";
  items: Array<{
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetDataQuery = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type ListDatasQuery = {
  __typename: "ModelDataConnection";
  items: Array<{
    __typename: "Data";
    id: string;
    value: number;
    time: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateSensorSubscription = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type OnUpdateSensorSubscription = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type OnDeleteSensorSubscription = {
  __typename: "Sensor";
  id: string;
  type: SensorType;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
};

export type OnCreateDataSubscription = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type OnUpdateDataSubscription = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

export type OnDeleteDataSubscription = {
  __typename: "Data";
  id: string;
  value: number;
  time: string;
  sensor: {
    __typename: "Sensor";
    id: string;
    type: SensorType;
    name: string;
  };
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateSensor(
    input: CreateSensorInput,
    condition?: ModelSensorConditionInput
  ): Promise<CreateSensorMutation> {
    const statement = `mutation CreateSensor($input: CreateSensorInput!, $condition: ModelSensorConditionInput) {
        createSensor(input: $input, condition: $condition) {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateSensorMutation>response.data.createSensor;
  }
  async UpdateSensor(
    input: UpdateSensorInput,
    condition?: ModelSensorConditionInput
  ): Promise<UpdateSensorMutation> {
    const statement = `mutation UpdateSensor($input: UpdateSensorInput!, $condition: ModelSensorConditionInput) {
        updateSensor(input: $input, condition: $condition) {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateSensorMutation>response.data.updateSensor;
  }
  async DeleteSensor(
    input: DeleteSensorInput,
    condition?: ModelSensorConditionInput
  ): Promise<DeleteSensorMutation> {
    const statement = `mutation DeleteSensor($input: DeleteSensorInput!, $condition: ModelSensorConditionInput) {
        deleteSensor(input: $input, condition: $condition) {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteSensorMutation>response.data.deleteSensor;
  }
  async CreateData(
    input: CreateDataInput,
    condition?: ModelDataConditionInput
  ): Promise<CreateDataMutation> {
    const statement = `mutation CreateData($input: CreateDataInput!, $condition: ModelDataConditionInput) {
        createData(input: $input, condition: $condition) {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateDataMutation>response.data.createData;
  }
  async UpdateData(
    input: UpdateDataInput,
    condition?: ModelDataConditionInput
  ): Promise<UpdateDataMutation> {
    const statement = `mutation UpdateData($input: UpdateDataInput!, $condition: ModelDataConditionInput) {
        updateData(input: $input, condition: $condition) {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateDataMutation>response.data.updateData;
  }
  async DeleteData(
    input: DeleteDataInput,
    condition?: ModelDataConditionInput
  ): Promise<DeleteDataMutation> {
    const statement = `mutation DeleteData($input: DeleteDataInput!, $condition: ModelDataConditionInput) {
        deleteData(input: $input, condition: $condition) {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteDataMutation>response.data.deleteData;
  }
  async GetSensor(id: string): Promise<GetSensorQuery> {
    const statement = `query GetSensor($id: ID!) {
        getSensor(id: $id) {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSensorQuery>response.data.getSensor;
  }
  async ListSensors(
    filter?: ModelSensorFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSensorsQuery> {
    const statement = `query ListSensors($filter: ModelSensorFilterInput, $limit: Int, $nextToken: String) {
        listSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            type
            name
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSensorsQuery>response.data.listSensors;
  }
  async GetData(id: string): Promise<GetDataQuery> {
    const statement = `query GetData($id: ID!) {
        getData(id: $id) {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetDataQuery>response.data.getData;
  }
  async ListDatas(
    filter?: ModelDataFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListDatasQuery> {
    const statement = `query ListDatas($filter: ModelDataFilterInput, $limit: Int, $nextToken: String) {
        listDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            value
            time
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListDatasQuery>response.data.listDatas;
  }
  OnCreateSensorListener: Observable<OnCreateSensorSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateSensor {
        onCreateSensor {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateSensorSubscription>;

  OnUpdateSensorListener: Observable<OnUpdateSensorSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSensor {
        onUpdateSensor {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateSensorSubscription>;

  OnDeleteSensorListener: Observable<OnDeleteSensorSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSensor {
        onDeleteSensor {
          __typename
          id
          type
          name
          data {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteSensorSubscription>;

  OnCreateDataListener: Observable<OnCreateDataSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateData {
        onCreateData {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`
    )
  ) as Observable<OnCreateDataSubscription>;

  OnUpdateDataListener: Observable<OnUpdateDataSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateData {
        onUpdateData {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`
    )
  ) as Observable<OnUpdateDataSubscription>;

  OnDeleteDataListener: Observable<OnDeleteDataSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteData {
        onDeleteData {
          __typename
          id
          value
          time
          sensor {
            __typename
            id
            type
            name
          }
        }
      }`
    )
  ) as Observable<OnDeleteDataSubscription>;
}
