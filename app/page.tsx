import { SignUpButton } from "@clerk/nextjs";
import { Link2, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Short, custom links",
    description:
      "Turn long, unwieldy URLs into short, memorable links you can share anywhere.",
  },
  {
    icon: Zap,
    title: "Instant redirects",
    description:
      "Every shortened link resolves in milliseconds, so your visitors never notice the extra hop.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    description:
      "See how your links perform with clear, at-a-glance click tracking for every link you create.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Your account and links are protected with Clerk-powered authentication.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 flex-col items-center">
        <section className="flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            Shorten your links. Track every click.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Create clean, shareable short links in seconds and keep an eye on
            how they perform, all from one simple dashboard.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg">Get started for free</Button>
          </SignUpButton>
        </section>

        <section className="w-full max-w-5xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-6 text-primary" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
