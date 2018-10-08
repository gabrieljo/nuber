import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;

        //request로 넘어오는 모든 데이터를 key 기준으로 반복
        //값이 있는 키값들만 모아서 notNull에 대입
        const notNull = cleanNullArgs(args);

        try {
          if (args.password !== null) {
            user.password = args.password;
            user.save();
          }
          //Null값이 아닌 데이터들만 모인 notNull을 업데이트함
          //TS에서 null들어올 여지가 있으면 error를 발생시킴. 그래서 위와 같이 변경 처리함.
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
