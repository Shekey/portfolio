import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "@/components/architect/Hero";

const meta: Meta<typeof Hero> = {
  title: "App/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const ArchitectMode: Story = {};
