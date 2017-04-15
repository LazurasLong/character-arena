import configureStore from '../configure-store';

export default function (
  config = {
    name: 'store',
  },
) {
  return (req, res, next) => {
    const { name } = config;
    const { session: { prevState } } = req;

    res.locals[name] = configureStore({
      ...prevState,
    });

    // Clear prevState (flash state)
    req.session.prevState = undefined;
    next();
  };
}
