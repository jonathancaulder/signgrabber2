/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      title
      description
      email
      phone
      text
      url
      price
      status
      latitude
      longitude
      image
      bucketkey
      image2
      bucketkey2
      image3
      bucketkey3
      image4
      bucketkey4
      image5
      bucketkey5
      category
      userid
      address1
      city
      state
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        email
        phone
        text
        url
        price
        status
        latitude
        longitude
        image
        bucketkey
        image2
        bucketkey2
        image3
        bucketkey3
        image4
        bucketkey4
        image5
        bucketkey5
        category
        userid
        address1
        city
        state
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const itemByLatitudeAndLongitude = /* GraphQL */ `
  query ItemByLatitudeAndLongitude(
    $latitude: Int!
    $longitude: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemByLatitudeAndLongitude(
      latitude: $latitude
      longitude: $longitude
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        email
        phone
        text
        url
        price
        status
        latitude
        longitude
        image
        bucketkey
        image2
        bucketkey2
        image3
        bucketkey3
        image4
        bucketkey4
        image5
        bucketkey5
        category
        userid
        address1
        city
        state
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const itemsByUserid = /* GraphQL */ `
  query ItemsByUserid(
    $userid: String!
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByUserid(
      userid: $userid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        email
        phone
        text
        url
        price
        status
        latitude
        longitude
        image
        bucketkey
        image2
        bucketkey2
        image3
        bucketkey3
        image4
        bucketkey4
        image5
        bucketkey5
        category
        userid
        address1
        city
        state
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
