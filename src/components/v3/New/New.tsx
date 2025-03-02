import React from "react";

interface NewProps {
  prop1: string;
  prop2: number;
}

const New = ({ prop1, prop2 }: NewProps) => {
  return (
    <div>
      New
      {prop1}
      {prop2}
    </div>
  );
};

export default New;
