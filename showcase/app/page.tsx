import Link from "next/link";
import { Button, Heading, Description } from "@homonoid/react";

export default function HomePage() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap max-w-4xl">
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Homonoid</Heading>
        <Description>
          Design system built with continuous aesthetics and tactile physics.
        </Description>
      </div>

      <div>
        <Link href="/components" className="w-fit inline-block">
          <Button variant="outlined">Components</Button>
        </Link>
      </div>
    </div>
  );
}
