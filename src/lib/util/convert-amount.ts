export const convertAmount = (value: string | number | undefined) => {
  return Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value ?? 0));
};
