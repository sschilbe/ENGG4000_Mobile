// tslint:disable
// this is an auto generated file. This will be overwritten

export const getSensor = `query GetSensor($id: ID!) {
  getSensor(id: $id) {
    id
    type
    name
    data {
      items {
        id
        value
        time
      }
      nextToken
    }
  }
}
`;
export const listSensors = `query ListSensors(
  $filter: ModelSensorFilterInput
  $limit: Int
  $nextToken: String
) {
  listSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      name
      data {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getData = `query GetData($id: ID!) {
  getData(id: $id) {
    id
    value
    time
    sensor {
      id
      type
      name
      data {
        nextToken
      }
    }
    session {
      id
      name
      data {
        nextToken
      }
      tags {
        nextToken
      }
    }
  }
}
`;
export const listDatas = `query ListDatas(
  $filter: ModelDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      value
      time
      sensor {
        id
        type
        name
      }
      session {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    name
    data {
      items {
        id
        value
        time
      }
      nextToken
    }
    tags {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      data {
        nextToken
      }
      tags {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTag = `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    session {
      id
      name
      data {
        nextToken
      }
      tags {
        nextToken
      }
    }
  }
}
`;
export const listTags = `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      session {
        id
        name
      }
    }
    nextToken
  }
}
`;
