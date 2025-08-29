export default {
  async ageVerification(user) {
    return user?.meta?.ageVerification;
  },
};
