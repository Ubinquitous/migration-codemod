import React from "react";

interface LegacyProps {
  prop1: string;
  sssss?: number;
}

const Legacy = ({ prop1, sssss }: LegacyProps) => {
  return (
    <div>
      Legacy
      {prop1}
      {sssss}
    </div>
  );
};

export default Legacy;
