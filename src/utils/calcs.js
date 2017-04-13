
export const compare = ({
  base,
  comparedTo,
  key,
}) => {
  if (
    typeof base !== 'undefined'
    && typeof base[key] !== 'undefined'
    && typeof comparedTo !== 'undefined'
    && typeof comparedTo[key] !== 'undefined'
  ) {
    return parseInt(base[key] - comparedTo[key]);
  }

  return undefined;
};

export const getClassSlug = className => className.replace(' ', '-').toLowerCase();
