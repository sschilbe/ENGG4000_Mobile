// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateSensor = `subscription OnCreateSensor {
  onCreateSensor {
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
export const onUpdateSensor = `subscription OnUpdateSensor {
  onUpdateSensor {
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
export const onDeleteSensor = `subscription OnDeleteSensor {
  onDeleteSensor {
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
export const onCreateData = `subscription OnCreateData {
  onCreateData {
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
export const onUpdateData = `subscription OnUpdateData {
  onUpdateData {
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
export const onDeleteData = `subscription OnDeleteData {
  onDeleteData {
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
export const onCreateSession = `subscription OnCreateSession {
  onCreateSession {
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
export const onUpdateSession = `subscription OnUpdateSession {
  onUpdateSession {
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
export const onDeleteSession = `subscription OnDeleteSession {
  onDeleteSession {
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
export const onCreateTag = `subscription OnCreateTag {
  onCreateTag {
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
export const onUpdateTag = `subscription OnUpdateTag {
  onUpdateTag {
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
export const onDeleteTag = `subscription OnDeleteTag {
  onDeleteTag {
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
