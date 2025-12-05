export default {
  async _id(body) {
    return body.id;
  },
  async verificationLink(body) {
    return body.verification_url;
  },
  async verificationDeepLink(body) {
    return body.verification_deeplink;
  },
  async presentationDefinition(body) {
    return body.presentation_definition;
  },
};
