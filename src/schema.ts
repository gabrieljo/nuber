import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

//get all api
const allTypes: any[] = fileLoader(
  //모든 graphql 파일 가져와서 합치기 경로 상관없이
  path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers: any[] = fileLoader(
  //모든 resolver파일 합치기, 확장자명은 컴파일뒤 현재 ts가 js로 변경되기때문에 * 파일로 설정하여 모든 파일 합치기
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
