import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            //lastLat, Lng alias 붙임
            NearbyRideSubscription: { pickUpLat, pickUpLng }
          } = payload;
          // console.log(id, user);
          const { lastLat: userLastLat, lastLng: usrLastLng } = user;
          //subscription이 유저에게 전달되려면 return true/false 처리해야함
          return (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= usrLastLng - 0.05 &&
            pickUpLng <= usrLastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
