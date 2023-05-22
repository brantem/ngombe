export type Schema = {
  goals: {
    key: number;
    value: {
      timestamp: number;
      value: number;
    };
  };
  records: {
    key: number;
    value: {
      timestamp: number;
      value: number;
    };
  };
};
