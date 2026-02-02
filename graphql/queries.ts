import gql from 'graphql-tag';

export const ADD_PET = gql`
    mutation createPet($input: PetInput) {
        createPet (input: $input) {
            name
            image
            age
            weight
            breed
            features
            userId
        }
    }
`;

export const UPDATE_PET = gql`
    mutation updatePet($id: ID!, $input: PetInput) {
        updatePet (id: $id, input: $input) {
            id
            name
            image
            age
            weight
            breed
            features
            userId
        }
    }
`;

export const GET_PETS = gql`
    query GetPetsByUid($uid: String) {
        petsByUid(uid: $uid) {
            name
            id
            image
            age
            weight
            breed
            features
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: String) {
        user(id: $id) {
            name
            email
            lastName
        }
    }
`;