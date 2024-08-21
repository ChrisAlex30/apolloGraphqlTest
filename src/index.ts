import express from "express"
import {ApolloServer} from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"

async function init() {
    const app=express()
    app.use(express.json())

    const gqlServer=new ApolloServer({
        typeDefs:`
                type Query{
                    hello:String
                    say(name:String):String
                }
        `,
        resolvers:{
            Query:{
                hello:()=>"Hey from GraphQL!!!",
                say:(_,{name}:{name:String},)=>`Hey ${name}`
            }
        }
    })
    await gqlServer.start()

    app.get("/",(req,res)=>res.json({msg:"Hey There from server"}))

    app.use("/graphql",expressMiddleware(gqlServer))

    app.listen(8000,()=>"Server Started on PORT 8000")
}

init()