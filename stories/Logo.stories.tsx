import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "@/components/Logo";

const meta: Meta<typeof Logo> = {
  title: "Brand/Logo",
  component: Logo,
  args: {
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: "lg" },
};

