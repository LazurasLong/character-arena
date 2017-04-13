
export const compare = ({
  base,
  comparedTo,
  key,
}) => {
  if (base && base[key] && comparedTo && comparedTo[key]) {
    return parseInt(base[key] - comparedTo[key]);
  }

  return undefined;
}