const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernew Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      links.map(link => {
        if (link.id === args.id) {
          return link = Object.assign(link, {
            url: args.url,
            description: args.url
          })
        }
        return link;
      })
      return links.find(link => link.id === args.id);
    },
    deleteLink: (root, args) => {
      const linkToDelete = links.find(link => link.id === args.id);
      links = links.filter(link => link.id !== linkToDelete.id)
      return linkToDelete;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
