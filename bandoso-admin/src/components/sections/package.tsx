import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleCheck } from "lucide-react";

const packages = [
  {
    name: "Sinh viên",

    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      "5 hours turnaround time",
      "20 AI portraits",
      "Choice of 2 styles",
      "Choice of 2 filters",
      "2 retouch credits",
    ],
    buttonText: "Get 20 portraits in 5 hours",
  },
  {
    name: "Giáo viên",
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      "3 hours turnaround time",
      "50 AI portraits",
      "Choice of 5 styles",
      "Choice of 5 filters",
      "5 retouch credits",
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
  },
  {
    name: "Cán bộ Đoàn – Đảng",
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      "1-hour turnaround time",
      "100 AI portraits",
      "Choice of 10 styles",
      "Choice of 10 filters",
      "10 retouch credits",
    ],
    buttonText: "Get 100 portraits in 1 hour",
  },
];

import { MailIcon, MapPinIcon } from "lucide-react";
import { TextAnimate } from "../magicui/text-animate";
import GradientCardBlock from "../blocks/GradientCardBlock";
export function PackageSection() {
  return (
    <section className="pt-8 px-4 sm:pt-12 sm:px-6 md:pt-8 lg:px-32  flex w-full justify-center">
      <div className="container min-h-screen">
        <h2 className="py-8  text-2xl text-center font-bold md:text-4xl lg:text-5xl">
          <TextAnimate animation="blurIn" as="h1">
            Giá trị mang lại
          </TextAnimate>
        </h2>
        <div className="mt-2 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          {packages.map((_package) => (
            <div key={_package.name}>
              <GradientCardBlock className="border rounded-lg p-6">
                <h3 className="text-lg font-medium">{_package.name}</h3>
                <p className="mt-4 font-medium text-muted-foreground">
                  {_package.description}
                </p>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  {_package.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CircleCheck className="h-4 w-4 mt-1 text-green-600" />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={_package.isPopular ? "default" : "outline"}
                  size="lg"
                  className="w-full mt-6"
                >
                  {_package.buttonText}
                </Button>
              </GradientCardBlock>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
