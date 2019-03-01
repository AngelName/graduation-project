module.exports = options => {
  return async function cors(ctx,next){
  await next();

  ctx.response.set({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
    "Access-Control-Allow-Headers": "x-requested-with,content-type"
  });
}
}