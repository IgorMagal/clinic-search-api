type Clinic = {
  type: string | null;
  name: string | null;
  state: string | null;
  availability: {
    from: string | null;
    to: string | null;
  };
};

type QueryParams = {
  name?: string;
  state?: string;
  type?: string;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
};

export { Clinic, QueryParams };
