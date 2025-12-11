import type { Meta, StoryObj } from "@storybook/react";
import { Projects } from "@/components/architect/Projects";

const meta: Meta<typeof Projects> = {
  title: "App/Projects",
  component: Projects,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Projects>;

export const Default: Story = {};
