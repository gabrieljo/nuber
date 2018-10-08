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
        { req }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        //request로 넘어오는 모든 데이터를 key 기준으로 반복
        //값이 있는 키값들만 모아서 notNull에 대입
        const notNull = cleanNullArgs(args);

        try {
          await User.update({ id: user.id }, { ...notNull });
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
