import { useEffect, useState } from "react";
import { TestFeature } from "../components/TestFeature";
import { WorkingFeature } from "../components/WorkingFeature";

interface IFeature {
  message: string;
  features: {
    id: number;
    enabled: boolean;
    key: string;
    description: string;
  }[];
}

export const Features = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<IFeature>();

  useEffect(() => {
    fetch("http://localhost:3000/features")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {data?.features && data?.features.find((x) => x.id === 2)?.enabled ? (
        <TestFeature />
      ) : (
        <WorkingFeature />
      )}
    </>
  );
};
