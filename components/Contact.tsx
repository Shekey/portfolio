import { FC } from "react";
import Image from "next/image";
export const Contact: FC = () => {
  return (
    <section className="min-h-dvh text-2xl flex justify-center items-center full-width">
      <Image
        alt="Hero image"
        src="https://assets.codepen.io/16327/portrait-pattern-3.jpg"
        width={1200}
        height={500}
        className="bg full-width object-cover"
      />
      <h1>Nice, right?</h1>
    </section>
  );
};
