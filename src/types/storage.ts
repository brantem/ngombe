export type Schema = {
  records: {
    key: number;
    value: {
      timestamp: number;
      value: number;
    };
    indexes: { timestamp: number };
  };
};
