import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        //request로 넘어오는 모든 데이터를 key 기준으로 반복
        //값이 있는 키값들만 모아서 notNull에 대입
        const notNull = cleanNullArgs(args);

        try {
          await User.update({ id: user.id }, { ...notNull }); //update 는 user를 리턴하지 않음
          const updatedUser = await User.findOne({ id: user.id }); //새로 조회를 하여 변경된 사용자를 가져와 소켓에 전송해줘야 정상적으로 동작됨.
          //사용자 움직임이 변경되면 소켓으로 데이터 업데이트 하여 listening 중인 소켓에 데이터 전송
          pubSub.publish("driverUpdate", { DriversSubscription: updatedUser });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
