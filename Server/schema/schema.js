const graphql = require('graphql');
const _ = require('lodash');
const Company = require('../models/company.js');
const Employee = require('../models/employee.js');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

const BusinessType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        fieldOfBusiness: { type: GraphQLString },
        employerId: {
            type: EmployeeType,
            resolve(parent, args) {
                return Employee.findById(parent.employerId)
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
                return Company.find({ employerId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        company: {
            type: BusinessType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Company.findById(args.id)
            }
        },

        companies: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return Company.find({})
            }
        },

        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Employee.findById(args.id)
            }
        },

        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return Employee.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: `Mutation`,
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                skillType: { type: GraphQLString },
                gender: { type: GraphQLString }
            },
            resolve(parent, args) {
                let employee = new Employee({
                    name: args.name,
                    age: args.age,
                    skillType: args.skillType,
                    gender: args.gender
                })
                return employee.save();
            }
        },

        addCompany: {
            type: BusinessType,
            args: {
                name: { type: GraphQLString },
                fieldOfBusiness: { type: GraphQLString },
                employerId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let company = new Company({
                    name: args.name,
                    fieldOfBusiness: args.fieldOfBusiness,
                    employerId: args.employerId
                })
                return company.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})