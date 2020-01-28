/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateDataInput = {
  id?: string | null;
  values: Array<number | null>;
  time: string;
  dataSessionId: string;
};

export type CreateSessionInput = {
  id?: string | null;
  name: string;
};

export type ModelSessionConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelSessionConditionInput | null> | null;
  or?: Array<ModelSessionConditionInput | null> | null;
  not?: ModelSessionConditionInput | null;
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

export type UpdateSessionInput = {
  id: string;
  name?: string | null;
};

export type DeleteSessionInput = {
  id?: string | null;
};

export type ModelDataConditionInput = {
  sessionID?: ModelIDInput | null;
  value?: ModelIntInput | null;
  time?: ModelStringInput | null;
  and?: Array<ModelDataConditionInput | null> | null;
  or?: Array<ModelDataConditionInput | null> | null;
  not?: ModelDataConditionInput | null;
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
  sessionID?: string | null;
  value?: Array<number | null> | null;
  time?: string | null;
};

export type DeleteDataInput = {
  id?: string | null;
};

export type CreateTagInput = {
  id?: string | null;
  sessionID: string;
  name: string;
};

export type ModelTagConditionInput = {
  sessionID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelTagConditionInput | null> | null;
  or?: Array<ModelTagConditionInput | null> | null;
  not?: ModelTagConditionInput | null;
};

export type UpdateTagInput = {
  id: string;
  sessionID?: string | null;
  name?: string | null;
};

export type DeleteTagInput = {
  id?: string | null;
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelSessionFilterInput | null> | null;
  or?: Array<ModelSessionFilterInput | null> | null;
  not?: ModelSessionFilterInput | null;
};

