const graphql = require('graphql');
const _= require('lodash');

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
                return _.find(companies, {id: args.id})
            }
        }
    }
})

// Development Data
var companies = [
    { id: "1", name: "Name Number 1", fieldOfBusiness: "Business: Clothing" },
    { id: "2", name: "Name Number 2", fieldOfBusiness: "Business: Sales" },
    { id: "3", name: "Name Number 3", fieldOfBusiness: "Business: Defense" },
    { id: "4", name: "Name Number 4", fieldOfBusiness: "Business: Media" }
]

module.exports = new GraphQLSchema({
    query: RootQuery
})