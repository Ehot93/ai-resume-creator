import LayoutForm from "./components/LayoutForm";
import { Providers } from "./_providers";

export default function Home() {
  return (
    <Providers>
      <div>
        <LayoutForm/>
      </div>
    </Providers>
  );
}
