const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("Unauthorization User");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  console.log("resolved", resolved);
  return resolved;
};

export default privateResolver;
