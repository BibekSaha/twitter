export const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy(
      () => res.redirect('/login')
    );
  }
};
