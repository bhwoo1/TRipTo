import { sleep } from "@/lib/utils";

export default async function Home() {
  await sleep(2000);

  return (
    <>Home</>
  );
}
