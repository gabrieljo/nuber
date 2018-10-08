import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            //lastLat, Lng alias 붙임
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng
            }
          } = payload;
          // console.log(id, user);
          const { lastLat: userLastLat, lastLng: usrLastLng } = user;
          //subscription이 유저에게 전달되려면 return true/false 처리해야함
          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= usrLastLng - 0.05 &&
            driverLastLat <= usrLastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
