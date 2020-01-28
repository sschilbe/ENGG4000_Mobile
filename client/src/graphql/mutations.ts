// tslint:disable
// this is an auto generated file. This will be overwritten

export const batchAddData = `mutation BatchAddData($data: [CreateDataInput]) {
  batchAddData(data: $data) {
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
export const batchDeleteData = `mutation BatchDeleteData($ids: [ID]) {
  batchDeleteData(ids: $ids) {
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
export const createSensor = `mutation CreateSensor(
  $input: CreateSensorInput!
  $condition: ModelSensorConditionInput
) {
  createSensor(input: $input, condition: $condition) {
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
export const updateSensor = `mutation UpdateSensor(
  $input: UpdateSensorInput!
  $condition: ModelSensorConditionInput
) {
  updateSensor(input: $input, condition: $condition) {
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
export const deleteSensor = `mutation DeleteSensor(
  $input: DeleteSensorInput!
  $condition: ModelSensorConditionInput
) {
  deleteSensor(input: $input, condition: $condition) {
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
export const createData = `mutation CreateData(
  $input: CreateDataInput!
  $condition: ModelDataConditionInput
) {
  createData(input: $input, condition: $condition) {
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
export const updateData = `mutation UpdateData(
  $input: UpdateDataInput!
  $condition: ModelDataConditionInput
) {
  updateData(input: $input, condition: $condition) {
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
export const deleteData = `mutation DeleteData(
  $input: DeleteDataInput!
  $condition: ModelDataConditionInput
) {
  deleteData(input: $input, condition: $condition) {
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
export const createSession = `mutation CreateSession(
  $input: CreateSessionInput!
  $condition: ModelSessionConditionInput
) {
  createSession(input: $input, condition: $condition) {
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
export const updateSession = `mutation UpdateSession(
  $input: UpdateSessionInput!
  $condition: ModelSessionConditionInput
) {
  updateSession(input: $input, condition: $condition) {
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
export const deleteSession = `mutation DeleteSession(
  $input: DeleteSessionInput!
  $condition: ModelSessionConditionInput
) {
  deleteSession(input: $input, condition: $condition) {
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
export const createTag = `mutation CreateTag(
  $input: CreateTagInput!
  $condition: ModelTagConditionInput
) {
  createTag(input: $input, condition: $condition) {
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
export const updateTag = `mutation UpdateTag(
  $input: UpdateTagInput!
  $condition: ModelTagConditionInput
) {
  updateTag(input: $input, condition: $condition) {
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
export const deleteTag = `mutation DeleteTag(
  $input: DeleteTagInput!
  $condition: ModelTagConditionInput
) {
  deleteTag(input: $input, condition: $condition) {
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
