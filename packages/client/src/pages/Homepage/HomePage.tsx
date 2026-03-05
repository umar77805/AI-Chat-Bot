import Card from "@/components/ui/Card";
import IntroStatements from "./IntroStatements";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold mt-10">AI Feature Playground</h1>
      <IntroStatements />
      <div className="mt-5">
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
