import { useEffect } from "react";

export const TestFeature = () => {
  useEffect(() => {
    throw new Error("Test error");
  });

  return <>Broken Feature</>;
};
