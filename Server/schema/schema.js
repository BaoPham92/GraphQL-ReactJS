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
        gender: { type: GraphQLString },
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

        companies: {
            type: new GraphQLList (BusinessType),
            resolve(parent, args) {
                // Retrieve data from db
                return companies
            }
        },

        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // Retrieve data from db
                return _.find(employees, {id: args.id})
            }
        },

        employees: {
            type: new GraphQLList (EmployeeType),
            resolve(parent, args) {
                // Retrieve data from db
                return employees
            }
        }
    }
})

// Development Data
var companies = [
    { id: "1", name: "Company name: H&M", fieldOfBusiness: "Business: Clothing", employeeId: "1" },
    { id: "2", name: "Company name: iMarketSmart", fieldOfBusiness: "Business: Sales", employeeId: "2" },
    { id: "3", name: "Company name: Grid Defense", fieldOfBusiness: "Business: Defense", employeeId: "3" },
    { id: "4", name: "Company name: ABC Media", fieldOfBusiness: "Business: Media", employeeId: "4" },
    { id: "5", name: "Company name: Pac Sun", fieldOfBusiness: "Business: Clothing", employeeId: "2" },
    { id: "6", name: "Company name: Pitched Salesmans", fieldOfBusiness: "Business: Sales", employeeId: "2" },
    { id: "7", name: "Company name: Biotech Defenses", fieldOfBusiness: "Business: Defense", employeeId: "3" },
    { id: "8", name: "Company name: MediaLive Entertainments", fieldOfBusiness: "Business: Media", employeeId: "4" }
]

var employees = [
    { id: "1", name: "Employee Name: Kevin", skillType: "Specialized Skill: Clothing", age: 17, gender: "Male" },
    { id: "2", name: "Employee Name: Meg", skillType: "Specialized Skill: Sales", age: 20, gender: "Female" },
    { id: "3", name: "Employee Name: Tyler", skillType: "Specialized Skill: Defense", age: 27, gender: "Male" },
    { id: "4", name: "Employee Name: Masuma", skillType: "Specialized Skill: Media", age: 16, gender: "Female" }
]

module.exports = new GraphQLSchema({
    query: RootQuery
})