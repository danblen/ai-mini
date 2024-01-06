import React, { useState, useRef, useEffect } from "react";

export function useData(apiCall, initState) {
  const [data, setData] = useState(initState);
  useEffect(() => {
    if (apiCall) {
      let ignore = false;
      const down1 = async () => {
        const res = await apiCall;
        if (!ignore) setData(res);
      };
      down1();

      return () => {
        ignore = true;
      };
    }
  }, [apiCall]);
  return data;
}
