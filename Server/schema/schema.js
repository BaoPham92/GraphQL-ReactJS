const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BusinessType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        fieldOfBusiness: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        company: {
            type: BusinessType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // Retrieve data from db
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})