export type ModelDataFilterInput = {
  id?: ModelIDInput | null;
  sessionID?: ModelIDInput | null;
  value?: ModelIntInput | null;
  time?: ModelStringInput | null;
  and?: Array<ModelDataFilterInput | null> | null;
  or?: Array<ModelDataFilterInput | null> | null;
  not?: ModelDataFilterInput | null;
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null;
  sessionID?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelTagFilterInput | null> | null;
  or?: Array<ModelTagFilterInput | null> | null;
  not?: ModelTagFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type BatchAddDataMutation = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type BatchDeleteDataMutation = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type CreateSessionMutation = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type UpdateSessionMutation = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type DeleteSessionMutation = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type CreateDataMutation = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type UpdateDataMutation = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type DeleteDataMutation = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type CreateTagMutation = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type UpdateTagMutation = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type DeleteTagMutation = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type GetSessionQuery = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type ListSessionsQuery = {
  __typename: "ModelSessionConnection";
  items: Array<{
    __typename: "Session";
    id: string;
    name: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetDataQuery = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type ListDatasQuery = {
  __typename: "ModelDataConnection";
  items: Array<{
    __typename: "Data";
    id: string;
    sessionID: string;
    value: Array<number | null>;
    time: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetTagQuery = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type ListTagsQuery = {
  __typename: "ModelTagConnection";
  items: Array<{
    __typename: "Tag";
    id: string;
    sessionID: string;
    name: string;
  } | null> | null;
  nextToken: string | null;
};

export type DataBySessionIdQuery = {
  __typename: "ModelDataConnection";
  items: Array<{
    __typename: "Data";
    id: string;
    sessionID: string;
    value: Array<number | null>;
    time: string;
  } | null> | null;
  nextToken: string | null;
};

export type TagBySessionIdQuery = {
  __typename: "ModelTagConnection";
  items: Array<{
    __typename: "Tag";
    id: string;
    sessionID: string;
    name: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateSessionSubscription = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type OnUpdateSessionSubscription = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type OnDeleteSessionSubscription = {
  __typename: "Session";
  id: string;
  name: string;
  data: {
    __typename: "ModelDataConnection";
    nextToken: string | null;
  } | null;
  tags: {
    __typename: "ModelTagConnection";
    nextToken: string | null;
  } | null;
};

export type OnCreateDataSubscription = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type OnUpdateDataSubscription = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type OnDeleteDataSubscription = {
  __typename: "Data";
  id: string;
  sessionID: string;
  value: Array<number | null>;
  time: string;
};

export type OnCreateTagSubscription = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type OnUpdateTagSubscription = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

export type OnDeleteTagSubscription = {
  __typename: "Tag";
  id: string;
  sessionID: string;
  name: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async BatchAddData(
    data?: Array<CreateDataInput | null>
  ): Promise<BatchAddDataMutation> {
    const statement = `mutation BatchAddData($data: [CreateDataInput]) {
        batchAddData(data: $data) {
          __typename
          id
          sessionID
          value
          time
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (data) {
      gqlAPIServiceArguments.data = data;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchAddDataMutation>response.data.batchAddData;
  }
  async BatchDeleteData(
    ids?: Array<string | null>
  ): Promise<BatchDeleteDataMutation> {
    const statement = `mutation BatchDeleteData($ids: [ID]) {
        batchDeleteData(ids: $ids) {
          __typename
          id
          sessionID
          value
          time
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (ids) {
      gqlAPIServiceArguments.ids = ids;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <BatchDeleteDataMutation>response.data.batchDeleteData;
  }
  async CreateSession(
    input: CreateSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<CreateSessionMutation> {
    const statement = `mutation CreateSession($input: CreateSessionInput!, $condition: ModelSessionConditionInput) {
        createSession(input: $input, condition: $condition) {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
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
    return <CreateSessionMutation>response.data.createSession;
  }
  async UpdateSession(
    input: UpdateSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<UpdateSessionMutation> {
    const statement = `mutation UpdateSession($input: UpdateSessionInput!, $condition: ModelSessionConditionInput) {
        updateSession(input: $input, condition: $condition) {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
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
    return <UpdateSessionMutation>response.data.updateSession;
  }
  async DeleteSession(
    input: DeleteSessionInput,
    condition?: ModelSessionConditionInput
  ): Promise<DeleteSessionMutation> {
    const statement = `mutation DeleteSession($input: DeleteSessionInput!, $condition: ModelSessionConditionInput) {
        deleteSession(input: $input, condition: $condition) {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
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
    return <DeleteSessionMutation>response.data.deleteSession;
  }
  async CreateData(
    input: CreateDataInput,
    condition?: ModelDataConditionInput
  ): Promise<CreateDataMutation> {
    const statement = `mutation CreateData($input: CreateDataInput!, $condition: ModelDataConditionInput) {
        createData(input: $input, condition: $condition) {
          __typename
          id
          sessionID
          value
          time
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
          sessionID
          value
          time
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
          sessionID
          value
          time
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
  async CreateTag(
    input: CreateTagInput,
    condition?: ModelTagConditionInput
  ): Promise<CreateTagMutation> {
    const statement = `mutation CreateTag($input: CreateTagInput!, $condition: ModelTagConditionInput) {
        createTag(input: $input, condition: $condition) {
          __typename
          id
          sessionID
          name
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
    return <CreateTagMutation>response.data.createTag;
  }
  async UpdateTag(
    input: UpdateTagInput,
    condition?: ModelTagConditionInput
  ): Promise<UpdateTagMutation> {
    const statement = `mutation UpdateTag($input: UpdateTagInput!, $condition: ModelTagConditionInput) {
        updateTag(input: $input, condition: $condition) {
          __typename
          id
          sessionID
          name
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
    return <UpdateTagMutation>response.data.updateTag;
  }
  async DeleteTag(
    input: DeleteTagInput,
    condition?: ModelTagConditionInput
  ): Promise<DeleteTagMutation> {
    const statement = `mutation DeleteTag($input: DeleteTagInput!, $condition: ModelTagConditionInput) {
        deleteTag(input: $input, condition: $condition) {
          __typename
          id
          sessionID
          name
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
    return <DeleteTagMutation>response.data.deleteTag;
  }
  async GetSession(id: string): Promise<GetSessionQuery> {
    const statement = `query GetSession($id: ID!) {
        getSession(id: $id) {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
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
    return <GetSessionQuery>response.data.getSession;
  }
  async ListSessions(
    filter?: ModelSessionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSessionsQuery> {
    const statement = `query ListSessions($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
        listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
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
    return <ListSessionsQuery>response.data.listSessions;
  }
  async GetData(id: string): Promise<GetDataQuery> {
    const statement = `query GetData($id: ID!) {
        getData(id: $id) {
          __typename
          id
          sessionID
          value
          time
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
            sessionID
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
  async GetTag(id: string): Promise<GetTagQuery> {
    const statement = `query GetTag($id: ID!) {
        getTag(id: $id) {
          __typename
          id
          sessionID
          name
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTagQuery>response.data.getTag;
  }
  async ListTags(
    filter?: ModelTagFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTagsQuery> {
    const statement = `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
        listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sessionID
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
    return <ListTagsQuery>response.data.listTags;
  }
  async DataBySessionId(
    sessionID?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelDataFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<DataBySessionIdQuery> {
    const statement = `query DataBySessionId($sessionID: ID, $sortDirection: ModelSortDirection, $filter: ModelDataFilterInput, $limit: Int, $nextToken: String) {
        dataBySessionId(sessionID: $sessionID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sessionID
            value
            time
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (sessionID) {
      gqlAPIServiceArguments.sessionID = sessionID;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
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
    return <DataBySessionIdQuery>response.data.dataBySessionId;
  }
  async TagBySessionId(
    sessionID?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelTagFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<TagBySessionIdQuery> {
    const statement = `query TagBySessionId($sessionID: ID, $sortDirection: ModelSortDirection, $filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
        tagBySessionId(sessionID: $sessionID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sessionID
            name
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (sessionID) {
      gqlAPIServiceArguments.sessionID = sessionID;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
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
    return <TagBySessionIdQuery>response.data.tagBySessionId;
  }
  OnCreateSessionListener: Observable<
    OnCreateSessionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateSession {
        onCreateSession {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateSessionSubscription>;

  OnUpdateSessionListener: Observable<
    OnUpdateSessionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSession {
        onUpdateSession {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateSessionSubscription>;

  OnDeleteSessionListener: Observable<
    OnDeleteSessionSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSession {
        onDeleteSession {
          __typename
          id
          name
          data {
            __typename
            nextToken
          }
          tags {
            __typename
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteSessionSubscription>;

  OnCreateDataListener: Observable<OnCreateDataSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateData {
        onCreateData {
          __typename
          id
          sessionID
          value
          time
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
          sessionID
          value
          time
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
          sessionID
          value
          time
        }
      }`
    )
  ) as Observable<OnDeleteDataSubscription>;

  OnCreateTagListener: Observable<OnCreateTagSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateTag {
        onCreateTag {
          __typename
          id
          sessionID
          name
        }
      }`
    )
  ) as Observable<OnCreateTagSubscription>;

  OnUpdateTagListener: Observable<OnUpdateTagSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTag {
        onUpdateTag {
          __typename
          id
          sessionID
          name
        }
      }`
    )
  ) as Observable<OnUpdateTagSubscription>;

  OnDeleteTagListener: Observable<OnDeleteTagSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTag {
        onDeleteTag {
          __typename
          id
          sessionID
          name
        }
      }`
    )
  ) as Observable<OnDeleteTagSubscription>;
}
