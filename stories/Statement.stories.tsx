import type { Meta, StoryObj } from "@storybook/react";
import { Statement } from "@/components/Statement";

const meta: Meta<typeof Statement> = {
  title: "App/Statement",
  component: Statement,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Statement>;

export const Default: Story = {};

