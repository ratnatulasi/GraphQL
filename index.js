const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString,
     GraphQLNonNull ,
     GraphQLList,
     GraphQLSchema
    } = require('graphql')

const app = express()

const PORT = 5000

var Owners = [
    {
        id: 1, name: 'John Astle'
    },
    {
        id: 2, name: 'Gautam Sharma'
    },
    {
        id: 3, name: 'Kane Williamson'
    }

]


var Websites = [
    {
        id: 1, name: 'Google', ownerId: 1
    },

    {
        id: 2, name: 'FaceBook', ownerId: 2
    },

    {
        id: 3, name: 'Instagram', ownerId: 3
    }
]
//object type for website
const WebsiteType = new GraphQLObjectType({
    name: 'website',
    description: 'This represents a website made by a owner (Programmer)',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        ownerId: { type: GraphQLNonNull(GraphQLInt) }
    }),
});
//object type for owner 
const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    description: 'This represents a owner (Programmer)',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        
    }),
});


const RootQueryType=new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:()=>({
        Websites:{
            type:new GraphQLList(WebsiteType),
            description:'List of all websites',
            resolve:()=>Websites
        },
        Owners:{
            type:new GraphQLList(OwnerType),
             description:'List of all Owners',
            resolve:()=> Owners
        },
        Website:{
            type:WebsiteType,
            description:'A single website',
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,args)=>Websites.find(website=>website.id==args.id)
        },
        Owner:{
            type:OwnerType,
            description:'A single website',
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,args)=>Owners.find(Owner=>Owner.id==args.id)
        },

    })
})
const schema =new GraphQLSchema({
    query:RootQueryType
})

app.use('/graphql',  graphqlHTTP({
    graphiql: true,
    schema:schema
}))
console.log('12345')
app.listen(PORT, () => {
   console.log(`app is running on the port number ${PORT}`)
})
