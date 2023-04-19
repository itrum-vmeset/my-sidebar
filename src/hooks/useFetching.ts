import { useState } from "react";

import { IParam } from "../models/IResponse";

export const useFetching = (
  callback: CallableFunction
): [() => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetching = async (...args: IParam[]): Promise<any> => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
