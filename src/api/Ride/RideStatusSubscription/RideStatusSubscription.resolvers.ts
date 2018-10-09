import { withFilter } from "graphql-yoga";
// import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, args, { context }) => {
          //   const user: User = context.currentUser;
          const {
            RideStatusSubscription: { id }
          } = payload;

          return args.rideId === id;
        }
      )
    }
  }
};

export default resolvers;
