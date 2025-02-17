import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { TestFeature } from "../components/TestFeature";
import { WorkingFeature } from "../components/WorkingFeature";

interface User {
  id: number;
  email: string;
  location: string;
  name: string;
}

export const User = () => {
  const param = useParams();

  const [user, setUser] = useState<User>();
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [variantColor, setVariantColor] = useState<string>();

  const fetchUser = useCallback(async () => {
    const response = await fetch(`http://localhost:3000/users/${param.id}`);
    const data = await response.json();
    setUser(data.user);
    setFeatureEnabled(data.feature.variantKey === "on");
    setVariantColor(data.feature.variantAttachment["text-color"]);
  }, [param.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Welcome to the your page!</p>
      <p>id: {user?.id}</p>
      <p>Email: {user?.email}</p>
      <p>Location: {user?.location}</p>
      <p style={{ color: variantColor }}>
        Feature enabled: {featureEnabled ? <TestFeature /> : <WorkingFeature />}
      </p>
    </div>
  );
};
