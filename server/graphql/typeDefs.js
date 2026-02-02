export const typeDefs = `#graphql
    type Pet {
        id: String,
        name: String,
        image: String,
        age: String,
        weight: String,
        breed: String,
        features: String,
        userId: String,
    }

    type User {
        name: String,
        id: String,
        roleId: String,
        lastName: String,
        email: String,
        password: String,
        pets: [Pet],
        createdAt: String,
    }

    input PetInput {
        id: ID!,
        name: String,
        image: String,
        age: String,
        weight: String,
        breed: String,
        features: String,
        userId: String,
    }

    type Query {
        users: [User],
        pets: [Pet],
        usersByIds(id: [String]): [User],
        petsByUid(uid: String): [Pet],
        pet(id: String): Pet
        user(id: String): User
    }

    type Mutation {
        createPet(input: PetInput): Pet
        updatePet(id: ID!, input: PetInput): Pet
    }
`;