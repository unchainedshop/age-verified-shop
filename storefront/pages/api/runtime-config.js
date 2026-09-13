// Next 16 removed publicRuntimeConfig/getConfig; read server env directly.
const handler = (_, res) => {
  const {
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES,
    UNCHAINED_ENDPOINT,
    DISABLE_EMAIL_PROCESSES,
  } = process.env;
  res.status(200).json({
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES: JSON.parse(SKIP_INVALID_REMOTES || "false"),
    UNCHAINED_ENDPOINT,
    disableEmailSupport: !!DISABLE_EMAIL_PROCESSES,
  });
};
export default handler;
