import type { Meta, StoryObj } from "@storybook/react";
import { TechSpecs } from "@/components/architect/TechSpecs";

const meta: Meta<typeof TechSpecs> = {
  title: "App/TechSpecs",
  component: TechSpecs,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof TechSpecs>;

export const Default: Story = {};
