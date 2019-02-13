const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

const BusinessType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        fieldOfBusiness: { type: GraphQLString },
        employees: {
            type: EmployeeType,
            resolve(parent, args) {
                return _.find(employees, { id: parent.employeeId })
            }
        }
    })
})

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        skillType: { type: GraphQLString },
        companies: {
           type: new GraphQLList(BusinessType),
           resolve(parent, args) {
            return _.filter(companies, { employeeId: parent.id })
           }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        company: {
            type: BusinessType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // Retrieve data from db
                return _.find(companies, {id: args.id})
            }
        },

        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // Retrieve data from db
                return _.find(employees, {id: args.id})
            }
        }
    }
})

// Development Data
var companies = [
    { id: "1", name: "Name Number 1", fieldOfBusiness: "Business: Clothing", employeeId: "1" },
    { id: "2", name: "Name Number 2", fieldOfBusiness: "Business: Sales", employeeId: "2" },
    { id: "3", name: "Name Number 3", fieldOfBusiness: "Business: Defense", employeeId: "3" },
    { id: "4", name: "Name Number 4", fieldOfBusiness: "Business: Media", employeeId: "4" },
    { id: "5", name: "Name Number 5", fieldOfBusiness: "Business: Clothing", employeeId: "2" },
    { id: "6", name: "Name Number 6", fieldOfBusiness: "Business: Sales", employeeId: "2" },
    { id: "7", name: "Name Number 7", fieldOfBusiness: "Business: Defense", employeeId: "3" },
    { id: "8", name: "Name Number 8", fieldOfBusiness: "Business: Media", employeeId: "4" }
]

var employees = [
    { id: "1", name: "Employee Number 1", skillType: "Specialized Skill: Clothing", age: 17 },
    { id: "2", name: "Employee Number 2", skillType: "Specialized Skill: Sales", age: 20 },
    { id: "3", name: "Employee Number 3", skillType: "Specialized Skill: Defense", age: 27 },
    { id: "4", name: "Employee Number 4", skillType: "Specialized Skill: Media", age: 16 }
]

module.exports = new GraphQLSchema({
    query: RootQuery
})